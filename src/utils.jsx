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
  'Chờ xử lý': { cls: 'badge-warn',   label: 'Chờ xử lý' },
  'Đang xét':  { cls: 'badge-blue',   label: 'Đang xét'  },
  'Đã duyệt':  { cls: 'badge-accent', label: 'Đã duyệt'  },
  'Từ chối':   { cls: 'badge-danger', label: 'Từ chối'   },
};

export const StatusBadge = ({ status }) => {
  const s = STATUS_MAP[status] || STATUS_MAP['Chờ xử lý'];
  return <span className={s.cls}>{status}</span>;
};
