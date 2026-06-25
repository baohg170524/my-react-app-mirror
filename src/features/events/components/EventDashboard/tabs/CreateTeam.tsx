'use client';

import React, { useState } from 'react';
import { Users, AlertCircle } from 'lucide-react';
import { useEventTracks } from '@/features/events/hooks/useEvents';
import { useCreateTeam } from '@/features/teams/hooks/useTeams';
import { useEventDashboard } from '@/features/events/contexts/EventDashboardContext';
import { Button } from '../Button';

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
    <form onSubmit={submit} className="w-full max-w-xl mx-auto bg-canvas border border-hairline rounded-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-start gap-3 p-5 md:p-6 border-b border-hairline bg-surface-soft">
          <span className="w-10 h-10 rounded-sm bg-primary/15 flex items-center justify-center shrink-0">
            <Users size={20} className="text-primary" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="t-heading-sm text-ink m-0">Tạo đội</h2>
            <p className="t-body-sm text-mute m-0 mt-1">Lập đội để đăng ký tham gia sự kiện.</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 md:p-6 space-y-5">
          <label className="block">
            <span className="t-body-sm font-bold text-ink">
              Tên đội <span className="text-error">*</span>
            </span>
            <input
              required minLength={2} maxLength={80}
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="VD: Nhóm Sấm Sét"
              className="text-input mt-1.5"
            />
            <span className="t-caption-xs text-mute mt-1 block">2–80 ký tự.</span>
          </label>

          <label className="block">
            <span className="t-body-sm font-bold text-ink">Mô tả</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Giới thiệu ngắn về đội của bạn (không bắt buộc)."
              className="text-input mt-1.5"
              style={{ height: 'auto', minHeight: 96, resize: 'vertical' }}
            />
          </label>

          <label className="block">
            <span className="t-body-sm font-bold text-ink">
              Hạng mục <span className="text-error">*</span>
            </span>
            <select
              required
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
              className="text-input mt-1.5"
              disabled={tracksLoading}
            >
              <option value="">{tracksLoading ? 'Đang tải hạng mục…' : '— Chọn hạng mục —'}</option>
              {(tracks ?? []).map((t) => (
                <option key={t.id} value={t.id}>{t.trackName ?? 'Hạng mục ' + t.id.slice(0, 4)}</option>
              ))}
            </select>
          </label>

          {create.error && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-sm border border-error bg-error/10 px-3 py-2"
            >
              <AlertCircle size={16} className="text-error shrink-0" aria-hidden="true" />
              <p className="t-body-sm text-error m-0">Tạo đội thất bại. Vui lòng thử lại.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-5 md:p-6 border-t border-hairline bg-surface-soft">
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={create.isPending}
            disabled={create.isPending}
            className="w-full sm:w-auto"
          >
            {create.isPending ? 'Đang tạo…' : 'Tạo đội'}
          </Button>
        </div>
    </form>
  );
}
