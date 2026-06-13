import { apiClient } from "@/services/api";
import type { LeaderboardEntry } from "../types/leaderboard.types";

export const leaderboardApi = {
  getTop: (): Promise<LeaderboardEntry[]> =>
    apiClient.get<LeaderboardEntry[]>("/leaderboard").then((r) => r.data),
};
