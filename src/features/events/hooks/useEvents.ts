'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import eventService from '../api/eventService';
import { eventsApi } from '../api/events';
import { manageApi } from '../api/manage';
import { rolesApi } from '../api/roles';
import { resolveEventRole, roleNameToNumber, type DashboardRole } from '@/lib/events/eventRole';

export const useEvent = (eventId: string) => {
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: () => eventsApi.getById(eventId), // real API: GET /api/Events/{id}
    enabled: !!eventId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAllEvents = (isAdmin: boolean) => {
  return useQuery({
    queryKey: ['events', 'all', isAdmin],
    queryFn: () => eventsApi.list(isAdmin ? undefined : true), // real API: GET /api/Events
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * The caller's role *within an event*, fetched lazily when the event is opened.
 * Returns both the dashboard role (drives the tab set; participant unless judge)
 * and the granular Vietnamese label (keeps mentor/coordinator distinct). Defaults
 * to participant while loading or when the user has no assigned role; global
 * admins are redirected before reaching here.
 */
export const useMyEventRole = (
  eventId: string,
  userId: string,
): { role: DashboardRole; label: string } => {
  const { data } = useQuery({
    queryKey: ['myEventRole', eventId, userId],
    queryFn: () => rolesApi.getUserRole(userId, eventId),
    enabled: !!eventId && !!userId,
    staleTime: 60_000,
  });
  const num = roleNameToNumber(data?.roleName);
  return resolveEventRole(num === null ? [] : [num]);
};

// ─── Admin manage page (real API) ──────────────────────────────────────────────

/** All roles (judge/mentor/competitor) in an event — admin manage page. */
export const useEventRoles = (eventId: string) =>
  useQuery({
    queryKey: ['eventRoles', eventId],
    queryFn: () => manageApi.listEventRoles(eventId),
    enabled: !!eventId,
    staleTime: 2 * 60 * 1000,
  });

/** All teams (scoped to an event client-side via event roles). */
export const useTeams = () =>
  useQuery({
    queryKey: ['teams', 'all'],
    queryFn: () => manageApi.listTeams(),
    staleTime: 2 * 60 * 1000,
  });

/** Rounds of an event. */
export const useEventRounds = (eventId: string) =>
  useQuery({
    queryKey: ['rounds', eventId],
    queryFn: () => manageApi.listEventRounds(eventId),
    enabled: !!eventId,
    staleTime: 5 * 60 * 1000,
  });

/** Tracks of an event (grouped by round client-side). */
export const useEventTracks = (eventId: string) =>
  useQuery({
    queryKey: ['tracks', eventId],
    queryFn: () => manageApi.listEventTracks(eventId),
    enabled: !!eventId,
    staleTime: 5 * 60 * 1000,
  });

/** Final results (leaderboard) of a round. */
export const useRoundFinalResults = (roundId: string | undefined) =>
  useQuery({
    queryKey: ['finalResults', roundId],
    queryFn: () => manageApi.listRoundFinalResults(roundId as string),
    enabled: !!roundId,
    staleTime: 2 * 60 * 1000,
  });

export const useMyEvents = () => {
  return useQuery({
    queryKey: ['events', 'my'],
    queryFn: () => eventService.getMyEvents(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useEventTeams = (eventId: string) => {
  return useQuery({
    queryKey: ['eventTeams', eventId],
    queryFn: () => eventService.getEventTeams(eventId),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useUserTeam = (eventId: string, userId: string) => {
  return useQuery({
    queryKey: ['userTeam', eventId, userId],
    queryFn: () => eventService.getUserTeam(eventId, userId),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateTeam = (eventId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (teamData: { name: string; memberIds: string[] }) =>
      eventService.createTeam(eventId, teamData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventTeams', eventId] });
      // Invalidate with exact key for this event's user team
      queryClient.invalidateQueries({ queryKey: ['userTeam', eventId] });
    },
  });
};

export const useTeamSubmissions = (teamId: string) => {
  return useQuery({
    queryKey: ['submissions', teamId],
    queryFn: () => eventService.getTeamSubmissions(teamId),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

/**
 * Submit work for a competition team
 * @param teamId - Team ID
 * @param eventId - Event ID
 * @returns Mutation for submitting work
 *
 * Usage:
 * - ZIP: pass FormData with 'file' key containing the zip file
 * - URL: pass string URL (GitHub, Google Drive, etc.)
 */
export const useSubmitWork = (teamId: string, eventId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (submissionData: { type: 'ZIP' | 'URL'; content: string | FormData }) =>
      eventService.submitWork(teamId, eventId, submissionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions', teamId] });
      queryClient.invalidateQueries({ queryKey: ['scores', eventId] });
    },
  });
};

export const useTeamScores = (eventId: string) => {
  return useQuery({
    queryKey: ['scores', eventId],
    queryFn: () => eventService.getTeamScores(eventId),
    staleTime: 2 * 60 * 1000,
  });
};

export const useScoreBreakdown = (teamId: string, eventId: string) => {
  return useQuery({
    queryKey: ['scoreBreakdown', teamId, eventId],
    queryFn: () => eventService.getScoreBreakdown(teamId, eventId),
    staleTime: 5 * 60 * 1000,
  });
};

export const useJoinEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId: string) =>
      eventService.joinEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events', 'my'] });
      queryClient.invalidateQueries({ queryKey: ['events', 'all'] });
    },
  });
};
