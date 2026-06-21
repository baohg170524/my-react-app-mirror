'use client';

import React from 'react';

interface Props { eventId: string; userId: string; }

export function CreateTeamTab({ eventId }: Props) {
  return <div className="p-6 t-body-md text-mute">Tạo đội — coming next ({eventId}).</div>;
}
