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

  test('judge event role → detail + scoring + reviewSubmission + leaderboard', () => {
    expect(getEventTabs({ role: 'student', eventRoleName: 'Judge', hasTeam: false }).map((t) => t.id))
      .toEqual(['detail', 'scoring', 'reviewSubmission', 'leaderboard']);
  });

  test('mentor event role → detail + reviewSubmission + leaderboard', () => {
    expect(getEventTabs({ role: 'student', eventRoleName: 'Mentor', hasTeam: false }).map((t) => t.id))
      .toEqual(['detail', 'reviewSubmission', 'leaderboard']);
  });

  test('admin or EC event role → detail + manage', () => {
    expect(getEventTabs({ role: 'student', eventRoleName: 'EventCoordinator', hasTeam: false }).map((t) => t.id))
      .toEqual(['detail', 'manage']);
    expect(getEventTabs({ role: 'admin', hasTeam: false }).map((t) => t.id))
      .toEqual(['detail', 'manage']);
  });

  test('global mentor but no event role → detail only', () => {
    expect(getEventTabs({ role: 'judge', hasTeam: false }).map((t) => t.id))
      .toEqual(['detail']);
  });
});
