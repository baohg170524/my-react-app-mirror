export type InvitationType = 'TEAM' | 'EVENT_ROLE';

export type InvitationStatus = 'PendingAccept' | 'Accepted' | 'Declined';

export interface GlobalInvitation {
  invitationId: string;
  type: InvitationType;
  targetId: string;       // teamId hoặc eventId
  targetName: string;     // Tên đội hoặc Tên sự kiện
  inviterName?: string;
  role: string;           // MEMBER, JUDGE, MENTOR, EC...
  status?: InvitationStatus; // PendingAccept => còn nút; Accepted/Declined => lịch sử
  respondedAt?: string | null;
  expiresAt: string;
}

export interface MyInvitationsResponse {
  totalPending: number;
  invitations: GlobalInvitation[];
}
