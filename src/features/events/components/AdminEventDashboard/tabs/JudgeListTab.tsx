'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { Card } from '../../EventDashboard/Card';
import { Button } from '../../EventDashboard/Button';
import { mockJudges } from '../../../api/adminMockData';

interface JudgeListTabProps {
  eventId: string;
}

export function JudgeListTab({ eventId }: JudgeListTabProps) {
  const judges = mockJudges[eventId] ?? [];

  return (
    <Card title="Danh sách judge">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="t-body-sm text-mute">{judges.length} judge</span>
          <Button variant="primary" size="sm">
            <Plus size={16} aria-hidden="true" />
            Thêm judge
          </Button>
        </div>

        {judges.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-hairline-strong text-left">
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Tên</th>
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Email</th>
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2 text-center">Số đội phụ trách</th>
                </tr>
              </thead>
              <tbody>
                {judges.map((judge) => (
                  <tr key={judge.id} className="border-b border-hairline last:border-b-0">
                    <td className="t-body-sm font-bold text-ink py-3 px-2">{judge.name}</td>
                    <td className="t-body-sm text-body py-3 px-2">{judge.email}</td>
                    <td className="t-body-sm text-body py-3 px-2 text-center">{judge.assignedTeams}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="t-body-sm text-mute text-center py-8">Chưa có judge nào</p>
        )}
      </div>
    </Card>
  );
}
