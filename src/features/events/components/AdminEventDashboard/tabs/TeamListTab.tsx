'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useEventRoles, useTeams } from '@/features/events/hooks/useEvents';
import { Card } from '../../EventDashboard/Card';
import { CardSkeleton } from '../../EventDashboard/SkeletonLoaders';

interface TeamListTabProps {
  eventId: string;
}

interface TeamMember {
  userId: string;
  name: string;
  email: string;
  roleLabel: string;
}

/** Map an EventRole.roleName (name or numeric EventRoleType) to a label. */
const memberRoleLabel = (roleName: string | number | null): string => {
  const s = String(roleName ?? '').trim().toLowerCase();
  if (s === 'teamleader' || s === '3') return 'Trưởng nhóm';
  if (s === 'mentor' || s === '2') return 'Người hướng dẫn';
  if (s === 'judge' || s === '1') return 'Giám khảo';
  if (s === 'eventcoordinator' || s === '0') return 'Ban tổ chức';
  return 'Thành viên';
};

export function TeamListTab({ eventId }: TeamListTabProps) {
  const { data: roles = [], isLoading: rolesLoading, error } = useEventRoles(eventId);
  const { data: allTeams = [], isLoading: teamsLoading } = useTeams();
  const isLoading = rolesLoading || teamsLoading;
  const [viewTeamId, setViewTeamId] = useState<string | null>(null);

  const teamById = new Map(allTeams.map((t) => [t.id, t]));

  // Members per team, deduped by user (a user may hold several roles in a team).
  const membersByTeam = new Map<string, TeamMember[]>();
  const seenByTeam = new Map<string, Set<string>>();
  for (const role of roles) {
    if (!role.teamId || !role.userId) continue;
    if (!seenByTeam.has(role.teamId)) seenByTeam.set(role.teamId, new Set());
    if (seenByTeam.get(role.teamId)!.has(role.userId)) continue;
    seenByTeam.get(role.teamId)!.add(role.userId);
    if (!membersByTeam.has(role.teamId)) membersByTeam.set(role.teamId, []);
    membersByTeam.get(role.teamId)!.push({
      userId: role.userId,
      name: role.user?.fullName ?? '—',
      email: role.user?.email ?? '',
      roleLabel: memberRoleLabel(role.roleName),
    });
  }

  const teamIds = [...new Set(roles.map((r) => r.teamId).filter(Boolean))] as string[];
  const teams = teamIds.map((id) => ({
    id,
    name: teamById.get(id)?.name ?? id,
    description: teamById.get(id)?.description ?? '',
    memberCount: membersByTeam.get(id)?.length ?? 0,
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
          <span className="t-body-sm text-mute">{teams.length} đội</span>
        </div>

        {teams.length > 0 ? (
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
                  const members = membersByTeam.get(team.id) ?? [];
                  return (
                    <React.Fragment key={team.id}>
                      <tr className="border-b border-hairline">
                        <td className="t-body-sm font-bold text-ink py-3 px-2">{team.name}</td>
                        <td className="t-body-sm text-body py-3 px-2">
                          {team.description || <span className="text-mute">—</span>}
                        </td>
                        <td className="t-body-sm text-body py-3 px-2 text-center">{team.memberCount}</td>
                        <td className="py-3 px-2">
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => setViewTeamId((cur) => (cur === team.id ? null : team.id))}
                              className="t-caption-sm font-bold text-primary"
                              aria-expanded={expanded}
                              style={{ background: 'none', border: '1px solid var(--color-hairline-strong)', borderRadius: 'var(--radius-sm)', padding: '4px 10px', cursor: 'pointer' }}
                            >
                              {expanded ? 'Đóng' : 'Xem thành viên'}
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expanded && (
                        <tr className="border-b border-hairline">
                          <td colSpan={4} className="p-0">
                            <div className="bg-surface-soft px-4 py-3 flex flex-col gap-2">
                              {members.length === 0 ? (
                                <p className="t-caption-sm text-mute m-0">Đội chưa có thành viên.</p>
                              ) : (
                                <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                                  {members.map((m) => (
                                    <li
                                      key={m.userId}
                                      className="flex items-center justify-between gap-3 bg-canvas border border-hairline rounded-sm px-3 py-2"
                                    >
                                      <span className="flex flex-col min-w-0">
                                        <span className="t-body-sm text-ink">{m.name}</span>
                                        {m.email && <span className="t-caption-sm text-mute">{m.email}</span>}
                                      </span>
                                      <span className="t-caption-sm font-bold text-mute shrink-0">{m.roleLabel}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
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
