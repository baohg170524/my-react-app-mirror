"use client";

import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user";
import { MOCK_USER_PROFILE } from "../mocks/user.mock";
import type { UserProfile } from "@/services/api/types";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";
const USER_STORAGE_KEY = "currentUser";

/** Profile captured at login (the backend exposes no /users/me endpoint). */
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

export function useUserProfile() {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: async (): Promise<UserProfile> => {
      if (USE_MOCK) return MOCK_USER_PROFILE;
      // The backend has no /users/me/profile endpoint — use the profile saved
      // at login. Only fall back to the API if nothing was persisted.
      const persisted = readPersistedUser();
      if (persisted) return persisted;
      return userApi.getProfile();
    },
    staleTime: 5 * 60_000,
    retry: 1,
  });
}
