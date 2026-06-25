import { getEventTabs } from '../getEventTabs';

describe('getEventTabs', () => {
  test('guest (null role) → detail only', () => {
    expect(getEventTabs({ role: null }).map((t) => t.id)).toEqual(['detail']);
  });

  test('participant → detail + myTeam + submission + leaderboard', () => {
    expect(getEventTabs({ role: 'participant' }).map((t) => t.id))
      .toEqual(['detail', 'myTeam', 'submission', 'leaderboard']);
  });

  test('participant does NOT get a separate results tab', () => {
    expect(getEventTabs({ role: 'participant' }).map((t) => t.id)).not.toContain('results');
  });

  test('judge → detail + judgeAssigned + leaderboard', () => {
    expect(getEventTabs({ role: 'judge' }).map((t) => t.id))
      .toEqual(['detail', 'judgeAssigned', 'leaderboard']);
  });

  test('admin → detail only', () => {
    expect(getEventTabs({ role: 'admin' }).map((t) => t.id)).toEqual(['detail']);
  });
});
