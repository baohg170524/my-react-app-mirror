'use client';

import React from 'react';
import { useTeamScores, useEventTeams } from '@/features/events/hooks/useEvents';
import { Card } from '../../EventDashboard/Card';
import { CardSkeleton } from '../../EventDashboard/SkeletonLoaders';

interface LeaderboardTabProps {
  eventId: string;
}

export function LeaderboardTab({ eventId }: LeaderboardTabProps) {
  const { data: scores, isLoading: scoresLoading, error } = useTeamScores(eventId);
  const { data: teams, isLoading: teamsLoading } = useEventTeams(eventId);

  if (error) {
    return (
      <div className="bg-error/10 border border-error rounded-sm p-6 text-center">
        <p className="t-body-md text-error font-bold">Không tải được bảng xếp hạng</p>
      </div>
    );
  }

  if (scoresLoading || teamsLoading) return <CardSkeleton />;

  const teamName = (teamId: string) => teams?.find((t) => t.id === teamId)?.name ?? teamId;
  const ranked = [...(scores ?? [])].sort((a, b) => b.score - a.score);

  const rankStyle = (rank: number) => {
    if (rank === 1) return 'bg-primary text-on-primary';
    if (rank === 2) return 'bg-stone text-on-dark';
    if (rank === 3) return 'bg-ash text-on-dark';
    return 'bg-surface-soft text-ink border border-hairline';
  };

  return (
    <Card title="Bảng xếp hạng">
      {ranked.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-hairline-strong text-left">
                <th className="t-caption-md text-mute font-bold uppercase py-3 px-2 text-center w-16">Hạng</th>
                <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Tên đội</th>
                <th className="t-caption-md text-mute font-bold uppercase py-3 px-2 text-center">Điểm</th>
                <th className="t-caption-md text-mute font-bold uppercase py-3 px-2 text-right">Trạng thái chấm</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((row, idx) => {
                const rank = idx + 1;
                return (
                  <tr key={row.teamId} className="border-b border-hairline last:border-b-0">
                    <td className="py-3 px-2 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full t-body-strong font-bold ${rankStyle(rank)}`}
                      >
                        {rank}
                      </span>
                    </td>
                    <td className="t-body-sm font-bold text-ink py-3 px-2">{teamName(row.teamId)}</td>
                    <td className="t-heading-sm text-primary font-bold py-3 px-2 text-center">{row.score}</td>
                    <td className="py-3 px-2 text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-sm t-caption-sm font-bold uppercase ${
                          row.status === 'graded' ? 'bg-primary text-on-primary' : 'bg-surface-soft text-warning border border-warning'
                        }`}
                      >
                        {row.status === 'graded' ? 'Đã chấm' : 'Chờ chấm'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="t-body-sm text-mute text-center py-8">Chưa có dữ liệu xếp hạng</p>
      )}
    </Card>
  );
}
