import { apiClient } from "@/services/api";
import type { PagedResult } from "@/services/api";

// ─── Backend models (subset) for the admin manage page ─────────────────────────

export interface EventRoleUser {
  id: string | null;
  email: string | null;
  fullName: string | null;
  isApproved?: boolean;
  isFpt?: boolean;
  schoolId?: string | null;
  studentCode?: string | null;
  photoStudentCardUrl?: string | null;
}

/** Matches backend EventRoleModel (a user's role within an event). */
export interface EventRole {
  id: string;
  userId: string | null;
  eventId: string | null;
  trackId: string | null;
  teamId: string | null;
  roleName: string | null;
  user?: EventRoleUser | null;
}

/** Matches backend TeamListItemModel. */
export interface TeamItem {
  id: string;
  name: string | null;
  description: string | null;
  isActive: boolean;
  createdTime: string;
}

/** Matches backend RoundModel. */
export interface EventRound {
  id: string;
  eventId: string | null;
  roundName: string | null;
  roundNumber: number;
  startDate: string;
  endDate: string;
  advancementRule: string | null;
  /** Cửa sổ chấm điểm của vòng (BE: EventRoundModel/RoundModel). */
  scoringStartDate?: string | null;
  scoringEndDate?: string | null;
}

/** Matches backend TrackModel (a track belongs to a round). */
export interface TrackItem {
  id: string;
  roundId: string | null;
  trackName: string | null;
  templateId: string | null;
  description: string | null;
  /** Cấu hình các loại link phải nộp (mỗi dòng 1 yêu cầu) — FE dùng để sinh form nộp bài động. */
  submissionRuleDescription?: string | null;
  judges: EventRoleUser[] | null;
  mentors: EventRoleUser[] | null;
  // ── Hai khoảng thời gian thực của hạng mục (chỉ có trong model lồng của
  //    GET /Events/{id} → EventTrackModel; danh sách phẳng /Tracks/event không trả). ──
  /** Nộp bài: mở → hạn nộp. */
  startDate?: string | null;
  endDate?: string | null;
  /** Chấm điểm: mở → đóng cửa sổ chấm. */
  scoringStartDate?: string | null;
  scoringEndDate?: string | null;
}

/** Matches backend FinalResultModel. */
export interface FinalResult {
  id: string;
  teamId: string | null;
  roundId: string | null;
  finalScore: number;
  rank: number;
  isAdvanced: boolean;
}

/** Matches backend CalculateRoundResultItemModel (trả về khi tính kết quả cả vòng). */
export interface CalculateResultItem {
  finalResultId: string | null;
  teamId: string | null;
  finalScore: number;
  rank: number;
  isAdvanced: boolean;
}

// ─── Role classifiers (roleName is a free string in the response) ──────────────

export const isEventCoordinatorRole = (r: EventRole) =>
  (r.roleName ?? "").toLowerCase() === "eventcoordinator";
export const isJudgeRole = (r: EventRole) =>
  (r.roleName ?? "").toLowerCase() === "judge";
export const isMentorRole = (r: EventRole) =>
  (r.roleName ?? "").toLowerCase() === "mentor";

// ─── API ───────────────────────────────────────────────────────────────────────
// All require an authenticated (admin) Bearer token — attached by apiClient.

