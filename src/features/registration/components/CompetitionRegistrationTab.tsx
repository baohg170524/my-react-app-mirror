'use client';

import { useState } from 'react';
import { useRegistration } from '../hooks/useRegistration';
import { RegistrationForm } from './RegistrationForm';
import { RegistrationStatusCard } from './RegistrationStatusCard';
import { useCurrentUser } from '@/hooks/useAuth';
import { useEventDashboard } from '@/features/events/contexts/EventDashboardContext';

interface Props { userId: string; }

export function CompetitionRegistrationTab({ userId }: Props) {
  const { data: user } = useCurrentUser();
  const { setActiveTab } = useEventDashboard();
  const { profile, status, reason, isLoading, submit, clearRejections } = useRegistration(userId);
  const [editing, setEditing] = useState(false);

  if (isLoading) return <div className="t-body-md text-mute p-6">Đang tải…</div>;

  if (editing) {
    return (
      <div className="p-1 md:p-2">
        <h2 className="t-heading-md mb-4">Đăng ký thi đấu</h2>
        <RegistrationForm
          defaults={{ fullName: profile?.fullName ?? user?.fullName ?? '' }}
          onSubmit={async (cmd) => {
            await submit(cmd);
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
        profile={profile}
        onRegisterTeam={() => setActiveTab('createTeam')}
        onEdit={() => setEditing(true)}
        onResubmit={async () => {
          await clearRejections();
          setEditing(true);
        }}
      />
    </div>
  );
}
