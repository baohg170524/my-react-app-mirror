import apiClient from "./client";
import type { PagedResult } from "./types";

/** User shape for search/autocomplete and the user list (matches UserModel). */
export interface UserSummary {
  id: string;
  email: string | null;
  fullName: string | null;
  studentCode: string | null;
  schoolId: string | null;
  isStudent: boolean;
  isAdmin: boolean;
  isApproved: boolean;
  isFpt: boolean;
}

export interface UserListParams {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
  /** Filter by approval state (e.g. false = chờ xét duyệt). */
  isApproved?: boolean;
}

/** Matches backend UpdateUserRequestModel. */
export interface UpdateUserPayload {
  schoolId?: string | null;
  studentCode?: string | null;
  fullName?: string | null;
  isStudent: boolean;
  isAdmin: boolean;
  isApproved: boolean;
  isFpt: boolean;
  photoStudentCardUrl?: string | null;
}

export const usersApi = {
  /** GET /api/Users?Search= — search users by email/name (requires auth). */
  search: async (query: string): Promise<UserSummary[]> => {
    const { data } = await apiClient.get<PagedResult<UserSummary>>("/Users", {
      params: { Search: query, PageNumber: 1, PageSize: 10 },
    });
    return data.data ?? [];
  },

  /** GET /api/Users — paged user list (requires auth). */
  list: async ({
    search = "",
    pageNumber = 1,
    pageSize = 50,
    isApproved,
  }: UserListParams = {}): Promise<PagedResult<UserSummary>> => {
    const { data } = await apiClient.get<PagedResult<UserSummary>>("/Users", {
      params: {
        Search: search.trim() || undefined,
        IsApproved: isApproved,
        PageNumber: pageNumber,
        PageSize: pageSize,
      },
    });
    return data;
  },

  /** PUT /api/Users/{id} — update a user (admin only). */
  update: (id: string, payload: UpdateUserPayload): Promise<void> =>
    apiClient.put(`/Users/${encodeURIComponent(id)}`, payload).then(() => undefined),
};
