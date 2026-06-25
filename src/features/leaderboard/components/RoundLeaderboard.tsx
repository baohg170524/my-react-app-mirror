'use client';

import React, { useMemo, useState } from 'react';
import { useEventRounds } from '@/features/events/hooks/useEvents';
import { useRoundLeaderboard } from '@/features/results/hooks/useResults';

interface Props { eventId: string; }

type Round = { id: string; roundName: string; roundNumber: number };

export function RoundLeaderboard({ eventId }: Props) {
  const { data: rounds = [] } = useEventRounds(eventId);

  // Default to the most recent round (highest roundNumber); the user can still
  // switch rounds with the selector. The same view is shared by every role in
  // the event.
  const latestRoundId = useMemo(() => {
    const sorted = [...(rounds as Round[])].sort((a, b) => b.roundNumber - a.roundNumber);
    return sorted[0]?.id ?? '';
  }, [rounds]);

  const [picked, setPicked] = useState('');
  const roundId = picked || latestRoundId;
  const { data: rows = [], isLoading } = useRoundLeaderboard(roundId || undefined);

  return (
    <div className="space-y-4">
      <label className="block max-w-xs">
        <span className="t-body-sm font-bold">Vòng</span>
        <select value={roundId} onChange={(e) => setPicked(e.target.value)} className="input w-full mt-1">
          {(rounds as Round[]).map((r) => (
            <option key={r.id} value={r.id}>{r.roundName}</option>
          ))}
        </select>
      </label>

      {rounds.length === 0 ? <p className="t-body-sm text-mute">Chưa có vòng thi nào.</p>
      : isLoading ? <p className="t-body-sm text-mute">Đang tải…</p>
      : rows.length === 0 ? <p className="t-body-sm text-mute">Chưa có dữ liệu.</p>
      : (
        <table className="w-full text-sm">
          <thead className="text-left"><tr><th>#</th><th>Đội</th><th>Điểm</th><th></th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-hairline">
                <td>{r.rank}</td>
                <td>{r.teamName ?? r.teamId}</td>
                <td>{r.finalScore.toFixed(2)}</td>
                <td>{r.isAdvanced ? <span className="text-success">Đi tiếp</span> : null}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
