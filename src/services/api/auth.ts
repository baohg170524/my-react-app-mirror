import apiClient from "./client";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserProfile,
} from "./types";

export const authApi = {
  login: async (payload: LoginRequest): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);
    return data;
  },

  register: async (payload: RegisterRequest): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      "/auth/register",
      payload,
    );
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  getMe: async (): Promise<UserProfile> => {
    const { data } = await apiClient.get<UserProfile>("/auth/me");
    return data;
  },

  refreshToken: async (
    refreshToken: string,
  ): Promise<Pick<AuthResponse, "accessToken">> => {
    const { data } = await apiClient.post<Pick<AuthResponse, "accessToken">>(
      "/auth/refresh",
      { refreshToken },
    );
    return data;
  },
};
