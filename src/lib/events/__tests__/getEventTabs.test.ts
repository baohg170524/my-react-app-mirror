import { getEventTabs } from '../getEventTabs';

describe('getEventTabs', () => {
  test('guest → detail only', () => {
    expect(getEventTabs({ role: null, hasTeam: false }).map((t) => t.id)).toEqual(['detail']);
  });

  test('student without team → detail + createTeam', () => {
    expect(getEventTabs({ role: 'student', hasTeam: false }).map((t) => t.id))
      .toEqual(['detail', 'createTeam']);
  });

  test('student with team → detail + myTeam + submission + results + leaderboard', () => {
    expect(getEventTabs({ role: 'student', hasTeam: true }).map((t) => t.id))
      .toEqual(['detail', 'myTeam', 'submission', 'results', 'leaderboard']);
  });

  test('judge → detail + judgeAssigned + leaderboard', () => {
    expect(getEventTabs({ role: 'judge', hasTeam: false }).map((t) => t.id))
      .toEqual(['detail', 'judgeAssigned', 'leaderboard']);
  });

  test('admin → detail + manage', () => {
    expect(getEventTabs({ role: 'admin', hasTeam: false }).map((t) => t.id))
      .toEqual(['detail', 'manage']);
  });
});
