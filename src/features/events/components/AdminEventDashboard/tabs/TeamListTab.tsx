'use client';

import React, { useRef, useState } from 'react';
import { Search } from 'lucide-react';
import type { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEventRoles, useTeams } from '@/features/events/hooks/useEvents';
import { isMentorRole, manageApi, EVENT_ROLE } from '@/features/events/api/manage';
import { usersApi, type UserSummary } from '@/services/api';
import { Card } from '../../EventDashboard/Card';
import { CardSkeleton } from '../../EventDashboard/SkeletonLoaders';

interface TeamListTabProps {
  eventId: string;
}

interface MentorInfo {
  userId: string;
  name: string;
  email: string;
  roleId: string;
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

const errMsg = (e: unknown): string => {
  const res = (e as AxiosError<{ message?: string; statusCode?: number; errors?: Record<string, string[]> }>)?.response;
  const data = res?.data;
  const fieldMsgs = data?.errors ? Object.values(data.errors).flat() : [];
  if (fieldMsgs.length) return fieldMsgs.join(' ');
  if (data?.message && !/Exception|was thrown/i.test(data.message)) return data.message;
  const status = res?.status ?? data?.statusCode;
  return `Thao tác thất bại${status ? ` (lỗi ${status})` : ''}. Vui lòng thử lại.`;
};

export function TeamListTab({ eventId }: TeamListTabProps) {
  const { data: roles = [], isLoading: rolesLoading, error } = useEventRoles(eventId);
  const { data: allTeams = [], isLoading: teamsLoading } = useTeams();
  const isLoading = rolesLoading || teamsLoading;
  const queryClient = useQueryClient();
  const [editTeam, setEditTeam] = useState<{ id: string; name: string } | null>(null);
  const [viewTeamId, setViewTeamId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ['eventRoles', eventId] });
  const onOk = () => {
    setActionError(null);
    setEditTeam(null);
    invalidate();
  };
  const onErr = (e: unknown) => setActionError(errMsg(e));

  // Set/replace a team's mentor: remove the old one first (if any), then assign.
  const setMentorMutation = useMutation({
    mutationFn: async (vars: { teamId: string; userId: string; oldRoleId?: string }) => {
      if (vars.oldRoleId) await manageApi.removeRole(vars.oldRoleId);
      await manageApi.assignRole({
        userId: vars.userId,
        eventId,
        teamId: vars.teamId,
        roleName: EVENT_ROLE.Mentor,
      });
    },
    onSuccess: onOk,
    onError: onErr,
  });
  const removeMentorMutation = useMutation({
    mutationFn: (roleId: string) => manageApi.removeRole(roleId),
    onSuccess: onOk,
    onError: onErr,
  });
  const busy = setMentorMutation.isPending || removeMentorMutation.isPending;

  const teamById = new Map(allTeams.map((t) => [t.id, t]));

  // Mentor (with its eventRole id) per team.
  const mentorByTeam = new Map<string, MentorInfo>();
  for (const role of roles) {
    if (isMentorRole(role) && role.teamId && role.userId) {
      mentorByTeam.set(role.teamId, {
        userId: role.userId,
        name: role.user?.fullName ?? '—',
        email: role.user?.email ?? '',
        roleId: role.id,
      });
    }
  }

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

  const editingMentor = editTeam ? mentorByTeam.get(editTeam.id) : undefined;

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

        {actionError && <p className="t-caption-sm text-error m-0">{actionError}</p>}

