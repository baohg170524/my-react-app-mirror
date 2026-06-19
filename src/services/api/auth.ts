import apiClient from "./client";
import type {
  BackendUserModel,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
} from "./types";

export const authApi = {
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

  logout: async (): Promise<void> => {
    await apiClient.post("/Auth/logout");
  },

  refreshToken: async (
    refreshToken: string,
  ): Promise<RefreshTokenResponse> => {
    const { data } = await apiClient.post<RefreshTokenResponse>(
      "/Auth/refresh-token",
      { refreshToken },
    );
    return data;
  },

  verifyEmail: async (token: string): Promise<boolean> => {
    const { data } = await apiClient.get<boolean>("/Auth/verify-email", {
      params: { token },
    });
    return data;
  },
};
