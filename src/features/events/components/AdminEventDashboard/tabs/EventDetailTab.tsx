'use client';

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEvent, useEventRoles, useUserEventRole } from '@/features/events/hooks/useEvents';
import { useUserRole } from '@/hooks/useUserRole';
import { useCurrentUser } from '@/hooks/useAuth';
import { isJudgeRole, isMentorRole } from '@/features/events/api/manage';
import { eventsApi } from '@/features/events/api/events';
import { useNotify } from '@/components/NotificationProvider';
import { getErrorMessage } from '@/lib/apiError';
import { Card } from '../../EventDashboard/Card';
import { Button } from '../../EventDashboard/Button';
import { CardSkeleton } from '../../EventDashboard/SkeletonLoaders';
import { CreateEventForm } from '../../CreateEventForm';
import { EventStructureView } from '../EventStructureView';

interface EventDetailTabProps {
  eventId: string;
}

export function EventDetailTab({ eventId }: EventDetailTabProps) {
  const { data: event, isLoading, error } = useEvent(eventId);
  const { data: roles = [] } = useEventRoles(eventId);
  const [isEditing, setIsEditing] = useState(false);
  const { data: currentUser } = useCurrentUser();
  const { data: eventRole } = useUserEventRole(currentUser?.id ?? '', eventId);
  const globalRole = useUserRole();
  const canEdit = globalRole === 'admin' || eventRole?.roleName === 'EventCoordinator' || eventRole?.roleName === 'Admin';
  const router = useRouter();
  const queryClient = useQueryClient();
  const notify = useNotify();

  const teamCount = new Set(roles.map((r) => r.teamId).filter(Boolean)).size;
  const judgeCount = new Set(
    roles.filter(isJudgeRole).map((r) => r.userId).filter(Boolean),
  ).size;
  const mentorCount = new Set(
    roles.filter(isMentorRole).map((r) => r.userId).filter(Boolean),
  ).size;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const deleteMutation = useMutation({
    mutationFn: () => eventsApi.remove(eventId),
    onSuccess: () => {
      notify.success("Xóa sự kiện thành công!");
      queryClient.invalidateQueries({ queryKey: ['events'] });
      router.push('/');
    },
    onError: (e) => {
      notify.error(getErrorMessage(e, "Không thể xóa sự kiện. Vui lòng thử lại."));
    }
  });

  const handleDelete = () => {
    if (!event) return;

    if (event.status === 'open') {
      notify.error("Sự kiện đang ở trạng thái công khai. Vui lòng chỉnh sửa và chuyển sự kiện về trạng thái Ẩn trước khi xóa.");
      return;
    }
    if (teamCount > 0) {
      notify.error("Không thể xóa sự kiện đã có đội thi đăng ký để bảo vệ thông tin đăng ký của sinh viên.");
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn xóa sự kiện này không? Hành động này không thể hoàn tác.")) {
      deleteMutation.mutate();
    }
  };

  if (error) {
    return (
      <div className="bg-error/10 border border-error rounded-sm p-6 text-center">
        <p className="t-body-md text-error font-bold">Không tải được sự kiện</p>
        <p className="t-body-sm text-mute mt-2">Vui lòng thử lại</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (!event) return <div className="t-body-md text-mute">Không tìm thấy sự kiện</div>;

  if (isEditing && canEdit) {
    return (
      <Card title="Chỉnh sửa sự kiện">
        <CreateEventForm eventId={eventId} onCancel={() => setIsEditing(false)} />
      </Card>
    );
  }

  const stats = [
    { label: 'Tổng số đội', value: teamCount },
    { label: 'Số judge', value: judgeCount },
    { label: 'Số mentor', value: mentorCount },
  ];

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
        <Card title="Chi tiết sự kiện" className="lg:col-span-2">
          <div className="space-y-4">
            {event.photoEventUrl && (
              <div className="w-full h-64 md:h-80 rounded-sm overflow-hidden border border-hairline mb-4 relative">
                <img src={event.photoEventUrl} alt={event.title} className="w-full h-full object-cover" />
              </div>
            )}
            <p className="t-body-md text-body">{event.description}</p>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="t-body-sm text-mute">Ngày bắt đầu</span>
                <span className="t-body-strong text-ink">{formatDate(event.startDate)}</span>
              </div>
              <div className="flex justify-between items-baseline border-t border-hairline pt-3">
                <span className="t-body-sm text-mute">Ngày kết thúc</span>
                <span className="t-body-strong text-ink">{formatDate(event.endDate)}</span>
              </div>
              <div className="flex justify-between items-baseline border-t border-hairline pt-3">
                <span className="t-body-sm text-mute">Trạng thái</span>
                <span
                  className={`inline-block px-3 py-1 rounded-sm t-caption-sm font-bold uppercase ${event.status === 'open' ? 'bg-primary text-on-primary' : 'bg-stone text-on-dark'
                    }`}
                >
                  {event.status === 'open' ? 'Mở' : 'Đóng'}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Thống kê" className="lg:col-span-1">
          <div className="space-y-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex justify-between items-center bg-surface-soft border border-hairline rounded-sm px-4 py-3"
              >
                <span className="t-body-sm text-mute">{s.label}</span>
                <span className="t-heading-md text-primary font-bold">{s.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <EventStructureView eventId={eventId} />

      <div className="pt-2 flex gap-3">
        {canEdit && (
          <Button variant="secondary" size="md" onClick={() => setIsEditing(true)}>
            Chỉnh sửa sự kiện
          </Button>
        )}
        <Button
          variant="outline"
          size="md"
          onClick={handleDelete}
          isLoading={deleteMutation.isPending}
          className="border-error text-error hover:bg-error/10"
        >
          Xóa sự kiện
        </Button>
      </div>
    </div>
  );
}
