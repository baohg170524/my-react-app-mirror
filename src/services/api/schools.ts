import apiClient from "./client";
import type { PagedResult, SchoolModel } from "./types";

const SCHOOLS_URL = "/Schools";

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
