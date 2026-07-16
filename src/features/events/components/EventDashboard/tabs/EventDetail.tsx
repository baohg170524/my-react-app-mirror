'use client';

import React from 'react';
import { useEvent } from '@/features/events/hooks/useEvents';
import { Card } from '../Card';
import { CardSkeleton } from '../SkeletonLoaders';
import { EventTimeline } from '../EventTimeline';

interface Props { eventId: string; userId: string; }

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

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <Card className="border-transparent">
        <div className="space-y-4">
          {event.photoEventUrl && (
            <div className="w-full aspect-[2.35/1] rounded-sm overflow-hidden relative">
              <img src={event.photoEventUrl} alt={event.title} className="w-full h-full object-cover" />
            </div>
          )}
          <h1 className="text-ink text-center font-bold m-0 leading-tight text-4xl md:text-5xl">{event.title}</h1>
          <p className="text-body whitespace-pre-line leading-relaxed max-w-2xl mx-auto text-center font-normal text-base md:text-lg">
            {event.description || 'Chưa có mô tả.'}
          </p>
        </div>
      </Card>

      <div className="w-full max-w-4xl mx-auto">
        <EventTimeline eventId={eventId} />
      </div>
    </div>
  );
}
