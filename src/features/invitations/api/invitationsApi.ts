import { apiClient } from '@/services/api';
import type { MyInvitationsResponse } from '../types/invitation.types';

export const invitationsApi = {
  getMyInvitations: async (): Promise<MyInvitationsResponse> => {
    try {
      const { data } = await apiClient.get<MyInvitationsResponse>('/Users/my-invitations');
      return data;
    } catch (e: any) {
      if (e?.response?.status === 404 || e?.response?.status === 500) {
        return { totalPending: 0, invitations: [] };
      }
      throw e;
    }
  },

  respondEventRole: async (invitationId: string, accept: boolean): Promise<void> => {
    // BE nhận isAccepted qua BODY (RespondEventRoleInvitationRequestModel), không phải query param.
    await apiClient.post(
      `/EventRoles/invitations/${encodeURIComponent(invitationId)}/respond`,
      { isAccepted: accept },
    );
  },

  // Từ chối qua link email — KHÔNG cần đăng nhập (endpoint công khai, chỉ đánh dấu Rejected).
  declineEventRolePublic: async (invitationId: string): Promise<void> => {
    await apiClient.post(`/EventRoles/invitations/${encodeURIComponent(invitationId)}/decline`);
  },
};
