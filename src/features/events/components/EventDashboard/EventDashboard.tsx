'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Modal } from './Modal';
import { DashboardTab } from './tabs/Dashboard';
import { SubmissionTab } from './tabs/Submission';
import { ResultsTab } from './tabs/Results';
import { TeamRegistrationForm } from './TeamRegistrationForm';
import { useEventDashboard } from '@/features/events/contexts/EventDashboardContext';
import { useEvent, useUserTeam, useEventTeams } from '@/features/events/hooks/useEvents';

interface EventDashboardProps {
  eventId: string;
  userId: string;
}

export function EventDashboard({ eventId, userId }: EventDashboardProps) {
  const { activeTab, isModalOpen, setIsModalOpen } = useEventDashboard();

  // Fetch real data
  const { data: event, isLoading: eventLoading } = useEvent(eventId);
  const { data: userTeam, isLoading: userTeamLoading } = useUserTeam(eventId, userId);
  const { isLoading: teamsLoading } = useEventTeams(eventId);

  const isLoading = eventLoading || userTeamLoading || teamsLoading;

  if (isLoading) {
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab eventId={eventId} userId={userId} />;
      case 'submission':
        return userTeam ? <SubmissionTab teamId={userTeam.id} eventId={eventId} /> : <div className="t-body-md text-mute p-6">Please register a team first</div>;
      case 'results':
        return userTeam ? <ResultsTab teamId={userTeam.id} eventId={eventId} /> : <div className="t-body-md text-mute p-6">Results available after submission</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar />
      <Header
        title={event.title}
        subtitle="Team Competition"
        status={event.status}
        submissionType={event.submissionType}
      />
      <main className="fixed top-24 md:top-20 left-0 right-0 bottom-0 overflow-hidden bg-canvas lg:left-60">
        <div className="h-full overflow-y-auto p-3 md:p-6">
          <div className="animate-fadeIn">{renderTabContent()}</div>
        </div>
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Team">
        <TeamRegistrationForm eventId={eventId} userId={userId} />
      </Modal>
    </div>
  );
}
