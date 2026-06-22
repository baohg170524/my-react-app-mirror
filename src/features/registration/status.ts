import type { RegistrationRecord, RegistrationStatus } from './types';
import type { UserRejectionModel } from '@/services/api';

export interface ResolvedRegistration {
  /** null ⇒ chưa đăng ký (hiện form). */
  status: RegistrationStatus | null;
  reason: string | null;
}

export function resolveRegistrationStatus(
  record: RegistrationRecord | null,
  rejections: UserRejectionModel[],
): ResolvedRegistration {
  const latest = rejections.length
    ? [...rejections].sort((a, b) => b.createdTime.localeCompare(a.createdTime))[0]
    : null;

  // Bị từ chối nếu có rejection và nó KHÔNG cũ hơn lần gửi gần nhất.
  if (latest && (!record || latest.createdTime >= record.submittedAt)) {
    return { status: 'rejected', reason: latest.reason };
  }
  if (!record) return { status: null, reason: null };
  if (record.status === 'approved') return { status: 'approved', reason: null };
  return { status: 'pending', reason: null };
}
