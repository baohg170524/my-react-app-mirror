'use client';

import { useState } from 'react';
import { useRegistration } from '../hooks/useRegistration';
import { RegistrationForm } from './RegistrationForm';
import { RegistrationStatusCard } from './RegistrationStatusCard';
import { useCurrentUser } from '@/hooks/useAuth';
import { useEventDashboard } from '@/features/events/contexts/EventDashboardContext';

interface Props { eventId: string; userId: string; }

export function CompetitionRegistrationTab({ eventId, userId }: Props) {
  const { data: user } = useCurrentUser();
  const { setActiveTab } = useEventDashboard();
  const { status, reason, record, isLoading, submit } = useRegistration(eventId, userId);
  const [editing, setEditing] = useState(false);

  if (isLoading) return <div className="t-body-md text-mute p-6">Đang tải…</div>;

  // Hiện form khi chưa đăng ký, hoặc người dùng bấm "Gửi lại" sau khi bị từ chối.
  if (status === null || editing) {
    return (
      <div className="p-1 md:p-2">
        <h2 className="t-heading-md mb-4">Đăng ký thi đấu</h2>
        <RegistrationForm
          defaults={{
            fullName: record?.fullName ?? user?.fullName ?? '',
            email: record?.email ?? user?.email ?? '',
          }}
          onSubmit={(values) => {
            submit(values, new Date().toISOString());
            setEditing(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="p-1 md:p-2">
      <RegistrationStatusCard
        status={status}
        reason={reason}
        record={record}
        onRegisterTeam={() => setActiveTab('createTeam')}
        onResubmit={() => setEditing(true)}
      />
    </div>
  );
}
