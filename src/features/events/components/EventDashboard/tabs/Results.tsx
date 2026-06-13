'use client';

import React from 'react';
import { useScoreBreakdown, useTeamScores } from '@/features/events/hooks/useEvents';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { CardSkeleton, TableRowSkeleton } from '../SkeletonLoaders';
import { CheckCircle, Clock } from 'lucide-react';

interface ResultsTabProps {
  teamId: string;
  eventId: string;
}

export function ResultsTab({ teamId, eventId }: ResultsTabProps) {
  const { data: scoreBreakdown = [], error: breakdownError, isLoading: breakdownLoading } = useScoreBreakdown(teamId, eventId);
  const { data: teamScores = [], error: leaderboardError, isLoading: leaderboardLoading } = useTeamScores(eventId);

  if (breakdownError || leaderboardError) {
    return (
      <div className="bg-error/10 border border-error rounded-sm p-6 text-center">
        <p className="t-body-md text-error font-bold">Failed to load results</p>
      </div>
    );
  }

  if (breakdownLoading || leaderboardLoading) {
    return (
      <div className="space-y-6">
        <CardSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className="space-y-2">
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </div>
      </div>
    );
  }

  const userScore = scoreBreakdown.reduce((acc, item) => acc + item.score, 0);
  const totalPossible = scoreBreakdown.reduce((acc, item) => acc + item.max, 0);
  const avgScore = teamScores.length > 0 ? Math.round(teamScores.reduce((acc, score) => acc + score.score, 0) / teamScores.length) : 0;

  // Find user's rank
  const sortedScores = [...teamScores].sort((a, b) => b.score - a.score);
  const userRank = sortedScores.findIndex((score) => score.teamId === teamId) + 1 || teamScores.length;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Current Standing */}
      <Card className="border-l-4 border-l-primary">
        <div className="space-y-4">
          <p className="t-display-lg text-primary font-bold m-0 text-2xl md:text-3xl">
            #{userRank} out of {teamScores.length} teams
          </p>
          <p className="t-heading-md text-ink m-0 text-lg md:text-xl">
            Total Score: {userScore}/{totalPossible}
          </p>
          <Badge variant="primary">Pending Review</Badge>
        </div>
      </Card>

      {/* Score Breakdown & Comparison */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
        {/* Score Breakdown */}
        <Card title="Score Breakdown" className="lg:col-span-2">
          <div className="space-y-3">
            {scoreBreakdown.length > 0 ? (
              scoreBreakdown.map((item) => (
                <div key={item.criterion} className="pb-3 border-b border-hairline last:border-b-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="t-body-sm text-mute">{item.criterion}</p>
                    {item.status === 'graded' ? (
                      <CheckCircle size={16} className="text-success-deep" aria-label="Graded" />
                    ) : (
                      <Clock size={16} className="text-warning" aria-label="Pending" />
                    )}
                  </div>
                  <p className="t-body-strong text-ink">
                    {item.score}/{item.max}
                  </p>
                </div>
              ))
            ) : (
              <p className="t-body-sm text-mute text-center py-4">No scores available yet</p>
            )}
          </div>
        </Card>

        {/* Comparison */}
        <Card title="Comparison">
          <div className="space-y-4">
            <div>
              <p className="t-caption-sm text-mute uppercase font-bold mb-1">Average Score</p>
              <p className="t-body-md text-ink">{avgScore}/{totalPossible || 100}</p>
            </div>
            <div>
              <p className="t-caption-sm text-mute uppercase font-bold mb-1">Your Score</p>
              <p className="t-body-strong text-primary">{userScore}/{totalPossible || 100}</p>
            </div>
            <div className="pt-2 border-t border-hairline">
              <p className="t-body-sm text-primary font-bold">+{userScore - avgScore} above average</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card title="Leaderboard">
        <div className="overflow-x-auto -mx-6 md:mx-0">
          <table className="w-full text-left text-xs md:text-body-sm px-6 md:px-0">
            <thead>
              <tr className="border-b border-hairline">
                <th className="pb-3 t-body-strong text-mute font-bold uppercase">Rank</th>
                <th className="pb-3 t-body-strong text-mute font-bold uppercase">Team ID</th>
                <th className="pb-3 t-body-strong text-mute font-bold uppercase text-right">Score</th>
                <th className="pb-3 t-body-strong text-mute font-bold uppercase text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedScores.map((entry, index) => {
                const isCurrentTeam = entry.teamId === teamId;
                return (
                  <tr
                    key={entry.teamId}
                    className={`border-b border-hairline last:border-b-0 ${
                      isCurrentTeam ? 'bg-surface-soft border-l-4 border-l-primary' : ''
                    }`}
                  >
                    <td className="py-3 t-body-strong">{index + 1}</td>
                    <td className="py-3 t-body-md">{entry.teamId}</td>
                    <td className="py-3 t-body-md text-right">{entry.score}</td>
                    <td className="py-3 text-right">
                      <Badge variant={entry.status === 'graded' ? 'success' : 'default'}>
                        {entry.status === 'graded' ? 'Graded' : 'Submitted'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
