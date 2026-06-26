'use client';

import React, { useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEventRoles } from '@/features/events/hooks/useEvents';
import { isJudgeRole, manageApi, EVENT_ROLE } from '@/features/events/api/manage';
import { usersApi, type UserSummary } from '@/services/api';
import { Card } from '../../EventDashboard/Card';
import { Button } from '../../EventDashboard/Button';
import { CardSkeleton } from '../../EventDashboard/SkeletonLoaders';

interface JudgeListTabProps {
  eventId: string;
}

interface JudgeRow {
  id: string; // userId
  name: string;
  email: string;
  /** Every judge eventRole id for this user (used to remove the judge). */
  roleIds: string[];
}

const errMsg = (e: unknown): string => {
  const res = (e as AxiosError<{ message?: string; statusCode?: number; errors?: Record<string, string[]> }>)?.response;
  if (!res && e instanceof Error && e.message) return e.message;
  const data = res?.data;
  const fieldMsgs = data?.errors ? Object.values(data.errors).flat() : [];
  if (fieldMsgs.length) return fieldMsgs.join(' ');
  if (data?.message && !/Exception|was thrown/i.test(data.message)) return data.message;
  const status = res?.status ?? data?.statusCode;
  return `Thao tác thất bại${status ? ` (lỗi ${status})` : ''}. Vui lòng thử lại.`;
};

export function JudgeListTab({ eventId }: JudgeListTabProps) {
  const { data: roles = [], isLoading, error } = useEventRoles(eventId);
  const queryClient = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ['eventRoles', eventId] });
  const onMutationOk = () => {
    setActionError(null);
    invalidate();
  };
  const onMutationError = (e: unknown) => setActionError(errMsg(e));

  const assignMutation = useMutation({
    mutationFn: manageApi.assignRole,
    onSuccess: onMutationOk,
    onError: onMutationError,
  });
  const removeJudgeMutation = useMutation({
    mutationFn: async (roleIds: string[]) => {
      for (const id of roleIds) await manageApi.removeRole(id);
    },
    onSuccess: onMutationOk,
    onError: onMutationError,
  });
  const busy = assignMutation.isPending || removeJudgeMutation.isPending;

  // One row per judge user.
  const byUser = new Map<string, JudgeRow>();
  for (const r of roles) {
    if (!isJudgeRole(r) || !r.userId) continue;
    if (!byUser.has(r.userId)) {
      byUser.set(r.userId, {
        id: r.userId,
        name: r.user?.fullName ?? '—',
        email: r.user?.email ?? '',
        roleIds: [],
      });
    }
    byUser.get(r.userId)!.roleIds.push(r.id);
  }
  const judges = [...byUser.values()];

  function handleRemoveJudge(judge: JudgeRow) {
    if (typeof window !== 'undefined' && !window.confirm(`Xóa judge ${judge.name} khỏi sự kiện?`)) {
      return;
    }
    removeJudgeMutation.mutate(judge.roleIds);
  }

  if (error) {
    return (
      <div className="bg-error/10 border border-error rounded-sm p-6 text-center">
        <p className="t-body-md text-error font-bold">Không tải được danh sách judge</p>
      </div>
    );
  }
  if (isLoading) return <CardSkeleton />;

  return (
    <Card title="Danh sách judge">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="t-body-sm text-mute">{judges.length} judge</span>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setActionError(null);
              setAdding((v) => !v);
            }}
          >
            <Plus size={16} aria-hidden="true" />
            {adding ? 'Đóng' : 'Thêm judge'}
          </Button>
        </div>

        {actionError && <p className="t-caption-sm text-error m-0">{actionError}</p>}

        {/* Add-judge: search a user by email and assign as judge. */}
        {adding && (
          <AddJudgePanel
            excludeIds={judges.map((j) => j.id)}
            busy={busy}
            onPick={(user) => {
              assignMutation.mutate(
                { userId: user.id, eventId, roleName: EVENT_ROLE.Judge },
                { onSuccess: () => setAdding(false) },
              );
            }}
          />
        )}

        {judges.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-hairline-strong text-left">
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Tên</th>
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2">Email</th>
                  <th className="t-caption-md text-mute font-bold uppercase py-3 px-2 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {judges.map((judge) => (
                  <tr key={judge.id} className="border-b border-hairline last:border-b-0">
                    <td className="t-body-sm font-bold text-ink py-3 px-2">{judge.name}</td>
                    <td className="t-body-sm text-body py-3 px-2">{judge.email}</td>
                    <td className="py-3 px-2">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => handleRemoveJudge(judge)}
                          className="t-caption-sm font-bold text-error disabled:opacity-50"
                          style={{ background: 'none', border: '1px solid var(--color-error)', borderRadius: 'var(--radius-sm)', padding: '4px 10px', cursor: busy ? 'not-allowed' : 'pointer' }}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
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

// ─── Add-judge search panel ─────────────────────────────────────────────────────

function AddJudgePanel({
  excludeIds,
  busy,
  onPick,
}: {
  excludeIds: string[];
  busy: boolean;
  onPick: (user: UserSummary) => void;
}) {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchQuery = useQuery({
    queryKey: ['userSearch', debounced],
    enabled: debounced.length >= 2,
    queryFn: () => usersApi.search(debounced),
    staleTime: 30_000,
  });
  const results = (searchQuery.data ?? []).filter((u) => !excludeIds.includes(u.id));

  const onType = (v: string) => {
    setQuery(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebounced(v.trim()), 250);
  };

  return (
    <div className="border border-hairline-strong rounded-sm p-4 flex flex-col gap-3 bg-surface-soft">
      <p className="t-body-strong text-ink m-0">Thêm judge</p>
      <input
        className="text-input"
        value={query}
        placeholder="Nhập email để tìm tài khoản…"
        onChange={(e) => onType(e.target.value)}
        style={{ width: '100%' }}
      />

      {debounced.length >= 2 && (
        <div className="flex flex-col gap-2">
          {searchQuery.isLoading ? (
            <p className="t-caption-sm text-mute m-0">Đang tìm…</p>
          ) : results.length === 0 ? (
            <p className="t-caption-sm text-mute m-0">Không tìm thấy người dùng.</p>
          ) : (
            results.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between gap-3 bg-canvas border border-hairline rounded-sm px-3 py-2"
              >
                <div className="flex flex-col">
                  <span className="t-body-sm text-ink">{u.email ?? '(không có email)'}</span>
                  {u.fullName && <span className="t-caption-sm text-mute">{u.fullName}</span>}
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onPick(u)}
                  className="inline-flex items-center gap-1 t-caption-sm font-bold text-primary disabled:opacity-50"
                  style={{ background: 'none', border: 'none', cursor: busy ? 'not-allowed' : 'pointer' }}
                >
                  <Plus size={14} aria-hidden="true" /> Thêm làm judge
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
