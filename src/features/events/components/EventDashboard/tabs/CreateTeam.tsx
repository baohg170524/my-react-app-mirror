'use client';

import React, { useState } from 'react';
import { useEventTracks } from '@/features/events/hooks/useEvents';
import { useCreateTeam } from '@/features/teams/hooks/useTeams';
import { useEventDashboard } from '@/features/events/contexts/EventDashboardContext';

interface Props { eventId: string; userId: string; }

export function CreateTeamTab({ eventId, userId }: Props) {
  const { data: tracks, isLoading: tracksLoading } = useEventTracks(eventId);
  const { setActiveTab } = useEventDashboard();
  const create = useCreateTeam(eventId, userId);

  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [trackId, setTrackId] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate(
      { teamName, description, eventId, trackId },
      { onSuccess: () => setActiveTab('myTeam') },
    );
  };

  return (
    <form onSubmit={submit} className="p-6 max-w-xl mx-auto space-y-4">
      <h2 className="t-heading-md">Tạo đội</h2>

      <label className="block">
        <span className="t-body-sm font-bold">Tên đội</span>
        <input
          required minLength={2} maxLength={80}
          value={teamName} onChange={(e) => setTeamName(e.target.value)}
          className="input w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="t-body-sm font-bold">Mô tả</span>
        <textarea
          value={description} onChange={(e) => setDescription(e.target.value)}
          rows={3} className="input w-full mt-1"
        />
      </label>

      <label className="block">
        <span className="t-body-sm font-bold">Track</span>
        <select
          required value={trackId} onChange={(e) => setTrackId(e.target.value)}
          className="input w-full mt-1" disabled={tracksLoading}
        >
          <option value="">— Chọn track —</option>
          {(tracks ?? []).map((t) => (
            <option key={t.id} value={t.id}>{t.trackName ?? 'Track ' + t.id.slice(0, 4)}</option>
          ))}
        </select>
      </label>

      {create.error ? <p className="t-body-sm text-error">Tạo đội thất bại. Vui lòng thử lại.</p> : null}

      <button type="submit" disabled={create.isPending} className="btn btn-primary">
        {create.isPending ? 'Đang tạo…' : 'Tạo đội'}
      </button>
    </form>
  );
}
