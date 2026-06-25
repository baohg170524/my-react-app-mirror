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

/** A member as returned by GET /api/Teams/my-team. */
export interface MyTeamMember {
  userId: string;
  fullName: string;
  email: string;
  studentCode: string | null;
  /** "TeamLeader"/"TeamMember" as a name, or the numeric EventRoleType (3/4). */
  roleName: string | number | null;
  isApproved: boolean;
}

/** True for the team leader, tolerant of name ("TeamLeader") or number (3). */
export const isTeamLeaderRole = (roleName: string | number | null | undefined): boolean => {
  const s = String(roleName ?? '').trim().toLowerCase();
  return s === 'teamleader' || s === '3';
};

/** Matches backend MyTeamResponseModel (GET /api/Teams/my-team). */
export interface MyTeam {
  id: string;
  name: string;
  description: string | null;
  /** Free string; the team is locked once it becomes "Registered". */
  status: string | null;
  isActive: boolean;
  eventId: string;
  eventName: string | null;
  createdTime: string;
  members: MyTeamMember[];
}

/** True once the team leader has confirmed registration (team is locked). */
export const isTeamRegistered = (team: Pick<MyTeam, 'status'>): boolean =>
  String(team.status ?? '').trim().toLowerCase() === 'registered';
