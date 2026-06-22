import type { AppRole } from '@/hooks/useUserRole';

export type EventTabId =
  | 'detail' | 'createTeam' | 'myTeam' | 'submission'
  | 'results' | 'leaderboard' | 'judgeAssigned' | 'manage';

export interface EventTab { id: EventTabId; label: string; }

const TAB: Record<EventTabId, EventTab> = {
  detail:        { id: 'detail',        label: 'Chi tiết sự kiện' },
  createTeam:    { id: 'createTeam',    label: 'Tạo đội' },
  myTeam:        { id: 'myTeam',        label: 'Đội của tôi' },
  submission:    { id: 'submission',    label: 'Nộp bài' },
  results:       { id: 'results',       label: 'Kết quả' },
  leaderboard:   { id: 'leaderboard',   label: 'Bảng xếp hạng' },
  judgeAssigned: { id: 'judgeAssigned', label: 'Đội được phân công' },
  manage:        { id: 'manage',        label: 'Quản lý' },
};

export function getEventTabs(args: { role: AppRole | null; hasTeam: boolean }): EventTab[] {
  const { role, hasTeam } = args;
  if (role === 'admin')   return [TAB.detail];
  if (role === 'judge')   return [TAB.detail, TAB.judgeAssigned, TAB.leaderboard];
  if (role === 'student') return hasTeam
    ? [TAB.detail, TAB.myTeam, TAB.submission, TAB.results, TAB.leaderboard]
    : [TAB.detail, TAB.createTeam, TAB.leaderboard];
  return [TAB.detail];
}
