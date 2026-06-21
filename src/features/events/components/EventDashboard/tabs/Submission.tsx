'use client';

import React, { useMemo, useState } from 'react';
import { useEventRounds, useEventTracks } from '@/features/events/hooks/useEvents';
import { useTeamSubmissions, useCreateSubmission } from '@/features/submissions/hooks/useSubmissions';

interface Props { teamId: string; eventId: string; }

export function SubmissionTab({ teamId, eventId }: Props) {
  const { data: rounds = [] } = useEventRounds(eventId);
  const { data: tracks = [] } = useEventTracks(eventId);

  const [roundId, setRoundId] = useState('');
  const [trackId, setTrackId] = useState('');
  const [submissionUrl, setUrl] = useState('');
  const [description, setDesc] = useState('');

  const { data: existing = [] } = useTeamSubmissions(teamId, roundId || undefined);
  const create = useCreateSubmission(teamId);

  const tracksForRound = useMemo(
    () => (tracks as Array<{ id: string; roundId: string; trackName: string | null }>).filter((t) => t.roundId === roundId),
    [tracks, roundId],
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate(
      { teamId, roundId, trackId, submissionUrl, description },
      { onSuccess: () => { setUrl(''); setDesc(''); } },
    );
  };

  return (
    <section className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="t-heading-md">Nộp bài</h2>

      <form onSubmit={submit} className="space-y-3">
        <label className="block">
          <span className="t-body-sm font-bold">Vòng</span>
          <select required value={roundId} onChange={(e) => { setRoundId(e.target.value); setTrackId(''); }} className="input w-full mt-1">
            <option value="">— Chọn vòng —</option>
            {(rounds as Array<{ id: string; roundName: string | null }>).map((r) => (
              <option key={r.id} value={r.id}>{r.roundName ?? 'Vòng ' + r.id.slice(0, 4)}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="t-body-sm font-bold">Track</span>
          <select required value={trackId} onChange={(e) => setTrackId(e.target.value)} className="input w-full mt-1" disabled={!roundId}>
            <option value="">— Chọn track —</option>
            {tracksForRound.map((t) => <option key={t.id} value={t.id}>{t.trackName ?? 'Track ' + t.id.slice(0, 4)}</option>)}
          </select>
        </label>

        <label className="block">
          <span className="t-body-sm font-bold">Link nộp bài</span>
          <input required type="url" value={submissionUrl} onChange={(e) => setUrl(e.target.value)} className="input w-full mt-1" />
        </label>

        <label className="block">
          <span className="t-body-sm font-bold">Mô tả</span>
          <textarea value={description} onChange={(e) => setDesc(e.target.value)} rows={3} className="input w-full mt-1" />
        </label>

        {create.error ? <p className="t-body-sm text-error">Nộp bài thất bại.</p> : null}

        <button type="submit" disabled={create.isPending} className="btn btn-primary">
          {create.isPending ? 'Đang nộp…' : 'Nộp bài'}
        </button>
      </form>

      <div>
        <h3 className="t-body-md font-bold mb-2">Đã nộp</h3>
        {existing.length === 0 ? (
          <p className="t-body-sm text-mute">Chưa có bài nộp nào.</p>
        ) : (
          <ul className="divide-y divide-hairline">
            {existing.map((s) => (
              <li key={s.id} className="py-2">
                <a href={s.submissionUrl} target="_blank" rel="noreferrer" className="t-body-md text-primary underline">
                  {s.submissionUrl}
                </a>
                <p className="t-body-sm text-mute">{s.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
