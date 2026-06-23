// ─── Backend envelope ─────────────────────────────────────────────────────────

/** Every backend response is wrapped in this envelope. */
export interface BaseResponse<T> {
  data: T | null;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface PagedResult<T> {
  data: T[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// ─── Auth Request / Response ──────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

/** Matches backend RegisterUserRequestModel. */
export interface RegisterRequest {
  schoolId: string;
  studentCode?: string;
  email: string;
  password: string;
  fullName: string;
  isStudent: boolean;
  /** Derived from the selected school name (contains "FPT"). */
  isFpt: boolean;
  /** Required by the backend for non-FPT students (URL from `/Storage/upload`). */
  photoStudentCardUrl?: string;
}

/** Matches backend LoginUserResponseModel (flat shape). */
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email: string;
  fullName: string;
  isAdmin: boolean;
  isStudent: boolean;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// ─── User (backend UserModel) ─────────────────────────────────────────────────

export interface BackendUserModel {
  id: string;
  schoolId: string;
  studentCode: string | null;
  email: string;
  fullName: string;
  isStudent: boolean;
  isAdmin: boolean;
  isApproved: boolean;
}

// ─── In-app user profile (derived) ────────────────────────────────────────────

export interface UserStats {
  eventsJoined: number;
  projectScore: number;
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
  completionPct: number;
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

// ─── Schools ──────────────────────────────────────────────────────────────────

export interface SchoolModel {
  id: string;
  schoolName: string;
  address: string | null;
}

/** Matches backend CreateSchoolRequestModel. */
export interface CreateSchoolRequest {
  schoolName: string;
  address?: string | null;
}

/** Matches backend CreateSchoolResponseModel. */
export interface CreateSchoolResponse {
  id: string;
  schoolName: string;
  address: string | null;
  createdTime: string;
}

// ─── User Rejections (backend UserRejectionModel) ─────────────────────────────

export interface UserRejectionModel {
  id: string;
  userId: string;
  rejectedBy: string;
  reason: string | null;
  createdTime: string;
}

// ─── Student profile submission ───────────────────────────────────────────────

export interface UpdateStudentProfileCommand {
  schoolId?: string | null;
  studentCode?: string | null;
  photoStudentCardUrl?: string | null;
  isFpt: boolean;
  fullName?: string | null;
}

// ─── API Error ────────────────────────────────────────────────────────────────

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// ─── Generic paginated response (legacy alias) ────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
