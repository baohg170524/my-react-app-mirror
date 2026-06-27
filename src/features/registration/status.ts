import type { UserSummary, UserRejectionModel } from '@/services/api';
import type { RegistrationStatus } from './types';

export interface ResolvedRegistration { status: RegistrationStatus; reason: string | null; }

/** approved if isApproved; else rejected if any rejection exists; else pending. */
export function resolveRegistrationStatus(
  profile: UserSummary | null,
  rejections: UserRejectionModel[],
): ResolvedRegistration {
  if (profile?.isApproved) return { status: 'approved', reason: null };
  
  // Find active rejection
  const activeRejection = rejections.find((r) => r.isActive);
  if (activeRejection) {
    return { status: 'rejected', reason: activeRejection.reason };
  }
  
  return { status: 'pending', reason: null };
}
