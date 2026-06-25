import type { DashboardRole } from './eventRole';

export type EventTabId =
  | 'detail' | 'createTeam' | 'myTeam' | 'submission'
  | 'results' | 'leaderboard' | 'judgeAssigned';

export interface EventTab { id: EventTabId; label: string; }

const TAB: Record<EventTabId, EventTab> = {
  detail:        { id: 'detail',        label: 'Chi tiết sự kiện' },
  createTeam:    { id: 'createTeam',    label: 'Tạo đội' },
  myTeam:        { id: 'myTeam',        label: 'Đăng ký / Đội của tôi' },
  submission:    { id: 'submission',    label: 'Nộp bài' },
  results:       { id: 'results',       label: 'Kết quả' },
  leaderboard:   { id: 'leaderboard',   label: 'Bảng xếp hạng' },
  judgeAssigned: { id: 'judgeAssigned', label: 'Đội được phân công' },
};

/**
 * Tabs for the event dashboard, keyed by the user's per-event dashboard role.
 *
 * - participant: event detail (read-only, admin-style), registration/team,
 *   submission, leaderboard. The "myTeam" tab handles the register → team-view
 *   transition internally, so it is shown regardless of whether a team exists.
 * - judge: detail, assigned teams, leaderboard.
 * - admin: detail only (admins are normally redirected to /manage).
 */
export function getEventTabs(args: { role: DashboardRole | null }): EventTab[] {
  switch (args.role) {
    case 'admin':
      return [TAB.detail];
    case 'judge':
      return [TAB.detail, TAB.judgeAssigned, TAB.leaderboard];
    case 'participant':
      return [TAB.detail, TAB.myTeam, TAB.submission, TAB.leaderboard];
    default:
      return [TAB.detail];
  }
}
