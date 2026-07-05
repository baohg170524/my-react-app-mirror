'use client';

import React, { useState } from 'react';
import { useMyTeamForEvent, useInviteToTeam, useLeaveTeam, useTeamInvitations, useTransferLeader } from '@/features/teams/hooks/useTeams';
import { useEventDashboard } from '@/features/events/contexts/EventDashboardContext';
import { useNotify } from '@/components/NotificationProvider';

interface Props { eventId: string; userId: string; }

/** Nhãn + màu cho trạng thái lời mời (phía người gửi). */
const INVITE_BADGE: Record<string, { label: string; cls: string }> = {
  PendingAccept: { label: 'Đang mời',    cls: 'bg-amber-50 text-amber-700 border border-amber-200' },
  Accepted:      { label: 'Đã tham gia', cls: 'bg-green-50 text-green-700 border border-green-200' },
  Declined:      { label: 'Đã từ chối',  cls: 'bg-red-50 text-red-700 border border-red-200' },
  Expired:       { label: 'Hết hạn',     cls: 'bg-gray-100 text-gray-500 border border-gray-200' },
};

export function MyTeamTab({ eventId, userId }: Props) {
  const { setActiveTab } = useEventDashboard();
  const { data: team, isLoading } = useMyTeamForEvent(eventId, userId);
  const teamId = team?.id ?? '';
  const invite = useInviteToTeam(teamId);
  const leave  = useLeaveTeam(teamId, eventId, userId);
  const transfer = useTransferLeader(teamId, eventId, userId);
  const [email, setEmail] = useState('');
  const notify = useNotify();

  // Chỉ trưởng nhóm mới xem được danh sách lời mời đã gửi (BE 403 với thành viên thường).
  const isLeader = team?.members.find((m) => m.userId === userId)?.isLeader ?? false;
  const { data: invitations = [] } = useTeamInvitations(teamId, isLeader);

  if (isLoading) return <div className="p-6 t-body-md text-mute">Đang tải…</div>;
  if (!team) return <div className="p-6 t-body-md text-mute">Bạn chưa có đội.</div>;

  return (
    <section className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="border border-hairline rounded-sm bg-canvas p-4 md:p-6 space-y-4">
        <header>
          <h2 className="t-heading-md">{team.teamName}</h2>
          {team.description ? <p className="t-body-sm text-mute mt-1">{team.description}</p> : null}
        </header>

        <div>
          <h3 className="t-body-md font-bold mb-2">Thành viên</h3>
          <ul className="divide-y divide-hairline">
            {team.members.length === 0 ? (
              <li className="py-2 t-body-sm text-mute">Chưa có thành viên.</li>
            ) : (
              team.members.map((m) => (
                <li key={m.userId} className="py-2 flex items-center justify-between gap-3">
                  <span>{m.fullName} <span className="text-mute t-body-sm">({m.email})</span></span>
                  <span className="flex items-center gap-2">
                    {isLeader && !m.isLeader && (
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        disabled={transfer.isPending}
                        onClick={() => {
                          if (!confirm(`Chuyển quyền trưởng nhóm cho ${m.fullName}? Bạn sẽ trở thành thành viên thường.`)) return;
                          transfer.mutate(m.userId, {
                            onSuccess: () => notify.success(`Đã chuyển quyền trưởng nhóm cho ${m.fullName}.`),
                            onError: (err: any) => notify.error(err?.response?.data?.message || 'Chuyển quyền thất bại.'),
                          });
                        }}
                      >
                        Chuyển quyền
                      </button>
                    )}
                    <span className="text-xs font-bold whitespace-nowrap">{m.isLeader ? 'Trưởng nhóm' : 'Thành viên'}</span>
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Chỉ trưởng nhóm mới mời được (BE chặn 403 với thành viên thường). */}
      {isLeader && (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          invite.mutate({ email }, {
            onSuccess: (res: any) => {
              setEmail('');
              const status = res?.data?.status || res?.status;
              if (status === 'EmailSentToNonRegisteredUser') {
                notify.success('Thành viên này hiện chưa có tài khoản. Hệ thống đã gửi email yêu cầu đăng ký. Vui lòng mời lại sau khi họ đã tạo tài khoản và được duyệt!');
              } else {
                notify.success('Đã gửi lời mời thành công!');
              }
            },
            onError: (err: any) => {
              const msg = err?.response?.data?.message || err?.message || 'Mời thất bại.';
              notify.error(msg);
            }
          });
        }}
        className="space-y-2 border border-hairline rounded-sm bg-canvas p-4 md:p-6"
      >
        <h3 className="t-body-md font-bold">Mời thành viên</h3>
        <div className="flex gap-2">
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com" className="input flex-1"
          />
          <button type="submit" disabled={invite.isPending} className="btn btn-primary">
            {invite.isPending ? 'Đang gửi…' : 'Mời'}
          </button>
        </div>
      </form>
      )}

      {isLeader && (
        <div className="border border-hairline rounded-sm bg-canvas p-4 md:p-6 space-y-3">
          <h3 className="t-body-md font-bold">Lời mời đã gửi</h3>
          {invitations.length === 0 ? (
            <p className="t-body-sm text-mute">Chưa gửi lời mời nào.</p>
          ) : (
            <ul className="divide-y divide-hairline">
              {invitations.map((inv) => {
                const badge = INVITE_BADGE[inv.status] ?? { label: inv.status, cls: 'bg-gray-100 text-gray-500 border border-gray-200' };
                return (
                  <li key={inv.invitationId} className="py-2 flex items-center justify-between gap-3">
                    <span className="t-body-sm">
                      {inv.invitedUserFullName || inv.invitedUserEmail}
                      {inv.invitedUserFullName && inv.invitedUserEmail && inv.invitedUserFullName !== inv.invitedUserEmail ? (
                        <span className="text-mute"> ({inv.invitedUserEmail})</span>
                      ) : null}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-sm whitespace-nowrap ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => { if (confirm('Bạn chắc chắn rời đội?')) leave.mutate(undefined, { onSuccess: () => setActiveTab('createTeam') }); }}
        disabled={leave.isPending}
        className="btn btn-outline-danger"
      >
        {leave.isPending ? 'Đang rời…' : 'Rời đội'}
      </button>
    </section>
  );
}
