import { apiClient } from '@/services/api';
import type { PagedResult } from '@/services/api';
import type { CreateTeamPayload, TeamMember, TeamModel } from '../types/team.types';

/** Backend EventRoleModel (subset). `roleName` is a string (e.g. "Participant",
 *  "Judge", "Mentor"); `user` carries the display info. */
interface EventRoleRow {
  id: string;
  userId: string | null;
  eventId: string | null;
  teamId: string | null;
  roleName: string | null;
  user?: { id: string | null; fullName: string | null; email: string | null } | null;
}

/** Backend TeamDetailResponseModel / CreateTeamResponseModel (subset). */
interface TeamDetail {
  id: string;
  name: string | null;
  description: string | null;
  members?: any[];
}

/** Backend TeamInvitationListItemModel — 1 lời mời của đội (phía người gửi). */
export interface TeamInvitationListItem {
  invitationId: string;
  teamId: string;
  invitedUserId: string;
  invitedUserFullName: string;
  invitedUserEmail: string;
  invitedUserStudentCode: string | null;
  invitedByUserId: string;
  /** PendingAccept | Accepted | Declined | Expired */
  status: string;
  /** Nhãn tiếng Việt do BE trả kèm (vd "Đang chờ xác nhận"). Bind thẳng, đừng tự map từ status. */
  statusLabel?: string;
  expiresAt: string;
  respondedAt: string | null;
  notes: string | null;
  createdTime: string;
}

const norm = (s: string | null | undefined) => (s ?? '').trim().toLowerCase();
const isJudge = (r: EventRoleRow) => norm(r.roleName) === 'judge';
const isStaff = (r: EventRoleRow) =>
  ['judge', 'mentor', 'admin', 'eventcoordinator'].includes(norm(r.roleName));
/** A competitor (team member or leader) is a non-staff role bound to a team. */
const isTeamMember = (r: EventRoleRow) => !!r.teamId && !isStaff(r);

async function listEventRoles(eventId: string): Promise<EventRoleRow[]> {
  const { data } = await apiClient.get<PagedResult<EventRoleRow>>('/EventRoles/event', {
    params: { EventId: eventId, PageNumber: 1, PageSize: 200 },
  });
  return data.data ?? [];
}

function toMember(r: EventRoleRow): TeamMember {
  return {
    userId: r.user?.id ?? r.userId ?? '',
    fullName: r.user?.fullName ?? '—',
    email: r.user?.email ?? '',
    isLeader: norm(r.roleName).includes('leader'),
  };
}

/** Build the UI TeamModel from the team detail + the event's role rows. */
async function buildTeam(teamId: string, roles: EventRoleRow[]): Promise<TeamModel> {
  const { data } = await apiClient.get<TeamDetail>(`/Teams/${encodeURIComponent(teamId)}`);
  const members = roles.filter((r) => r.teamId === teamId && isTeamMember(r)).map(toMember);
  return {
    id: data.id,
    teamName: data.name?.trim() || '(Chưa đặt tên)',
    description: data.description,
    members,
  };
}

export const teamsApi = {
  /** POST /api/Teams — create a team; the creator is the leader. */
  create: async (p: CreateTeamPayload): Promise<TeamDetail> => {
    const { data } = await apiClient.post<TeamDetail>('/Teams', p);
    return data;
  },

  getById: async (id: string): Promise<TeamModel> => {
    const { data } = await apiClient.get<TeamDetail>(`/Teams/${encodeURIComponent(id)}`);

    //a
    // Map members if backend returns them
    const mappedMembers: TeamMember[] = (data.members || []).map((m: any) => ({
      userId: m.userId || m.id || '',
      fullName: m.fullName || m.name || '—',
      email: m.email || '',
      isLeader: m.isLeader || (m.roleName && norm(m.roleName).includes('leader')) || false,
    }));

    return {
      id: data.id,
      teamName: data.name?.trim() || '(Chưa đặt tên)',
      description: data.description,
      members: mappedMembers,
    };
  },

  addMember: async (teamId: string, userId: string): Promise<void> => {
    await apiClient.post(`/Teams/${encodeURIComponent(teamId)}/members`, { userId });
  },

  removeMember: async (teamId: string, userId: string): Promise<void> => {
    await apiClient.delete(`/Teams/${encodeURIComponent(teamId)}/members/${encodeURIComponent(userId)}`);
  },

  leave: async (teamId: string): Promise<void> => {
    await apiClient.post(`/Teams/${encodeURIComponent(teamId)}/leave`);
  },

  invite: async (teamId: string, email: string): Promise<any> => {
    const { data } = await apiClient.post(`/Teams/${encodeURIComponent(teamId)}/invitations`, { email });
    return data;
  },

  /** GET /api/Teams/{teamId}/invitations — lời mời đã gửi của đội (chỉ leader/coordinator).
   *  BE trả BaseResponse<List> (mảng phẳng); interceptor đã bóc .data nên `data` chính là mảng. */
  getTeamInvitations: async (teamId: string): Promise<TeamInvitationListItem[]> => {
    const { data } = await apiClient.get<TeamInvitationListItem[]>(
      `/Teams/${encodeURIComponent(teamId)}/invitations`,
    );
    return data ?? [];
  },

  respondInvitation: async (invitationId: string, accept: boolean): Promise<void> => {
    await apiClient.post(`/Teams/invitations/${encodeURIComponent(invitationId)}/respond?isAccepted=${accept}`);
  },

  /** POST /api/Teams/{teamId}/transfer-leader — chuyển quyền trưởng nhóm cho 1 thành viên khác. */
  transferLeader: async (teamId: string, newLeaderUserId: string): Promise<void> => {
    await apiClient.post(`/Teams/${encodeURIComponent(teamId)}/transfer-leader`, { newLeaderUserId });
  },

  /**
   * The team this user competes in for a given event, or null. Detected via the
   * event's roles (a non-staff role row carrying this user's id + a teamId).
   */
  findUserTeamForEvent: async (userId: string, eventId: string): Promise<TeamModel | null> => {
    const roles = await listEventRoles(eventId);
    const mine = roles.find((r) => r.userId === userId && isTeamMember(r));
    if (!mine?.teamId) return null;
    return buildTeam(mine.teamId, roles);
  },

  /** The teams a judge is assigned to in an event. */
  findJudgeAssignedTeams: async (userId: string, eventId: string): Promise<TeamModel[]> => {
    const roles = await listEventRoles(eventId);
    const teamIds = [
      ...new Set(
        roles
          .filter((r) => r.userId === userId && isJudge(r) && r.teamId)
          .map((r) => r.teamId as string),
      ),
    ];
    return Promise.all(teamIds.map((id) => buildTeam(id, roles)));
  },

  /** Get pending invitation for the current user to a specific team (if any). */
  getMyInvitation: async (teamId: string): Promise<{
    invitationId: string;
    status: string;
    notes?: string;
    inviterName?: string;
    roleName?: string;
    expiresAt?: string;
  } | null> => {
    try {
      const { data } = await apiClient.get(`/Teams/${encodeURIComponent(teamId)}/my-invitation`);
      return data;
    } catch (e: any) {
      if (e?.response?.status === 404) return null;
      throw e;
    }
  },
};
