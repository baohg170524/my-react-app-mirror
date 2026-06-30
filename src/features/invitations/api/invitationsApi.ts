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
    await apiClient.post(`/EventRoles/invitations/${encodeURIComponent(invitationId)}/respond`, { isAccepted: accept });
  }
};
