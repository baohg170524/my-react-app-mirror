import { registrationStore } from '../registrationStore';
import type { RegistrationRecord } from '../../types';

const rec = (over: Partial<RegistrationRecord> = {}): RegistrationRecord => ({
  userId: 'u1', eventId: 'e1', fullName: 'Nguyễn Văn A', email: 'a@e.com',
  schoolChoice: 'FPT', schoolName: null, studentCode: 'SE123', photoStudentCardUrl: null,
  note: null, status: 'pending', submittedAt: '2026-06-23T00:00:00Z', decidedAt: null, ...over,
});

describe('registrationStore', () => {
  beforeEach(() => localStorage.clear());

  test('get returns null when nothing saved', () => {
    expect(registrationStore.get('u1', 'e1')).toBeNull();
  });

  test('save then get round-trips, scoped by user+event', () => {
    registrationStore.save(rec());
    expect(registrationStore.get('u1', 'e1')?.studentCode).toBe('SE123');
    expect(registrationStore.get('u1', 'e2')).toBeNull();
  });

  test('setStatus updates status + decidedAt', () => {
    registrationStore.save(rec());
    registrationStore.setStatus('u1', 'e1', 'approved', '2026-06-24T00:00:00Z');
    const got = registrationStore.get('u1', 'e1');
    expect(got?.status).toBe('approved');
    expect(got?.decidedAt).toBe('2026-06-24T00:00:00Z');
  });

  test('remove deletes the record', () => {
    registrationStore.save(rec());
    registrationStore.remove('u1', 'e1');
    expect(registrationStore.get('u1', 'e1')).toBeNull();
  });
});
