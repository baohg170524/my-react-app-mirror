import apiClient from "./client";
import type { PagedResult, SchoolModel } from "./types";

/**
 * School list is served by the deployed API (not the local backend).
 * Absolute URL overrides apiClient's baseURL for this request only.
 */
const SCHOOLS_URL =
  process.env.NEXT_PUBLIC_SCHOOLS_API_URL ??
  "https://api.sealswp391.xyz/api/Schools";

export const schoolsApi = {
  list: async (
    pageSize = 100,
    pageNumber = 1,
  ): Promise<PagedResult<SchoolModel>> => {
    const { data } = await apiClient.get<PagedResult<SchoolModel>>(SCHOOLS_URL, {
      params: { PageNumber: pageNumber, PageSize: pageSize },
    });
    return data;
  },

  create: async (payload: { schoolName: string; address?: string }): Promise<SchoolModel> => {
    const { data } = await apiClient.post<SchoolModel>(SCHOOLS_URL, payload);
    return data;
  },
};
