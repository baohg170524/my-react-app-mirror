'use client';

import React from 'react';
import { EventLeaderboard } from '../../EventLeaderboard';

interface Props { eventId: string; userId: string; }

export function LeaderboardTab({ eventId }: Props) {
  return <EventLeaderboard eventId={eventId} />;
}
