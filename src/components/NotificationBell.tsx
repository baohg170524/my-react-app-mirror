import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, X, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invitationsApi } from '@/features/invitations/api/invitationsApi';
import { teamsApi } from '@/features/teams/api/teams';

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: inviteData, isLoading } = useQuery({
    queryKey: ['my-invitations'],
    queryFn: invitationsApi.getMyInvitations,
    refetchInterval: 30000, // Polling mỗi 30s
  });

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const respondTeamMut = useMutation({
    mutationFn: ({ id, accept }: { id: string; accept: boolean }) => teamsApi.respondInvitation(id, accept),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['my-invitations'] }),
  });

  const respondRoleMut = useMutation({
    mutationFn: ({ id, accept }: { id: string; accept: boolean }) => invitationsApi.respondEventRole(id, accept),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['my-invitations'] }),
  });

  const handleRespond = (invitationId: string, type: string, accept: boolean) => {
    if (type === 'TEAM') {
      respondTeamMut.mutate({ id: invitationId, accept });
    } else {
      respondRoleMut.mutate({ id: invitationId, accept });
    }
  };

  const totalPending = inviteData?.totalPending || 0;
  const isPending = respondTeamMut.isPending || respondRoleMut.isPending;

  return (
    <div className="relative" ref={bellRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-on-dark hover:text-primary transition-colors relative"
        style={{ color: "var(--color-on-dark-mute)" }}
      >
        <Bell size={20} />
        {totalPending > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-surface-dark">
            {totalPending > 9 ? '9+' : totalPending}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-surface-dark border border-hairline-strong rounded-sm shadow-xl z-50 overflow-hidden">
          <div className="p-3 border-b border-hairline-strong bg-surface-elevated font-bold text-sm text-on-dark">
            Lời mời đang chờ ({totalPending})
          </div>
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-6 flex justify-center items-center text-on-dark-mute">
                <Loader2 className="animate-spin w-5 h-5" />
              </div>
            ) : totalPending === 0 ? (
              <div className="p-6 text-center text-sm text-on-dark-mute">
                Bạn không có lời mời nào.
              </div>
            ) : (
              <div className="flex flex-col">
                {inviteData?.invitations.map((inv) => (
                  <div key={inv.invitationId} className="p-3 border-b border-hairline-strong hover:bg-surface-elevated transition-colors">
                    <p className="text-sm text-on-dark leading-snug mb-2">
                      <span className="font-bold text-primary">{inv.inviterName || 'Hệ thống'}</span> mời bạn tham gia 
                      <span className="font-bold"> {inv.targetName}</span> với vai trò 
                      <span className="font-bold text-primary"> {inv.role}</span>.
                    </p>
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={() => handleRespond(inv.invitationId, inv.type, false)}
                        disabled={isPending}
                        className="btn-hover px-2 py-1 text-xs flex items-center gap-1 border border-error/50 text-error rounded-sm hover:bg-error/10 disabled:opacity-50"
                      >
                        <X size={14} /> Từ chối
                      </button>
                      <button
                        onClick={() => handleRespond(inv.invitationId, inv.type, true)}
                        disabled={isPending}
                        className="btn-hover px-2 py-1 text-xs flex items-center gap-1 bg-primary text-white rounded-sm hover:bg-primary-dark disabled:opacity-50"
                      >
                        <Check size={14} /> Đồng ý
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
