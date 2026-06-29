export type EventStatus = "open" | "closed";

export interface Event {
  id: string;
  title: string;
  startDate: string; // ISO 8601
  endDate: string;
  status: EventStatus;
  description: string;
  photoEventUrl?: string | null;
}
