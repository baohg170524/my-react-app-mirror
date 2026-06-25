'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { teamsApi } from '../api/teams';
import type { CreateTeamPayload } from '../types/team.types';

export const TEAM_KEYS = {
  myTeam:  (eventId: string, userId: string) => ['team', 'mine', eventId, userId] as const,
  myTeamFull: (eventId: string) => ['team', 'my-team', eventId] as const,
  judge:   (eventId: string, userId: string) => ['team', 'judge', eventId, userId] as const,
  detail:  (teamId: string) => ['team', teamId] as const,
} as const;

/**
 * The caller's team in an event via GET /api/Teams/my-team — includes the
 * registration `status` and per-member `isApproved`. Returns null when the user
 * has no team yet.
 */
export const useMyTeam = (eventId: string) =>
  useQuery({
    queryKey: TEAM_KEYS.myTeamFull(eventId),
    queryFn: () => teamsApi.getMyTeam(eventId),
    enabled: !!eventId,
    staleTime: 60_000,
  });

export const useMyTeamForEvent = (eventId: string, userId: string) =>
  useQuery({
    queryKey: TEAM_KEYS.myTeam(eventId, userId),
    queryFn: () => teamsApi.findUserTeamForEvent(userId, eventId),
    enabled: !!eventId && !!userId,
    staleTime: 60_000,
  });

export const useJudgeAssignedTeams = (eventId: string, userId: string) =>
  useQuery({
    queryKey: TEAM_KEYS.judge(eventId, userId),
    queryFn: () => teamsApi.findJudgeAssignedTeams(userId, eventId),
    enabled: !!eventId && !!userId,
    staleTime: 60_000,
  });

export const useTeam = (teamId: string | undefined) =>
  useQuery({
    queryKey: TEAM_KEYS.detail(teamId ?? ''),
    queryFn: () => teamsApi.getById(teamId as string),
    enabled: !!teamId,
    staleTime: 60_000,
  });

export const useCreateTeam = (eventId: string, userId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: CreateTeamPayload) => teamsApi.create(p),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: TEAM_KEYS.myTeam(eventId, userId) });
      qc.invalidateQueries({ queryKey: TEAM_KEYS.myTeamFull(eventId) });
    },
  });
};

export const useInviteToTeam = (teamId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ email }: { email: string }) => teamsApi.invite(teamId, email),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: TEAM_KEYS.detail(teamId) });
    },
  });
};

export const useLeaveTeam = (teamId: string, eventId: string, userId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => teamsApi.leave(teamId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: TEAM_KEYS.myTeam(eventId, userId) });
      qc.invalidateQueries({ queryKey: TEAM_KEYS.myTeamFull(eventId) });
      qc.removeQueries({ queryKey: TEAM_KEYS.detail(teamId) });
    },
  });
};
