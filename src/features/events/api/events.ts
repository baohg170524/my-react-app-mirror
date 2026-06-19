import { apiClient } from "@/services/api";
import type { Event } from "../types/event.types";

export const eventsApi = {
  getAll: (): Promise<Event[]> =>
    apiClient.get<Event[]>("/events").then((r) => r.data),

  getMine: (): Promise<Event[]> =>
    apiClient.get<Event[]>("/events?filter=mine").then((r) => r.data),

  join: (id: string): Promise<void> =>
    apiClient.post(`/events/${id}/join`).then(() => undefined),
};
