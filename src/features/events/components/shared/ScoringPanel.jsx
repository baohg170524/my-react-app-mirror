'use client';
import { useState, useEffect, useCallback } from 'react';
import Notif from '@/components/Notif';
import EditModal from '@/components/EditModal';
import ScoringView from '@/views/ScoringPage';
import { useCurrentUser } from '@/hooks/useAuth';
import { scoresApi } from '@/services/api';
import { eventRolesApi } from '@/features/events/api/eventRoles';
import { tracksApi } from '@/features/events/api/roundTrack';
import { templatesApi } from '@/features/events/api/templates';
import { submitResultsApi } from '@/features/events/api/submitResults';
import { getErrorMessage } from '@/lib/apiError';

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
    // `loading` đã mặc định true — chưa đủ currentUser/eventId thì cứ giữ spinner,
    // không setState ở đây (tránh setState đồng bộ trong effect); effect sẽ tự chạy
    // lại và tải thật khi 2 giá trị này sẵn sàng (đã có trong dependency array).
    if (!currentUser?.id || !eventId) return;

    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // ── Bước 1: Lấy eventRole → eventRoleId + trackId ───────────────
        const role = await eventRolesApi.getUserRole(currentUser.id, eventId);
        if (cancelled) return;

        if (!role) throw new Error('Bạn chưa được phân công vai trò trong sự kiện này.');

        // trackId có thể truyền vào từ props (Admin/Judge xem cụ thể)
        // hoặc lấy từ role (Judge tự động)
        const resolvedTrackId = trackId ?? role.trackId;
        if (!resolvedTrackId) throw new Error('Bạn chưa được phân công hạng mục (track) trong sự kiện này.');

        setEventRoleId(role.id);

        // ── Bước 2: Lấy track → templateId ──────────────────────────────
        const track = await tracksApi.getById(resolvedTrackId);
        if (cancelled) return;

        if (!track.templateId) throw new Error('Hạng mục chưa được gắn bộ tiêu chí. Vui lòng liên hệ ban tổ chức.');

        // ── Bước 3: Lấy template → criterias[] ───────────────────────────
        const template = await templatesApi.getById(track.templateId);
        if (cancelled) return;

        const mappedCriteria = (template.criterias ?? []).map(c => ({
          id:       c.criteriaId,
          label:    c.criteriaName,
          labelVi:  c.criteriaName,
          weight:   c.weight,
          maxScore: c.maxScore ?? c.weight, // hệ 100: maxScore = weight
          desc:     c.description ?? '',
          levels:   [],
        }));

        if (mappedCriteria.length === 0) throw new Error('Bộ tiêu chí chưa có tiêu chí nào.');

        setCriteria(mappedCriteria);

        // ── Bước 4: Lấy danh sách bài nộp của track ──────────────────────
        const submissions = await submitResultsApi.list({
          eventId: eventId,
          trackId: resolvedTrackId,
        });
        if (cancelled) return;

        setTeams(submissions.map(s => ({
          id:       s.id,          // submitResultId — dùng cho scoresApi.save
          name:     s.teamName ?? `Đội ${s.teamId?.slice(0, 4)}`,
          scores:   Array(mappedCriteria.length).fill(0),
          comments: Array(mappedCriteria.length).fill(''),
        })));

      } catch (e) {
        // Lỗi validate tự ném (Error thường, không có .response) → giữ nguyên message gốc.
        // Lỗi từ API (axios, có .response) → lấy message thật từ backend thay vì text
        // chung chung "Request failed with status code ..." để biết đúng lý do (vd hết
        // hạn chấm, chưa tới vòng chấm...).
        if (!cancelled) {
          setError(e?.response ? getErrorMessage(e, 'Không thể tải dữ liệu chấm điểm.') : (e?.message ?? 'Không thể tải dữ liệu chấm điểm.'));
        }
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
