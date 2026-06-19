import { apiClient } from "@/services/api";
import type { Event } from "../types/event.types";

// ─── Create-event payload (matches backend CreateEventRequestModel) ────────────

/** Track inside a round — matches TrackRequestDto. */
export interface CreateTrackPayload {
  trackName: string;
  description: string;
  templateId: string;
  submissionRuleDescription: string;
  judgeUserIds: string[];
  mentorUserIds: string[];
}

/** Round inside an event — matches RoundRequestDto. */
export interface CreateRoundPayload {
  roundName: string;
  roundNumber: number;
  startDate: string; // ISO 8601
  endDate: string;
  advancementRule: string;
  tracks: CreateTrackPayload[];
}

/** Full create-event body — matches CreateEventRequestModel. */
export interface CreateEventPayload {
  eventName: string;
  season: string;
  year: number;
  startDate: string; // ISO 8601
  endDate: string;
  description: string;
  rounds: CreateRoundPayload[];
}

/** Subset of CreateEventResponseModel we care about. */
export interface CreateEventResponse {
  id: string;
  eventName: string;
  season: string;
  year: number;
  startDate: string;
  endDate: string;
  description: string;
  createdTime: string;
}

export const eventsApi = {
  getAll: (): Promise<Event[]> =>
    apiClient.get<Event[]>("/events").then((r) => r.data),

  getMine: (): Promise<Event[]> =>
    apiClient.get<Event[]>("/events?filter=mine").then((r) => r.data),

  join: (id: string): Promise<void> =>
    apiClient.post(`/events/${id}/join`).then(() => undefined),

  /** POST /api/Events — requires an authenticated (admin) Bearer token. */
  create: (payload: CreateEventPayload): Promise<CreateEventResponse> =>
    apiClient.post<CreateEventResponse>("/Events", payload).then((r) => r.data),
};