        {teams && teams.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-hairline-strong text-left">
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Tên đội</th>
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Mô tả</th>
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Mentor</th>
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2 text-center">Thành viên</th>
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => {
                  const mentor = mentorByTeam.get(team.id);
                  const expanded = viewTeamId === team.id;
                  const members = [...(membersByTeam.get(team.id)?.values() ?? [])];
                  return (
                    <React.Fragment key={team.id}>
                    <tr className="border-b border-hairline last:border-b-0">
                      <td className="t-body-sm font-bold text-ink py-3 px-2">{team.name}</td>
                      <td className="t-body-sm text-body py-3 px-2">
                        {team.description || <span className="text-mute">—</span>}
                      </td>
                      <td className="t-body-sm text-body py-3 px-2">
                        {mentor ? (
                          <>
                            <span className="block">{mentor.name}</span>
                            <span className="t-caption-sm text-mute">{mentor.email}</span>
                          </>
                        ) : (
                          <span className="text-mute">Chưa phân công</span>
                        )}
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
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => {
                              setActionError(null);
                              setEditTeam((cur) =>
                                cur?.id === team.id ? null : { id: team.id, name: team.name },
                              );
                            }}
                            className="t-caption-sm font-bold text-primary disabled:opacity-50"
                            style={{ background: 'none', border: '1px solid var(--color-hairline-strong)', borderRadius: 'var(--radius-sm)', padding: '4px 10px', cursor: busy ? 'not-allowed' : 'pointer' }}
                          >
                            {editTeam?.id === team.id ? 'Đóng' : mentor ? 'Đổi mentor' : 'Thêm mentor'}
                          </button>
                          {mentor && (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => removeMentorMutation.mutate(mentor.roleId)}
                              className="t-caption-sm font-bold text-error disabled:opacity-50"
                              style={{ background: 'none', border: '1px solid var(--color-error)', borderRadius: 'var(--radius-sm)', padding: '4px 10px', cursor: busy ? 'not-allowed' : 'pointer' }}
                            >
                              Xóa mentor
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {expanded && (
                      <tr className="bg-surface-soft">
                        <td colSpan={5} className="px-2 py-3 align-top">
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

        {/* Mentor editor: search a user by email and set as the team's mentor. */}
        {editTeam && (
          <MentorSearchPanel
            teamName={editTeam.name}
            currentMentorId={editingMentor?.userId}
            busy={busy}
            onPick={(user) =>
              setMentorMutation.mutate({
                teamId: editTeam.id,
                userId: user.id,
                oldRoleId: editingMentor?.roleId,
              })
            }
          />
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

// ─── Mentor search panel ────────────────────────────────────────────────────────

function MentorSearchPanel({
  teamName,
  currentMentorId,
  busy,
  onPick,
}: {
  teamName: string;
  currentMentorId?: string;
  busy: boolean;
  onPick: (user: UserSummary) => void;
}) {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchQuery = useQuery({
    queryKey: ['userSearch', debounced],
    enabled: debounced.length >= 2,
    queryFn: () => usersApi.search(debounced),
    staleTime: 30_000,
  });
  const results = (searchQuery.data ?? []).filter((u) => u.id !== currentMentorId);

  const onType = (v: string) => {
    setQuery(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebounced(v.trim()), 250);
  };

  return (
    <div className="border border-hairline-strong rounded-sm p-4 flex flex-col gap-3 bg-surface-soft">
      <p className="t-body-strong text-ink m-0">Mentor cho đội: {teamName}</p>
      <input
        className="text-input"
        value={query}
        placeholder="Nhập email để tìm mentor…"
        onChange={(e) => onType(e.target.value)}
        style={{ width: '100%' }}
      />

      {debounced.length >= 2 && (
        <div className="flex flex-col gap-2">
          {searchQuery.isLoading ? (
            <p className="t-caption-sm text-mute m-0">Đang tìm…</p>
          ) : results.length === 0 ? (
            <p className="t-caption-sm text-mute m-0">Không tìm thấy người dùng.</p>
          ) : (
            results.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between gap-3 bg-canvas border border-hairline rounded-sm px-3 py-2"
              >
                <div className="flex flex-col">
                  <span className="t-body-sm text-ink">{u.email ?? '(không có email)'}</span>
                  {u.fullName && <span className="t-caption-sm text-mute">{u.fullName}</span>}
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onPick(u)}
                  className="t-caption-sm font-bold text-primary disabled:opacity-50"
                  style={{ background: 'none', border: 'none', cursor: busy ? 'not-allowed' : 'pointer' }}
                >
                  Chọn
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
