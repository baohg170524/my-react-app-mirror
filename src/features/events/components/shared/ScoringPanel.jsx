'use client';
import { useState, useEffect, useCallback } from 'react';
import Notif from '@/components/Notif';
import EditModal from '@/components/EditModal';
import ScoringView from '@/views/ScoringPage';
import { useCurrentUser } from '@/hooks/useAuth';
import { scoresApi } from '@/services/api';

/**
 * Phần chấm điểm tái sử dụng từ trang /scoring, nhúng vào tab dashboard.
 * Dùng chung cho cả trang standalone lẫn tab trong sự kiện.
 *
 * Props: eventId (sự kiện đang mở), trackId (nếu có — judge chỉ chấm hạng mục được giao).
 *
 * @param {{ eventId: string, trackId?: string | null }} props
 */
export default function ScoringPanel({ eventId, trackId = null }) {
  const { data: currentUser } = useCurrentUser();

  const [criteria, setCriteria]       = useState([]);
  const [teams, setTeams]             = useState([]);
  const [eventRoleId, setEventRoleId] = useState(null);
  const [editT, setEditT]             = useState(null);
  const [notif, setNotif]             = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  const sn = useCallback((m, t = 's') => {
    setNotif({ m, t });
    setTimeout(() => setNotif(null), 3000);
  }, []);

  useEffect(() => {
    if (!currentUser?.id || !eventId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    // thay đổi khi có API thật trackId
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // ── MOCK DATA ── xóa khi có API thật ──────────────────────
        const mockCriteria = [
          { id: 'c1', label: 'Tính sáng tạo',    weight: 30, desc: '' },
          { id: 'c2', label: 'Kỹ năng trình bày', weight: 30, desc: '' },
          { id: 'c3', label: 'Tính khả thi',       weight: 20, desc: '' },
          { id: 'c4', label: 'Tác động thực tế',   weight: 20, desc: '' },
        ];
        const mockTeams = [
          { id: 's1', name: 'Team Alpha', scores: [0, 0, 0, 0], comments: ['', '', '', ''] },
          { id: 's2', name: 'Team Beta',  scores: [0, 0, 0, 0], comments: ['', '', '', ''] },
          { id: 's3', name: 'Team Gamma', scores: [0, 0, 0, 0], comments: ['', '', '', ''] },
        ];
        if (cancelled) return;
        setCriteria(mockCriteria);
        setTeams(mockTeams);
        setEventRoleId('mock-role-id');
        // ── END MOCK ───────────────────────────────────────────────
      } catch (e) {
        if (!cancelled) setError(e?.message ?? 'Không thể tải dữ liệu chấm điểm');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [currentUser?.id, eventId, trackId]);

  const saveEdit = async (submitResultId, scores, cmts) => {
    try {
      await scoresApi.save({
        eventRoleId,
        submitResultId,
        details: criteria.map((c, i) => ({ criteriaId: c.id, score: scores[i] ?? 0 })),
      });
      setTeams(p => p.map(t => t.id === submitResultId ? { ...t, scores, comments: cmts } : t));
      setEditT(null);
      sn('Đã lưu điểm thành công!');
    } catch {
      sn('Lưu điểm thất bại, vui lòng thử lại', 'e');
    }
  };

  return (
    <>
      <Notif n={notif} />
      {editT && (
        <EditModal
          team={editT}
          criteria={criteria}
          onClose={() => setEditT(null)}
          onSave={(s, c) => saveEdit(editT.id, s, c)}
        />
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <span className="loading loading-spinner" style={{ color: '#76b900' }} />
          <span className="ml-3 text-sm" style={{ color: '#757575' }}>Đang tải dữ liệu...</span>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-sm font-semibold" style={{ color: '#d32f2f' }}>{error}</p>
        </div>
      ) : teams.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-sm" style={{ color: '#757575' }}>Chưa có đội nào nộp bài trong track của bạn.</p>
        </div>
      ) : (
        <ScoringView teams={teams} criteria={criteria} onEdit={setEditT} />
      )}
    </>
  );
}
