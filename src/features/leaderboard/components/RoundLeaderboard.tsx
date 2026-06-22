'use client';

import React, { useState } from 'react';
import { useEventRounds, useTeams } from '@/features/events/hooks/useEvents';
import { useRoundLeaderboard } from '@/features/results/hooks/useResults';

interface Props { eventId: string; }

const roundLabel = (r: { id: string; roundName: string | null }) =>
  r.roundName?.trim() || `Vòng ${r.id.slice(0, 4)}`;

export function RoundLeaderboard({ eventId }: Props) {
  const { data: rounds = [] } = useEventRounds(eventId);
  const { data: teams = [] } = useTeams();
  const [picked, setPicked] = useState('');

  // Default to the first round so a leaderboard shows immediately, until the
  // user picks another. Derived rather than synced via an effect.
  const roundId = picked || rounds[0]?.id || '';

  const { data: rows = [], isLoading } = useRoundLeaderboard(roundId || undefined);

  // The round leaderboard rarely carries teamName, so resolve it from the teams
  // list and fall back to whatever the row provides.
  const teamName = (row: { teamId: string; teamName?: string }) =>
    row.teamName ?? teams.find((t) => t.id === row.teamId)?.name ?? row.teamId;

  return (
    <div className="space-y-4">
      <select
        value={roundId}
        onChange={(e) => setPicked(e.target.value)}
        className="input font-bold"
        style={{ width: '100%', maxWidth: '20rem' }}
        aria-label="Chọn vòng để xem bảng xếp hạng"
      >
        {rounds.length === 0 && <option value="">— Chưa có vòng —</option>}
        {(rounds as Array<{ id: string; roundName: string | null }>).map((r) => (
          <option key={r.id} value={r.id}>{roundLabel(r)}</option>
        ))}
      </select>

      {!roundId ? <p className="t-body-sm text-mute">Chưa có vòng nào để xem bảng xếp hạng.</p>
      : isLoading ? <p className="t-body-sm text-mute">Đang tải…</p>
      : rows.length === 0 ? <p className="t-body-sm text-mute">Chưa có dữ liệu.</p>
      : (
        <table className="w-full text-sm">
          <thead className="text-left"><tr><th>#</th><th>Đội</th><th>Điểm</th><th></th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-hairline">
                <td>{r.rank}</td>
                <td>{teamName(r)}</td>
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
