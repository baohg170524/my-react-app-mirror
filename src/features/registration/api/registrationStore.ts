import type { RegistrationRecord } from '../types';

const key = (userId: string, eventId: string) => `reg:${userId}:${eventId}`;

function read(userId: string, eventId: string): RegistrationRecord | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(key(userId, eventId));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as RegistrationRecord;
  } catch {
    return null;
  }
}

function write(record: RegistrationRecord): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key(record.userId, record.eventId), JSON.stringify(record));
}

export const registrationStore = {
  get: read,
  save: write,
  setStatus(
    userId: string,
    eventId: string,
    status: 'pending' | 'approved',
    decidedAt: string | null,
  ): void {
    const current = read(userId, eventId);
    if (!current) return;
    write({ ...current, status, decidedAt });
  },
  remove(userId: string, eventId: string): void {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key(userId, eventId));
  },
};
