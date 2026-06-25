'use client';

import { useQueries, useQuery } from '@tanstack/react-query';
import { resultsApi } from '../api/results';

export const RESULTS_KEYS = {
  teamFinals: (teamId: string) => ['results', 'team', teamId] as const,
  round:      (roundId: string) => ['results', 'round', roundId] as const,
  teamRound:  (teamId: string, roundId: string) => ['results', 'breakdown', teamId, roundId] as const,
  details:    (scoreId: string) => ['results', 'details', scoreId] as const,
};

export const useTeamFinalResults = (teamId: string | undefined) =>
  useQuery({
    queryKey: RESULTS_KEYS.teamFinals(teamId ?? ''),
    queryFn: () => resultsApi.listTeamFinalResults(teamId as string),
    enabled: !!teamId,
    staleTime: 60_000,
  });

export const useRoundLeaderboard = (roundId: string | undefined) =>
  useQuery({
    queryKey: RESULTS_KEYS.round(roundId ?? ''),
    queryFn: () => resultsApi.listRoundLeaderboard(roundId as string),
    enabled: !!roundId,
    staleTime: 60_000,
  });

/**
 * For one team + one round: returns [{ score, details[] }, ...]
 * (one entry per judge that scored the team).
 */
export const useTeamRoundBreakdown = (teamId: string, roundId: string) => {
  const scoresQ = useQuery({
    queryKey: RESULTS_KEYS.teamRound(teamId, roundId),
    queryFn: () => resultsApi.listScoresForTeamRound(teamId, roundId),
    enabled: !!teamId && !!roundId,
    staleTime: 60_000,
  });

  const detailQueries = useQueries({
    queries: (scoresQ.data ?? []).map((s) => ({
      queryKey: RESULTS_KEYS.details(s.id),
      queryFn: () => resultsApi.listScoreDetails(s.id),
      staleTime: 60_000,
    })),
  });

  return {
    isLoading: scoresQ.isLoading || detailQueries.some((q) => q.isLoading),
    error: scoresQ.error,
    data: (scoresQ.data ?? []).map((score, i) => ({
      score,
      details: detailQueries[i]?.data ?? [],
    })),
  };
};
