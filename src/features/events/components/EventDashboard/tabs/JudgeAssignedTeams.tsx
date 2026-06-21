'use client';

import React from 'react';
import { useJudgeAssignedTeams } from '@/features/teams/hooks/useTeams';

interface Props { eventId: string; userId: string; }

export function JudgeAssignedTeamsTab({ eventId, userId }: Props) {
  const { data: teams = [], isLoading } = useJudgeAssignedTeams(eventId, userId);

  if (isLoading) return <div className="p-6 t-body-md text-mute">Đang tải…</div>;
  if (teams.length === 0) return <div className="p-6 t-body-md text-mute">Bạn chưa được phân công đội nào.</div>;

  return (
    <section className="p-6 max-w-3xl mx-auto space-y-4">
      <h2 className="t-heading-md">Đội được phân công</h2>
      <ul className="divide-y divide-hairline">
        {teams.map((t) => (
          <li key={t.id} className="py-3">
            <p className="t-body-md font-bold">{t.teamName}</p>
            <p className="t-body-sm text-mute">{t.members.length} thành viên</p>
          </li>
        ))}
      </ul>
      <p className="t-body-sm text-mute">Vào trang chấm điểm hiện có để nhập điểm cho từng đội.</p>
    </section>
  );
}
