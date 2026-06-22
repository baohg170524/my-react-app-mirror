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

  // UserRejectionModel không có eventId — rejection là account-level, áp dụng cho mọi sự kiện.
  // Vì vậy, dù người dùng đăng ký lại (submittedAt mới hơn), trạng thái vẫn là pending chứ không
  // phải rejected — chỉ khi rejection mới hơn hoặc bằng submittedAt thì mới coi là bị từ chối.
  // Bị từ chối nếu có rejection và nó KHÔNG cũ hơn lần gửi gần nhất.
  if (latest && (!record || latest.createdTime >= record.submittedAt)) {
    return { status: 'rejected', reason: latest.reason };
  }
  if (!record) return { status: null, reason: null };
  if (record.status === 'approved') return { status: 'approved', reason: null };
  return { status: 'pending', reason: null };
}
