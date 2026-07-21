import { useState } from 'react';
import { calcScoreNormalized } from '../utils.jsx';

// Tổng điểm cuối luôn nằm trong thang 0–10 theo thiết kế hệ thống (FinalScore =
// Σ(score × weight/100), tổng weight của 1 bộ tiêu chí = 100) — khác với `maxScore`
// của từng tiêu chí riêng lẻ, vốn lấy từ backend và có thể khác nhau tùy cấu hình.
const TOTAL_MAX = 10;

export default function EditModal({ team, criteria, onClose, onSave, readOnly = false }) {
  const [scores, setScores] = useState(
    [...team.scores].concat(Array(Math.max(0, criteria.length - team.scores.length)).fill(0))
  );
  // Backend chỉ hỗ trợ 1 nhận xét chung cho cả phiếu chấm (Score.comment), không có
  // nhận xét theo từng tiêu chí (CriterionScoreLine không có field comment) — nên chỉ
  // giữ 1 ô nhận xét tổng thay vì mảng theo từng tiêu chí như trước.
  const [comment, setComment] = useState(team.comment || '');
  // "Tổng trước đó" dùng thẳng totalScore backend đã tính đúng (nếu có, tức bài đã từng
  // chấm) thay vì tự tính lại bằng calcScore() — chỉ fallback khi bài chưa từng chấm.
  const prev = typeof team.totalScore === 'number' ? team.totalScore : calcScoreNormalized(team.scores, criteria);
  const next = calcScoreNormalized(scores, criteria);
  const delta = next - prev;

  return (
    <div className="modal-overlay" style={{ padding: '24px 16px', zIndex: 200, alignItems: 'flex-start', paddingTop: '80px' }}>
      <div className="modal-box" style={{ maxWidth: 680 }}>

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-lg font-bold" style={{ color: '#000' }}>
              {readOnly ? 'Điểm đã chấm' : 'Chấm / Chỉnh sửa điểm số'}
            </div>
            <div className="text-xs mt-1" style={{ color: '#757575' }}>
              {readOnly
                ? 'Vòng thi đã chốt kết quả — chỉ xem lại điểm bạn đã chấm, không thể chỉnh sửa.'
                : 'Xem lại và điều chỉnh điểm số theo từng tiêu chí.'}
            </div>
            <div className="text-sm mt-1.5 font-bold" style={{ color: '#76b900' }}>Đội: {String(team.teamId || team.id || '').slice(0, 8).toUpperCase()}</div>
          </div>
          <button
            className="btn-hover text-xl leading-none"
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#757575' }}
          >✕</button>
        </div>

        {/* Criteria list */}
        {criteria.map((c, i) => {
          const sc = scores[i] || 0;
          const al = c.levels ? c.levels.findIndex(lv => {
            const pts = lv.range.replace('–', '-').split('-').map(Number);
            return sc >= pts[0] && sc <= (pts[1] ?? 10);
          }) : -1;

          return (
            <div
              key={c.id}
              className="mb-3 p-5"
              style={{ background: '#f7f7f7', border: '1px solid #cccccc', borderRadius: 2 }}
            >
              {/* Criteria row */}
              <div className="grid gap-2 items-center mb-3" style={{ gridTemplateColumns: '1fr 100px 120px' }}>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="font-bold text-sm" style={{ color: '#000' }}>{c.label}</div>
                    {typeof c.weight === 'number' && (
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5"
                        style={{ background: 'rgba(118,185,0,.1)', color: '#5a8d00', borderRadius: 2 }}
                      >
                        trọng số {c.weight}%
                      </span>
                    )}
                    {(c.maxScore ?? 10) !== 10 && (
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5"
                        title="Điểm tối đa của tiêu chí này khác chuẩn 0–10. Có thể do dữ liệu bộ tiêu chí bị cấu hình sai — báo Admin kiểm tra ở trang Bộ tiêu chí."
                        style={{ background: 'rgba(223,101,0,.1)', color: '#df6500', borderRadius: 2 }}
                      >
                        ⚠ max bất thường
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: '#757575' }}>
                    {c.labelVi} · tối đa {c.maxScore ?? 10} điểm
                    {typeof c.weight === 'number' && (
                      <> · Đóng góp tối đa <strong>{(c.weight / 10).toFixed(1)}đ</strong> vào tổng điểm</>
                    )}
                  </div>
                </div>
                <input
                  type="number" min="0" max={c.maxScore ?? 10} step="0.5"
                  value={scores[i] || 0}
                  disabled={readOnly}
                  onChange={e => { if (readOnly) return; const val = Math.min(parseFloat(e.target.value) || 0, c.maxScore ?? 10); const v = [...scores]; v[i] = val; setScores(v); }}
                  className="text-center text-lg font-black w-full"
                  style={{
                    background: readOnly ? '#f0f0f0' : '#fff',
                    border: `1.5px solid ${readOnly ? '#cccccc' : '#76b900'}`,
                    borderRadius: 2,
                    padding: '9px 4px',
                    color: readOnly ? '#757575' : '#76b900',
                    outline: 'none',
                    cursor: readOnly ? 'default' : 'text',
                  }}
                />
                <div className="text-right text-sm font-bold" style={{ color: '#76b900' }}>
                  {(scores[i] || 0).toFixed(2)} / {c.maxScore ?? 10}
                </div>
              </div>

              {/* Level pills */}
              {c.levels && c.levels.length > 0 && (
                <div
                  className="grid gap-1.5 mb-3"
                  style={{ gridTemplateColumns: `repeat(${Math.min(c.levels.length, 4)}, 1fr)` }}
                >
                  {c.levels.map((lv, li) => (
                    <div
                      key={li}
                      className="p-2"
                      style={{
                        background: li === al ? 'rgba(118,185,0,.1)' : '#fff',
                        border: `1px solid ${li === al ? '#76b900' : '#cccccc'}`,
                        borderRadius: 2,
                      }}
                    >
                      <div className="text-[10px] font-bold mb-0.5" style={{ color: li === al ? '#76b900' : '#757575' }}>
                        {lv.range}
                      </div>
                      <div className="text-[10px] leading-snug" style={{ color: li === al ? '#5a8d00' : '#757575' }}>
                        {lv.desc}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          );
        })}

        {/* Nhận xét chung — 1 ô cho cả phiếu chấm (khớp Score.comment ở backend) */}
        <div className="mb-3 p-5" style={{ background: '#f7f7f7', border: '1px solid #cccccc', borderRadius: 2 }}>
          <div className="text-[10px] tracking-widest mb-1 font-bold uppercase" style={{ color: '#757575' }}>
            Nhận xét chung
          </div>
          <textarea
            value={comment}
            rows={3}
            readOnly={readOnly}
            onChange={e => { if (!readOnly) setComment(e.target.value); }}
            placeholder="Nhận xét tổng quan cho bài nộp này..."
            className="input-field resize-y text-xs leading-relaxed"
            style={readOnly ? { background: '#f0f0f0', color: '#757575', cursor: 'default' } : undefined}
          />
        </div>

        {/* Total bar */}
        <div
          className="grid items-center p-5 mt-1"
          style={{
            gridTemplateColumns: readOnly ? '1fr' : '1fr 160px',
            background: 'rgba(118,185,0,.08)',
            border: '1px solid rgba(118,185,0,.3)',
            borderRadius: 2,
          }}
        >
          {readOnly ? (
            <div className="flex items-center justify-between">
              <div className="text-[10px] tracking-widest font-bold uppercase" style={{ color: '#757575' }}>
                Tổng điểm bạn đã chấm
              </div>
              <div className="text-3xl font-black leading-none" style={{ color: '#76b900' }}>
                {prev.toFixed(2)} <span className="text-base font-bold" style={{ color: '#757575' }}>/ {TOTAL_MAX}</span>
              </div>
            </div>
          ) : (
            <>
              <div className="text-sm" style={{ color: '#757575' }}>
                Tổng trước đó: <strong style={{ color: '#000' }}>{prev.toFixed(2)}</strong> / {TOTAL_MAX}
              </div>
              <div className="text-right">
                <div className="text-[10px] tracking-widest font-bold uppercase mb-0.5" style={{ color: '#757575' }}>
                  Tổng điểm mới
                </div>
                <div className="text-3xl font-black leading-none" style={{ color: '#76b900' }}>
                  {next.toFixed(2)} <span className="text-base font-bold" style={{ color: '#757575' }}>/ {TOTAL_MAX}</span>
                </div>
                {Math.abs(delta) >= 0.005 && (
                  <div className="text-xs font-bold mt-1" style={{ color: delta > 0 ? '#76b900' : '#e52020' }}>
                    {delta > 0 ? '▲' : '▼'} {Math.abs(delta).toFixed(2)} so với trước
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-5">
          <button className="btn btn-outline" onClick={onClose}>{readOnly ? 'Đóng' : 'Hủy'}</button>
          {!readOnly && (
            <button
              className="btn btn-update"
              onClick={() => onSave({
                // Ghép điểm với đúng tiêu chí bằng criteriaId (không dùng index mảng) để tránh
                // lệch dữ liệu nếu thứ tự `criteria` phía component cha đổi giữa lúc mở modal và
                // lúc lưu (vd do refetch/re-render) — trước đây từng gây lưu nhầm điểm sang tiêu
                // chí khác (điểm của Impact/Innovation bị gửi nhầm vào Feasibility).
                details: criteria.map((c, i) => ({
                  criteriaId: c.id,
                  value: scores[i] || 0,
                })),
                // Nhận xét chung cho cả phiếu (Score.comment) — backend không hỗ trợ nhận xét
                // theo từng tiêu chí.
                comment,
              })}
            >✓ Xác nhận</button>
          )}
        </div>

      </div>
    </div>
  );
}
