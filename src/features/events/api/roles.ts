import { apiClient } from '@/services/api';

/** Subset of EventRoleModel from GET /api/EventRoles/user-role. roleName may come
 *  back as the enum name ("Judge") or its numeric value (1), so we keep it loose. */
export interface UserEventRole {
  roleName: string | number | null;
}

export const rolesApi = {
  /**
   * GET /api/EventRoles/user-role — the caller's role in a single event.
   * Returns null when the user has no assigned role (the endpoint answers
   * 404 / success:false for that case, which we swallow to null).
   */
  getUserRole: async (userId: string, eventId: string): Promise<UserEventRole | null> => {
    try {
      const { data } = await apiClient.get<UserEventRole | null>('/EventRoles/user-role', {
        params: { UserId: userId, EventId: eventId },
      });
      return data ?? null;
    } catch {
      return null;
    }
  },
};
