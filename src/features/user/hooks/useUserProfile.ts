"use client";

import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user";
import { MOCK_USER_PROFILE } from "../mocks/user.mock";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export function useUserProfile() {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: USE_MOCK
      ? () => Promise.resolve(MOCK_USER_PROFILE)
      : userApi.getProfile,
    staleTime: 5 * 60_000,
    retry: 1,
  });
}
