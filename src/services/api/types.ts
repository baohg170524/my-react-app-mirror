// ─── Auth Request / Response ──────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface UserStats {
  eventsJoined: number;
  projectScore: number;  // 0–100
  rank: number;
}

export interface Announcement {
  id: string;
  text: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface ProjectSummary {
  semesterName: string;
  projectName: string;
  completionPct: number;  // 0–100
  teamSize: number;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: "STUDENT" | "MENTOR" | "ADMIN";
  avatar?: string;
  createdAt: string;
  stats: UserStats;
  announcement?: Announcement;
  projectSummary?: ProjectSummary;
}

// ─── API Error ────────────────────────────────────────────────────────────────

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// ─── Generic paginated response ───────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
