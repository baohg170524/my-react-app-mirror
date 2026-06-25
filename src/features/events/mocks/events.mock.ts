import type { Event } from "../types/event.types";

export const MOCK_EVENTS: Event[] = [
  {
    id: "evt-001",
    title: "Workshop: Clean Architecture in Spring Boot",
    startDate: "2026-06-20T09:00:00.000Z",
    endDate: "2026-06-20T12:00:00.000Z",
    description: "Learn clean architecture principles and best practices using Spring Boot in this hands-on workshop.",
    status: "open",
  },
  {
    id: "evt-002",
    title: "UI/UX Design Thinking Bootcamp",
    startDate: "2026-06-22T13:00:00.000Z",
    endDate: "2026-06-23T17:00:00.000Z",
    description: "Intensive bootcamp covering design thinking methodology and prototyping with Figma.",
    status: "open",
  },
  {
    id: "evt-003",
    title: "Agile & Scrum for Student Teams",
    startDate: "2026-06-18T10:00:00.000Z",
    endDate: "2026-06-18T14:00:00.000Z",
    description: "Essential Agile and Scrum practices designed for student teams and projects.",
    status: "ended",
  },
  {
    id: "evt-004",
    title: "React 19 + Next.js 16 Deep Dive",
    startDate: "2026-06-25T14:00:00.000Z",
    endDate: "2026-06-26T18:00:00.000Z",
    description: "Deep dive into React 19 and Next.js 16 features with advanced patterns and optimization techniques.",
    status: "open",
  },
  {
    id: "evt-005",
    title: "Git Flow & Code Review Best Practices",
    startDate: "2026-06-28T09:00:00.000Z",
    endDate: "2026-06-28T13:00:00.000Z",
    description: "Master git workflows and effective code review strategies for team collaboration.",
    status: "open",
  },
];

export const MOCK_MY_EVENTS: Event[] = [MOCK_EVENTS[1], MOCK_EVENTS[3]];
