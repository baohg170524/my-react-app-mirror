'use client';

import React, { useMemo, useState } from 'react';
import type { AxiosError } from 'axios';
import { useEventRounds, useEventTracks } from '@/features/events/hooks/useEvents';
import { useTeamSubmissions, useCreateSubmission, useUpdateSubmission } from '@/features/submissions/hooks/useSubmissions';
import type { SubmissionModel } from '@/features/submissions/api/submissions';
import { useNotify } from '@/components/NotificationProvider';

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

interface Props { teamId: string; eventId: string; }

export function SubmissionTab({ teamId, eventId }: Props) {
  const notify = useNotify();
  const { data: rounds = [] } = useEventRounds(eventId);
  const { data: tracks = [] } = useEventTracks(eventId);

  const [roundId, setRoundId] = useState('');
  const [trackId, setTrackId] = useState('');
  const [submissionUrl, setUrl] = useState('');
  const [description, setDesc] = useState('');
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
  const allTracks = tracks as Array<{ id: string; roundId: string; trackName: string | null }>;

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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      // isActive gửi đúng giá trị hiện tại — chỉ Event Coordinator được đổi (BE chặn nếu đổi).
      update.mutate(
        { id: editing.id, submissionUrl, description, isActive: editing.isActive },
        { onSuccess: () => { setEditing(null); setUrl(''); setDesc(''); } },
      );
      return;
    }
    create.mutate(
      { teamId, trackId, submissionUrl, description },
      { onSuccess: () => { setUrl(''); setDesc(''); } },
    );
  };

  const startEdit = (s: SubmissionModel) => {
    setEditing(s);
    setUrl(s.submissionUrl);
    setDesc(s.description ?? '');
  };
  const cancelEdit = () => { setEditing(null); setUrl(''); setDesc(''); };

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
          <span style={{ fontSize: 16 }}>🟢</span>
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
          <span style={{ fontSize: 16 }}>⏳</span>
          <p className="text-sm m-0" style={{ color: '#8a6d00' }}>
            Hiện không có vòng thi nào đang mở. Bạn chỉ có thể xem bài đã nộp.
          </p>
        </div>
      )}

      <form onSubmit={submit} className="space-y-3 border border-hairline rounded-sm bg-canvas p-4 md:p-6">
        {editing ? (
          <p className="t-body-sm text-mute">
            Đang sửa bài của hạng mục <b className="text-ink">{trackName(editing.trackId)}</b> — chỉ đổi được link và mô tả.
          </p>
        ) : (
          <>
            <label className="block">
              <span className="t-body-sm font-bold">Vòng</span>
              <select required value={roundId} onChange={(e) => { setRoundId(e.target.value); setTrackId(''); }} className="input w-full mt-1">
                <option value="">— Chọn vòng —</option>
                {allRounds.map((r) => {
                  const isActive = isRoundOpen(r);
                  return (
                    <option key={r.id} value={r.id}>
                      {isActive ? '🟢 ' : ''}{r.roundName ?? 'Vòng ' + r.id.slice(0, 4)}
                      {isActive ? ' (Đang mở)' : ''}
                    </option>
                  );
                })}
              </select>
            </label>

            {selectedRound && (
              <p className={`t-body-sm ${selectedClosed ? 'text-error font-bold' : 'text-mute'}`}>
                ⏰ Thời gian nộp: {fmt(selectedRound.startDate)} → {fmt(selectedRound.endDate)}
                {selectedClosed && ' — NGOÀI thời gian nộp bài'}
              </p>
            )}

            <label className="block">
              <span className="t-body-sm font-bold">Hạng mục thi đấu</span>
              <select required value={trackId} onChange={(e) => setTrackId(e.target.value)} className="input w-full mt-1" disabled={!roundId}>
                <option value="">— Chọn track —</option>
                {tracksForRound.map((t) => <option key={t.id} value={t.id}>{t.trackName ?? 'Track ' + t.id.slice(0, 4)}</option>)}
              </select>
            </label>
          </>
        )}

        <label className="block">
          <span className="t-body-sm font-bold">Link nộp bài</span>
          <input required type="url" value={submissionUrl} onChange={(e) => setUrl(e.target.value)} className="input w-full mt-1" />
        </label>

        <label className="block">
          <span className="t-body-sm font-bold">Mô tả</span>
          <textarea value={description} onChange={(e) => setDesc(e.target.value)} rows={3} className="input w-full mt-1" />
        </label>

        {mutError ? <p className="t-body-sm text-error">{submitErrorMessage(mutError)}</p> : null}

        <div className="flex gap-2">
          <button type="submit" disabled={pending || (!editing && selectedClosed)} className="btn btn-primary">
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
                <li key={s.id} className="border border-hairline rounded-sm bg-canvas p-4 space-y-2">
                  {/* Dòng 1: trạng thái + hạng mục / vòng + nút Sửa */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-sm bg-green-50 text-green-700 border border-green-200 whitespace-nowrap">
                        ✓ Đã nộp
                      </span>
                      <span className="t-body-md font-bold">{trackName(s.trackId)}</span>
                      {r && <span className="t-body-sm text-mute">· {r.roundName ?? 'Vòng thi'}</span>}
                    </div>
                    {canEdit ? (
                      <button type="button" onClick={() => startEdit(s)} className="btn btn-primary shrink-0 text-xs px-3 py-1">
                        Sửa bài
                      </button>
                    ) : (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-sm bg-gray-100 text-gray-500 border border-gray-200 shrink-0 whitespace-nowrap">
                        🔒 Đã khóa
                      </span>
                    )}
                  </div>

                  {/* Dòng 2: link bài nộp + copy */}
                  <div className="flex items-center gap-2 min-w-0">
                    <span aria-hidden className="shrink-0">🔗</span>
                    <a
                      href={s.submissionUrl} target="_blank" rel="noreferrer"
                      className="t-body-sm text-primary underline truncate"
                      title={s.submissionUrl}
                    >
                      {s.submissionUrl}
                    </a>
                    <button
                      type="button"
                      className="btn shrink-0 text-xs px-2 py-0.5"
                      onClick={() => {
                        navigator.clipboard?.writeText(s.submissionUrl)
                          .then(() => notify.success('Đã copy link bài nộp.'))
                          .catch(() => notify.error('Không copy được, hãy copy thủ công.'));
                      }}
                    >
                      Copy
                    </button>
                  </div>

                  {/* Mô tả (nếu có) */}
                  {s.description ? (
                    <p className="t-body-sm text-mute m-0">
                      <b className="text-ink">Mô tả:</b> {s.description}
                    </p>
                  ) : null}

                  {/* Meta: thời gian nộp + hạn sửa */}
                  <div className="flex items-center gap-4 flex-wrap t-body-sm text-mute">
                    <span>🕒 Nộp lúc: {fmt(s.createdTime)}</span>
                    {r && (canEdit ? (
                      <span className="font-bold" style={{ color: '#5a8d00' }}>
                        ⏰ Còn sửa được đến {fmt(r.endDate)}
                      </span>
                    ) : (
                      <span>⏰ Hết hạn sửa: {fmt(r.endDate)}</span>
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
