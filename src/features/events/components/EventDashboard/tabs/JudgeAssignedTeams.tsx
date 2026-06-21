'use client';

import React from 'react';

interface Props { eventId: string; userId: string; }

export function JudgeAssignedTeamsTab({ eventId }: Props) {
  return <div className="p-6 t-body-md text-mute">Đội được phân công — coming next ({eventId}).</div>;
}
