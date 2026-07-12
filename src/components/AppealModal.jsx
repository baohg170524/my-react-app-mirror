import { useState } from 'react';
import { calcScore, StatusBadge } from '../utils.jsx';

export default function AppealModal({ appeal, team, criteria, onClose, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [es, setEs] = useState([...(team?.scores || [])]);
  const prev = team ? calcScore(team.scores, criteria) : 0;
  const next  = calcScore(es, criteria);

  return (
    <div className="modal-overlay items-center" style={{ padding: 24 }}>
      <div className="modal-box" style={{ maxWidth: 600 }}>
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <div className="text-base font-bold" style={{ color: '#000' }}>Chi tiết đơn phúc khảo</div>
            <div className="text-xs mt-1" style={{ color: '#76b900' }}>{appeal.id} · {appeal.teamId} · {appeal.teamName}</div>
          </div>
          <button className="btn-hover" onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#757575', fontSize: 18 }}>✕</button>
        </div>

        {/* Reason */}
        <div className="p-4 mb-4" style={{ background: '#f7f7f7', borderRadius: 2, border: '1px solid #e5e5e5' }}>
          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#757575' }}>LÝ DO PHÚC KHẢO</div>
          <div className="text-sm leading-relaxed" style={{ color: '#1a1a1a' }}>{appeal.reason}</div>
        </div>

        {/* Meta */}
        <div className="flex gap-3 mb-5 flex-wrap">
          {[['EMAIL', appeal.email], ['NGÀY NỘP', appeal.date]].map(([k, v]) => (
            <div key={k} className="p-3 flex-1 min-w-28" style={{ background: '#f7f7f7', borderRadius: 2 }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#757575' }}>{k}</div>
              <div className="text-sm font-bold" style={{ color: '#000' }}>{v}</div>
            </div>
          ))}
          <div className="p-3 flex-1" style={{ background: '#f7f7f7', borderRadius: 2 }}>
            <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#757575' }}>TRẠNG THÁI</div>
            <div className="mt-1"><StatusBadge status={appeal.status} /></div>
          </div>
        </div>

        {/* Scores */}
        {team && (
          <div className="mb-4">
            <div className="text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: '#757575' }}>
              ĐIỂM HIỆN TẠI ({prev.toFixed(2)}/10)
            </div>
            {!editing ? (
              <>
                {criteria.map((c, i) => (
                  <div key={i} className="grid items-center p-3 mb-1.5"
                    style={{ gridTemplateColumns: '1fr 70px 80px 100px', gap: 8, background: '#f7f7f7', borderRadius: 2 }}>
                    <div className="text-sm font-bold" style={{ color: '#000' }}>{c.label}</div>
                    <div className="text-center text-xs" style={{ color: '#757575' }}>{c.weight}/10</div>
                    <div className="text-center text-base font-bold" style={{ color: '#000' }}>{team.scores[i] || 0}</div>
                    <div className="text-right text-sm font-bold" style={{ color: '#76b900' }}>
                      {((team.scores[i] || 0) * (c.weight / 10)).toFixed(2)}
                    </div>
                  </div>
                ))}
                <button className="btn-hover w-full mt-2 py-2.5 text-sm font-bold"
                  onClick={() => setEditing(true)}
                  style={{ background: '#f7f7f7', border: '1px solid #cccccc', color: '#000', borderRadius: 2 }}>
                  Chỉnh sửa điểm
                </button>
              </>
            ) : (
              <>
                {criteria.map((c, i) => (
                  <div key={i} className="grid items-center p-3 mb-1.5"
                    style={{ gridTemplateColumns: '1fr 70px 80px 100px', gap: 8, background: '#f7f7f7', borderRadius: 2 }}>
                    <div className="text-sm font-bold" style={{ color: '#000' }}>{c.label}</div>
                    <div className="text-center text-xs" style={{ color: '#757575' }}>{c.weight}/10</div>
                    <input type="number" min="0" max="10" step="0.5" value={es[i] || 0}
                      onChange={e => { const v = [...es]; v[i] = parseFloat(e.target.value) || 0; setEs(v); }}
                      className="text-center text-sm font-bold w-full"
                      style={{ background: '#fff', border: '2px solid #76b900', padding: '7px 4px', color: '#000', outline: 'none', borderRadius: 2 }}
                    />
                    <div className="text-right text-sm font-bold" style={{ color: '#76b900' }}>
                      {((es[i] || 0) * (c.weight / 10)).toFixed(2)}
                    </div>
                  </div>
                ))}
                <div className="grid items-center p-4 mt-1"
                  style={{ gridTemplateColumns: '1fr 120px', background: 'rgba(118,185,0,.08)', border: '1px solid rgba(118,185,0,.25)', borderRadius: 2 }}>
                  <div className="text-xs" style={{ color: '#757575' }}>Trước: <strong style={{ color: '#000' }}>{prev.toFixed(2)}</strong></div>
                  <div className="text-right">
                    <div className="text-xs font-bold uppercase tracking-widest" style={{ color: '#757575' }}>TỔNG MỚI</div>
                    <div className="text-2xl font-black" style={{ color: '#76b900' }}>{next.toFixed(2)}</div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2.5 flex-wrap">
          {editing ? (
            <>
              <button className="btn btn-outline flex-1" onClick={() => setEditing(false)}>Hủy chỉnh sửa</button>
              <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => onUpdate(appeal.id, 'Đã duyệt', es)}>
                Xác nhận & Duyệt đơn
              </button>
            </>
          ) : (
            <>
              <button className="btn-hover flex-1 py-2.5 text-sm font-bold"
                style={{ background: 'rgba(229,32,32,.08)', border: '1px solid rgba(229,32,32,.25)', color: '#e52020', borderRadius: 2 }}
                onClick={() => onUpdate(appeal.id, 'Từ chối', null)}>Từ chối</button>
              <button className="btn-hover flex-1 py-2.5 text-sm font-bold"
                style={{ background: 'rgba(0,70,164,.08)', border: '1px solid rgba(0,70,164,.25)', color: '#0046a4', borderRadius: 2 }}
                onClick={() => onUpdate(appeal.id, 'Đang xét', null)}>Đang xét</button>
              <button className="btn btn-outline flex-1" onClick={onClose}>Đóng</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
