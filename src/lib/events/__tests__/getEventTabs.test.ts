import { getEventTabs } from '../getEventTabs';

describe('getEventTabs', () => {
  test('guest → detail only', () => {
    expect(getEventTabs({ role: null, hasTeam: false }).map((t) => t.id)).toEqual(['detail']);
  });

  test('student not approved → detail + register (no createTeam)', () => {
    expect(getEventTabs({ role: 'student', hasTeam: false, registrationStatus: 'pending' }).map((t) => t.id))
      .toEqual(['detail', 'register']);
    expect(getEventTabs({ role: 'student', hasTeam: false, registrationStatus: null }).map((t) => t.id))
      .toEqual(['detail', 'register']);
    expect(getEventTabs({ role: 'student', hasTeam: false, registrationStatus: 'rejected' }).map((t) => t.id))
      .toEqual(['detail', 'register']);
  });

  test('student approved without team → detail + register + createTeam + leaderboard', () => {
    expect(getEventTabs({ role: 'student', hasTeam: false, registrationStatus: 'approved' }).map((t) => t.id))
      .toEqual(['detail', 'register', 'createTeam', 'leaderboard']);
  });

  test('student with team → detail + register + myTeam + submission + results + leaderboard', () => {
    expect(getEventTabs({ role: 'student', hasTeam: true, registrationStatus: 'approved' }).map((t) => t.id))
      .toEqual(['detail', 'register', 'myTeam', 'submission', 'results', 'leaderboard']);
  });

  test('judge → detail + judgeAssigned + leaderboard', () => {
    expect(getEventTabs({ role: 'judge', hasTeam: false }).map((t) => t.id))
      .toEqual(['detail', 'judgeAssigned', 'leaderboard']);
  });

  test('admin → detail only (admins are redirected to the manage page)', () => {
    expect(getEventTabs({ role: 'admin', hasTeam: false }).map((t) => t.id))
      .toEqual(['detail']);
  });
});
