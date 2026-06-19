'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { useEventTeams } from '@/features/events/hooks/useEvents';
import { Card } from '../../EventDashboard/Card';
import { CardSkeleton } from '../../EventDashboard/SkeletonLoaders';
import { mockMentors } from '../../../api/adminMockData';

interface TeamListTabProps {
  eventId: string;
}

export function TeamListTab({ eventId }: TeamListTabProps) {
  const { data: teams, isLoading, error } = useEventTeams(eventId);

  // Map each team name → its assigned mentor (mentors store the teams they mentor).
  const mentorByTeam = new Map<string, { name: string; email: string }>();
  for (const mentor of mockMentors[eventId] ?? []) {
    for (const teamName of mentor.menteeTeams) {
      mentorByTeam.set(teamName, { name: mentor.name, email: mentor.email });
    }
  }

  if (error) {
    return (
      <div className="bg-error/10 border border-error rounded-sm p-6 text-center">
        <p className="t-body-md text-error font-bold">Không tải được danh sách đội</p>
      </div>
    );
  }

  if (isLoading) return <CardSkeleton />;

  return (
    <Card title="Danh sách đội">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mute" aria-hidden="true" />
            <input
              type="text"
              placeholder="Tìm đội..."
              className="w-full pl-9 pr-3 py-2 border border-hairline rounded-sm t-body-sm text-ink bg-canvas focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-primary"
            />
          </div>
          <span className="t-body-sm text-mute">{teams?.length ?? 0} đội</span>
        </div>

        {teams && teams.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-hairline-strong text-left">
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Tên đội</th>
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Leader</th>
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Mentor</th>
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2 text-center">Thành viên</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id} className="border-b border-hairline last:border-b-0">
                    <td className="t-body-sm font-bold text-ink py-3 px-2">{team.name}</td>
                    <td className="t-body-sm text-body py-3 px-2">
                      <span className="block">{team.leader.name}</span>
                      <span className="t-caption-sm text-mute">{team.leader.email}</span>
                    </td>
                    <td className="t-body-sm text-body py-3 px-2">
                      {(() => {
                        const mentor = mentorByTeam.get(team.name);
                        return mentor ? (
                          <>
                            <span className="block">{mentor.name}</span>
                            <span className="t-caption-sm text-mute">{mentor.email}</span>
                          </>
                        ) : (
                          <span className="text-mute">Chưa phân công</span>
                        );
                      })()}
                    </td>
                    <td className="t-body-sm text-body py-3 px-2 text-center">{team.members.length + 1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="t-body-sm text-mute text-center py-8">Chưa có đội nào đăng ký</p>
        )}
      </div>
    </Card>
  );
}
