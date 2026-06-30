import apiClient from '@/services/api/client';
import type { PagedResult, UserRejectionModel } from '@/services/api';

export const userRejectionsApi = {
  /** GET /api/UserRejections/user/{userId} — rejections recorded against a user. */
  listForUser: async (userId: string): Promise<UserRejectionModel[]> => {
    const { data } = await apiClient.get<PagedResult<UserRejectionModel>>(
      `/UserRejections/user/${encodeURIComponent(userId)}`,
    );
    return data.data ?? [];
  },

  /** GET /api/UserRejections — all rejection records (paged). Fetch a large page once
   *  to build the set of rejected userIds for the admin user list. */
  listAll: async (pageSize = 500): Promise<UserRejectionModel[]> => {
    const { data } = await apiClient.get<PagedResult<UserRejectionModel>>(
      `/UserRejections`,
      { params: { PageNumber: 1, PageSize: pageSize } },
    );
    return data.data ?? [];
  },

  /** DELETE /api/UserRejections/{id} — soft-delete a rejection record. */
  remove: (id: string): Promise<void> =>
    apiClient.delete(`/UserRejections/${encodeURIComponent(id)}`).then(() => undefined),
};
