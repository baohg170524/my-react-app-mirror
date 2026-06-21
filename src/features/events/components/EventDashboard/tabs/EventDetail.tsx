'use client';

import React from 'react';

interface Props { eventId: string; userId: string; }

export function EventDetailTab({ eventId }: Props) {
  return <div className="p-6 t-body-md text-mute">Chi tiết sự kiện — coming next ({eventId}).</div>;
}
