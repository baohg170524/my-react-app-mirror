'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AdminEventDashboard } from '@/features/events/components/AdminEventDashboard/AdminEventDashboard';
import { useUserRole } from '@/hooks/useUserRole';

function AdminEventPageContent() {
  const params = useParams();
  const eventId = params?.id as string;
  const role = useUserRole();

  if (role === null) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <p className="t-body-md text-mute">Vui lòng đăng nhập.</p>
      </div>
    );
  }

  if (role !== 'admin') {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center gap-3">
        <p className="t-heading-md text-error">Bạn không có quyền truy cập trang quản lý.</p>
        <Link href={`/events/${eventId}`} className="btn btn-primary">
          Về trang sự kiện
        </Link>
      </div>
    );
  }

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
