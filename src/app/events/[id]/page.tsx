'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { EventDashboardProvider } from '@/features/events/contexts/EventDashboardContext';
import { EventDashboard } from '@/features/events/components/EventDashboard/EventDashboard';
import { useCurrentUser } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';

function EventDashboardPageContent() {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.id as string;
  const { data: user } = useCurrentUser();
  const role = useUserRole();
  const userId = user?.id ?? '';

  // Auth state lives in localStorage, which the server can't read — so the
  // server renders "logged out" while the client renders "logged in". Defer the
  // auth-dependent UI until mounted on the client so the first render matches on
  // both sides (otherwise hydration mismatches and the tree fails to patch up).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Admins go straight to the management menu — no intermediate event view.
  useEffect(() => {
    if (role === 'admin') router.replace(`/events/${eventId}/manage`);
  }, [role, eventId, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <p className="t-body-md text-mute">Đang tải…</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <p className="t-body-md text-mute">Vui lòng đăng nhập để xem sự kiện.</p>
      </div>
    );
  }

  if (role === 'admin') {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <p className="t-body-md text-mute">Đang chuyển đến trang quản lý...</p>
      </div>
    );
  }

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
