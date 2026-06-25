'use client';

import React from 'react';
import { EventLeaderboard } from '../../EventLeaderboard';

interface LeaderboardTabProps {
  eventId: string;
}

export function LeaderboardTab({ eventId }: LeaderboardTabProps) {
  return <EventLeaderboard eventId={eventId} />;
}
