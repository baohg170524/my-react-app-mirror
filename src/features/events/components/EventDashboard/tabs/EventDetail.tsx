'use client';

import React from 'react';
import { useEvent } from '@/features/events/hooks/useEvents';
import { Card } from '../Card';
import { CardSkeleton } from '../SkeletonLoaders';
import { EventStructureView } from '../../AdminEventDashboard/EventStructureView';
import { formatDate } from '@/lib/date';

interface Props { eventId: string; userId: string; }

const STATUS = {
  open:   { label: 'Đang diễn ra', cls: 'bg-primary text-on-primary' },
  hidden: { label: 'Ẩn',          cls: 'bg-stone text-on-dark' },
  closed: { label: 'Đã kết thúc', cls: 'bg-stone text-on-dark' },
} as const;

/**
 * Participant view of an event: same read-only structure the admin sees
 * (detail card + rounds/tracks), but without any edit controls.
 */
export function EventDetailTab({ eventId }: Props) {
  const { data: event, isLoading, error } = useEvent(eventId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 md:gap-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }
  if (error || !event) {
    return (
      <div className="bg-error/10 border border-error rounded-sm p-6 text-center">
        <p className="t-body-md text-error font-bold">Không tải được sự kiện</p>
      </div>
    );
  }

  const status = STATUS[event.status] ?? STATUS.hidden;

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <Card title="Chi tiết sự kiện">
        <div className="space-y-4">
          {event.photoEventUrl && (
            <div className="w-full h-64 md:h-80 rounded-sm overflow-hidden border border-hairline mb-4 relative">
              <img src={event.photoEventUrl} alt={event.title} className="w-full h-full object-cover" />
            </div>
          )}
          <p className="t-body-md text-body whitespace-pre-line">
            {event.description || 'Chưa có mô tả.'}
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="t-body-sm text-mute">Ngày bắt đầu</span>
              <span className="t-body-strong text-ink">{formatDate(event.startDate)}</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-hairline pt-3">
              <span className="t-body-sm text-mute">Ngày kết thúc</span>
              <span className="t-body-strong text-ink">{formatDate(event.endDate)}</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-hairline pt-3">
              <span className="t-body-sm text-mute">Trạng thái</span>
              <span className={`inline-block px-3 py-1 rounded-sm t-caption-sm font-bold uppercase ${status.cls}`}>
                {status.label}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <EventStructureView eventId={eventId} />
    </div>
  );
}
