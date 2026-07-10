import apiClient from './apiClient';

// Client đã unwrap BaseResponse<T> → response.data = env.data trực tiếp.

const ENDPOINTS = {
  TEAMS:        '/teams',
  LEADERBOARD:  '/scoring/leaderboard',
  UPDATE_SCORE: (teamId) => `/scoring/${teamId}`,
  EXPORT_CSV:   '/scoring/export/csv',
};

// GET /teams  [Authorize(Roles = "Admin,Judge")]
export const getTeams = async () => {
  const response = await apiClient.get(ENDPOINTS.TEAMS);
  return response.data ?? [];
};

// GET /scoring/leaderboard
export const getLeaderboard = async () => {
  const response = await apiClient.get(ENDPOINTS.LEADERBOARD);
  return response.data ?? [];
};

// PUT /scoring/{teamId}  [Authorize(Roles = "Admin,Judge")]
export const saveScore = async (teamId, criteriaScores, comments, criteria) => {
  const payload = {
    criteriaScores: criteria.map((c, i) => ({
      criteriaId: c.id,
      score:      criteriaScores[i] ?? 0,
      comment:    comments[i] ?? '',
    })),
  };
  const response = await apiClient.put(ENDPOINTS.UPDATE_SCORE(teamId), payload);
  return response.data;
};

// GET /scoring/export/csv  [Authorize(Roles = "Admin,Judge")]
export const exportLeaderboardCsv = async (rankedTeams, criteria) => {
  try {
    const response = await apiClient.get(ENDPOINTS.EXPORT_CSV, {
      responseType: 'blob',
    });
    const url = URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leaderboard.csv';
    a.click();
  } catch {
    generateCsvClientSide(rankedTeams, criteria);
  }
};

const generateCsvClientSide = (rankedTeams, criteria) => {
  const calcScore = (scores, crit) =>
    Math.round(crit.reduce((s, c, i) => s + (scores[i] || 0) * (c.weight / 10), 0) * 100) / 100;

  const header = ['Rank', 'TeamId', 'TeamName', ...criteria.map(c => c.label), 'TotalScore'];
  const rows = rankedTeams.map((t, i) => [
    i + 1, t.id, t.name,
    ...t.scores.map(s => s.toFixed(2)),
    calcScore(t.scores, criteria).toFixed(2),
  ]);
  const csv = [header, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'leaderboard.csv';
  a.click();
};
