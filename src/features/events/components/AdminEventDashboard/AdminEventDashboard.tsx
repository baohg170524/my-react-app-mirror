'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEvent } from '@/features/events/hooks/useEvents';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { EventDetailTab } from './tabs/EventDetailTab';
import { TeamListTab } from './tabs/TeamListTab';
import { RoleListTab } from './tabs/RoleListTab';
import { LeaderboardTab } from './tabs/LeaderboardTab';
import SubmissionsScoringPanel from '../shared/SubmissionsScoringPanel';
import AppealsPanel from '../shared/AppealsPanel';

interface AdminEventDashboardProps {
  eventId: string;
  /** Role label shown in the sidebar — "Admin" or "EC". */
  role?: string;
}

/** Trạng thái sự kiện hiển thị ở header (đồng bộ với view participant). */
const PHASE = {
  active: { label: 'Đang diễn ra', cls: 'bg-primary text-on-primary' },
  upcoming: { label: 'Sắp tới', cls: 'bg-surface-soft text-ink' },
  ended: { label: 'Đã kết thúc', cls: 'bg-stone text-on-dark' },
} as const;

function eventPhase(event: {
  startDate: string;
  endDate: string;
  status: 'open' | 'closed';
}): keyof typeof PHASE {
  const now = Date.now();
  const start = new Date(event.startDate).getTime();
  const end = new Date(event.endDate).getTime();
  if (!Number.isNaN(start) && now < start) return 'upcoming';
  if (event.status === 'closed' || (!Number.isNaN(end) && now > end)) return 'ended';
  return 'active';
}

export function AdminEventDashboard({ eventId, role = 'Admin' }: AdminEventDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>('detail');
  const { data: event, isLoading } = useEvent(eventId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="t-body-md text-mute">Đang tải sự kiện...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <p className="t-heading-md text-error">Không tìm thấy sự kiện</p>
      </div>
    );
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'detail':
        return <EventDetailTab eventId={eventId} />;
      case 'teams':
        return <TeamListTab eventId={eventId} />;
      case 'roles':
        return <RoleListTab eventId={eventId} />;
      case 'submission':
        return <SubmissionsScoringPanel eventId={eventId} />;
      case 'appeal':
        return <AppealsPanel eventId={eventId} mode="manager" />;
      case 'leaderboard':
        return <LeaderboardTab eventId={eventId} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-canvas">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} role={role} />

      <header className="fixed top-0 left-0 right-0 h-auto md:h-20 bg-canvas border-b border-hairline flex items-center px-4 md:px-6 gap-3 md:gap-4 lg:left-60 z-40 py-4 md:py-0">
        <button
          onClick={() => router.push('/')}
          className="flex items-center justify-center w-9 h-9 rounded-sm border border-hairline text-ink hover:bg-surface-soft transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex-shrink-0"
          aria-label="Quay lại danh sách sự kiện"
        >
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <h1 className="t-heading-md text-ink m-0 truncate text-sm md:text-lg lg:text-xl">{event.title}</h1>
        </div>
        <span
          className={`inline-block px-2 md:px-3 py-1 rounded-sm text-xs md:text-body-sm font-bold uppercase whitespace-nowrap flex-shrink-0 ${PHASE[eventPhase(event)].cls}`}
        >
          {PHASE[eventPhase(event)].label}
        </span>
      </header>

      <main className="fixed top-24 md:top-20 left-0 right-0 bottom-0 overflow-hidden bg-canvas lg:left-60">
        <div className="h-full overflow-y-auto p-3 md:p-6">
          <div className="animate-fadeIn">{renderTab()}</div>
        </div>
      </main>
    </div>
  );
}
