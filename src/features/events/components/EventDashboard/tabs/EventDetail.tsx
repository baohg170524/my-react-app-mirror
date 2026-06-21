'use client';

import React from 'react';
import { useEvent } from '@/features/events/hooks/useEvents';

interface Props { eventId: string; userId: string; }

export function EventDetailTab({ eventId }: Props) {
  const { data: event, isLoading, error } = useEvent(eventId);
  if (isLoading) return <div className="p-6 t-body-md text-mute">Đang tải…</div>;
  if (error || !event) return <div className="p-6 t-body-md text-error">Không tải được sự kiện.</div>;

  return (
    <section className="p-6 max-w-3xl mx-auto space-y-4">
      <header className="space-y-2">
        <h1 className="t-heading-lg">{event.title}</h1>
        <p className="t-body-sm text-mute">
          {new Date(event.startDate).toLocaleDateString('vi-VN')} – {new Date(event.endDate).toLocaleDateString('vi-VN')}
        </p>
        <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
          {event.status === 'open' ? 'Đang mở' : 'Đã đóng'}
        </span>
      </header>
      <article className="t-body-md whitespace-pre-line">{event.description || 'Chưa có mô tả.'}</article>
    </section>
  );
}
