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
  eventRoleName?: string;
  hasTeam: boolean;
  registrationStatus?: RegistrationStatus | null;
}): EventTab[] {
  const { role, eventRoleName, hasTeam, registrationStatus = null } = args;

  // 1. Admin hệ thống, hoặc được phân công làm EventCoordinator/Admin trong event
  if (role === 'admin' || eventRoleName === 'EventCoordinator' || eventRoleName === 'Admin') {
    return [TAB.detail, TAB.manage];
  }

  // 2. Chỉ khi thực sự được phân làm Judge trong event này
  if (eventRoleName === 'Judge') {
    return [TAB.detail, TAB.judgeAssigned, TAB.leaderboard];
  }

  // 3. Mentor trong event này
  if (eventRoleName === 'Mentor') {
    return [TAB.detail, TAB.myTeam, TAB.submission, TAB.results, TAB.leaderboard];
  }

  // 4. Có vai trò đội (Thí sinh đã có đội)
  if (eventRoleName === 'TeamLeader' || eventRoleName === 'TeamMember' || hasTeam) {
    return [TAB.detail, TAB.register, TAB.myTeam, TAB.submission, TAB.results, TAB.leaderboard];
  }

  // 5. Thí sinh tự do hoặc người dùng thông thường chưa có đội
  if (role === 'student') {
    // Tạo đội chỉ mở khi đã được duyệt.
    return registrationStatus === 'approved'
      ? [TAB.detail, TAB.register, TAB.createTeam, TAB.leaderboard]
      : [TAB.detail, TAB.register];
  }

  // Mặc định (ví dụ MENTOR toàn cục nhưng không tham gia event này)
  return [TAB.detail];
}
