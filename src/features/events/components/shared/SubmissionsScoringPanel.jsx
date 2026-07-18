'use client';
import { useState, useEffect, useCallback } from 'react';
import Notif from '@/components/Notif';
import EditModal from '@/components/EditModal';
import ScoreBreakdownModal from '@/components/ScoreBreakdownModal';
import { useCurrentUser } from '@/hooks/useAuth';
import { scoresApi } from '@/services/api';
import { eventRolesApi } from '@/features/events/api/eventRoles';
import { tracksApi, roundsApi } from '@/features/events/api/roundTrack';
import { resultsApi } from '@/features/results/api/results';
import { getCriteria } from '@/services/criteriaService';
import { submitResultsApi } from '@/features/events/api/submitResults';
import { parseSubmissionLinks } from '@/features/submissions/utils/submissionLinks';
import { getErrorMessage } from '@/lib/apiError';
import { calcScore } from '@/utils.jsx';

/**
 * Panel gộp "Bài nộp" + "Chấm điểm" — thay thế ScoringPanel.jsx + SubmissionsPanel.jsx.
 *
 * Phân quyền theo roleName (EventRoleModel — xem eventRoles.ts):
 *  - "Judge": thấy nút "Chấm / Sửa", chỉ chấm được hạng mục (track) chính họ được phân
 *    công (giống ScoringPanel.jsx cũ). Cần eventRoleId để gọi Scores/save.
 *  - Mọi role khác (EventCoordinator/Mentor/Admin/TeamLeader/Member...): CHỈ XEM — thấy
 *    nút "Xem chi tiết chấm điểm" mở breakdown read-only (điểm + nhận xét của MỌI giám
 *    khảo, qua GET /Scores/team/{teamId}/breakdown — xem scores.ts). Không gọi Scores/save.
 *  - Cả 2 nhóm đều bị giới hạn theo 1 track cụ thể — dùng chung field `trackId` trên
 *    EventRoleModel (không riêng gì Judge).
 *
 * Nguồn dữ liệu bài nộp: submitResultsApi (TS, mới) — KHÔNG dùng getAllSubmissions/
 * submissionService.js (cũ) nữa, để tránh lệch dữ liệu giữa 2 nguồn (đã phát hiện: khác
 * timezone parsing, khác cách suy ra projectName — xem scoring-form-guide-FINAL.md).
 *
 * Props: eventId (sự kiện đang mở), trackId (nếu component cha đã biết trước hạng mục;
 * nếu không truyền sẽ lấy từ vai trò của user trong sự kiện).
 *
 * @param {{ eventId: string, trackId?: string | null }} props
 */
