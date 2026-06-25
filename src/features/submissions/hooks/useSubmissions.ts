'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { submissionsApi } from '../api/submissions';
import type { CreateSubmissionPayload, UpdateSubmissionPayload } from '../api/submissions';

export const SUB_KEYS = {
  list: (teamId: string, roundId?: string) => ['submissions', teamId, roundId ?? 'all'] as const,
};

export const useTeamSubmissions = (teamId: string, roundId?: string) =>
  useQuery({
    queryKey: SUB_KEYS.list(teamId, roundId),
    queryFn: () => submissionsApi.list({ teamId, roundId }),
    enabled: !!teamId,
    staleTime: 60_000,
  });

export const useCreateSubmission = (teamId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: CreateSubmissionPayload) => submissionsApi.create(p),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['submissions', teamId] }),
  });
};

export const useUpdateSubmission = (teamId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: UpdateSubmissionPayload) => submissionsApi.update(p),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['submissions', teamId] }),
  });
};
