'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { registrationStore } from '../api/registrationStore';
import { userRejectionsApi } from '../api/userRejections';
import { resolveRegistrationStatus } from '../status';
import type { RegistrationFormValues } from '../types';

export const REGISTRATION_KEYS = {
  record: (userId: string, eventId: string) => ['registration', userId, eventId] as const,
  rejections: (userId: string) => ['userRejections', userId] as const,
};

export function useRegistration(eventId: string, userId: string) {
  const qc = useQueryClient();
  const enabled = !!eventId && !!userId;

  const recordQ = useQuery({
    queryKey: REGISTRATION_KEYS.record(userId, eventId),
    queryFn: async () => registrationStore.get(userId, eventId),
    enabled,
    staleTime: 0,
  });

  const rejectionsQ = useQuery({
    queryKey: REGISTRATION_KEYS.rejections(userId),
    queryFn: () => userRejectionsApi.listForUser(userId),
    enabled,
    staleTime: 60_000,
  });

  const resolved = resolveRegistrationStatus(recordQ.data ?? null, rejectionsQ.data ?? []);

  const submit = (values: RegistrationFormValues, submittedAt: string) => {
    registrationStore.save({
      ...values,
      userId,
      eventId,
      status: 'pending',
      submittedAt,
      decidedAt: null,
    });
    qc.invalidateQueries({ queryKey: REGISTRATION_KEYS.record(userId, eventId) });
  };

  return {
    status: resolved.status,
    reason: resolved.reason,
    record: recordQ.data ?? null,
    isLoading: recordQ.isLoading || rejectionsQ.isLoading,
    submit,
  };
}
