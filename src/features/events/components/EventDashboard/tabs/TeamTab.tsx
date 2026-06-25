'use client';

import React, { useState } from 'react';
import { useMyTeam, useInviteToTeam, useLeaveTeam } from '@/features/teams/hooks/useTeams';
import { isTeamRegistered, isTeamLeaderRole, type MyTeam } from '@/features/teams/types/team.types';
import { CreateTeamTab } from './CreateTeam';

interface Props { eventId: string; userId: string; readOnly?: boolean; }

/**
 * Single "Đăng ký / Đội của tôi" tab that morphs by team state:
 *  - no team  → registration form (or a closed notice when the event ended)
 *  - has team → team info; editable (invite / leave) until the team is
 *    Registered or the event has ended, after which it is read-only.
 */
export function TeamTab({ eventId, userId, readOnly = false }: Props) {
  const { data: team, isLoading } = useMyTeam(eventId);

  if (isLoading) return <div className="p-6 t-body-md text-mute">Đang tải…</div>;

  if (!team) {
    if (readOnly) {
      return (
        <div className="p-6 t-body-md text-mute">
          Sự kiện đã kết thúc — không thể đăng ký đội.
        </div>
      );
    }
    return <CreateTeamTab eventId={eventId} userId={userId} />;
  }

  const locked = readOnly || isTeamRegistered(team);
  return <TeamView team={team} eventId={eventId} userId={userId} locked={locked} />;
}

function TeamView({
  team, eventId, userId, locked,
}: { team: MyTeam; eventId: string; userId: string; locked: boolean }) {
  const invite = useInviteToTeam(team.id);
  const leave = useLeaveTeam(team.id, eventId, userId);
  const [email, setEmail] = useState('');
  const members = team.members ?? [];

  return (
    <section className="w-full p-6 max-w-2xl mx-auto space-y-6">
      <header className="space-y-1">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="t-heading-md m-0">{team.name}</h2>
          {isTeamRegistered(team) && (
            <span className="inline-block px-2 py-1 rounded-sm bg-primary text-on-primary t-caption-xs font-bold uppercase">
              Đã đăng ký
            </span>
          )}
        </div>
        {team.description ? <p className="t-body-sm text-mute">{team.description}</p> : null}
      </header>

      <div>
        <h3 className="t-body-md font-bold mb-2">Thành viên ({members.length})</h3>
        <ul className="divide-y divide-hairline">
          {members.map((m) => (
            <li key={m.userId} className="py-2 flex items-center justify-between gap-3">
              <span className="min-w-0">
                <span className="t-body-sm text-ink">{m.fullName}</span>{' '}
                <span className="text-mute t-body-sm">({m.email})</span>
              </span>
              <span className="flex items-center gap-2 shrink-0">
                {!m.isApproved && (
                  <span className="t-caption-xs text-warning font-bold">Chờ duyệt</span>
                )}
                <span className="t-caption-sm font-bold">{isTeamLeaderRole(m.roleName) ? 'Trưởng nhóm' : 'Thành viên'}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {locked ? (
        <p className="t-body-sm text-mute">
          {isTeamRegistered(team)
            ? 'Đội đã chốt đăng ký — không thể thay đổi thành viên.'
            : 'Sự kiện đã kết thúc — chỉ xem.'}
        </p>
      ) : (
        <>
          <form
            onSubmit={(e) => { e.preventDefault(); invite.mutate({ email }, { onSuccess: () => setEmail('') }); }}
            className="border border-hairline rounded-sm p-4 space-y-2"
          >
            <h3 className="t-body-md font-bold">Mời thành viên</h3>
            <div className="flex gap-2">
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com" className="text-input flex-1"
              />
              <button type="submit" disabled={invite.isPending} className="btn btn-primary">
                {invite.isPending ? 'Đang gửi…' : 'Mời'}
              </button>
            </div>
            {invite.error ? <p className="t-body-sm text-error">Mời thất bại.</p> : null}
          </form>

          <button
            type="button"
            onClick={() => { if (confirm('Bạn chắc chắn rời đội?')) leave.mutate(); }}
            disabled={leave.isPending}
            className="btn btn-outline-danger"
          >
            {leave.isPending ? 'Đang rời…' : 'Rời đội'}
          </button>
        </>
      )}
    </section>
  );
}
