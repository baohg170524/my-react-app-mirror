import { resolveRegistrationStatus } from '../status';
import type { RegistrationRecord } from '../types';
import type { UserRejectionModel } from '@/services/api';

const record = (over: Partial<RegistrationRecord> = {}): RegistrationRecord => ({
  userId: 'u1', eventId: 'e1', fullName: 'A', email: 'a@e.com', schoolChoice: 'FPT',
  schoolName: null, studentCode: 'SE1', photoStudentCardUrl: null, note: null,
  status: 'pending', submittedAt: '2026-06-23T00:00:00Z', decidedAt: null, ...over,
});
const rej = (over: Partial<UserRejectionModel> = {}): UserRejectionModel => ({
  id: 'r1', userId: 'u1', rejectedBy: 'admin', reason: 'thiếu ảnh thẻ',
  createdTime: '2026-06-24T00:00:00Z', ...over,
});

describe('resolveRegistrationStatus', () => {
  test('no record, no rejection → not registered (null)', () => {
    expect(resolveRegistrationStatus(null, [])).toEqual({ status: null, reason: null });
  });

  test('record pending → pending', () => {
    expect(resolveRegistrationStatus(record(), [])).toEqual({ status: 'pending', reason: null });
  });

  test('record approved → approved', () => {
    expect(resolveRegistrationStatus(record({ status: 'approved' }), []))
      .toEqual({ status: 'approved', reason: null });
  });

  test('rejection newer than submission → rejected with reason', () => {
    expect(resolveRegistrationStatus(record(), [rej()]))
      .toEqual({ status: 'rejected', reason: 'thiếu ảnh thẻ' });
  });

  test('resubmit: rejection OLDER than new submission → not rejected (pending)', () => {
    const r = record({ submittedAt: '2026-06-25T00:00:00Z' });
    expect(resolveRegistrationStatus(r, [rej({ createdTime: '2026-06-24T00:00:00Z' })]))
      .toEqual({ status: 'pending', reason: null });
  });

  test('multiple rejections → uses the latest', () => {
    const out = resolveRegistrationStatus(record(), [
      rej({ id: 'old', reason: 'cũ', createdTime: '2026-06-23T12:00:00Z' }),
      rej({ id: 'new', reason: 'mới', createdTime: '2026-06-24T12:00:00Z' }),
    ]);
    expect(out).toEqual({ status: 'rejected', reason: 'mới' });
  });
});
