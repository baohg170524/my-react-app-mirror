'use client';

import React, { useState } from 'react';
import { useMyTeamForEvent, useInviteToTeam, useLeaveTeam } from '@/features/teams/hooks/useTeams';
import { useEventDashboard } from '@/features/events/contexts/EventDashboardContext';

interface Props { eventId: string; userId: string; }

export function MyTeamTab({ eventId, userId }: Props) {
  const { setActiveTab } = useEventDashboard();
  const { data: team, isLoading } = useMyTeamForEvent(eventId, userId);
  const teamId = team?.id ?? '';
  const invite = useInviteToTeam(teamId);
  const leave  = useLeaveTeam(teamId, eventId, userId);
  const [email, setEmail] = useState('');

  if (isLoading) return <div className="p-6 t-body-md text-mute">Đang tải…</div>;
  if (!team) return <div className="p-6 t-body-md text-mute">Bạn chưa có đội.</div>;

  return (
    <section className="p-6 max-w-2xl mx-auto space-y-6">
      <header>
        <h2 className="t-heading-md">{team.teamName}</h2>
        {team.description ? <p className="t-body-sm text-mute mt-1">{team.description}</p> : null}
      </header>

      <div>
        <h3 className="t-body-md font-bold mb-2">Thành viên</h3>
        <ul className="divide-y divide-hairline">
          {team.members.map((m) => (
            <li key={m.userId} className="py-2 flex justify-between">
              <span>{m.fullName} <span className="text-mute t-body-sm">({m.email})</span></span>
              <span className="text-xs font-bold">{m.roleName === 3 ? 'Leader' : 'Member'}</span>
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); invite.mutate({ email }, { onSuccess: () => setEmail('') }); }}
        className="space-y-2"
      >
        <h3 className="t-body-md font-bold">Mời thành viên</h3>
        <div className="flex gap-2">
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com" className="input flex-1"
          />
          <button type="submit" disabled={invite.isPending} className="btn btn-primary">
            {invite.isPending ? 'Đang gửi…' : 'Mời'}
          </button>
        </div>
        {invite.error ? <p className="t-body-sm text-error">Mời thất bại.</p> : null}
      </form>

      <button
        type="button"
        onClick={() => { if (confirm('Bạn chắc chắn rời đội?')) leave.mutate(undefined, { onSuccess: () => setActiveTab('createTeam') }); }}
        disabled={leave.isPending}
        className="btn btn-outline-danger"
      >
        {leave.isPending ? 'Đang rời…' : 'Rời đội'}
      </button>
    </section>
  );
}
