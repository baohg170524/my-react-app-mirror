import eventService, { Event, Team, Submission, ScoreBreakdown } from '@/features/events/api/eventService';
import { apiClient } from '@/services/api';

jest.mock('@/services/api', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe('eventService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllEvents', () => {
    it('should fetch all events', async () => {
      const mockEvents: Event[] = [
        {
          id: 'event-1',
          title: 'React Challenge',
          startDate: '2026-06-15T10:00:00Z',
          endDate: '2026-06-22T10:00:00Z',
          status: 'open',
          submissionType: 'ZIP',
          description: 'Build a React app',
        },
        {
          id: 'event-2',
          title: 'Node.js Challenge',
          startDate: '2026-07-01T10:00:00Z',
          endDate: '2026-07-08T10:00:00Z',
          status: 'closed',
          submissionType: 'URL',
          description: 'Build a Node.js API',
        },
      ];

      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockEvents });

      const result = await eventService.getAllEvents();
      expect(result).toEqual(mockEvents);
      expect(apiClient.get).toHaveBeenCalledWith('/events');
    });

    it('should return empty array when no events exist', async () => {
      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: null });

      const result = await eventService.getAllEvents();
      expect(result).toEqual([]);
    });

    it('should handle API errors gracefully', async () => {
      const error = new Error('Network error');
      (apiClient.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(eventService.getAllEvents()).rejects.toThrow('Network error');
    });
  });

  describe('getMyEvents', () => {
    it('should fetch user joined events', async () => {
      const mockEvents: Event[] = [
        {
          id: 'event-1',
          title: 'React Challenge',
          startDate: '2026-06-15T10:00:00Z',
          endDate: '2026-06-22T10:00:00Z',
          status: 'open',
          submissionType: 'ZIP',
          description: 'Build a React app',
        },
      ];

      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockEvents });

      const result = await eventService.getMyEvents();
      expect(result).toEqual(mockEvents);
      expect(apiClient.get).toHaveBeenCalledWith('/events/me');
    });

    it('should return empty array when user has no events', async () => {
      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: null });

      const result = await eventService.getMyEvents();
      expect(result).toEqual([]);
    });
  });

  describe('getEvent', () => {
    it('should fetch a single event by ID', async () => {
      const mockEvent: Event = {
        id: 'event-1',
        title: 'React Challenge',
        startDate: '2026-06-15T10:00:00Z',
        endDate: '2026-06-22T10:00:00Z',
        status: 'open',
        submissionType: 'ZIP',
        description: 'Build a React app',
      };

      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockEvent });

      const result = await eventService.getEvent('event-1');
      expect(result).toEqual(mockEvent);
      expect(apiClient.get).toHaveBeenCalledWith('/events/event-1');
    });

    it('should throw error when event not found', async () => {
      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: null });

      await expect(eventService.getEvent('event-1')).rejects.toThrow('Event event-1 not found');
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      (apiClient.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(eventService.getEvent('event-1')).rejects.toThrow('API Error');
    });
  });

  describe('joinEvent', () => {
    it('should join an event successfully', async () => {
      (apiClient.post as jest.Mock).mockResolvedValueOnce({ data: { success: true } });

      const result = await eventService.joinEvent('event-1');
      expect(result).toEqual({ success: true });
      expect(apiClient.post).toHaveBeenCalledWith('/events/event-1/join');
    });

    it('should return success true when no data returned', async () => {
      (apiClient.post as jest.Mock).mockResolvedValueOnce({ data: null });

      const result = await eventService.joinEvent('event-1');
      expect(result).toEqual({ success: true });
    });

    it('should handle join errors', async () => {
      const error = new Error('Already joined');
      (apiClient.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(eventService.joinEvent('event-1')).rejects.toThrow('Already joined');
    });
  });

  describe('getEventTeams', () => {
    it('should fetch all teams for an event', async () => {
      const mockTeams: Team[] = [
        {
          id: 'team-1',
          name: 'Team A',
          leader: { id: 'user-1', name: 'Alice', email: 'alice@example.com' },
          members: [{ id: 'user-2', name: 'Bob', email: 'bob@example.com' }],
          eventId: 'event-1',
        },
        {
          id: 'team-2',
          name: 'Team B',
          leader: { id: 'user-3', name: 'Charlie', email: 'charlie@example.com' },
          members: [],
          eventId: 'event-1',
        },
      ];

      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockTeams });

      const result = await eventService.getEventTeams('event-1');
      expect(result).toEqual(mockTeams);
      expect(apiClient.get).toHaveBeenCalledWith('/events/event-1/teams');
    });

    it('should return empty array when no teams exist', async () => {
      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: null });

      const result = await eventService.getEventTeams('event-1');
      expect(result).toEqual([]);
    });
  });

  describe('getUserTeam', () => {
    it('should fetch user team for an event', async () => {
      const mockTeam: Team = {
        id: 'team-1',
        name: 'Team A',
        leader: { id: 'user-1', name: 'Alice', email: 'alice@example.com' },
        members: [{ id: 'user-2', name: 'Bob', email: 'bob@example.com' }],
        eventId: 'event-1',
      };

      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockTeam });

      const result = await eventService.getUserTeam('event-1', 'user-1');
      expect(result).toEqual(mockTeam);
      expect(apiClient.get).toHaveBeenCalledWith('/events/event-1/teams/user/user-1');
    });

    it('should return null when user has no team', async () => {
      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: null });

      const result = await eventService.getUserTeam('event-1', 'user-2');
      expect(result).toBeNull();
    });

    it('should handle API errors', async () => {
      const error = new Error('Unauthorized');
      (apiClient.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(eventService.getUserTeam('event-1', 'user-1')).rejects.toThrow('Unauthorized');
    });
  });

  describe('createTeam', () => {
    it('should create a new team', async () => {
      const teamData = { name: 'Team B', memberIds: ['user-1', 'user-2'] };
      const mockTeam: Team = {
        id: 'team-2',
        name: 'Team B',
        leader: { id: 'user-1', name: 'Alice', email: 'alice@example.com' },
        members: [{ id: 'user-2', name: 'Bob', email: 'bob@example.com' }],
        eventId: 'event-1',
      };

      (apiClient.post as jest.Mock).mockResolvedValueOnce({ data: mockTeam });

      const result = await eventService.createTeam('event-1', teamData);
      expect(result).toEqual(mockTeam);
      expect(apiClient.post).toHaveBeenCalledWith('/events/event-1/teams', teamData);
    });

    it('should throw error when creation fails', async () => {
      const teamData = { name: 'Team B', memberIds: ['user-1', 'user-2'] };
      (apiClient.post as jest.Mock).mockResolvedValueOnce({ data: null });

      await expect(eventService.createTeam('event-1', teamData)).rejects.toThrow('Failed to create team');
    });

    it('should handle API errors', async () => {
      const teamData = { name: 'Team B', memberIds: ['user-1', 'user-2'] };
      const error = new Error('Duplicate team name');
      (apiClient.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(eventService.createTeam('event-1', teamData)).rejects.toThrow('Duplicate team name');
    });
  });

  describe('getTeamSubmissions', () => {
    it('should fetch all submissions for a team', async () => {
      const mockSubmissions: Submission[] = [
        {
          id: 'sub-1',
          teamId: 'team-1',
          eventId: 'event-1',
          type: 'ZIP',
          status: 'submitted',
          submitDate: '2026-06-20T10:00:00Z',
          content: 'submission.zip',
        },
        {
          id: 'sub-2',
          teamId: 'team-1',
          eventId: 'event-1',
          type: 'ZIP',
          status: 'graded',
          submitDate: '2026-06-21T10:00:00Z',
          content: 'submission-v2.zip',
        },
      ];

      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockSubmissions });

      const result = await eventService.getTeamSubmissions('team-1');
      expect(result).toEqual(mockSubmissions);
      expect(apiClient.get).toHaveBeenCalledWith('/teams/team-1/submissions');
    });

    it('should return empty array when no submissions exist', async () => {
      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: null });

      const result = await eventService.getTeamSubmissions('team-1');
      expect(result).toEqual([]);
    });

    it('should handle API errors', async () => {
      const error = new Error('Team not found');
      (apiClient.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(eventService.getTeamSubmissions('team-1')).rejects.toThrow('Team not found');
    });
  });

  describe('submitWork', () => {
    it('should submit a ZIP file', async () => {
      const file = new File(['content'], 'submission.zip', { type: 'application/zip' });
      const formData = new FormData();
      formData.append('file', file);

      const mockSubmission: Submission = {
        id: 'sub-1',
        teamId: 'team-1',
        eventId: 'event-1',
        type: 'ZIP',
        status: 'submitted',
        submitDate: '2026-06-20T10:00:00Z',
        content: 'submission.zip',
      };

      (apiClient.post as jest.Mock).mockResolvedValueOnce({ data: mockSubmission });

      const result = await eventService.submitWork('team-1', 'event-1', {
        type: 'ZIP',
        content: formData,
      });

      expect(result).toEqual(mockSubmission);
      expect(apiClient.post).toHaveBeenCalledWith(
        '/teams/team-1/submissions',
        expect.any(FormData),
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
    });

    it('should submit a URL', async () => {
      const mockSubmission: Submission = {
        id: 'sub-2',
        teamId: 'team-1',
        eventId: 'event-1',
        type: 'URL',
        status: 'submitted',
        submitDate: '2026-06-20T10:00:00Z',
        content: 'https://github.com/user/repo',
      };

      (apiClient.post as jest.Mock).mockResolvedValueOnce({ data: mockSubmission });

      const result = await eventService.submitWork('team-1', 'event-1', {
        type: 'URL',
        content: 'https://github.com/user/repo',
      });

      expect(result).toEqual(mockSubmission);
      expect(apiClient.post).toHaveBeenCalledWith(
        '/teams/team-1/submissions',
        expect.any(FormData),
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
    });

    it('should throw error for invalid ZIP submission', async () => {
      const invalidFormData = new FormData(); // No file attached

      await expect(
        eventService.submitWork('team-1', 'event-1', {
          type: 'ZIP',
          content: invalidFormData,
        })
      ).rejects.toThrow('ZIP submission missing file');
    });

    it('should throw error when ZIP submission requires FormData', async () => {
      await expect(
        eventService.submitWork('team-1', 'event-1', {
          type: 'ZIP',
          content: 'not-formdata',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      ).rejects.toThrow('ZIP submission requires FormData');
    });

    it('should throw error when submission fails', async () => {
      const file = new File(['content'], 'submission.zip', { type: 'application/zip' });
      const formData = new FormData();
      formData.append('file', file);

      (apiClient.post as jest.Mock).mockResolvedValueOnce({ data: null });

      await expect(
        eventService.submitWork('team-1', 'event-1', {
          type: 'ZIP',
          content: formData,
        })
      ).rejects.toThrow('Failed to submit work');
    });

    it('should handle submission API errors', async () => {
      const file = new File(['content'], 'submission.zip', { type: 'application/zip' });
      const formData = new FormData();
      formData.append('file', file);

      const error = new Error('File too large');
      (apiClient.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(
        eventService.submitWork('team-1', 'event-1', {
          type: 'ZIP',
          content: formData,
        })
      ).rejects.toThrow('File too large');
    });
  });

  describe('getTeamScores', () => {
    it('should fetch team scores and leaderboard', async () => {
      const mockScores = [
        { teamId: 'team-1', score: 95, status: 'graded' },
        { teamId: 'team-2', score: 87, status: 'graded' },
        { teamId: 'team-3', score: 0, status: 'pending' },
      ];

      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockScores });

      const result = await eventService.getTeamScores('event-1');
      expect(result).toEqual(mockScores);
      expect(apiClient.get).toHaveBeenCalledWith('/events/event-1/scores');
    });

    it('should return empty array when no scores exist', async () => {
      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: null });

      const result = await eventService.getTeamScores('event-1');
      expect(result).toEqual([]);
    });

    it('should handle API errors', async () => {
      const error = new Error('Event not found');
      (apiClient.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(eventService.getTeamScores('event-1')).rejects.toThrow('Event not found');
    });
  });

  describe('getScoreBreakdown', () => {
    it('should fetch score breakdown for a team', async () => {
      const mockBreakdown: ScoreBreakdown[] = [
        { criterion: 'Design', score: 8, max: 10, status: 'graded' },
        { criterion: 'Functionality', score: 9, max: 10, status: 'graded' },
        { criterion: 'Code Quality', score: 7, max: 10, status: 'graded' },
      ];

      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockBreakdown });

      const result = await eventService.getScoreBreakdown('team-1', 'event-1');
      expect(result).toEqual(mockBreakdown);
      expect(apiClient.get).toHaveBeenCalledWith('/teams/team-1/scores?eventId=event-1');
    });

    it('should return empty array when no breakdown exists', async () => {
      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: null });

      const result = await eventService.getScoreBreakdown('team-1', 'event-1');
      expect(result).toEqual([]);
    });

    it('should handle graded status', async () => {
      const mockBreakdown: ScoreBreakdown[] = [
        { criterion: 'Design', score: 10, max: 10, status: 'graded' },
      ];

      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockBreakdown });

      const result = await eventService.getScoreBreakdown('team-1', 'event-1');
      expect(result[0].status).toBe('graded');
    });

    it('should handle pending status', async () => {
      const mockBreakdown: ScoreBreakdown[] = [
        { criterion: 'Functionality', score: 0, max: 10, status: 'pending' },
      ];

      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockBreakdown });

      const result = await eventService.getScoreBreakdown('team-1', 'event-1');
      expect(result[0].status).toBe('pending');
    });

    it('should handle API errors', async () => {
      const error = new Error('Team not found');
      (apiClient.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(eventService.getScoreBreakdown('team-1', 'event-1')).rejects.toThrow('Team not found');
    });
  });

  describe('Error handling integration', () => {
    it('should handle network timeouts', async () => {
      const error = new Error('Request timeout');
      (apiClient.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(eventService.getAllEvents()).rejects.toThrow('Request timeout');
    });

    it('should handle 404 errors', async () => {
      const error = new Error('Not found');
      (apiClient.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(eventService.getEvent('invalid-id')).rejects.toThrow('Not found');
    });

    it('should handle 500 errors', async () => {
      const error = new Error('Internal server error');
      (apiClient.post as jest.Mock).mockRejectedValueOnce(error);

      await expect(eventService.joinEvent('event-1')).rejects.toThrow('Internal server error');
    });
  });
});
