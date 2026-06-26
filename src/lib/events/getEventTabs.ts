import type { AppRole } from '@/hooks/useUserRole';
import type { RegistrationStatus } from '@/features/registration/types';

export type EventTabId =
  | 'detail' | 'register' | 'createTeam' | 'myTeam' | 'submission'
  | 'results' | 'leaderboard' | 'judgeAssigned' | 'manage';

export interface EventTab { id: EventTabId; label: string; }

const TAB: Record<EventTabId, EventTab> = {
  detail:        { id: 'detail',        label: 'Chi tiết sự kiện' },
  register:      { id: 'register',      label: 'Đăng ký thi đấu' },
  createTeam:    { id: 'createTeam',    label: 'Tạo đội' },
  myTeam:        { id: 'myTeam',        label: 'Đội của tôi' },
  submission:    { id: 'submission',    label: 'Nộp bài' },
  results:       { id: 'results',       label: 'Kết quả' },
  leaderboard:   { id: 'leaderboard',   label: 'Bảng xếp hạng' },
  judgeAssigned: { id: 'judgeAssigned', label: 'Đội được phân công' },
  manage:        { id: 'manage',        label: 'Quản lý' },
};

export function getEventTabs(args: {
  role: AppRole | null;
  hasTeam: boolean;
  registrationStatus?: RegistrationStatus | null;
}): EventTab[] {
  const { role, hasTeam, registrationStatus = null } = args;
  if (role === 'admin') return [TAB.detail];
  if (role === 'judge') return [TAB.detail, TAB.judgeAssigned, TAB.leaderboard];
  if (role === 'student') {
    if (hasTeam) {
      return [TAB.detail, TAB.register, TAB.myTeam, TAB.submission, TAB.results, TAB.leaderboard];
    }
    // Tạo đội chỉ mở khi đã được duyệt.
    return registrationStatus === 'approved'
      ? [TAB.detail, TAB.register, TAB.createTeam, TAB.leaderboard]
      : [TAB.detail, TAB.register];
  }
  return [TAB.detail];
}
