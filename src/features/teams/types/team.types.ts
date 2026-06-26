export interface TeamMember {
  userId: string;
  fullName: string;
  email: string;
  /** Best-effort: backend exposes a role string; team leaders contain "leader". */
  isLeader: boolean;
}

export interface TeamModel {
  id: string;
  teamName: string;
  description: string | null;
  members: TeamMember[];
}

/** Matches backend CreateTeamRequestModel. */
export interface CreateTeamPayload {
  name: string;
  description: string;
  eventId: string;
  /** The creating student is the team leader. */
  leaderId: string;
}