export default function SubmissionsScoringPanel({ eventId, trackId = null }) {
  const { data: currentUser } = useCurrentUser();

  const [isJudge, setIsJudge] = useState(false);
  const [criteria, setCriteria] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [eventRoleId, setEventRoleId] = useState(null);
  const [roundInfo, setRoundInfo] = useState(null); // { roundName, startDate, endDate }
  const [lock, setLock] = useState({ locked: false, message: null });
  const [editT, setEditT] = useState(null);       // bài nộp đang chấm (Judge)
  const [viewT, setViewT] = useState(null);        // bài nộp đang xem breakdown (viewer)
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

        // 1) Vai trò của user trong sự kiện — roleName (Judge hay không) + trackId được
        //    phân công (áp dụng chung cho MỌI role, không riêng Judge).
        const role = await eventRolesApi.getUserRole(currentUser.id, eventId);
        const roleId = role?.id ?? null;
        const roleName = role?.roleName ?? null;
        const effectiveTrackId = trackId ?? role?.trackId ?? null;
        if (!role || !effectiveTrackId) {
          throw new Error('Bạn chưa được phân công vào hạng mục nào trong sự kiện này.');
        }
        const judge = roleName === 'Judge';

        // 2) Chi tiết track → templateId (bộ tiêu chí) + roundId (thời gian vòng thi).
        const track = await tracksApi.getById(effectiveTrackId);
        if (!track?.templateId) {
          throw new Error('Hạng mục này chưa được gán bộ tiêu chí chấm điểm.');
        }

        // 3) Tải song song: vòng thi, bộ tiêu chí, danh sách bài nộp (nguồn thống nhất
        //    submitResultsApi), và — chỉ Judge mới cần — phiếu đã chấm + trạng thái công bố.
        const [round, allCriteria, subsItems, existingScores, published] = await Promise.all([
          track.roundId ? roundsApi.getById(track.roundId) : Promise.resolve(null),
          getCriteria(track.templateId),
          submitResultsApi.list({ eventId, trackId: effectiveTrackId, pageSize: 100 }),
          judge ? scoresApi.listByEventRole(roleId) : Promise.resolve([]),
          judge && track.roundId
            ? resultsApi.listRoundLeaderboard(track.roundId).then(r => r.length > 0).catch(() => false)
            : Promise.resolve(false),
        ]);

        if (cancelled) return;

        setRoundInfo(round ? {
          roundName: round.roundName ?? `Vòng ${round.roundNumber ?? '?'}`,
          startDate: round.startDate ?? null,
          endDate:   round.endDate   ?? null,
        } : null);

        // 4) Bộ tiêu chí: hệ 100 — dùng maxScore/weight thật từ backend, không hardcode
        //    (Backend validate nghiêm ngặt điểm nhập theo maxScore thật — xem
        //    scoring-form-guide-FINAL.md, Vòng 2).
        const crit = allCriteria
          .filter(c => c.isActive !== false && c.weight > 0)
          .map(c => ({ ...c, maxScore: c.maxScore ?? 10, templateId: track.templateId }));

        // 5a) JUDGE — nạp trước điểm + nhận xét đã chấm của CHÍNH họ, theo submitResultId.
        let prefillScores = {};
        let prefillComment = {};
        if (judge) {
          const scored = existingScores.filter(s => s.submitResultId);
          const detailList = await Promise.all(
            scored.map(s =>
              scoresApi.getWithDetails(s.id)
                .then(d => ({ submitResultId: s.submitResultId, details: d.details ?? [], comment: d.comment ?? '' }))
                .catch(() => ({ submitResultId: s.submitResultId, details: [], comment: '' })),
            ),
          );
          if (cancelled) return;
          for (const { submitResultId, details, comment } of detailList) {
            const byCriteria = Object.fromEntries(details.map(d => [d.criteriaId, d.value]));
            prefillScores[submitResultId] = crit.map(c => byCriteria[c.id] ?? 0);
            prefillComment[submitResultId] = comment;
          }
        }

        // 5b) VIEWER (không phải Judge) — nạp breakdown điểm của MỌI giám khảo, theo teamId
        //     (1 lần/đội, tránh gọi trùng nếu 1 đội có nhiều bài nộp trong cùng track).
        let breakdownBySubmission = {};
        if (!judge) {
          const uniqueTeamIds = [...new Set(subsItems.map(s => s.teamId).filter(Boolean))];
          const breakdowns = await Promise.all(
            uniqueTeamIds.map(tid => scoresApi.getTeamBreakdown(tid).catch(() => null)),
          );
          if (cancelled) return;
          for (const b of breakdowns) {
            for (const sub of (b?.submissions ?? [])) {
              if (sub.submitResultId) breakdownBySubmission[sub.submitResultId] = sub;
            }
          }
        }

        // 6) Bài nộp → shape hiển thị chung cho cả 2 chế độ.
        const mapped = subsItems.map((s, i) => {
          const rawUrl = s.submissionUrl ?? s.repoUrl ?? '';
          const submittedAt = s.createdTime
            ? new Date(s.createdTime.replace('+00:00', 'Z')).toLocaleString('vi-VN', {
                day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
              })
            : '—';
          const breakdown = breakdownBySubmission[s.id] ?? null;
          const scoredByJudge = judge
            ? existingScores.some(es => es.submitResultId === s.id)
            : (breakdown?.judgeScores?.length ?? 0) > 0;

          return {
            id: s.id,
            teamId: s.teamId,
            index: i,
            name: s.teamName ?? '—',
            links: parseSubmissionLinks(rawUrl),
            submittedAt,
            status: s.isActive === false ? 'Không hoạt động' : 'Đã nhận',
            // Judge:
            scores: prefillScores[s.id] ?? crit.map(() => 0),
            comment: prefillComment[s.id] ?? '',
            // Viewer:
            breakdown,
            // Chung — quyết định khung màu cam/xanh.
            scored: scoredByJudge,
          };
        });

        // 7) Khóa/mở form chấm (chỉ áp dụng cho Judge — viewer không chấm nên không cần khóa).
        let lockState = { locked: false, message: null };
        if (judge) {
          const now = new Date();
          const endDate = round?.endDate ? new Date(round.endDate) : null;
          const notEnded = endDate ? now < endDate : false;
          if (published) {
            lockState = { locked: true, message: 'Vòng thi này đã chốt kết quả, không thể chấm điểm thêm.' };
          } else if (notEnded) {
            const when = endDate.toLocaleString('vi-VN', {
              day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
            });
            lockState = { locked: true, message: `Form chấm điểm sẽ được mở sau khi vòng thi kết thúc vào lúc ${when}.` };
          }
        }

        setIsJudge(judge);
        setEventRoleId(roleId);
        setCriteria(crit);
        setSubmissions(mapped);
        setLock(lockState);
      } catch (e) {
        if (!cancelled) {
          setError(e?.response ? getErrorMessage(e, 'Không thể tải dữ liệu.') : (e?.message ?? 'Không thể tải dữ liệu.'));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [currentUser?.id, eventId, trackId]);

  const saveEdit = async (submitResultId, { details, comment }) => {
    if (lock.locked) {
      sn(lock.message ?? 'Chưa thể chấm điểm ở thời điểm này.', 'e');
      return;
    }
    const byCriteria = Object.fromEntries(criteria.map(c => [c.id, c]));
    try {
      await scoresApi.save({
        eventRoleId,
        submitResultId,
        comment,
        details: details.map(d => ({
          criteriaId: d.criteriaId,
          value: d.value ?? 0,
          templateId: byCriteria[d.criteriaId]?.templateId,
        })),
      });
      const detailByCriteria = Object.fromEntries(details.map(d => [d.criteriaId, d]));
      const scores = criteria.map(c => detailByCriteria[c.id]?.value ?? 0);
      setSubmissions(p => p.map(s => s.id === submitResultId ? { ...s, scores, comment, scored: true } : s));
      setEditT(null);
      sn('Đã lưu điểm thành công!');
    } catch (e) {
      const msg = e?.response ? getErrorMessage(e, 'Lưu điểm thất bại, vui lòng thử lại') : (e?.message ?? 'Lưu điểm thất bại, vui lòng thử lại');
      sn(msg, 'e');
    }
  };

  const fmt = (iso) => iso
    ? new Date(iso).toLocaleString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
      })
    : '—';

  return (
    <>
      <Notif n={notif} />
      {editT && !lock.locked && (
        <EditModal
          team={editT}
          criteria={criteria}
          onClose={() => setEditT(null)}
          onSave={(payload) => saveEdit(editT.id, payload)}
        />
      )}
      {viewT && (
        <ScoreBreakdownModal
          teamLabel={`Bài nộp #${viewT.index + 1}`}
          submission={viewT.breakdown}
          onClose={() => setViewT(null)}
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
      ) : (
        <div className="animate-fadeUp">
          <div className="flex justify-between items-start mb-7">
            <div>
              <h2 className="text-xl font-bold m-0" style={{ color: '#000' }}>
                {isJudge ? 'Bảng chấm điểm' : 'Danh sách bài nộp'}
              </h2>
              <p className="text-sm mt-1" style={{ color: '#757575' }}>
                {isJudge
                  ? `Chấm và quản lý điểm số các đội thi · ${criteria.length} Bộ tiêu chí`
                  : 'Xem bài nộp và kết quả chấm điểm từ các đội thi.'}
              </p>
            </div>
            <div className="badge-accent px-4 py-2 text-sm">{submissions.length} bài nộp</div>
          </div>

          {roundInfo && (
            <div
              className="mb-4 flex items-center gap-3 px-4 py-3"
              style={{ background: 'rgba(118,185,0,0.08)', border: '1px solid rgba(118,185,0,0.3)', borderRadius: 2 }}
            >
              <span style={{ color: '#76b900', fontSize: 14 }}>🏁</span>
              <div className="text-sm" style={{ color: '#5a8d00' }}>
                <span className="font-bold">{roundInfo.roundName}</span>
                {roundInfo.startDate && roundInfo.endDate && (
                  <span style={{ fontWeight: 400, color: '#757575', marginLeft: 8 }}>
                    {fmt(roundInfo.startDate)} → {fmt(roundInfo.endDate)}
                  </span>
                )}
              </div>
            </div>
          )}

          {isJudge && lock.locked && (
            <div
              className="mb-5 flex items-start gap-3 p-4"
              style={{ background: 'rgba(255,193,7,.1)', border: '1px solid #ffc107', borderRadius: 2 }}
              role="alert"
            >
              <span style={{ color: '#b8860b', fontSize: 16, lineHeight: 1.2 }}>⚠</span>
              <p className="text-sm m-0" style={{ color: '#8a6d00' }}>{lock.message}</p>
            </div>
          )}

          {submissions.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sm" style={{ color: '#757575' }}>Chưa có đội nào nộp bài trong track này.</p>
            </div>
          ) : (
            <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {submissions.map((s) => {
                // Khung màu: cam = chưa chấm, xanh lá = đã chấm (ít nhất 1 giám khảo với
                // viewer; chính họ với Judge).
                const borderColor = s.scored ? '#76b900' : '#df6500';
                const bgTint = s.scored ? 'rgba(118,185,0,.04)' : 'rgba(223,101,0,.04)';
                const score = isJudge ? calcScore(s.scores, criteria) : null;

                return (
                  <div
                    key={s.id}
                    className="card-hover p-6"
                    style={{ background: bgTint, border: `1.5px solid ${borderColor}`, borderRadius: 2, animationDelay: `${s.index * 0.06}s` }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        {/* Ẩn danh phía chấm: giám khảo/người xem thấy mã bài, không thấy tên đội. */}
                        <span className="text-sm font-bold" style={{ color: '#000' }}>Bài nộp #{s.index + 1}</span>
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5"
                          style={{ background: s.scored ? 'rgba(118,185,0,.15)' : 'rgba(223,101,0,.15)', color: s.scored ? '#5a8d00' : '#df6500', borderRadius: 2 }}
                        >
                          {s.scored ? '● Đã chấm' : '● Chưa chấm'}
                        </span>
                      </div>
                      {isJudge && (
                        <div className="text-right">
                          <div className="text-2xl font-black leading-none" style={{ color: '#76b900' }}>{score.toFixed(2)}</div>
                          <div className="text-xs" style={{ color: '#757575' }}>/10</div>
                        </div>
                      )}
                    </div>

                    <div className="grid gap-2.5 my-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
                      <div className="p-3" style={{ background: '#f7f7f7', borderRadius: 2 }}>
                        <div className="text-[10px] tracking-widest mb-1 font-bold uppercase" style={{ color: '#757575' }}>Trạng thái</div>
                        <div className="text-sm font-bold" style={{ color: '#000' }}>{s.status}</div>
                      </div>
                      <div className="p-3" style={{ background: '#f7f7f7', borderRadius: 2 }}>
                        <div className="text-[10px] tracking-widest mb-1 font-bold uppercase" style={{ color: '#757575' }}>Thời gian nộp</div>
                        <div className="text-sm font-bold" style={{ color: '#000' }}>{s.submittedAt}</div>
                      </div>
                    </div>

                    {(s.links.length > 0 ? s.links : []).map((lnk, li) => (
                      <div key={li} className="p-3 flex items-center gap-2.5 mb-1.5" style={{ background: '#f7f7f7', borderRadius: 2 }}>
                        <div className="text-[10px] tracking-widest shrink-0 font-bold uppercase" style={{ color: '#757575', minWidth: 50 }}>
                          {lnk.label}
                        </div>
                        <a href={lnk.url} target="_blank" rel="noreferrer" className="text-xs break-all"
                          style={{ color: '#76b900', textDecoration: 'none' }}>{lnk.url}</a>
                      </div>
                    ))}

                    {isJudge && (
                      <div className="mt-2.5 flex flex-col gap-1.5">
                        {criteria.slice(0, 3).map((c, ci) => (
                          <div key={ci} className="flex items-center gap-2">
                            <div className="text-xs shrink-0" style={{ color: '#757575', width: 96 }}>{c.label}</div>
                            <div className="flex-1 h-1.5" style={{ background: '#e5e5e5', borderRadius: 2 }}>
                              <div style={{ height: '100%', width: `${((s.scores[ci] || 0) / (c.maxScore ?? 10)) * 100}%`, background: '#76b900' }} />
                            </div>
                            <div className="text-xs font-bold w-6 text-right" style={{ color: '#000' }}>{s.scores[ci] || 0}</div>
                          </div>
                        ))}
                        {criteria.length > 3 && (
                          <div className="text-xs" style={{ color: '#757575' }}>+{criteria.length - 3} Bộ tiêu chí khác...</div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-end mt-4">
                      {isJudge ? (
                        <button className="btn-hover flex items-center gap-2 px-4 py-2 text-xs font-bold"
                          onClick={() => setEditT(s)}
                          disabled={lock.locked}
                          style={{
                            background: '#f7f7f7', border: '1px solid #cccccc',
                            color: lock.locked ? '#aaaaaa' : '#000', borderRadius: 2,
                            cursor: lock.locked ? 'not-allowed' : 'pointer', opacity: lock.locked ? 0.6 : 1,
                          }}>
                          ⚡ Chấm / Sửa
                        </button>
                      ) : (
                        <button className="btn-hover flex items-center gap-2 px-4 py-2 text-xs font-bold"
                          onClick={() => setViewT(s)}
                          style={{ background: '#f7f7f7', border: '1px solid #cccccc', color: '#000', borderRadius: 2, cursor: 'pointer' }}>
                          🔍 Xem chi tiết chấm điểm
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
