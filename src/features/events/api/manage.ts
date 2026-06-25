import { apiClient } from "@/services/api";
import type { PagedResult } from "@/services/api";

// ─── Backend models (subset) for the admin manage page ─────────────────────────

export interface EventRoleUser {
  id: string | null;
  email: string | null;
  fullName: string | null;
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
}

/** Matches backend TrackModel (a track belongs to a round). */
export interface TrackItem {
  id: string;
  roundId: string | null;
  trackName: string | null;
  templateId: string | null;
  description: string | null;
  judges: EventRoleUser[] | null;
  mentors: EventRoleUser[] | null;
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

// ─── Role classifiers (roleName is a free string in the response) ──────────────

export const isJudgeRole = (r: EventRole) =>
  (r.roleName ?? "").toLowerCase() === "judge";
export const isMentorRole = (r: EventRole) =>
  (r.roleName ?? "").toLowerCase() === "mentor";

// ─── API ───────────────────────────────────────────────────────────────────────
// All require an authenticated (admin) Bearer token — attached by apiClient.

export const manageApi = {
  /** GET /api/EventRoles/event — every role (judge/mentor/competitor) in an event. */
  listEventRoles: async (eventId: string): Promise<EventRole[]> => {
    const { data } = await apiClient.get<PagedResult<EventRole>>(
      "/EventRoles/event",
      { params: { EventId: eventId, PageNumber: 1, PageSize: 200 } },
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

  /** GET /api/Teams — all teams (no event filter server-side; scoped via roles). */
  listTeams: async (): Promise<TeamItem[]> => {
    const { data } = await apiClient.get<PagedResult<TeamItem>>("/Teams", {
      params: { PageNumber: 1, PageSize: 200 },
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
   * POST /api/EventRoles/assign — assign a role (e.g. a judge to a team).
   * roleName is the EventRoleType enum value (e.g. Judge = 2).
   */
  assignRole: (payload: AssignRolePayload): Promise<void> =>
    apiClient.post("/EventRoles/assign", payload).then(() => undefined),

  /** DELETE /api/EventRoles/{id} — remove a role assignment. */
  removeRole: (id: string): Promise<void> =>
    apiClient.delete(`/EventRoles/${encodeURIComponent(id)}`).then(() => undefined),
};

/** EventRoleType enum values (0–4). */
export const EVENT_ROLE = {
  Admin: 0,
  EventCoordinator: 1,
  Judge: 2,
  Mentor: 3,
  Participant: 4,
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
