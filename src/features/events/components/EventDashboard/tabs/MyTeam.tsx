'use client';

import React from 'react';

interface Props { eventId: string; userId: string; }

export function MyTeamTab({ eventId }: Props) {
  return <div className="p-6 t-body-md text-mute">Đội của tôi — coming next ({eventId}).</div>;
}
