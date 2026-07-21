'use client';

import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useEventRounds, useEventTracks } from '@/features/events/hooks/useEvents';
import { eventsApi } from '@/features/events/api/events';
import { useTeamSubmissions, useCreateSubmission, useUpdateSubmission } from '@/features/submissions/hooks/useSubmissions';
import type { SubmissionModel } from '@/features/submissions/api/submissions';
import { useNotify } from '@/components/NotificationProvider';
import { StatusBadge } from '@/components/StatusBadge';
import {
  parseRuleLabels,
  parseSubmissionLinks,
  DEFAULT_LINK_LABEL,
  type SubmissionLink,
} from '@/features/submissions/utils/submissionLinks';

/** Surface the backend's message (e.g. "Đã hết hạn nộp bài cho vòng thi này.")
 *  instead of a generic failure. */
function submitErrorMessage(err: unknown): string {
  const ax = err as AxiosError<{ message?: string }>;
  return ax?.response?.data?.message || ax?.message || 'Nộp bài thất bại.';
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

interface RoundInfo { id: string; roundName: string | null; startDate: string; endDate: string; }
interface EventModelWithSubmissionRules {
  rounds?: Array<{
    tracks?: Array<{ id: string; submissionRuleDescription?: string | null }>;
  }>;
}

interface Props { teamId: string; eventId: string; }

export function SubmissionTab({ teamId, eventId }: Props) {
  const notify = useNotify();
  const { data: rounds = [] } = useEventRounds(eventId);
  const { data: tracks = [] } = useEventTracks(eventId);

  // Yêu cầu nộp bài chỉ có trong model lồng của GET /Events/{id} (rounds[].tracks[])
  const { data: eventModel } = useQuery({
    queryKey: ['eventModel', eventId],
    queryFn: () => eventsApi.getModelById(eventId),
    staleTime: 5 * 60 * 1000,
  });

  const [roundId, setRoundId] = useState('');
  const [trackId, setTrackId] = useState('');
  // FORM ĐỘNG: mỗi phần tử = 1 ô nhập link theo cấu hình của Track (submissionRuleDescription).
  // Track không cấu hình -> 1 ô "Link nộp bài" như cũ.
  const [links, setLinks] = useState<SubmissionLink[]>([]);
  const [description, setDesc] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  // Bài đang sửa (null = đang ở chế độ nộp mới). Chỉ sửa được link + mô tả, trong thời gian vòng còn mở.
  const [editing, setEditing] = useState<SubmissionModel | null>(null);
  const [now] = useState(() => Date.now());

  // eventId bắt buộc: filter phân quyền BE cần EventId (thiếu sẽ bị 400).
  const {
    data: existing = [],
    isLoading: existingLoading,
    error: existingError,
  } = useTeamSubmissions(teamId, eventId);
  const create = useCreateSubmission(teamId);
  const update = useUpdateSubmission(teamId);

  const allRounds = rounds as RoundInfo[];
  const allTracks = tracks as Array<{
    id: string;
    roundId: string;
    trackName: string | null;
    submissionRuleDescription?: string | null;
  }>;

  // Sinh danh sách ô nhập link theo cấu hình của Track đang chọn:
  // mỗi dòng trong submissionRuleDescription = 1 loại link phải nộp.
  const buildLinksForTrack = (tid: string): SubmissionLink[] => {
    // Tìm rules từ nested model thay vì flat model (do BE không trả field này ở flat list)
    let ruleDesc: string | null | undefined = null;
    const nestedRounds = (eventModel as EventModelWithSubmissionRules | undefined)?.rounds ?? [];
    for (const r of nestedRounds) {
      const track = (r.tracks ?? []).find((x) => x.id === tid);
      if (track) {
        ruleDesc = track.submissionRuleDescription;
        break;
      }
    }

    const labels = parseRuleLabels(ruleDesc);
    return labels.length > 0
      ? labels.map((label) => ({ label, url: '' }))
      : [{ label: DEFAULT_LINK_LABEL, url: '' }];
  };

  // Vòng đang diễn ra (dùng để hiện banner + highlight trong dropdown).
  const activeRound = useMemo(
    () => allRounds.find((r) =>
      now >= new Date(r.startDate).getTime() && now <= new Date(r.endDate).getTime()
    ),
    [allRounds, now],
  );

  const tracksForRound = useMemo(
    () => allTracks.filter((t) => t.roundId === roundId),
    [allTracks, roundId],
  );
  const trackName = (id: string) => allTracks.find((t) => t.id === id)?.trackName ?? '—';

  // Vòng của một bài nộp (suy từ track) — để biết bài còn trong hạn sửa hay không.
  const roundOfTrack = (tid: string): RoundInfo | undefined => {
    const t = allTracks.find((x) => x.id === tid);
    return t ? allRounds.find((r) => r.id === t.roundId) : undefined;
  };
  const isRoundOpen = (r?: RoundInfo) => {
    if (!r) return false;
    return now >= new Date(r.startDate).getTime() && now <= new Date(r.endDate).getTime();
  };

  const selectedRound = allRounds.find((r) => r.id === roundId);
  const selectedClosed = !!selectedRound && !isRoundOpen(selectedRound);

  // Gộp danh sách link thành giá trị gửi lên BE (trường submissionUrl):
  // - Track có cấu hình nhiều loại link -> JSON.stringify([{label,url},...])
  // - 1 ô mặc định (track không cấu hình) -> gửi chuỗi URL thường như cũ (tương thích ngược)
  const linksToSubmissionUrl = (list: SubmissionLink[]): string => {
    const cleaned = list.map((l) => ({ label: l.label, url: l.url.trim() }));
    const isConfigured = cleaned.length > 1 || (cleaned.length === 1 && cleaned[0].label !== DEFAULT_LINK_LABEL);
    return isConfigured ? JSON.stringify(cleaned) : (cleaned[0]?.url ?? '');
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionUrl = linksToSubmissionUrl(links);
    if (editing) {
      // isActive gửi đúng giá trị hiện tại — chỉ Event Coordinator được đổi (BE chặn nếu đổi).
      update.mutate(
        { id: editing.id, submissionUrl, description, isActive: editing.isActive },
        { onSuccess: () => { setEditing(null); setLinks(trackId ? buildLinksForTrack(trackId) : []); setDesc(''); } },
      );
      return;
    }
    create.mutate(
      { teamId, trackId, submissionUrl, description },
      { onSuccess: () => { setLinks(buildLinksForTrack(trackId)); setDesc(''); } },
    );
  };

  const startEdit = (s: SubmissionModel) => {
    setEditing(s);
    // Hiện lại đúng các link đã nộp (JSON -> danh sách; chuỗi cũ -> 1 link mặc định).
    setLinks(parseSubmissionLinks(s.submissionUrl));
    setDesc(s.description ?? '');
  };
  const cancelEdit = () => { setEditing(null); setLinks(trackId ? buildLinksForTrack(trackId) : []); setDesc(''); };

  const mutError = editing ? update.error : create.error;
  const pending = editing ? update.isPending : create.isPending;

  return (
    <section className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="t-heading-md">{editing ? 'Sửa bài nộp' : 'Nộp bài'}</h2>

      {activeRound && !editing && (
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ background: 'rgba(118,185,0,0.08)', border: '1px solid rgba(118,185,0,0.3)', borderRadius: 4 }}
        >
          <div className="text-sm">
            <span className="font-bold" style={{ color: '#5a8d00' }}>
              {activeRound.roundName ?? 'Vòng thi'} đang diễn ra
            </span>
            <span className="ml-2" style={{ color: '#757575' }}>
              Hạn nộp: {fmt(activeRound.endDate)}
            </span>
          </div>
        </div>
      )}

      {!activeRound && allRounds.length > 0 && !editing && (
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ background: 'rgba(255,193,7,0.1)', border: '1px solid #ffc107', borderRadius: 4 }}
        >
          <p className="text-sm m-0" style={{ color: '#8a6d00' }}>
            Hiện không có vòng thi nào đang mở. Bạn chỉ có thể xem bài đã nộp.
          </p>
        </div>
      )}

      <form onSubmit={submit} className="space-y-3 border border-hairline rounded-sm bg-white p-4 md:p-6">
        {editing ? (
          <p className="t-body-sm text-mute">
            Đang sửa bài của hạng mục <b className="text-ink">{trackName(editing.trackId)}</b> — chỉ đổi được link và mô tả.
          </p>
        ) : (
          <>
            <label className="block">
              <span className="t-body-sm font-bold">Vòng</span>
              <select required value={roundId} onChange={(e) => { setRoundId(e.target.value); setTrackId(''); setLinks([]); }} className="input w-full mt-1">
                <option value="">— Chọn vòng —</option>
                {allRounds.map((r) => {
                  const isActive = isRoundOpen(r);
                  return (
                    <option key={r.id} value={r.id}>
                      {r.roundName ?? 'Vòng ' + r.id.slice(0, 4)}
                      {isActive ? ' (Đang mở)' : ''}
                    </option>
                  );
                })}
              </select>
            </label>

            {selectedRound && (
              <p className={`t-body-sm ${selectedClosed ? 'text-error font-bold' : 'text-mute'}`}>
                Thời gian nộp: {fmt(selectedRound.startDate)} → {fmt(selectedRound.endDate)}
                {selectedClosed && ' — NGOÀI thời gian nộp bài'}
              </p>
            )}

            <label className="block">
              <span className="t-body-sm font-bold">Hạng mục thi đấu</span>
              <select
                required value={trackId}
                onChange={(e) => {
                  const v = e.target.value;
                  setTrackId(v);
                  // Đọc cấu hình của track vừa chọn -> sinh đúng số ô nhập link
                  setLinks(v ? buildLinksForTrack(v) : []);
                }}
                className="input w-full mt-1" disabled={!roundId}
              >
                <option value="">— Chọn hạng mục —</option>
                {tracksForRound.map((t) => <option key={t.id} value={t.id}>{t.trackName ?? 'Hạng mục ' + t.id.slice(0, 4)}</option>)}
              </select>
            </label>
          </>
        )}

        {/* FORM ĐỘNG: mỗi loại link trong cấu hình track = 1 ô nhập riêng */}
        {links.length === 0 ? (
          <p className="t-body-sm text-mute">Chọn vòng và hạng mục để hiện các link cần nộp.</p>
        ) : (
          links.map((lnk, idx) => (
            <label key={idx} className="block">
              <span className="t-body-sm font-bold">{lnk.label}</span>
              <input
                required type="url" value={lnk.url} placeholder="https://…"
                onChange={(e) =>
                  setLinks((prev) => prev.map((x, i) => (i === idx ? { ...x, url: e.target.value } : x)))
                }
                className="input w-full mt-1"
              />
            </label>
          ))
        )}

        <label className="block">
          <span className="t-body-sm font-bold">Mô tả</span>
          <textarea value={description} onChange={(e) => setDesc(e.target.value)} rows={3} className="input w-full mt-1" />
        </label>

        {mutError ? <p className="t-body-sm text-error">{submitErrorMessage(mutError)}</p> : null}

        <div className="flex gap-2">
          <button type="submit" disabled={pending || (!editing && selectedClosed)} className={`btn ${editing ? 'btn-update' : 'btn-create'}`}>
            {pending ? 'Đang lưu…' : editing ? 'Lưu thay đổi' : 'Nộp bài'}
          </button>
          {editing && (
            <button type="button" onClick={cancelEdit} className="btn">
              Hủy
            </button>
          )}
        </div>
      </form>

      <div>
        <h3 className="t-body-md font-bold mb-2">Đã nộp</h3>
        {existingLoading ? (
          <p className="t-body-sm text-mute">Đang tải…</p>
        ) : existingError ? (
          <p className="t-body-sm text-error">{submitErrorMessage(existingError)}</p>
        ) : existing.length === 0 ? (
          <p className="t-body-sm text-mute">Chưa có bài nộp nào.</p>
        ) : (
          <ul className="space-y-3">
            {existing.map((s) => {
              const r = roundOfTrack(s.trackId);
              const canEdit = isRoundOpen(r);
              return (
                <li key={s.id} className="border border-hairline rounded-sm bg-white p-4 space-y-2">
                  {/* Dòng 1: trạng thái + hạng mục / vòng + nút Sửa */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <StatusBadge tone="success">Đã nộp</StatusBadge>
                      <StatusBadge tone="neutral">{trackName(s.trackId)}</StatusBadge>
                      {r && <span className="t-body-sm text-ink">{r.roundName ?? 'Vòng thi'}</span>}
                    </div>
                    {canEdit ? (
                      <button type="button" onClick={() => startEdit(s)} className="btn btn-update shrink-0 text-xs px-3 py-1">
                        Sửa bài
                      </button>
                    ) : (
                      <StatusBadge tone="inactive" className="shrink-0">Đã khóa</StatusBadge>
                    )}
                  </div>

                  {/* Danh sách link đã nộp: JSON [{label,url}] -> từng dòng theo nhãn;
                      dữ liệu cũ (1 URL thường) -> 1 dòng như trước (tương thích ngược). */}
                  {parseSubmissionLinks(s.submissionUrl).map((lnk, i) => (
                    <div key={i} className="flex items-center gap-2 min-w-0">
                      <span className="t-body-sm font-bold shrink-0">{lnk.label}:</span>
                      <a
                        href={lnk.url} target="_blank" rel="noreferrer"
                        className="t-body-sm text-primary underline truncate flex-1 min-w-0"
                        title={lnk.url}
                      >
                        {lnk.url}
                      </a>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm ml-auto shrink-0"
                        onClick={() => {
                          navigator.clipboard?.writeText(lnk.url)
                            .then(() => {
                              setCopiedUrl(lnk.url);
                              notify.success(`Đã copy ${lnk.label}.`);
                              window.setTimeout(() => setCopiedUrl((current) => current === lnk.url ? null : current), 2000);
                            })
                            .catch(() => notify.error('Không copy được, hãy copy thủ công.'));
                        }}
                      >
                        {copiedUrl === lnk.url ? 'Đã copy' : 'Copy'}
                      </button>
                    </div>
                  ))}

                  {/* Mô tả (nếu có) */}
                  {s.description ? (
                    <p className="t-body-sm text-mute m-0">
                      <b className="text-ink">Mô tả:</b> {s.description}
                    </p>
                  ) : null}

                  {/* Meta: thời gian nộp + hạn sửa */}
                  <div className="flex items-center gap-4 flex-wrap t-body-sm text-mute">
                    <span>Nộp lúc: {fmt(s.createdTime)}</span>
                    {r && (canEdit ? (
                      <span className="font-bold" style={{ color: '#5a8d00' }}>
                        Còn sửa được đến {fmt(r.endDate)}
                      </span>
                    ) : (
                      <span>Hết hạn sửa: {fmt(r.endDate)}</span>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
