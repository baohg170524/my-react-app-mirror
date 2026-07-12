'use client';

import React, { useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEventRoles, useTeams } from '@/features/events/hooks/useEvents';
import { isMentorRole, manageApi, EVENT_ROLE } from '@/features/events/api/manage';
import { usersApi, type UserSummary } from '@/services/api';
import { useNotify } from '@/components/NotificationProvider';
import { getErrorMessage } from '@/lib/apiError';
import { Card } from '../../EventDashboard/Card';
import { CardSkeleton } from '../../EventDashboard/SkeletonLoaders';

interface TeamListTabProps {
  eventId: string;
}

interface TeamMember {
  userId: string;
  name: string;
  email: string;
  /** Vai trò của thành viên trong đội (có thể nhiều) — vd Mentor, Thành viên. */
  roles: string[];
}

/** Map roleName tự do của backend sang nhãn tiếng Việt hiển thị. */
const roleLabelOf = (roleName: string | null): string => {
  switch ((roleName ?? '').toLowerCase()) {
    case 'mentor':           return 'Mentor';
    case 'judge':            return 'Giám khảo';
    case 'participant':      return 'Thành viên';
    case 'admin':            return 'Admin';
    case 'eventcoordinator': return 'Ban tổ chức sự kiện';
    default:                 return roleName || '';
  }
};

export function TeamListTab({ eventId }: TeamListTabProps) {
  const { data: roles = [], isLoading: rolesLoading, error } = useEventRoles(eventId);
  const { data: allTeams = [], isLoading: teamsLoading } = useTeams();
  const isLoading = rolesLoading || teamsLoading;
  const queryClient = useQueryClient();
  const notify = useNotify();
  const [viewTeamId, setViewTeamId] = useState<string | null>(null);

  const teamById = new Map(allTeams.map((t) => [t.id, t]));

  // Members per team, deduped by userId (a user may hold several roles in a team).
  const membersByTeam = new Map<string, Map<string, TeamMember>>();
  for (const role of roles) {
    if (!role.teamId || !role.userId) continue;
    if (!membersByTeam.has(role.teamId)) membersByTeam.set(role.teamId, new Map());
    const byUser = membersByTeam.get(role.teamId)!;
    const label = roleLabelOf(role.roleName);
    const existing = byUser.get(role.userId);
    if (existing) {
      if (label && !existing.roles.includes(label)) existing.roles.push(label);
    } else {
      byUser.set(role.userId, {
        userId: role.userId,
        name: role.user?.fullName ?? '—',
        email: role.user?.email ?? '',
        roles: label ? [label] : [],
      });
    }
  }
  const memberCount = (teamId: string) => membersByTeam.get(teamId)?.size ?? 0;

  const teamIds = [...new Set(roles.map((r) => r.teamId).filter(Boolean))] as string[];
  const teams = teamIds.map((id) => ({
    id,
    name: teamById.get(id)?.name ?? id,
    description: teamById.get(id)?.description ?? '',
    memberCount: memberCount(id),
  }));

  if (error) {
    return (
      <div className="bg-error/10 border border-error rounded-sm p-6 text-center">
        <p className="t-body-md text-error font-bold">Không tải được danh sách đội</p>
      </div>
    );
  }

  if (isLoading) return <CardSkeleton />;

  return (
    <Card title="Danh sách đội">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mute" aria-hidden="true" />
            <input
              type="text"
              placeholder="Tìm đội..."
              className="w-full pl-9 pr-3 py-2 border border-hairline rounded-sm t-body-sm text-ink bg-canvas focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-primary"
            />
          </div>
          <span className="t-body-sm text-mute">{teams?.length ?? 0} đội</span>
        </div>

        {teams && teams.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-hairline-strong text-left">
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Tên đội</th>
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Mô tả</th>
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2 text-center">Thành viên</th>
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => {
                  const expanded = viewTeamId === team.id;
                  const members = [...(membersByTeam.get(team.id)?.values() ?? [])];
                  return (
                    <React.Fragment key={team.id}>
                    <tr className="border-b border-hairline last:border-b-0">
                      <td className="t-body-sm font-bold text-ink py-3 px-2">{team.name}</td>
                      <td className="t-body-sm text-body py-3 px-2">
                        {team.description || <span className="text-mute">—</span>}
                      </td>
                      <td className="t-body-sm text-body py-3 px-2 text-center">{team.memberCount}</td>
                      <td className="py-3 px-2">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setViewTeamId((cur) => (cur === team.id ? null : team.id))
                            }
                            className="t-caption-sm font-bold text-ink disabled:opacity-50"
                            style={{ background: 'none', border: '1px solid var(--color-hairline-strong)', borderRadius: 'var(--radius-sm)', padding: '4px 10px', cursor: 'pointer' }}
                          >
                            {expanded ? 'Ẩn thành viên' : 'Xem thành viên'}
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expanded && (
                      <tr className="bg-surface-soft">
                        <td colSpan={4} className="px-2 py-3 align-top">
                          <TeamMembersPanel teamName={team.name} members={members} />
                        </td>
                      </tr>
                    )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="t-body-sm text-mute text-center py-8">Chưa có đội nào đăng ký</p>
        )}
      </div>
    </Card>
  );
}

// ─── Team members panel ─────────────────────────────────────────────────────────

function TeamMembersPanel({
  teamName,
  members,
}: {
  teamName: string;
  members: TeamMember[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="t-body-strong text-ink m-0">Thành viên đội: {teamName}</p>
      {members.length === 0 ? (
        <p className="t-caption-sm text-mute m-0">Đội chưa có thành viên.</p>
      ) : (
        <ul className="flex flex-col gap-2 m-0 p-0 list-none">
          {members.map((m) => (
            <li
              key={m.userId}
              className="flex items-center justify-between gap-3 bg-canvas border border-hairline rounded-sm px-3 py-2"
            >
              <div className="flex flex-col">
                <span className="t-body-sm text-ink">{m.name}</span>
                {m.email && <span className="t-caption-sm text-mute">{m.email}</span>}
              </div>
              <div className="flex flex-wrap justify-end gap-1">
                {m.roles.map((r) => (
                  <span
                    key={r}
                    className="t-caption-sm text-mute"
                    style={{ border: '1px solid var(--color-hairline-strong)', borderRadius: 'var(--radius-sm)', padding: '2px 8px' }}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

