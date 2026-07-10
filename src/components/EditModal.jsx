import { useState } from 'react';
import { calcScore } from '../utils.jsx';

export default function EditModal({ team, criteria, onClose, onSave }) {
  const [scores, setScores] = useState(
    [...team.scores].concat(Array(Math.max(0, criteria.length - team.scores.length)).fill(0))
  );
  const [cmts, setCmts] = useState(
    [...(team.comments || [])].concat(Array(Math.max(0, criteria.length - (team.comments || []).length)).fill(''))
  );
  const prev = calcScore(team.scores, criteria);
  const next = calcScore(scores, criteria);

  return (
    <div className="modal-overlay" style={{ padding: '24px 16px' }}>
      <div className="modal-box" style={{ maxWidth: 680 }}>

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-lg font-bold" style={{ color: '#000' }}>Chấm / Chỉnh sửa điểm số</div>
            <div className="text-xs mt-1" style={{ color: '#757575' }}>Xem lại và điều chỉnh điểm số theo từng tiêu chí.</div>
            <div className="text-sm mt-1.5 font-bold" style={{ color: '#76b900' }}>{team.id} · {team.name}</div>
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
              <div className="grid gap-2 items-center mb-3" style={{ gridTemplateColumns: '1fr 70px 100px 110px' }}>
                <div>
                  <div className="font-bold text-sm" style={{ color: '#000' }}>{c.label}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: '#757575' }}>{c.labelVi} · {c.weight}/10</div>
                </div>
                <div className="text-center text-xs font-bold" style={{ color: '#757575' }}>{c.weight}/10</div>
                <input
                  type="number" min="0" max={c.weight} step="0.5"
                  value={scores[i] || 0}
                  onChange={e => { const val = Math.min(parseFloat(e.target.value) || 0, c.weight); const v = [...scores]; v[i] = val; setScores(v); }}
                  className="text-center text-lg font-black w-full"
                  style={{
                    background: '#fff',
                    border: '1.5px solid #76b900',
                    borderRadius: 2,
                    padding: '9px 4px',
                    color: '#76b900',
                    outline: 'none',
                  }}
                />
                <div className="text-right text-sm font-bold" style={{ color: '#76b900' }}>
                  {(scores[i] || 0).toFixed(2)} / {c.weight}
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

              {/* Comment */}
              <div>
                <div className="text-[10px] tracking-widest mb-1 font-bold uppercase" style={{ color: '#757575' }}>
                  Nhận xét
                </div>
                <textarea
                  value={cmts[i] || ''}
                  rows={2}
                  onChange={e => { const v = [...cmts]; v[i] = e.target.value; setCmts(v); }}
                  placeholder="Nhận xét cho tiêu chí này..."
                  className="input-field resize-y text-xs leading-relaxed"
                />
              </div>
            </div>
          );
        })}

        {/* Total bar */}
        <div
          className="grid items-center p-5 mt-1"
          style={{
            gridTemplateColumns: '1fr 140px',
            background: 'rgba(118,185,0,.08)',
            border: '1px solid rgba(118,185,0,.3)',
            borderRadius: 2,
          }}
        >
          <div className="text-sm" style={{ color: '#757575' }}>
            Tổng trước đó: <strong style={{ color: '#000' }}>{prev.toFixed(2)}</strong>
          </div>
          <div className="text-right">
            <div className="text-[10px] tracking-widest font-bold uppercase mb-0.5" style={{ color: '#757575' }}>
              Tổng điểm mới
            </div>
            <div className="text-3xl font-black leading-none" style={{ color: '#76b900' }}>
              {next.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-5">
          <button className="btn btn-outline" onClick={onClose}>Hủy</button>
          <button className="btn btn-primary" onClick={() => onSave(scores, cmts)}>✓ Xác nhận</button>
        </div>

      </div>
    </div>
  );
}
