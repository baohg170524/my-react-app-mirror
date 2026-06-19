'use client';

export function useMockEventData() {
  const event = {
    id: 'evt-001',
    title: 'Web Development Challenge 2026',
    startDate: new Date('2026-06-15'),
    endDate: new Date('2026-06-30'),
    status: 'open' as const,
    submissionType: 'ZIP Upload',
    description: 'Build a full-stack web application with modern technologies. Teams must submit a working prototype.',
  };

  const teams = [
    { id: 'team-001', name: 'Code Warriors', leader: 'Kim Test', members: 3 },
    { id: 'team-002', name: 'Tech Innovators', leader: 'Jane Doe', members: 4 },
    { id: 'team-003', name: 'Future Dev', leader: 'John Smith', members: 2 },
    { id: 'team-004', name: 'Algorithm Masters', leader: 'Sarah Wilson', members: 5 },
    { id: 'team-005', name: 'Digital Pioneers', leader: 'Mike Johnson', members: 3 },
  ];

  const userTeam = teams[0];

  const submissions = [
    {
      id: 'sub-001',
      date: new Date('2026-06-20'),
      type: 'ZIP',
      status: 'submitted' as const,
    },
    {
      id: 'sub-002',
      date: new Date('2026-06-25'),
      type: 'ZIP',
      status: 'pending-review' as const,
    },
  ];

  const scoreBreakdown = [
    { criterion: 'Code Quality', score: 85, max: 100, status: 'graded' as const },
    { criterion: 'Functionality', score: 92, max: 100, status: 'graded' as const },
    { criterion: 'Design', score: 78, max: 100, status: 'pending' as const },
    { criterion: 'Documentation', score: 88, max: 100, status: 'graded' as const },
  ];

  const leaderboard = [
    { rank: 1, teamName: 'Tech Innovators', score: 358, status: 'graded' },
    { rank: 2, teamName: 'Algorithm Masters', score: 343, status: 'graded' },
    { rank: 3, teamName: 'Code Warriors', score: 343, status: 'pending-review' },
    { rank: 4, teamName: 'Digital Pioneers', score: 320, status: 'submitted' },
    { rank: 5, teamName: 'Future Dev', score: 285, status: 'submitted' },
  ];

  const avgScore = 339;

  return {
    event,
    teams,
    userTeam,
    submissions,
    scoreBreakdown,
    leaderboard,
    avgScore,
  };
}
