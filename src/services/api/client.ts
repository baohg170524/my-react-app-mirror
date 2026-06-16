import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import type { ApiError, BaseResponse } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.sealswp391.xyz/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

// ─── Request: attach access token ─────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

function isAuthRoute(url?: string): boolean {
  if (!url) return false;
  return /\/auth\//i.test(url);
}

// ─── Response: unwrap BaseResponse envelope, handle 401 ───────────────────────
apiClient.interceptors.response.use(
  (response: AxiosResponse<BaseResponse<unknown>>) => {
    const env = response.data;
    // Tolerate non-enveloped responses (defensive).
    if (env && typeof env === "object" && "success" in env && "data" in env) {
      if (!env.success) {
        const err: ApiError = {
          message: env.message ?? "Request failed",
          statusCode: env.statusCode ?? response.status,
        };
        return Promise.reject({
          response: { status: env.statusCode ?? response.status, data: err },
          message: err.message,
        } as AxiosError<ApiError>);
      }
      return { ...response, data: env.data };
    }
    return response;
  },
  (error: AxiosError<BaseResponse<unknown> | ApiError>) => {
    // Normalise enveloped error bodies → ApiError shape.
    const body = error.response?.data;
    if (body && typeof body === "object" && "success" in body) {
      const env = body as BaseResponse<unknown>;
      (error.response as AxiosResponse).data = {
        message: env.message,
        statusCode: env.statusCode,
      } satisfies ApiError;
    }

    if (
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      !isAuthRoute(error.config?.url)
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
