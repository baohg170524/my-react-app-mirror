'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { AdminEventDashboard } from '@/features/events/components/AdminEventDashboard/AdminEventDashboard';

function AdminEventPageContent() {
  const params = useParams();
  const eventId = params?.id as string;

  // TODO: gate this route by role (Admin / EC) once auth context is wired.
  // For now the role label is hard-coded; replace with the authenticated user's role.
  return <AdminEventDashboard eventId={eventId} role="Admin" />;
}

export default function AdminEventPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-canvas flex items-center justify-center">
          <p className="t-body-md text-mute">Đang tải...</p>
        </div>
      }
    >
      <AdminEventPageContent />
    </Suspense>
  );
}