export const manageApi = {
  /** GET /api/EventRoles/event — every role (judge/mentor/competitor) in an event. */
  listEventRoles: async (eventId: string, roleName?: number): Promise<EventRole[]> => {
    const params: Record<string, any> = { EventId: eventId, PageNumber: 1, PageSize: 200 };
    if (roleName !== undefined && roleName !== null) params.RoleName = roleName;
    const { data } = await apiClient.get<PagedResult<EventRole>>(
      "/EventRoles/event",
      { params },
    );
    return data.data ?? [];
  },

  /** GET /api/EventRoles/user — every role the user holds across all events.
   *  Mirrors the `/EventRoles/event` query-param convention used above. */
  listUserEventRoles: async (userId: string): Promise<EventRole[]> => {
    const { data } = await apiClient.get<PagedResult<EventRole>>(
      "/EventRoles/user",
      { params: { UserId: userId, PageNumber: 1, PageSize: 200 } },
    );
    return data.data ?? [];
  },

  /** GET /api/Teams — filtered by eventId if provided. */
  listTeams: async (eventId?: string): Promise<TeamItem[]> => {
    const params: Record<string, any> = { PageNumber: 1, PageSize: 200 };
    if (eventId) params.EventId = eventId;
    
    const { data } = await apiClient.get<PagedResult<TeamItem>>("/Teams", {
      params,
    });
    return data.data ?? [];
  },

  /** GET /api/Rounds/event — rounds of an event (public). */
  listEventRounds: async (eventId: string): Promise<EventRound[]> => {
    const { data } = await apiClient.get<PagedResult<EventRound>>(
      "/Rounds/event",
      { params: { EventId: eventId, PageNumber: 1, PageSize: 100 } },
    );
    return data.data ?? [];
  },

  /** GET /api/Tracks/event — all tracks of an event (public), grouped by roundId. */
  listEventTracks: async (eventId: string): Promise<TrackItem[]> => {
    const { data } = await apiClient.get<PagedResult<TrackItem>>(
      "/Tracks/event",
      { params: { EventId: eventId, PageNumber: 1, PageSize: 200 } },
    );
    return data.data ?? [];
  },

  /** GET /api/FinalResults/round/{roundId} — final results (leaderboard) of a round. */
  listRoundFinalResults: async (roundId: string): Promise<FinalResult[]> => {
    const { data } = await apiClient.get<PagedResult<FinalResult>>(
      `/FinalResults/round/${encodeURIComponent(roundId)}`,
      { params: { RoundId: roundId, PageNumber: 1, PageSize: 200 } },
    );
    return data.data ?? [];
  },

  /**
   * FE-01 — POST /api/FinalResults/calculate/{roundId}: tính kết quả chung cuộc cả
   * vòng (FinalScore = TB điểm giám khảo, xếp Rank, đánh dấu IsAdvanced cho top N).
   * `topN` tùy chọn: bỏ trống để Backend tự quyết số đội thăng vòng. Chỉ EC/Admin.
   * Response BaseResponse<List> đã được interceptor bóc `.data` → trả thẳng mảng.
   */
  calculateRoundResults: async (
    roundId: string,
    topN?: number,
  ): Promise<CalculateResultItem[]> => {
    const { data } = await apiClient.post<CalculateResultItem[]>(
      `/FinalResults/calculate/${encodeURIComponent(roundId)}`,
      undefined,
      { params: topN != null ? { topN } : undefined },
    );
    return data ?? [];
  },

  /**
   * FE-02 — DELETE /api/FinalResults/round/{roundId}: HỦY CÔNG BỐ, xóa trọn bộ
   * FinalResult của vòng để mở lại khóa chấm/sửa điểm. Chỉ hủy được khi vòng sau
   * chưa có bài nộp/kết quả (Backend kiểm tra). Chỉ EC/Admin.
   */
  cancelRoundResults: async (roundId: string): Promise<void> => {
    await apiClient.delete(`/FinalResults/round/${encodeURIComponent(roundId)}`);
  },

  /**
   * POST /api/EventRoles/assign — assign a role (e.g. a judge to a team).
   * roleName is the EventRoleType enum value (e.g. Judge = 2).
   */
  assignRole: (payload: AssignRolePayload): Promise<void> =>
    apiClient.post("/EventRoles/assign", payload).then(() => undefined),

  /** DELETE /api/EventRoles/{id} — remove a role assignment. */
  removeRole: (id: string): Promise<void> =>
    apiClient.delete(`/EventRoles/${encodeURIComponent(id)}`).then(() => undefined),

  /** POST /api/EventCoordinators/invite — invite an event coordinator. */
  inviteEventCoordinator: (payload: InviteEventCoordinatorPayload): Promise<void> =>
    apiClient.post("/EventCoordinators/invite", payload).then(() => undefined),

  /** POST /api/Judges/invite — invite a judge into a track. */
  inviteJudge: (payload: InviteJudgePayload): Promise<void> =>
    apiClient.post("/Judges/invite", payload).then(() => undefined),

  /** POST /api/Mentors/invite — invite a mentor into a track. */
  inviteMentor: (payload: InviteMentorPayload): Promise<void> =>
    apiClient.post("/Mentors/invite", payload).then(() => undefined),
};

/** EventRoleType enum values (0–4). */
export const EVENT_ROLE = {
  EventCoordinator: 0,
  Judge: 1,
  Mentor: 2,
  TeamLeader: 3,
  TeamMember: 4,
} as const;

export interface AssignRolePayload {
  userId: string;
  eventId: string;
  /** Omit/null to assign at event level (e.g. a judge not yet tied to a team). */
  teamId?: string | null;
  /** EventRoleType enum value (e.g. EVENT_ROLE.Judge = 2). */
  roleName: number;
  trackId?: string | null;
}

export interface InviteJudgePayload {
  eventId: string;
  trackId: string;
  judgeEmail: string;
  judgeFullName: string;
  notes: string;
}

export interface InviteMentorPayload {
  eventId: string;
  trackId: string;
  mentorEmail: string;
  mentorFullName: string;
  notes: string;
}

export interface InviteEventCoordinatorPayload {
  eventId: string;
  coordinatorEmail: string;
  coordinatorFullName: string;
  notes: string;
}
