"use client";

import { useQuery } from "@tanstack/react-query";
import { leaderboardApi } from "../api/leaderboard";
import { MOCK_LEADERBOARD } from "../mocks/leaderboard.mock";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: USE_MOCK
      ? () => Promise.resolve(MOCK_LEADERBOARD)
      : leaderboardApi.getTop,
    staleTime: 2 * 60_000,
  });
}
