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

  /** POST /api/UserRejections — record a rejection (admin action). */
  create: (payload: { userId: string; rejectedBy: string; reason?: string }): Promise<void> =>
    apiClient.post('/UserRejections', payload).then(() => undefined),
};
