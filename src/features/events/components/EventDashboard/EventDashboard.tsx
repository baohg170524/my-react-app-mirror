'use client';

import React from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { EventDetailTab } from './tabs/EventDetail';
import { TeamTab } from './tabs/TeamTab';
import { SubmissionTab } from './tabs/Submission';
import { LeaderboardTab } from './tabs/Leaderboard';
import { JudgeAssignedTeamsTab } from './tabs/JudgeAssignedTeams';
import { useEventDashboard } from '@/features/events/contexts/EventDashboardContext';
import { useEvent } from '@/features/events/hooks/useEvents';
import { useMyTeam } from '@/features/teams/hooks/useTeams';

interface EventDashboardProps { eventId: string; userId: string; }

export function EventDashboard({ eventId, userId }: EventDashboardProps) {
  const { activeTab } = useEventDashboard();
  const { data: event, isLoading: eventLoading } = useEvent(eventId);
  const { data: team, isLoading: teamLoading } = useMyTeam(eventId);

  if (eventLoading || teamLoading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="t-body-md text-mute">Loading event...</p>
        </div>
      </div>
    );
  }
  if (!event) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <p className="t-heading-md text-error">Event not found</p>
      </div>
    );
  }

  // Hidden events are admin-only. Admins are redirected to /manage at the page
  // level, so anyone reaching here on a hidden event is not allowed to view it.
  if (event.status === 'hidden') {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center gap-3">
        <p className="t-heading-md text-error">Sự kiện này chưa được mở.</p>
        <Link href="/" className="btn btn-primary">Về danh sách sự kiện</Link>
      </div>
    );
  }

  const teamId = team?.id ?? '';
  // An event past its end date is read-only: viewable, but every write action
  // (register, invite, leave, submit, score) is disabled.
  const readOnly = event.status === 'ended';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'detail':        return <EventDetailTab eventId={eventId} userId={userId} />;
      case 'myTeam':        return <TeamTab eventId={eventId} userId={userId} readOnly={readOnly} />;
      case 'submission':    return teamId
        ? <SubmissionTab teamId={teamId} eventId={eventId} readOnly={readOnly} />
        : <div className="t-body-md text-mute p-6">Bạn cần đăng ký đội trước.</div>;
      case 'leaderboard':   return <LeaderboardTab        eventId={eventId} userId={userId} />;
      case 'judgeAssigned': return <JudgeAssignedTeamsTab eventId={eventId} userId={userId} readOnly={readOnly} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar eventId={eventId} />
      <Header title={event.title} subtitle="Team Competition" />
      <main
        id="event-tabpanel"
        role="tabpanel"
        aria-labelledby={`event-tab-${activeTab}`}
        className="fixed top-24 md:top-20 left-0 right-0 bottom-0 overflow-hidden bg-canvas lg:left-60"
      >
        <div className="h-full overflow-y-auto p-3 md:p-6">
          {readOnly && (
            <div
              role="status"
              className="mb-4 flex items-center gap-2 rounded-sm border border-hairline bg-surface-soft px-4 py-3 t-body-sm text-ink"
            >
              <Lock size={16} aria-hidden="true" className="text-mute shrink-0" />
              Sự kiện đã kết thúc — chỉ xem, không thể chỉnh sửa.
            </div>
          )}
          <div className="animate-fadeIn">{renderTabContent()}</div>
        </div>
      </main>
    </div>
  );
}
