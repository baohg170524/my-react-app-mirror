import apiClient from "./client";
import type { PagedResult, SchoolModel } from "./types";

export const schoolsApi = {
  list: async (
    pageSize = 100,
    pageNumber = 1,
  ): Promise<PagedResult<SchoolModel>> => {
    const { data } = await apiClient.get<PagedResult<SchoolModel>>("/Schools", {
      params: { PageNumber: pageNumber, PageSize: pageSize },
    });
    return data;
  },
};
