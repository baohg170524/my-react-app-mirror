import { StatusBadge as SharedStatusBadge } from './components/StatusBadge';

// Hệ 100: tổng weight tất cả tiêu chí = 100, mỗi tiêu chí chấm 0-maxScore,
// quy đổi theo trọng số (weight/100) rồi cộng lại → tổng tối đa luôn = 10.
export const calcScore = (scores, criteria) => {
  if (!scores || !criteria || scores.length === 0) return 0;
  const total = criteria.reduce((sum, c, i) => sum + (scores[i] || 0) * (c.weight / 100), 0);
  return Math.round(total * 100) / 100;
};

export const totalWeight = (criteria) => criteria.reduce((s, c) => s + Number(c.weight), 0);

// Monogreen — medal colors kept, rank backgrounds go light
export const getRankColor = (r) => r === 1 ? '#b8860b' : r === 2 ? '#757575' : r === 3 ? '#8b5a2b' : '#000000';
export const getRankBg    = (r) => r === 1 ? 'rgba(255,215,0,.08)' : r === 2 ? 'rgba(0,0,0,.04)' : r === 3 ? 'rgba(205,127,50,.07)' : 'transparent';
export const getRankIcon  = (r) => r === 1 ? '🥇' : r === 2 ? '🥈' : r === 3 ? '🥉' : `#${r}`;

export const STATUS_MAP = {
  'Chờ xử lý': { tone: 'pending', label: 'Chờ xử lý' },
  'Đang xét': { tone: 'processing', label: 'Đang xét' },
  'Đã duyệt': { tone: 'success', label: 'Đã duyệt' },
  'Từ chối': { tone: 'danger', label: 'Từ chối' },
};

export const StatusBadge = ({ status }) => {
  const s = STATUS_MAP[status] || STATUS_MAP['Chờ xử lý'];
  return <SharedStatusBadge tone={s.tone}>{status}</SharedStatusBadge>;
};

export const calcScoreNormalized = (scores, criteria) => {
  if (!scores || !criteria || scores.length === 0) return 0;
  const total = criteria.reduce((sum, c, i) => {
    const max = c.maxScore || 10;
    return sum + ((scores[i] || 0) / max) * (c.weight / 10);
  }, 0);
  return Math.round(total * 100) / 100;
};
