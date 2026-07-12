'use client';
import { useState, useEffect, useCallback } from 'react';
import Notif from '@/components/Notif';
import EditModal from '@/components/EditModal';
import ScoringView from '@/views/ScoringPage';
import { useCurrentUser } from '@/hooks/useAuth';
import { scoresApi } from '@/services/api';
import { eventRolesApi } from '@/features/events/api/eventRoles';
import { tracksApi, roundsApi } from '@/features/events/api/roundTrack';
import { resultsApi } from '@/features/results/api/results';
import { getCriteria } from '@/services/criteriaService';
import { getAllSubmissions } from '@/services/submissionService';
import { getErrorMessage } from '@/lib/apiError';

/**
 * Phần chấm điểm tái sử dụng từ trang /scoring, nhúng vào tab dashboard.
 * Dùng chung cho cả trang standalone lẫn tab trong sự kiện.
 *
 * Props: eventId (sự kiện đang mở), trackId (nếu có — judge chỉ chấm hạng mục được giao;
 * nếu không truyền sẽ lấy từ vai trò của judge trong sự kiện).
 *
 * @param {{ eventId: string, trackId?: string | null }} props
 */
export default function ScoringPanel({ eventId, trackId = null }) {
  const { data: currentUser } = useCurrentUser();

  const [criteria, setCriteria] = useState([]);
  const [teams, setTeams] = useState([]);
  const [eventRoleId, setEventRoleId] = useState(null);
  const [lock, setLock] = useState({ locked: false, message: null });
  const [editT, setEditT] = useState(null);
  const [notif, setNotif] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sn = useCallback((m, t = 's') => {
    setNotif({ m, t });
    setTimeout(() => setNotif(null), 3000);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!currentUser?.id || !eventId) {
        if (!cancelled) setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);

        // 1) Vai trò của judge trong sự kiện → eventRoleId (bắt buộc cho Scores/save)
        //    và trackId nếu component không được truyền sẵn.
        const role = await eventRolesApi.getUserRole(currentUser.id, eventId);
        const roleId = role?.id ?? null;
        const effectiveTrackId = trackId ?? role?.trackId ?? null;
        if (!roleId || !effectiveTrackId) {
          throw new Error('Bạn chưa được phân công chấm hạng mục nào trong sự kiện này.');
        }

        // 2) Chi tiết track → templateId (bộ tiêu chí) + roundId (thời gian vòng thi).
        const track = await tracksApi.getById(effectiveTrackId);
        if (!track?.templateId) {
          throw new Error('Hạng mục này chưa được gán bộ tiêu chí chấm điểm.');
        }

        // 3) Tải song song: vòng thi, bộ tiêu chí, danh sách bài nộp, phiếu đã chấm,
        //    và trạng thái công bố kết quả (FinalResults của vòng đã tồn tại?).
        const [round, allCriteria, subsRes, existingScores, published] = await Promise.all([
          track.roundId ? roundsApi.getById(track.roundId) : Promise.resolve(null),
          getCriteria(track.templateId),
          getAllSubmissions({ EventId: eventId, TrackId: effectiveTrackId, PageSize: 100 }),
          scoresApi.listByEventRole(roleId),
          track.roundId
            ? resultsApi.listRoundLeaderboard(track.roundId).then(r => r.length > 0).catch(() => false)
            : Promise.resolve(false),
        ]);

        if (cancelled) return;

        // 4) Bộ tiêu chí: getCriteria(templateId) đã map sẵn shape ScoringView/EditModal cần
        //    ({ id, label, labelVi, desc, weight, maxScore, isActive }) với weight/maxScore lấy
        //    từ template. Nó trả về TOÀN BỘ tiêu chí hệ thống nên chỉ giữ tiêu chí đang bật &
        //    thực sự thuộc template (weight > 0).
        const crit = allCriteria.filter(c => c.isActive !== false && c.weight > 0);

        // 5) Nạp trước điểm đã chấm: submitResultId → điểm theo từng tiêu chí.
        const scored = existingScores.filter(s => s.submitResultId);
        const detailList = await Promise.all(
          scored.map(s =>
            scoresApi.getWithDetails(s.id)
              .then(d => ({ submitResultId: s.submitResultId, details: d.details ?? [] }))
              .catch(() => ({ submitResultId: s.submitResultId, details: [] })),
          ),
        );
        if (cancelled) return;

        const prefill = {};
        for (const { submitResultId, details } of detailList) {
          const byCriteria = Object.fromEntries(details.map(d => [d.criteriaId, d.value]));
          prefill[submitResultId] = crit.map(c => byCriteria[c.id] ?? 0);
        }

        // 6) Bài nộp → "teams" (ẩn danh khi hiển thị; id = submitResultId dùng để lưu điểm).
        const mapped = subsRes.items.map(s => ({
          id: s.id,
          name: s.teamName ?? s.projectName ?? '—',
          scores: prefill[s.id] ?? crit.map(() => 0),
          comments: crit.map(() => ''),
        }));

        // 7) Khóa/mở form theo thời gian & trạng thái công bố (đồng bộ với Backend).
        const now = new Date();
        const endDate = round?.endDate ? new Date(round.endDate) : null;
        const notEnded = endDate ? now < endDate : false;
        let lockState = { locked: false, message: null };
        if (published) {
          lockState = { locked: true, message: 'Vòng thi này đã chốt kết quả, không thể chấm điểm thêm.' };
        } else if (notEnded) {
          const when = endDate.toLocaleString('vi-VN', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
          });
          lockState = { locked: true, message: `Form chấm điểm sẽ được mở sau khi vòng thi kết thúc vào lúc ${when}.` };
        }

        setEventRoleId(roleId);
        setCriteria(crit);
        setTeams(mapped);
        setLock(lockState);
      } catch (e) {
        // Lỗi validate tự ném (Error thường, không có .response) → giữ nguyên message gốc.
        // Lỗi từ API (axios, có .response) → lấy message thật từ backend thay vì text
        // chung chung "Request failed with status code ..." để biết đúng lý do (vd hết
        // hạn chấm, chưa tới vòng chấm, đã công bố kết quả...).
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
    // Chặn sớm ở client cho đúng logic khóa/mở; Backend vẫn là nguồn quyết định cuối cùng.
    if (lock.locked) {
      sn(lock.message ?? 'Chưa thể chấm điểm ở thời điểm này.', 'e');
      return;
    }
    try {
      await scoresApi.save({
        eventRoleId,
        submitResultId,
        // Backend (SaveScoreRequestModel.cs) chỉ nhận field `value`, không có `score`.
        details: criteria.map((c, i) => ({ criteriaId: c.id, value: scores[i] ?? 0 })),
      });
      setTeams(p => p.map(t => t.id === submitResultId ? { ...t, scores, comments: cmts } : t));
      setEditT(null);
      sn('Đã lưu điểm thành công!');
    } catch (e) {
      // Đọc message lỗi từ Backend (400: vòng thi chưa kết thúc / 403: đã công bố kết quả).
      const msg = e?.response ? getErrorMessage(e, 'Lưu điểm thất bại, vui lòng thử lại') : (e?.message ?? 'Lưu điểm thất bại, vui lòng thử lại');
      sn(msg, 'e');
    }
  };

  return (
    <>
      <Notif n={notif} />
      {editT && !lock.locked && (
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
        <>
          {lock.locked && (
            <div
              className="mb-5 flex items-start gap-3 p-4"
              style={{ background: 'rgba(255,193,7,.1)', border: '1px solid #ffc107', borderRadius: 2 }}
              role="alert"
            >
              <span style={{ color: '#b8860b', fontSize: 16, lineHeight: 1.2 }}>⚠</span>
              <p className="text-sm m-0" style={{ color: '#8a6d00' }}>{lock.message}</p>
            </div>
          )}
          <ScoringView teams={teams} criteria={criteria} onEdit={setEditT} disabled={lock.locked} />
        </>
      )}
    </>
  );
}