'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEventRoles } from '@/features/events/hooks/useEvents';
import { manageApi, type EventRoleUser } from '@/features/events/api/manage';
import { usersApi, schoolsApi } from '@/services/api';
import { useNotify } from '@/components/NotificationProvider';
import { getErrorMessage } from '@/lib/apiError';
import { Card } from '../../EventDashboard/Card';
import { CardSkeleton } from '../../EventDashboard/SkeletonLoaders';

const PAGE_SIZE = 20;

/** One pending registrant: a not-yet-approved user, with every role id they
 *  hold in this event (so "Từ chối" can remove all of them). */
interface Registrant {
  userId: string;
  user: EventRoleUser;
  roleIds: string[];
}

interface AccountApprovalTabProps {
  eventId: string;
}

export function AccountApprovalTab({ eventId }: AccountApprovalTabProps) {
  const { data: roles = [], isLoading, error } = useEventRoles(eventId);
  const queryClient = useQueryClient();
  const notify = useNotify();
  const [page, setPage] = useState(1);
  const [actionError, setActionError] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ url: string; name: string } | null>(null);

  const schoolsQuery = useQuery({
    queryKey: ['schools'],
    queryFn: () => schoolsApi.list(),
    staleTime: 5 * 60_000,
  });
  const schoolName = (u: EventRoleUser) =>
    u.isFpt
      ? 'FPT University'
      : u.schoolId
        ? schoolsQuery.data?.data?.find((s) => s.id === u.schoolId)?.schoolName ?? '—'
        : '—';

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['eventRoles', eventId] });
    queryClient.invalidateQueries({ queryKey: ['users', 'list'] });
    queryClient.invalidateQueries({ queryKey: ['users', 'profile'] });
  };
  const onErr = (e: unknown) => {
    const msg = getErrorMessage(e);
    setActionError(msg);
    notify.error(msg);
  };

  // Approve = activate the account globally (POST /Users/{id}/approve).
  const approveMutation = useMutation({
    mutationFn: (r: Registrant) => usersApi.approve(r.userId),
    onSuccess: () => {
      setActionError(null);
      notify.success('Đã duyệt tài khoản thành công!');
      invalidate();
    },
    onError: onErr,
  });

  // Reject = reject the account via dedicated endpoint (POST /Users/{id}/reject), then remove
  // the user's registration(s) from this event so they leave the pending list.
  const rejectMutation = useMutation({
    mutationFn: async ({ r, reason }: { r: Registrant; reason: string }) => {
      await usersApi.reject(r.userId, reason);
      await Promise.all(r.roleIds.map((id) => manageApi.removeRole(id)));
    },
    onSuccess: () => {
      setActionError(null);
      notify.success('Đã từ chối tài khoản thành công!');
      invalidate();
    },
    onError: onErr,
  });

  const pendingUserId = approveMutation.isPending
    ? approveMutation.variables?.userId
    : rejectMutation.isPending
      ? rejectMutation.variables?.r.userId
      : undefined;

  // Pending registrants: roles whose embedded user is not yet approved, deduped by user.
  // Only approve TeamLeader and TeamMember roles (ignore Judge, Mentor, EC).
  const byUser = new Map<string, Registrant>();
  for (const role of roles) {
    const u = role.user;
    if (!role.userId || !u || u.isApproved !== false) continue;

    const rName = (role.roleName ?? '').toLowerCase();
    if (rName !== 'teamleader' && rName !== 'teammember' && rName !== 'member') continue;

    const existing = byUser.get(role.userId);
    if (existing) existing.roleIds.push(role.id);
    else byUser.set(role.userId, { userId: role.userId, user: u, roleIds: [role.id] });
  }
  const registrants = [...byUser.values()].sort((a, b) =>
    (a.user.fullName ?? '').localeCompare(b.user.fullName ?? '', 'vi'),
  );

  const total = registrants.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = registrants.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  if (error) {
    return (
      <div className="bg-error/10 border border-error rounded-sm p-6 text-center">
        <p className="t-body-md text-error font-bold">Không tải được danh sách đăng ký</p>
      </div>
    );
  }

  if (isLoading) return <CardSkeleton />;

  return (
    <Card title="Xét duyệt tài khoản">
      <div className="flex flex-col gap-4">
        <p className="t-body-sm text-mute m-0">{total} tài khoản chờ duyệt</p>
        {actionError && <p className="t-caption-sm text-error m-0">{actionError}</p>}

        {total === 0 ? (
          <p className="t-body-sm text-mute text-center py-8">Không có tài khoản chờ duyệt.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-hairline-strong text-left">
                    <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Ảnh thẻ</th>
                    <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Họ và tên</th>
                    <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Email</th>
                    <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">MSSV</th>
                    <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Trường</th>
                    <th className="t-caption-md text-mute font-bold uppercase py-3 px-2 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((r) => {
                    const busy = pendingUserId === r.userId;
                    const photo = r.user.photoStudentCardUrl;
                    return (
                      <tr key={r.userId} className="border-b border-hairline last:border-b-0">
                        <td className="py-3 px-2">
                          {photo ? (
                            <button
                              type="button"
                              onClick={() => setPreview({ url: photo, name: r.user.fullName ?? '' })}
                              className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                              aria-label={`Xem ảnh thẻ của ${r.user.fullName || r.user.email || 'sinh viên'}`}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={photo}
                                alt="Ảnh thẻ sinh viên"
                                className="w-14 h-10 object-cover rounded-sm border border-hairline"
                              />
                            </button>
                          ) : (
                            <span className="text-mute t-caption-sm">—</span>
                          )}
                        </td>
                        <td className="t-body-sm font-bold text-ink py-3 px-2 whitespace-nowrap">{r.user.fullName || '—'}</td>
                        <td className="t-body-sm text-body py-3 px-2">{r.user.email || '—'}</td>
                        <td className="t-body-sm text-body py-3 px-2">{r.user.studentCode || '—'}</td>
                        <td className="t-body-sm text-body py-3 px-2">{schoolName(r.user)}</td>
                        <td className="py-3 px-2">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => {
                                setActionError(null);
                                approveMutation.mutate(r);
                              }}
                              className="t-caption-sm font-bold text-primary disabled:opacity-50"
                              style={{ background: 'none', border: '1px solid var(--color-primary)', borderRadius: 'var(--radius-sm)', padding: '4px 10px', cursor: busy ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' }}
                            >
                              {busy && approveMutation.isPending ? 'Đang lưu…' : 'Duyệt'}
                            </button>
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => {
                                if (typeof window === 'undefined') return;
                                const reason = window.prompt(
                                  `Lý do từ chối đăng ký của ${r.user.fullName || r.user.email || 'tài khoản này'}:`,
                                  '',
                                );
                                if (reason === null) return; // hủy
                                if (!reason.trim()) {
                                  setActionError('Vui lòng nhập lý do từ chối.');
                                  return;
                                }
                                setActionError(null);
                                rejectMutation.mutate({ r, reason: reason.trim() });
                              }}
                              className="t-caption-sm font-bold text-error disabled:opacity-50"
                              style={{ background: 'none', border: '1px solid var(--color-error)', borderRadius: 'var(--radius-sm)', padding: '4px 10px', cursor: busy ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' }}
                            >
                              {busy && rejectMutation.isPending ? 'Đang xử lý…' : 'Từ chối'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between gap-3">
                <span className="t-caption-sm text-mute">
                  Trang {currentPage}/{totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="flex items-center gap-1 t-caption-sm font-bold text-ink disabled:opacity-40"
                    style={{ border: '1px solid var(--color-hairline-strong)', borderRadius: 'var(--radius-sm)', padding: '4px 10px', cursor: currentPage <= 1 ? 'not-allowed' : 'pointer' }}
                  >
                    <ChevronLeft size={14} aria-hidden="true" /> Trước
                  </button>
                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="flex items-center gap-1 t-caption-sm font-bold text-ink disabled:opacity-40"
                    style={{ border: '1px solid var(--color-hairline-strong)', borderRadius: 'var(--radius-sm)', padding: '4px 10px', cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer' }}
                  >
                    Sau <ChevronRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Ảnh thẻ phóng to */}
      {preview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ảnh thẻ sinh viên"
          onClick={() => setPreview(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
        >
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setPreview(null)}
              aria-label="Đóng"
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-canvas border border-hairline flex items-center justify-center text-ink"
            >
              <X size={16} aria-hidden="true" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview.url}
              alt={`Ảnh thẻ của ${preview.name}`}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-sm"
            />
          </div>
        </div>
      )}
    </Card>
  );
}
