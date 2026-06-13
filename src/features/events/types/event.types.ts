export type EventStatus = "open" | "closed";
export type SubmissionType = "ZIP" | "URL" | "Both";

export interface Event {
  id: string;
  title: string;
  startDate: string; // ISO 8601
  endDate: string;
  status: EventStatus;
  submissionType: SubmissionType;
  description: string;
}
