/**
 * Static mock data for the Admin/EC event management view.
 * Judges and mentors have no service layer yet — kept self-contained here.
 * Teams and scores reuse the existing eventService mock via hooks.
 */

export interface Judge {
  id: string;
  name: string;
  email: string;
  assignedTeams: number;
}

export interface Mentor {
  id: string;
  name: string;
  email: string;
  menteeTeams: string[];
}

export const mockJudges: Record<string, Judge[]> = {
  'evt-001': [
    { id: 'judge-001', name: 'Judge 1', email: 'judge1@fpt.edu.vn', assignedTeams: 3 },
    { id: 'judge-002', name: 'Judge 2', email: 'judge2@fpt.edu.vn', assignedTeams: 2 },
    { id: 'judge-003', name: 'Judge 3', email: 'judge3@fpt.edu.vn', assignedTeams: 3 },
  ],
  'evt-002': [
    { id: 'judge-004', name: 'Judge 4', email: 'judge4@fpt.edu.vn', assignedTeams: 1 },
  ],
  'evt-003': [],
};

export const mockMentors: Record<string, Mentor[]> = {
  'evt-001': [
    { id: 'mentor-001', name: 'Mentor 1', email: 'mentor1@example.com', menteeTeams: ['abc', 'xyz'] },
    { id: 'mentor-002', name: 'Mentor 2', email: 'mentor2@example.com', menteeTeams: ['swp'] },
  ],
  'evt-002': [
    { id: 'mentor-003', name: 'Mentor 3', email: 'mentor3@example.com', menteeTeams: ['def'] },
  ],
  'evt-003': [],
};
