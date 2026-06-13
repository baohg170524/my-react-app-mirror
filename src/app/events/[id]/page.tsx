'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { EventDashboardProvider } from '@/features/events/contexts/EventDashboardContext';
import { EventDashboard } from '@/features/events/components/EventDashboard/EventDashboard';

function EventDashboardPageContent() {
  const params = useParams();
  const eventId = params?.id as string;
  // TODO: Get userId from auth context (for now use mock)
  const userId = 'user-001'; // Will be replaced with auth context

  return (
    <EventDashboardProvider>
      <EventDashboard eventId={eventId} userId={userId} />
    </EventDashboardProvider>
  );
}

export default function EventDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-canvas flex items-center justify-center"><p className="t-body-md text-mute">Loading...</p></div>}>
      <EventDashboardPageContent />
    </Suspense>
  );
}
