import { resolveRegistrationStatus } from '../status';
import type { UserSummary } from '@/services/api';
import type { UserRejectionModel } from '@/services/api';

const profile = (over: Partial<UserSummary> = {}): UserSummary => ({
  id: 'u1', email: 'a@e.com', fullName: 'Nguyễn Văn A', studentCode: 'SE1',
  schoolId: 'school1', isStudent: true, isAdmin: false, isApproved: false,
  isFpt: true, photoStudentCardUrl: null, ...over,
});

const rej = (over: Partial<UserRejectionModel> = {}): UserRejectionModel => ({
  id: 'r1', userId: 'u1', rejectedBy: 'admin', reason: 'thiếu ảnh thẻ',
  isActive: true,
  createdTime: '2026-06-24T00:00:00Z', lastUpdatedTime: '2026-06-24T00:00:00Z', ...over,
});

describe('resolveRegistrationStatus', () => {
  test('approved when profile.isApproved', () => {
    expect(resolveRegistrationStatus(profile({ isApproved: true }), []))
      .toEqual({ status: 'approved', reason: null });
  });

  test('rejected when an active rejection exists', () => {
    expect(resolveRegistrationStatus(profile(), [rej({ isActive: true, reason: 'thiếu ảnh thẻ' })]))
      .toEqual({ status: 'rejected', reason: 'thiếu ảnh thẻ' });
  });

  test('pending when rejections exist but none are active (isActive: false)', () => {
    const out = resolveRegistrationStatus(profile(), [
      rej({ id: 'old', reason: 'cũ', isActive: false }),
    ]);
    expect(out).toEqual({ status: 'pending', reason: null });
  });

  test('pending when no rejection and profile not approved', () => {
    expect(resolveRegistrationStatus(profile(), []))
      .toEqual({ status: 'pending', reason: null });
  });

  test('pending when profile is null and no rejections', () => {
    expect(resolveRegistrationStatus(null, []))
      .toEqual({ status: 'pending', reason: null });
  });
});
