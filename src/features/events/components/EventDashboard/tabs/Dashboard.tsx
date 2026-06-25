'use client';

import React from 'react';
import { useEvent, useEventTeams, useUserTeam } from '@/features/events/hooks/useEvents';
import { useEventDashboard } from '@/features/events/contexts/EventDashboardContext';
import { Card } from '../Card';
import { Button } from '../Button';
import { CardSkeleton } from '../SkeletonLoaders';

interface DashboardTabProps {
  eventId: string;
  userId: string;
}

export function DashboardTab({ eventId, userId }: DashboardTabProps) {
  const { setIsModalOpen } = useEventDashboard();
  const { data: event, isLoading: eventLoading, error: eventError } = useEvent(eventId);
  const { data: teams, isLoading: teamsLoading, error: teamsError } = useEventTeams(eventId);
  const { data: userTeam } = useUserTeam(eventId, userId);

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (eventError || teamsError) {
    return (
      <div className="bg-error/10 border border-error rounded-sm p-6 text-center">
        <p className="t-body-md text-error font-bold">Failed to load event</p>
        <p className="t-body-sm text-mute mt-2">Please refresh and try again</p>
      </div>
    );
  }

  if (eventLoading || teamsLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (!event) return <div className="t-body-md text-mute">Event not found</div>;

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
      <Card title="Event Details" className="lg:col-span-2">
        <div className="space-y-4">
          <p className="t-body-md text-body">{event.description}</p>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="t-body-sm text-mute">Start Date</span>
              <span className="t-body-strong text-ink">{formatDate(event.startDate)}</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-hairline pt-3">
              <span className="t-body-sm text-mute">End Date</span>
              <span className="t-body-strong text-ink">{formatDate(event.endDate)}</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-hairline pt-3">
              <span className="t-body-sm text-mute">Status</span>
              <span className={`inline-block px-3 py-1 rounded-sm t-caption-sm font-bold uppercase ${event.status === 'open' ? 'bg-primary text-on-primary' : 'bg-stone text-on-dark'}`}>
                {event.status}
              </span>
            </div>
            <div className="flex justify-between items-baseline border-t border-hairline pt-3">
              <span className="t-body-sm text-mute">Total Teams</span>
              <span className="t-body-strong text-ink">{teams?.length || 0}</span>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Registered Teams" className="lg:col-span-1">
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {teams && teams.length > 0 ? (
            teams.map((team) => (
              <div key={team.id} className="pb-3 border-b border-hairline last:border-b-0">
                <p className="t-body-sm font-bold text-ink truncate">{team.name}</p>
                <p className="t-caption-sm text-mute">{team.leader.name}</p>
                <p className="t-caption-sm text-mute">{team.members.length + 1} members</p>
              </div>
            ))
          ) : (
            <p className="t-body-sm text-mute text-center py-4">No teams registered yet</p>
          )}
        </div>
      </Card>

      <div className="md:lg:col-span-3">
        {userTeam ? (
          <div className="bg-surface-soft border border-hairline rounded-sm p-4 md:p-6">
            <p className="t-body-strong text-ink mb-2 text-sm md:text-base">You&apos;re registered as: {userTeam.name}</p>
            <p className="t-body-sm text-mute text-xs md:text-sm">You can now submit your work and view results</p>
          </div>
        ) : (
          <Button onClick={() => setIsModalOpen(true)} size="lg" className="w-full">
            Register Team
          </Button>
        )}
      </div>
    </div>
  );
}
