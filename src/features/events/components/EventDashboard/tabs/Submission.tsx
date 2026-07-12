'use client';

import React, { useMemo, useState } from 'react';
import type { AxiosError } from 'axios';
import { useEventRounds, useEventTracks } from '@/features/events/hooks/useEvents';
import { useTeamSubmissions, useCreateSubmission, useUpdateSubmission } from '@/features/submissions/hooks/useSubmissions';
import type { SubmissionModel } from '@/features/submissions/api/submissions';

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
                {allRounds.map((r) => (
                  <option key={r.id} value={r.id}>{r.roundName ?? 'Vòng ' + r.id.slice(0, 4)}</option>
                ))}
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
          <ul className="divide-y divide-hairline">
            {existing.map((s) => {
              const r = roundOfTrack(s.trackId);
              const canEdit = isRoundOpen(r);
              return (
                <li key={s.id} className="py-2 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <a href={s.submissionUrl} target="_blank" rel="noreferrer" className="t-body-md text-primary underline break-all">
                      {s.submissionUrl}
                    </a>
                    <p className="t-body-sm text-mute">
                      Track: {trackName(s.trackId)}
                      {r ? ` · Hạn sửa: ${fmt(r.endDate)}` : ''}
                      {s.description ? ` · ${s.description}` : ''}
                    </p>
                  </div>
                  {canEdit && (
                    <button type="button" onClick={() => startEdit(s)} className="btn shrink-0 text-xs px-3 py-1">
                      Sửa
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
