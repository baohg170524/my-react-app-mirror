import type { UserSummary, UserRejectionModel } from '@/services/api';
import type { RegistrationStatus } from './types';

export interface ResolvedRegistration { status: RegistrationStatus; reason: string | null; }

/** approved if isApproved; else rejected if any rejection exists; else pending. */
export function resolveRegistrationStatus(
  profile: UserSummary | null,
  rejections: UserRejectionModel[],
): ResolvedRegistration {
  if (profile?.isApproved) return { status: 'approved', reason: null };
  if (rejections.length) {
    const latest = [...rejections].sort((a, b) => b.createdTime.localeCompare(a.createdTime))[0];
    return { status: 'rejected', reason: latest.reason };
  }
  return { status: 'pending', reason: null };
}
