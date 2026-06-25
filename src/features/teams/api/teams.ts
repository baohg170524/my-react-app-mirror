import { apiClient } from '@/services/api';
import type { PagedResult } from '@/services/api';
import type { CreateTeamPayload, TeamModel, MyTeam } from '../types/team.types';

interface EventRoleRow {
  id: string;
  userId: string;
  eventId: string;
  teamId: string | null;
  roleName: number;
}

export const teamsApi = {
  create: async (p: CreateTeamPayload): Promise<TeamModel> => {
    const { data } = await apiClient.post<TeamModel>('/Teams', p);
    return data;
  },

  getById: async (id: string): Promise<TeamModel> => {
    const { data } = await apiClient.get<TeamModel>(`/Teams/${encodeURIComponent(id)}`);
    return data;
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

  invite: async (teamId: string, email: string): Promise<void> => {
    await apiClient.post(`/Teams/${encodeURIComponent(teamId)}/invitations`, { email });
  },

  respondInvitation: async (invitationId: string, accept: boolean): Promise<void> => {
    await apiClient.post(
      `/Teams/invitations/${encodeURIComponent(invitationId)}/respond`,
      null,
      { params: { isAccepted: accept } },
    );
  },

  /**
   * GET /api/Teams/my-team — the caller's team in an event, including the
   * registration `status` and per-member `isApproved`. Returns null when the
   * user has no team yet (the API answers 404 / success:false for that case).
   */
  getMyTeam: async (eventId: string): Promise<MyTeam | null> => {
    try {
      const { data } = await apiClient.get<MyTeam>('/Teams/my-team', {
        params: { eventId },
      });
      return data ?? null;
    } catch {
      return null;
    }
  },

  /**
   * Find the team this user belongs to for a given event, via EventRoles.
   * Returns null if the user has no TeamLeader/TeamMember role in that event.
   */
  findUserTeamForEvent: async (userId: string, eventId: string): Promise<TeamModel | null> => {
    const { data } = await apiClient.get<PagedResult<EventRoleRow>>(
      `/EventRoles/user`,
      { params: { UserId: userId, PageNumber: 1, PageSize: 100 } },
    );
    const row = (data.data ?? []).find(
      (r) => r.eventId === eventId && (r.roleName === 3 || r.roleName === 4) && r.teamId,
    );
    if (!row?.teamId) return null;
    return teamsApi.getById(row.teamId);
  },

  /**
   * Find the teams a judge is assigned to in an event.
   * `EventRoles/user/{userId}` filtered by eventId + roleName==1.
   */
  findJudgeAssignedTeams: async (userId: string, eventId: string): Promise<TeamModel[]> => {
    const { data } = await apiClient.get<PagedResult<EventRoleRow>>(
      `/EventRoles/user`,
      { params: { UserId: userId, PageNumber: 1, PageSize: 100 } },
    );
    const rows = (data.data ?? []).filter(
      (r) => r.eventId === eventId && r.roleName === 1 && r.teamId,
    );
    return Promise.all(rows.map((r) => teamsApi.getById(r.teamId as string)));
  },
};
