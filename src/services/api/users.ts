import apiClient from "./client";
import type { PagedResult } from "./types";

/** Lightweight user shape for search/autocomplete. */
export interface UserSummary {
  id: string;
  email: string | null;
  fullName: string | null;
  isStudent: boolean;
  isAdmin: boolean;
}

export const usersApi = {
  /** GET /api/Users?Search= — search users by email/name (requires auth). */
  search: async (query: string): Promise<UserSummary[]> => {
    const { data } = await apiClient.get<PagedResult<UserSummary>>("/Users", {
      params: { Search: query, PageNumber: 1, PageSize: 10 },
    });
    return data.data ?? [];
  },
};
