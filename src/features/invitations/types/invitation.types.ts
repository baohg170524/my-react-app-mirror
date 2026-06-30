export type InvitationType = 'TEAM' | 'EVENT_ROLE';

export interface GlobalInvitation {
  invitationId: string;
  type: InvitationType;
  targetId: string;       // teamId hoặc eventId
  targetName: string;     // Tên đội hoặc Tên sự kiện
  inviterName?: string;
  role: string;           // MEMBER, JUDGE, MENTOR, EC...
  expiresAt: string;
}

export interface MyInvitationsResponse {
  totalPending: number;
  invitations: GlobalInvitation[];
}
