'use client';

import React from 'react';

interface Props { eventId: string; userId: string; }

export function LeaderboardTab({ eventId }: Props) {
  return <div className="p-6 t-body-md text-mute">Bảng xếp hạng — coming next ({eventId}).</div>;
}
