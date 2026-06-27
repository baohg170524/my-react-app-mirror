"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/services/api";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserProfile,
} from "@/services/api";
import { useNotify } from "@/components/NotificationProvider";
import { getErrorMessage } from "@/lib/apiError";

// ─── Query keys ───────────────────────────────────────────────────────────────

export const AUTH_KEYS = {
  all: ["auth"] as const,
  me: ["auth", "me"] as const,
} as const;

const USER_STORAGE_KEY = "currentUser";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function persistTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem(USER_STORAGE_KEY);
}

function persistUser(user: UserProfile) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

function readPersistedUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

function hasToken(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("accessToken");
}

/** Build the in-app UserProfile from the backend login response. */
function loginResponseToProfile(res: LoginResponse): UserProfile {
  const role: UserProfile["role"] = res.isAdmin
    ? "ADMIN"
    : res.isStudent
      ? "STUDENT"
      : "MENTOR";
  return {
    id: res.userId,
    email: res.email,
    fullName: res.fullName,
    role,
    createdAt: new Date().toISOString(),
    stats: { eventsJoined: 0, projectScore: 0, rank: 0 },
  };
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Returns the cached current user (from login response / localStorage). */
export function useCurrentUser() {
  return useQuery({
    queryKey: AUTH_KEYS.me,
    queryFn: async () => readPersistedUser(),
    enabled: hasToken(),
    staleTime: Infinity,
    retry: false,
  });
}

export function useIsAuthenticated(): boolean {
  const { data } = useCurrentUser();
  return !!data;
}

/** Login mutation — persists tokens + user, navigates home. */
export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const notify = useNotify();

  return useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),
    onSuccess: (data) => {
      persistTokens(data.accessToken, data.refreshToken);
      const profile = loginResponseToProfile(data);
      persistUser(profile);
      queryClient.setQueryData(AUTH_KEYS.me, profile);
      notify.success(`Đăng nhập thành công. Chào mừng ${profile.fullName}!`);
      // replace (not push) so Back doesn't return to the login screen
      router.replace("/");
    },
    onError: (e) =>
      notify.error(getErrorMessage(e, "Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.")),
  });
}

/**
 * Register mutation — backend does NOT return tokens, so we do not log the
 * user in here. Caller should switch the UI to login mode on success.
 */
export function useRegister() {
  const notify = useNotify();

  return useMutation({
    mutationFn: (payload: RegisterRequest) => authApi.register(payload),
    onSuccess: () =>
      notify.success("Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản."),
    onError: (e) => notify.error(getErrorMessage(e, "Đăng ký thất bại. Vui lòng thử lại.")),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const notify = useNotify();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearTokens();
      queryClient.clear();
      notify.success("Đã đăng xuất.");
      router.push("/auth");
    },
    onError: () => {
      clearTokens();
      queryClient.clear();
      router.push("/auth");
    },
  });
}
