'use client';

import { useQuery } from '@tanstack/react-query';
import { schoolsApi, type UserSummary } from '@/services/api';

interface Props {
  status: 'pending' | 'approved' | 'rejected';
  reason: string | null;
  profile: UserSummary | null;
  onRegisterTeam: () => void;
  onEdit: () => void;
  onResubmit: () => Promise<void> | void;
}

const BADGE: Record<Props['status'], { label: string; bg: string; fg: string; bd: string }> = {
  pending:  { label: 'Chờ xét duyệt',        bg: 'var(--color-surface-soft)', fg: 'var(--color-stone)',   bd: 'var(--color-hairline-strong)' },
  approved: { label: 'Đã được duyệt',         bg: 'rgba(118,185,0,0.1)',       fg: 'var(--color-primary)', bd: 'var(--color-primary)' },
  rejected: { label: 'Tài khoản bị từ chối',  bg: 'rgba(229,32,32,0.08)',      fg: 'var(--color-error)',   bd: 'var(--color-error)' },
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-hairline last:border-b-0">
      <span className="t-caption-sm text-mute">{label}</span>
      <span className="t-body-sm text-ink font-bold text-right">{value}</span>
    </div>
  );
}

export function RegistrationStatusCard({
  status,
  reason,
  profile,
  onRegisterTeam,
  onEdit,
  onResubmit,
}: Props) {
  const badge = BADGE[status];

  const { data: schoolsData } = useQuery({
    queryKey: ['schools'],
    queryFn: () => schoolsApi.list(),
    staleTime: 5 * 60_000,
  });
  const schools = schoolsData?.data ?? [];

  const schoolLabel = profile
    ? profile.isFpt
      ? 'FPT University'
      : (schools.find((s) => s.id === profile.schoolId)?.schoolName ?? '—')
    : '—';

  return (
    <div className="card flex flex-col gap-4" style={{ padding: 'var(--space-xl)', maxWidth: '40rem' }}>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="t-heading-md m-0">Đăng ký thi đấu</h2>
        <span
          className="badge-tag"
          style={{ background: badge.bg, color: badge.fg, border: `1px solid ${badge.bd}` }}
        >
          {badge.label}
        </span>
      </div>

      {status === 'rejected' && reason && (
        <p className="t-body-sm m-0" style={{ color: 'var(--color-error)' }}>
          Lý do: {reason}
        </p>
      )}

      {profile && (
        <div className="flex flex-col">
          <Row label="Họ và tên"  value={profile.fullName  || '—'} />
          <Row label="Email"       value={profile.email      || '—'} />
          <Row label="MSSV"        value={profile.studentCode || '—'} />
          <Row label="Trường"      value={schoolLabel} />
          {profile.photoStudentCardUrl && (
            <div className="py-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.photoStudentCardUrl}
                alt="Ảnh thẻ sinh viên"
                className="w-40 h-28 object-cover rounded-sm border border-hairline"
              />
            </div>
          )}
        </div>
      )}

      {status === 'pending' && (
        <button type="button" className="btn btn-secondary w-fit" onClick={onEdit}>
          Cập nhật hồ sơ
        </button>
      )}
      {status === 'approved' && (
        <div className="flex gap-2">
          <button type="button" className="btn btn-primary w-fit" onClick={onRegisterTeam}>
            Đăng ký đội
          </button>
          <button type="button" className="btn btn-secondary w-fit" onClick={onEdit}>
            Cập nhật hồ sơ
          </button>
        </div>
      )}
      {status === 'rejected' && (
        <button type="button" className="btn btn-secondary w-fit" onClick={onResubmit}>
          Gửi lại
        </button>
      )}
    </div>
  );
}
