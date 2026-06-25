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
};
