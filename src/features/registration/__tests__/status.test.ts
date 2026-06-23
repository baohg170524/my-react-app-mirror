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
  createdTime: '2026-06-24T00:00:00Z', ...over,
});

describe('resolveRegistrationStatus', () => {
  test('approved when profile.isApproved', () => {
    expect(resolveRegistrationStatus(profile({ isApproved: true }), []))
      .toEqual({ status: 'approved', reason: null });
  });

  test('rejected when a rejection exists — uses latest reason', () => {
    expect(resolveRegistrationStatus(profile(), [rej()]))
      .toEqual({ status: 'rejected', reason: 'thiếu ảnh thẻ' });
  });

  test('multiple rejections → latest reason', () => {
    const out = resolveRegistrationStatus(profile(), [
      rej({ id: 'old', reason: 'cũ', createdTime: '2026-06-23T12:00:00Z' }),
      rej({ id: 'new', reason: 'mới', createdTime: '2026-06-24T12:00:00Z' }),
    ]);
    expect(out).toEqual({ status: 'rejected', reason: 'mới' });
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
