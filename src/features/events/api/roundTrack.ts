import { apiClient } from "@/services/api";

// ─── Round / Track upsert payloads (match backend Create/Update models) ─────────

export interface RoundUpsertPayload {
  eventId: string;
  roundName: string;
  roundNumber: number;
  startDate: string; // ISO 8601
  endDate: string;
  advancementRule: string;
}

export interface TrackUpsertPayload {
  eventId: string;
  roundId: string;
  trackName: string;
  templateId: string | null;
  description: string;
  /**
   * Serialized submission requirements. Persisted by PUT /Tracks/{id}
   * (UpdateTrackRequestModel). POST /Tracks (CreateTrackRequestModel) does not
   * yet accept it, so it's ignored when creating a new track until the backend
   * adds the field there too.
   */
  submissionRuleDescription: string;
}

/** Full track model returned by GET /Tracks/{id}. */
export interface TrackModel {
  id: string;
  trackName: string;
  eventId: string;
  roundId: string | null;
  templateId: string | null;
  description: string | null;
  isActive: boolean;
}

export const roundsApi = {
  create: async (payload: RoundUpsertPayload): Promise<{ id: string }> => {
    const { data } = await apiClient.post<{ id: string }>("/Rounds", payload);
    return data;
  },
  update: (id: string, payload: RoundUpsertPayload): Promise<void> =>
    apiClient.put(`/Rounds/${encodeURIComponent(id)}`, payload).then(() => undefined),
  remove: (id: string): Promise<void> =>
    apiClient.delete(`/Rounds/${encodeURIComponent(id)}`).then(() => undefined),
};

export const tracksApi = {
  create: async (payload: TrackUpsertPayload): Promise<{ id: string }> => {
    const { data } = await apiClient.post<{ id: string }>("/Tracks", payload);
    return data;
  },
  update: (id: string, payload: TrackUpsertPayload): Promise<void> =>
    apiClient.put(`/Tracks/${encodeURIComponent(id)}`, payload).then(() => undefined),
  remove: (id: string): Promise<void> =>
    apiClient.delete(`/Tracks/${encodeURIComponent(id)}`).then(() => undefined),

  /** GET /api/Tracks/{id} — track detail including templateId. */
  getById: async (id: string): Promise<TrackModel> => {
    const { data } = await apiClient.get<TrackModel>(`/Tracks/${encodeURIComponent(id)}`);
    return data;
  },

  /** PATCH /api/Tracks/{id}/assign-template — gán template vào track. */
  assignTemplate: (trackId: string, templateId: string): Promise<void> =>
    apiClient
      .patch(`/Tracks/${encodeURIComponent(trackId)}/assign-template`, { templateId })
      .then(() => undefined),
};
