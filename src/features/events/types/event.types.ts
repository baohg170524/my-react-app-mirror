/**
 * UI-facing event status (derived from the backend boolean `status` + `endDate`):
 * - `open`   — status=true and not past endDate; visible to everyone, joinable.
 * - `hidden` — status=false and not past endDate; only admins may see it.
 * - `ended`  — past endDate (regardless of status); visible to everyone, not joinable.
 */
export type EventStatus = "open" | "hidden" | "ended";

export interface Event {
  id: string;
  title: string;
  startDate: string; // ISO 8601
  endDate: string;
  status: EventStatus;
  description: string;
}
