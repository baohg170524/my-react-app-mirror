export { default as apiClient } from "./client";
export { authApi } from "./auth";
export { schoolsApi } from "./schools";
export { storageApi } from "./storage";
export { fptMockApi } from "./fptMock";
export { usersApi, type UserSummary } from "./users";
export type {
  ApiError,
  BackendUserModel,
  BaseResponse,
  CreateSchoolRequest,
  CreateSchoolResponse,
  LoginRequest,
  LoginResponse,
  PagedResult,
  PaginatedResponse,
  RefreshTokenResponse,
  RegisterRequest,
  SchoolModel,
  UserProfile,
} from "./types";
