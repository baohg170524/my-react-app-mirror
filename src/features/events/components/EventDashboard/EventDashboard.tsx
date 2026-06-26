'use client';

import React, { useEffect, useRef } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { EventDetailTab } from './tabs/EventDetail';
import { CreateTeamTab } from './tabs/CreateTeam';
import { MyTeamTab } from './tabs/MyTeam';
import { SubmissionTab } from './tabs/Submission';
import { ResultsTab } from './tabs/Results';
import { LeaderboardTab } from './tabs/Leaderboard';
import { JudgeAssignedTeamsTab } from './tabs/JudgeAssignedTeams';
import { CompetitionRegistrationTab } from '@/features/registration/components/CompetitionRegistrationTab';
import { useEventDashboard } from '@/features/events/contexts/EventDashboardContext';
import { useEvent } from '@/features/events/hooks/useEvents';
import { useMyTeamForEvent } from '@/features/teams/hooks/useTeams';
import { useUserRole } from '@/hooks/useUserRole';
import { useRouter } from 'next/navigation';

interface EventDashboardProps { eventId: string; userId: string; }

export function EventDashboard({ eventId, userId }: EventDashboardProps) {
  const router = useRouter();
  const { activeTab } = useEventDashboard();
  const { data: event, isLoading: eventLoading } = useEvent(eventId);
  const { data: team } = useMyTeamForEvent(eventId, userId);
  const role = useUserRole();
  const adminRedirected = useRef(false);

  // Admins manage an event on its dedicated page — skip the dashboard entirely.
  useEffect(() => {
    if (!adminRedirected.current && role === 'admin') {
      adminRedirected.current = true;
      router.replace(`/events/${eventId}/manage`);
    }
  }, [role, eventId, router]);

  if (eventLoading) {
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

  const teamId = team?.id ?? '';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'detail':        return <EventDetailTab eventId={eventId} userId={userId} />;
      case 'register':      return <CompetitionRegistrationTab userId={userId} />;
      case 'createTeam':    return <CreateTeamTab  eventId={eventId} userId={userId} />;
      case 'myTeam':        return <MyTeamTab      eventId={eventId} userId={userId} />;
      case 'submission':    return teamId
        ? <SubmissionTab teamId={teamId} eventId={eventId} />
        : <div className="t-body-md text-mute p-6">Bạn cần tạo đội trước.</div>;
      case 'results':       return teamId
        ? <ResultsTab teamId={teamId} eventId={eventId} />
        : <div className="t-body-md text-mute p-6">Chưa có kết quả.</div>;
      case 'leaderboard':   return <LeaderboardTab        eventId={eventId} userId={userId} />;
      case 'judgeAssigned': return <JudgeAssignedTeamsTab eventId={eventId} userId={userId} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar eventId={eventId} />
      <Header title={event.title} subtitle="Team Competition" status={event.status} />
      <main className="fixed top-24 md:top-20 left-0 right-0 bottom-0 overflow-hidden bg-canvas lg:left-60">
        <div className="h-full overflow-y-auto p-3 md:p-6">
          <div className="animate-fadeIn">{renderTabContent()}</div>
        </div>
      </main>
    </div>
  );
}
