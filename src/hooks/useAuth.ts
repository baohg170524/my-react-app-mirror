"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/services/api";
import type { LoginRequest, RegisterRequest } from "@/services/api";

// ─── Query keys ───────────────────────────────────────────────────────────────

export const AUTH_KEYS = {
  all: ["auth"] as const,
  me: ["auth", "me"] as const,
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function persistTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

function hasToken(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("accessToken");
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Fetch the currently authenticated user. */
export function useCurrentUser() {
  return useQuery({
    queryKey: AUTH_KEYS.me,
    queryFn: authApi.getMe,
    enabled: hasToken(),
    retry: false,
    staleTime: 5 * 60_000,
  });
}

/** Returns true when the user is authenticated. */
export function useIsAuthenticated(): boolean {
  const { data } = useCurrentUser();
  return !!data;
}

/** Login mutation — persists tokens and populates the `me` cache. */
export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),
    onSuccess: (data) => {
      persistTokens(data.accessToken, data.refreshToken);
      queryClient.setQueryData(AUTH_KEYS.me, data.user);
      router.push("/");
    },
  });
}

/** Register mutation — persists tokens and populates the `me` cache. */
export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterRequest) => authApi.register(payload),
    onSuccess: (data) => {
      persistTokens(data.accessToken, data.refreshToken);
      queryClient.setQueryData(AUTH_KEYS.me, data.user);
      router.push("/");
    },
  });
}

/** Logout mutation — clears tokens and the entire query cache. */
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearTokens();
      queryClient.clear();
      router.push("/auth");
    },
    onError: () => {
      // Force-clear even on server error
      clearTokens();
      queryClient.clear();
      router.push("/auth");
    },
  });
}
