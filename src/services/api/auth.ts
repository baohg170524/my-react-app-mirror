import apiClient from "./client";
import type {
  BackendUserModel,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
  UpdateStudentProfileCommand,
} from "./types";

export const authApi = {
  /** POST /api/Auth/login — đăng nhập, trả về access token + refresh token */
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>("/Auth/login", payload);
    return data;
  },

  /** Backend register returns the created user — NOT auth tokens. */
  register: async (payload: RegisterRequest): Promise<BackendUserModel> => {
    const { data } = await apiClient.post<BackendUserModel>(
      "/Auth/register",
      payload,
    );
    return data;
  },

  /** POST /api/Auth/logout — đăng xuất, huỷ refresh token */
  logout: async (): Promise<void> => {
    await apiClient.post("/Auth/logout");
  },

  /** POST /api/Auth/refresh-token — làm mới access token bằng refresh token */
  refreshToken: async (
    refreshToken: string,
  ): Promise<RefreshTokenResponse> => {
    const { data } = await apiClient.post<RefreshTokenResponse>(
      "/Auth/refresh-token",
      { refreshToken },
    );
    return data;
  },

  /** GET /api/Auth/verify-email — xác minh email qua token */
  verifyEmail: async (token: string): Promise<boolean> => {
    const { data } = await apiClient.get<boolean>("/Auth/verify-email", {
      params: { token },
    });
    return data;
  },

  /**
   * Re-send the verification email for an unverified account.
   * NOTE: backend endpoint not implemented yet — wire-up is ready, the
   * `/Auth/resend-verification` route just needs to exist server-side.
   */
  resendVerification: async (email: string): Promise<void> => {
    await apiClient.post("/Auth/resend-verification", { email });
  },

  /** POST /api/Auth/student-profiles — submit the caller's student proof. */
  submitStudentProfile: (payload: UpdateStudentProfileCommand): Promise<void> =>
    apiClient.post("/Auth/student-profiles", payload).then(() => undefined),

  /** PUT /api/Auth/student-profiles — update/resubmit the caller's student proof. */
  updateStudentProfile: (payload: UpdateStudentProfileCommand): Promise<void> =>
    apiClient.put("/Auth/student-profiles", payload).then(() => undefined),
};
