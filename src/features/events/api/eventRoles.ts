import { apiClient } from "@/services/api";
import type { PagedResult } from "@/services/api";

// ─── Models ───────────────────────────────────────────────────────────────────

/** Bản ghi vai trò của một user trong một event. */
export interface EventRoleModel {
  id: string;          // eventRoleId — dùng cho Scores/save
  userId: string;
  eventId: string;
  trackId: string | null;
  teamId: string | null;
  roleName: "Judge" | "EventCoordinator" | "TeamLeader" | "Member" | string;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export const eventRolesApi = {
  /**
   * GET /api/EventRoles/user-role?UserId=&EventId=
   * Lấy eventRoleId + trackId của judge đang đăng nhập.
   * ⚠ eventRoleId ≠ userId — phải lấy từ endpoint này cho Scores/save.
   */
  getUserRole: async (userId: string, eventId: string): Promise<EventRoleModel | null> => {
    const { data } = await apiClient.get<EventRoleModel | null>("/EventRoles/user-role", {
      params: { UserId: userId, EventId: eventId },
    });
    return data || null;
  },

  /**
   * GET /api/EventRoles/event/role?EventId=&TrackId=&RoleName=
   * Danh sách tất cả judge trong một track.
   */
  listByRole: async (
    eventId: string,
    trackId: string,
    roleName: string,
  ): Promise<EventRoleModel[]> => {
    const { data } = await apiClient.get<PagedResult<EventRoleModel>>(
      "/EventRoles/event/role",
      { params: { EventId: eventId, TrackId: trackId, RoleName: roleName, PageNumber: 1, PageSize: 200 } },
    );
    return data.data ?? [];
  },

  /**
   * GET /api/EventRoles/check?UserId=&EventId=&RoleName=
   * Kiểm tra user có phải judge không (true/false).
   */
  checkRole: async (userId: string, eventId: string, roleName: string): Promise<boolean> => {
    const { data } = await apiClient.get<boolean>("/EventRoles/check", {
      params: { UserId: userId, EventId: eventId, RoleName: roleName },
    });
    return data;
  },
};
