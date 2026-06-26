import { useState } from 'react';
import {
  getCriteria,
  createCriteria,
  updateCriteria,
  deleteCriteria,
  toggleCriteriaStatus,
} from '../services/criteriaService';

const BLANK = { criteriaName: '', description: '', isActive: true };
const COLORS = ['#76b900','#0046a4','#df6500','#952fc6','#0D9488','#5a8d00'];

export default function CriteriaPage({ criteria, setCriteria, sn }) {
  const [ed,     setEd]     = useState(null);
  const [f,      setF]      = useState({ ...BLANK });
  const [saving, setSaving] = useState(false);

  const openNew  = ()  => { setF({ ...BLANK }); setEd('new'); };
  const openEdit = (c) => { setF({ criteriaName: c.label, description: c.desc ?? '', isActive: c.isActive !== false }); setEd(c.id); };
  const close    = ()  => setEd(null);

  const refresh = () => getCriteria().then(setCriteria).catch(console.error);

  const save = async () => {
    if (!f.criteriaName.trim()) { sn('Vui lòng điền tên tiêu chí', 'e'); return; }
    setSaving(true);
    try {
      if (ed === 'new') {
        await createCriteria(f);
        sn('Đã thêm tiêu chí!');
      } else {
        await updateCriteria(ed, f);
        sn('Đã cập nhật tiêu chí!');
      }
      close();
      await refresh();
    } catch (e) {
      const msg = e?.response?.data?.message ?? e?.message ?? 'Lỗi khi lưu tiêu chí';
      sn(msg, 'e');
      console.error('[saveCriteria]', e?.response?.status, e?.response?.data ?? e);
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    try {
      await deleteCriteria(id);
      sn('Đã xóa tiêu chí.');
      await refresh();
    } catch {
      sn('Lỗi khi xóa tiêu chí', 'e');
    }
  };

  const toggle = async (id, currentActive) => {
    try {
      await toggleCriteriaStatus(id);
      sn(currentActive ? 'Đã tắt tiêu chí.' : 'Đã bật tiêu chí.');
      await refresh();
    } catch {
      sn('Lỗi khi thay đổi trạng thái', 'e');
    }
  };

  const hasWeight = criteria.some(c => c.weight > 0);
  const totalW    = criteria.reduce((s, c) => s + (c.weight ?? 0), 0);

  return (
    <div className="animate-fadeUp">

      {/* ── Modal tạo / sửa ─────────────────────────────────────────────────── */}
      {ed !== null && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ maxWidth: 520 }}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-lg font-bold" style={{ color: '#000' }}>
                  {ed === 'new' ? 'Thêm tiêu chí mới' : 'Chỉnh sửa tiêu chí'}
                </div>
                <div className="text-xs mt-1" style={{ color: '#757575' }}>
                  Tên và mô tả lưu trên backend. Trọng số được quản lý qua Template.
                </div>
              </div>
              <button className="btn-hover" onClick={close}
                style={{ background: 'transparent', border: 'none', color: '#757575', fontSize: 18, lineHeight: 1 }}>✕</button>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider" style={{ color: '#757575' }}>Tên tiêu chí *</label>
              <input
                value={f.criteriaName}
                onChange={e => setF({ ...f, criteriaName: e.target.value })}
                placeholder="VD: Tính sáng tạo"
                className="input-field"
              />
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider" style={{ color: '#757575' }}>Mô tả</label>
              <input
                value={f.description}
                onChange={e => setF({ ...f, description: e.target.value })}
                placeholder="Mô tả ngắn về tiêu chí..."
                className="input-field"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button className="btn btn-outline" onClick={close}>Hủy</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>
                {saving ? 'Đang lưu...' : ed === 'new' ? 'Thêm tiêu chí' : 'Lưu thay đổi'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex justify-between items-start mb-7">
        <div>
          <h2 className="text-xl font-bold m-0" style={{ color: '#000' }}>Tiêu chí chấm điểm</h2>
          <p className="text-sm mt-1" style={{ color: '#757575' }}>
            Quản lý bộ tiêu chí. Tất cả điểm chấm sẽ dựa theo bộ này.
          </p>
        </div>
        <button className="btn btn-primary" onClick={openNew}>+ Thêm tiêu chí</button>
      </div>

      {/* ── Thanh trọng số ──────────────────────────────────────────────────── */}
      {hasWeight && (
        <div className="p-5 mb-6" style={{ background: '#f7f7f7', border: '1px solid #cccccc', borderRadius: 2 }}>
          <div className="flex justify-between mb-2.5">
            <span className="text-sm" style={{ color: '#757575' }}>Tổng trọng số (từ Template)</span>
            <span className="text-sm font-bold" style={{ color: totalW === 100 ? '#76b900' : '#df6500' }}>
              {totalW}% / 100%
            </span>
          </div>
          <div className="h-2 overflow-hidden flex gap-0.5" style={{ background: '#e5e5e5', borderRadius: 2 }}>
            {criteria.map((c, i) => (
              <div key={i} style={{
                height: '100%', width: `${c.weight ?? 0}%`,
                background: COLORS[i % COLORS.length],
                transition: 'width .4s',
              }} />
            ))}
          </div>
          <div className="flex gap-3 mt-2.5 flex-wrap">
            {criteria.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs" style={{ color: '#757575' }}>
                <div style={{ width: 8, height: 8, background: COLORS[i % COLORS.length], borderRadius: 2 }} />
                {c.label} {c.weight ? `(${c.weight}%)` : ''}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Empty state ─────────────────────────────────────────────────────── */}
      {criteria.length === 0 && (
        <div className="text-center py-20" style={{ color: '#757575' }}>
          <div className="text-base font-bold mb-1.5" style={{ color: '#76b900' }}>Chưa có tiêu chí nào</div>
          <div className="text-sm">Bấm "+ Thêm tiêu chí" để bắt đầu.</div>
        </div>
      )}

      {/* ── Danh sách tiêu chí ──────────────────────────────────────────────── */}
      {criteria.map((c) => (
        <div
          key={c.id}
          className="card-hover p-6 mb-3"
          style={{
            background: '#ffffff',
            border: '1px solid #cccccc',
            borderRadius: 2,
            opacity: c.isActive === false ? 0.55 : 1,
            transition: 'opacity .3s',
          }}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                {c.weight > 0 && (
                  <div className="px-2.5 py-0.5 text-xs font-bold"
                    style={{ background: 'rgba(118,185,0,.12)', border: '1px solid rgba(118,185,0,.3)', color: '#76b900', borderRadius: 2 }}>
                    {c.weight}%
                  </div>
                )}
                <div className="text-base font-bold" style={{ color: '#000' }}>{c.label}</div>
                {c.isActive === false && (
                  <div className="px-2 py-0.5 text-xs font-bold"
                    style={{ background: 'rgba(229,32,32,.08)', border: '1px solid rgba(229,32,32,.25)', color: '#e52020', borderRadius: 2 }}>
                    Đã tắt
                  </div>
                )}
              </div>
              {c.desc && (
                <div className="text-xs" style={{ color: '#757575' }}>{c.desc}</div>
              )}
            </div>

            <div className="flex gap-2 ml-4 shrink-0">
              <button
                className="btn-hover px-3 py-1.5 text-xs font-bold"
                onClick={() => toggle(c.id, c.isActive !== false)}
                style={{ background: '#f7f7f7', border: '1px solid #cccccc', color: '#000', borderRadius: 2 }}
              >
                {c.isActive === false ? 'Bật' : 'Tắt'}
              </button>
              <button
                className="btn-hover px-3 py-1.5 text-xs font-bold"
                onClick={() => openEdit(c)}
                style={{ background: 'rgba(118,185,0,.1)', border: '1px solid rgba(118,185,0,.3)', color: '#5a8d00', borderRadius: 2 }}
              >Sửa</button>
              <button
                className="btn-hover px-3 py-1.5 text-xs font-bold"
                onClick={() => del(c.id)}
                style={{ background: 'rgba(229,32,32,.08)', border: '1px solid rgba(229,32,32,.25)', color: '#e52020', borderRadius: 2 }}
              >Xóa</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
