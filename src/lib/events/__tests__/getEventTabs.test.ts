import { getEventTabs } from '../getEventTabs';

describe('getEventTabs', () => {
  test('guest → detail only', () => {
    expect(getEventTabs({ role: null, hasTeam: false }).map((t) => t.id)).toEqual(['detail']);
  });

  test('student without team → detail + createTeam + leaderboard', () => {
    expect(getEventTabs({ role: 'student', hasTeam: false }).map((t) => t.id))
      .toEqual(['detail', 'createTeam', 'leaderboard']);
  });

  test('student always sees the leaderboard tab', () => {
    expect(getEventTabs({ role: 'student', hasTeam: false }).map((t) => t.id))
      .toContain('leaderboard');
    expect(getEventTabs({ role: 'student', hasTeam: true }).map((t) => t.id))
      .toContain('leaderboard');
  });

  test('student with team → detail + myTeam + submission + results + leaderboard', () => {
    expect(getEventTabs({ role: 'student', hasTeam: true }).map((t) => t.id))
      .toEqual(['detail', 'myTeam', 'submission', 'results', 'leaderboard']);
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
