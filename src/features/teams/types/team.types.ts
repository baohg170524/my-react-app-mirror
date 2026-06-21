export interface TeamMember {
  userId: string;
  fullName: string;
  email: string;
  roleName: number; // EventRoleType (3 = TeamLeader, 4 = TeamMember)
}

export interface TeamModel {
  id: string;
  teamName: string;
  description: string | null;
  eventId: string;
  trackId: string | null;
  members: TeamMember[];
}

export interface CreateTeamPayload {
  teamName: string;
  description: string;
  eventId: string;
  trackId: string;
}
