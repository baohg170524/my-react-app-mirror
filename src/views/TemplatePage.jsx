import { useState, useEffect, useMemo } from 'react';
import {
  getTemplates,
  getTemplateDetail,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  addCriteriaToTemplate,
  updateTemplateCriteria,
  removeFromTemplate,
} from '../services/templateService';
import { getCriteria } from '../services/criteriaService';
import { useNotify } from '@/components/NotificationProvider';

const BLANK_TMPL = { templateName: '', description: '' };
const BLANK_CRIT = { criteriaId: '', weight: 0, maxScore: 10 };
const COLORS = ['#76b900', '#0046a4', '#df6500', '#952fc6', '#0D9488', '#5a8d00'];
const PAGE_SIZE = 10;

export default function TemplatePage({ sn }) {
  const notify = useNotify();
  const [templates,   setTemplates]   = useState([]);
  const [allCriteria, setAllCriteria] = useState([]); // criteria pool cho dropdown
  const [expanded,    setExpanded]    = useState(null);
  const [loading,     setLoading]     = useState(true);

  // tmplModal: null | 'new' | <id>
  const [tmplModal, setTmplModal] = useState(null);
  // critModal: null | { templateId, mode: 'add'|'edit', criteriaId? }
  const [critModal, setCritModal] = useState(null);
  const [tmplF,     setTmplF]    = useState({ ...BLANK_TMPL });
  const [critF,     setCritF]    = useState({ ...BLANK_CRIT });
  const [saving,    setSaving]   = useState(false);
  const [search,    setSearch]    = useState('');   // tìm kiếm trong dropdown criteria
  const [searchTmpl, setSearchTmpl] = useState('');
  const [pageTmpl,   setPageTmpl]   = useState(1);

  useEffect(() => {
    Promise.allSettled([getTemplates(), getCriteria()])
      .then(([tmplR, critR]) => {
        if (tmplR.status === 'fulfilled') setTemplates(tmplR.value);
        else console.error('getTemplates failed:', tmplR.reason);
        if (critR.status === 'fulfilled') setAllCriteria(critR.value);
        else console.error('getCriteria failed:', critR.reason);
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Template CRUD ──────────────────────────────────────────────────────────
  const openNewTmpl  = ()  => { setTmplF({ ...BLANK_TMPL }); setTmplModal('new'); };
  const openEditTmpl = (t) => { setTmplF({ templateName: t.name, description: t.description }); setTmplModal(t.id); };
  const closeTmpl    = ()  => setTmplModal(null);

  const saveTmpl = async () => {
    if (!tmplF.templateName.trim()) { sn('Vui lòng điền tên bộ tiêu chí', 'e'); return; }
    setSaving(true);
    try {
      if (tmplModal === 'new') {
        const created = await createTemplate(tmplF);
        setTemplates(p => [...p, { ...created, criterias: [] }]);
        sn('Đã tạo bộ tiêu chí!');
      } else {
        const updated = await updateTemplate(tmplModal, tmplF);
        setTemplates(p => p.map(t => t.id === tmplModal ? { ...t, ...updated } : t));
        sn('Đã cập nhật bộ tiêu chí!');
      }
      closeTmpl();
    } catch {
      sn('Lỗi khi lưu bộ tiêu chí', 'e');
    } finally {
      setSaving(false);
    }
  };

  const delTmpl = async (id) => {
    try {
      await deleteTemplate(id);
      setTemplates(p => p.filter(t => t.id !== id));
      if (expanded === id) setExpanded(null);
      notify.success('Đã xóa bộ tiêu chí thành công!');
    } catch {
      notify.error('Lỗi khi xóa bộ tiêu chí. Vui lòng thử lại.');
    }
  };

  // ── Expand → load detail ───────────────────────────────────────────────────
  const toggleExpand = async (id) => {
    if (expanded === id) { setExpanded(null); return; }
    setExpanded(id);
    try {
      const detail = await getTemplateDetail(id);
      setTemplates(p => p.map(t => t.id === id ? { ...t, criterias: detail.criterias } : t));
    } catch {
      sn('Lỗi khi tải chi tiết bộ tiêu chí', 'e');
    }
  };

  // ── Criteria trong template ────────────────────────────────────────────────
  const openAddCrit  = (templateId)     => { setCritF({ ...BLANK_CRIT }); setSearch(''); setCritModal({ templateId, mode: 'add' }); };

  // Criteria chưa có trong bộ và đang active
  const getAvailable = (templateId) => {
    const usedIds = new Set(
      (templates.find(t => t.id === templateId)?.criterias ?? []).map(tc => tc.criteriaId)
    );
    return allCriteria.filter(c => !usedIds.has(c.id) && c.isActive !== false);
  };
  const openEditCrit = (templateId, tc) => {
    setCritF({ weight: tc.weight, maxScore: tc.maxScore });
    setCritModal({ templateId, mode: 'edit', criteriaId: tc.criteriaId });
  };
  const closeCrit = () => setCritModal(null);

  const saveCrit = async () => {
    if (critModal.mode === 'add' && !critF.criteriaId) {
      sn('Vui lòng chọn tiêu chí', 'e'); return;
    }
    const tmpl = templates.find(t => t.id === critModal.templateId);
    const existingW = (tmpl?.criterias ?? []).reduce((s, tc) => s + (tc.weight ?? 0), 0);
    const oldW = critModal.mode === 'edit'
      ? ((tmpl?.criterias ?? []).find(tc => tc.criteriaId === critModal.criteriaId)?.weight ?? 0)
      : 0;
    if (existingW - oldW + Number(critF.weight) > 100) {
      sn(`Tổng trọng số sẽ là ${existingW - oldW + Number(critF.weight)}, vượt quá 100`, 'e');
      return;
    }
    setSaving(true);
    try {
      const { templateId, mode, criteriaId: editId } = critModal;
      // hệ 100: giám khảo luôn chấm 0-10 mỗi tiêu chí; weight (%) quyết định đóng góp
      // của tiêu chí vào tổng điểm cuối (FinalScore = Σ score × weight / 100).
      // maxScore luôn cố định = 10, không phụ thuộc vào weight.
      if (mode === 'add') {
        await addCriteriaToTemplate(templateId, {
          criteriaId: critF.criteriaId,
          weight:     Number(critF.weight),
          maxScore:   10, // hệ 100: mọi tiêu chí luôn chấm trên thang điểm 10
        });
        sn('Đã thêm tiêu chí vào bộ!');
      } else {
        await updateTemplateCriteria(templateId, editId, { weight: Number(critF.weight), maxScore: 10 }); // hệ 100
        sn('Đã cập nhật cấu hình tiêu chí!');
      }
      const detail = await getTemplateDetail(templateId);
      setTemplates(p => p.map(t => t.id === templateId ? { ...t, criterias: detail.criterias } : t));
      closeCrit();
    } catch {
      sn('Lỗi khi lưu tiêu chí', 'e');
    } finally {
      setSaving(false);
    }
  };

  const removeCrit = async (templateId, criteriaId) => {
    try {
      await removeFromTemplate(templateId, criteriaId);
      setTemplates(p => p.map(t =>
        t.id === templateId
          ? { ...t, criterias: t.criterias.filter(tc => tc.criteriaId !== criteriaId) }
          : t
      ));
      sn('Đã gỡ tiêu chí khỏi bộ.');
    } catch {
      sn('Lỗi khi gỡ tiêu chí', 'e');
    }
  };

  const filteredTemplates = useMemo(() => {
    const q = searchTmpl.trim().toLowerCase();
    if (!q) return templates;
    return templates.filter(t =>
      t.name?.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q)
    );
  }, [templates, searchTmpl]);

  const totalPagesTmpl  = Math.max(1, Math.ceil(filteredTemplates.length / PAGE_SIZE));
  const currentPageTmpl = Math.min(pageTmpl, totalPagesTmpl);
  const pagedTemplates  = filteredTemplates.slice(
    (currentPageTmpl - 1) * PAGE_SIZE,
    currentPageTmpl * PAGE_SIZE
  );


  // ── Render ─────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="text-center py-20" style={{ color: '#757575' }}>Đang tải...</div>
  );

  return (
    <>

      {/* ── Modal: Tạo / Sửa Template ────────────────────────────────────── */}
      {tmplModal !== null && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ maxWidth: 520 }}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-lg font-bold" style={{ color: '#000' }}>
                  {tmplModal === 'new' ? 'Tạo bộ tiêu chí mới' : 'Chỉnh sửa bộ tiêu chí'}
                </div>
                <div className="text-xs mt-1" style={{ color: '#757575' }}>
                  Mỗi bộ tiêu chí chứa các tiêu chí với trọng số riêng.
                </div>
              </div>
              <button className="btn-hover" onClick={closeTmpl}
                style={{ background: 'transparent', border: 'none', color: '#757575', fontSize: 18, lineHeight: 1 }}>✕</button>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider" style={{ color: '#757575' }}>
                Tên bộ tiêu chí *
              </label>
              <input
                value={tmplF.templateName}
                onChange={e => setTmplF({ ...tmplF, templateName: e.target.value })}
                placeholder="VD: Bộ tiêu chí Kỳ 1 2024"
                className="input-field"
              />
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider" style={{ color: '#757575' }}>
                Mô tả
              </label>
              <input
                value={tmplF.description}
                onChange={e => setTmplF({ ...tmplF, description: e.target.value })}
                placeholder="Mô tả ngắn về bộ tiêu chí..."
                className="input-field"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button className="btn btn-outline" onClick={closeTmpl}>Hủy</button>
              <button className="btn btn-primary" onClick={saveTmpl} disabled={saving}>
                {saving ? 'Đang lưu...' : tmplModal === 'new' ? 'Tạo bộ tiêu chí' : 'Lưu thay đổi'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Thêm / Sửa tiêu chí trong template ───────────────────── */}
      {critModal !== null && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ maxWidth: 480 }}>
            <div className="flex justify-between items-start mb-6">
              <div className="text-lg font-bold" style={{ color: '#000' }}>
                {critModal.mode === 'add' ? 'Thêm tiêu chí vào bộ' : 'Cập nhật cấu hình tiêu chí'}
              </div>
              <button className="btn-hover" onClick={closeCrit}
                style={{ background: 'transparent', border: 'none', color: '#757575', fontSize: 18, lineHeight: 1 }}>✕</button>
            </div>

            {critModal.mode === 'add' && (() => {
              const available = getAvailable(critModal.templateId);
              const filtered  = available.filter(c =>
                c.label.toLowerCase().includes(search.toLowerCase())
              );
              const selected  = available.find(c => c.id === critF.criteriaId);
              return (
                <div className="mb-4">
                  <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider" style={{ color: '#757575' }}>
                    Tiêu chí *
                  </label>

                  {/* Ô tìm kiếm */}
                  <input
                    value={search}
                    onChange={e => { setSearch(e.target.value); setCritF({ ...critF, criteriaId: '' }); }}
                    placeholder="Tìm tiêu chí..."
                    className="input-field"
                    style={{ marginBottom: 6 }}
                  />

                  {/* Danh sách cuộn */}
                  {available.length === 0 ? (
                    <div className="text-xs py-2 text-center" style={{ color: '#df6500' }}>
                      Tất cả tiêu chí đã được thêm vào bộ này.
                    </div>
                  ) : (
                    <div style={{
                      border:     '1px solid #cccccc',
                      borderRadius: 2,
                      maxHeight:  220,
                      overflowY:  'auto',
                    }}>
                      {filtered.length === 0 ? (
                        <div className="text-xs py-3 text-center" style={{ color: '#757575' }}>
                          Không tìm thấy tiêu chí phù hợp.
                        </div>
                      ) : (
                        filtered.map(c => {
                          const isSelected = critF.criteriaId === c.id;
                          return (
                            <div
                              key={c.id}
                              onClick={() => setCritF({ ...critF, criteriaId: c.id })}
                              style={{
                                padding:    '9px 14px',
                                cursor:     'pointer',
                                fontSize:   13,
                                fontWeight: isSelected ? 700 : 400,
                                color:      isSelected ? '#5a8d00' : '#000',
                                background: isSelected ? 'rgba(118,185,0,.08)' : 'transparent',
                                borderBottom: '1px solid #f0f0f0',
                                display:    'flex',
                                alignItems: 'center',
                                gap:        8,
                                transition: 'background .15s',
                              }}
                              onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#f7f7f7'; }}
                              onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                            >
                              {isSelected && (
                                <span style={{ color: '#76b900', fontSize: 11 }}>✓</span>
                              )}
                              {c.label}
                              {c.desc && (
                                <span style={{ fontSize: 11, color: '#757575', fontWeight: 400, marginLeft: 'auto' }}>
                                  {c.desc.length > 30 ? c.desc.slice(0, 30) + '...' : c.desc}
                                </span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}

                  {/* Hiển thị đang chọn */}
                  {selected && (
                    <div className="text-xs mt-1.5 flex items-center gap-1" style={{ color: '#5a8d00' }}>
                      <span>✓</span> Đã chọn: <strong>{selected.label}</strong>
                    </div>
                  )}
                </div>
              );
            })()}

            <div className="flex gap-4 mb-2">
              <div className="flex-1">
                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider" style={{ color: '#757575' }}>
                  Trọng số (%)
                </label>
                <input
                  type="number" min="0" max="100"
                  value={critF.weight}
                  onChange={e => setCritF({ ...critF, weight: Number(e.target.value) })}
                  className="input-field"
                />
              </div>
              {/* Điểm tối đa THẬT dùng để giới hạn ô nhập điểm luôn cố định = 10 cho mọi tiêu
                  chí (xem saveCrit), không cho nhập tay. Số hiển thị bên dưới chỉ là tham khảo. */}
              <div className="flex-1">
                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider" style={{ color: '#757575' }}>
                  Điểm tối đa
                </label>
                <div className="input-field flex items-center" style={{ color: '#757575', background: '#f7f7f7' }}>
                  {(Number(critF.weight ?? 0) / 10).toFixed(1)} 
                </div>
              </div>
            </div>
            <div className="mb-6 text-xs" style={{ color: '#757575' }}>
              Giám khảo luôn chấm mỗi tiêu chí trên thang <strong>0–10</strong> (không bị giới hạn
              theo số "Điểm tối đa" ở trên — số đó chỉ để tham khảo tỉ lệ ảnh hưởng lên tổng
              điểm cuối). Tổng trọng số của cả bộ phải bằng <strong>100</strong>.
            </div>

            <div className="flex justify-end gap-3">
              <button className="btn btn-outline" onClick={closeCrit}>Hủy</button>
              <button className="btn btn-primary" onClick={saveCrit} disabled={saving}>
                {saving ? 'Đang lưu...' : critModal.mode === 'add' ? 'Thêm vào bộ' : 'Lưu thay đổi'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="animate-fadeUp">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex justify-between items-start mb-7">
        <div>
          <h2 className="text-xl font-bold m-0" style={{ color: '#000' }}>Bộ tiêu chí</h2>
          <p className="text-sm mt-1" style={{ color: '#757575' }}>
            Mỗi bộ tiêu chí gồm các tiêu chí với trọng số và điểm tối đa riêng.
          </p>
        </div>
        <button className="btn btn-primary" onClick={openNewTmpl}>+ Tạo bộ tiêu chí</button>
      </div>

      {/* ── Thanh tìm kiếm ──────────────────────────────────────────────────── */}
      <div className="flex gap-3 mb-5 flex-wrap items-center">
        <input
          value={searchTmpl}
          onChange={e => { setSearchTmpl(e.target.value); setPageTmpl(1); }}
          placeholder="Tìm bộ tiêu chí..."
          className="input-field flex-1"
          style={{ minWidth: 200 }}
        />
        {searchTmpl && (
          <button onClick={() => { setSearchTmpl(''); setPageTmpl(1); }}
            className="btn-hover text-xs px-2 py-1"
            style={{ background: '#f7f7f7', border: '1px solid #ccc', borderRadius: 2, color: '#757575' }}>✕</button>
        )}
        <span className="text-xs ml-auto" style={{ color: '#757575', whiteSpace: 'nowrap' }}>
          {filteredTemplates.length} / {templates.length} bộ tiêu chí
        </span>
      </div>

      {/* ── Empty state ─────────────────────────────────────────────────────── */}
      {templates.length === 0 && (
        <div className="text-center py-20" style={{ color: '#757575' }}>
          <div className="text-base font-bold mb-1.5" style={{ color: '#76b900' }}>Chưa có bộ tiêu chí nào</div>
          <div className="text-sm">Bấm &quot;+ Tạo bộ tiêu chí&quot; để bắt đầu.</div>
        </div>
      )}
      {templates.length > 0 && filteredTemplates.length === 0 && (
        <div className="text-center py-10" style={{ color: '#757575' }}>
          <div className="text-sm">Không tìm thấy bộ tiêu chí nào phù hợp.</div>
        </div>
      )}

      {/* ── Danh sách template ──────────────────────────────────────────────── */}
      {/* {templates.map(t => { */}
      {pagedTemplates.map(t => {
        const isOpen = expanded === t.id;
        const cCount = (t.criterias ?? []).length;
        const totalW = (t.criterias ?? []).reduce((s, tc) => s + (tc.weight ?? 0), 0);

        return (
          <div key={t.id} className="mb-3"
            style={{ background: '#ffffff', border: '1px solid #cccccc', borderRadius: 2 }}>

            {/* Template header row */}
            <div
              className="flex justify-between items-center p-5 card-hover"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleExpand(t.id)}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span style={{
                  color: '#757575', fontSize: 10, flexShrink: 0,
                  display: 'inline-block', transition: 'transform .2s',
                  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                }}>▶</span>
                <div className="min-w-0">
                  <div className="text-base font-bold truncate" style={{ color: '#000' }}>{t.name}</div>
                  {t.description && (
                    <div className="text-xs mt-0.5 truncate" style={{ color: '#757575' }}>{t.description}</div>
                  )}
                </div>
                <div className="px-2.5 py-0.5 text-xs shrink-0"
                  style={{ background: '#f7f7f7', border: '1px solid #cccccc', color: '#757575', borderRadius: 2 }}>
                  {cCount} tiêu chí
                </div>
              </div>

              {/* Actions – stop propagation để không toggle expand */}
              <div className="flex gap-2 ml-4 shrink-0" onClick={e => e.stopPropagation()}>
                <button className="btn-hover px-3 py-1.5 text-xs font-bold"
                  onClick={() => openEditTmpl(t)}
                  style={{ background: 'rgba(118,185,0,.1)', border: '1px solid rgba(118,185,0,.3)', color: '#5a8d00', borderRadius: 2 }}>
                  Sửa
                </button>
                <button className="btn-hover px-3 py-1.5 text-xs font-bold"
                  onClick={() => delTmpl(t.id)}
                  style={{ background: 'rgba(229,32,32,.08)', border: '1px solid rgba(229,32,32,.25)', color: '#e52020', borderRadius: 2 }}>
                  Xóa
                </button>
              </div>
            </div>

            {/* Expanded: criteria list */}
            {isOpen && (
              <div style={{ borderTop: '1px solid #e5e5e5', padding: '16px 20px 20px' }}>

                {/* Weight bar */}
                {cCount > 0 && (
                  <div className="mb-4 p-4" style={{ background: '#f7f7f7', border: '1px solid #e5e5e5', borderRadius: 2 }}>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs" style={{ color: '#757575' }}>Tổng trọng số</span>
                      <span className="text-xs font-bold"
                        style={{ color: totalW === 100 ? '#76b900' : '#df6500' }}>
                        {totalW} / 100
                        {totalW !== 100 && <span style={{ fontWeight: 400, marginLeft: 6 }}>
                          ({totalW < 100 ? `thiếu ${100 - totalW}` : `thừa ${totalW - 100}`})
                        </span>}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden flex gap-0.5" style={{ background: '#e5e5e5', borderRadius: 2 }}>
                      {(t.criterias ?? []).map((tc, i) => (
                        <div key={tc.criteriaId} style={{
                          height: '100%', width: `${tc.weight ?? 0}%`,
                          background: COLORS[i % COLORS.length], transition: 'width .4s',
                        }} />
                      ))}
                    </div>
                    <div className="flex gap-3 mt-2 flex-wrap">
                      {(t.criterias ?? []).map((tc, i) => (
                        <div key={tc.criteriaId} className="flex items-center gap-1.5 text-xs" style={{ color: '#757575' }}>
                          <div style={{ width: 7, height: 7, background: COLORS[i % COLORS.length], borderRadius: 2 }} />
                          {tc.criteriaName} ({tc.weight}%)
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Criteria rows */}
                {cCount === 0 ? (
                  <div className="text-center py-6 text-sm" style={{ color: '#757575' }}>
                    Chưa có tiêu chí nào trong bộ này.
                  </div>
                ) : (
                  <div className="mb-3" style={{ border: '1px solid #e5e5e5', borderRadius: 2, overflow: 'hidden' }}>
                    {/* Header */}
                    <div className="flex items-center px-4 py-2 text-xs font-bold uppercase tracking-wider"
                      style={{ color: '#757575', background: '#fafafa', borderBottom: '1px solid #e5e5e5' }}>
                      <div style={{ flex: 1 }}>Tiêu chí</div>
                      <div style={{ width: 100, textAlign: 'center' }}>Trọng số (%)</div>
                      <div style={{ width: 110, textAlign: 'center' }} title="Điểm tối đa của tiêu chí vào tổng điểm cuối (weight/10) — CHỈ để tham khảo. Giám khảo vẫn luôn chấm tự do trên thang 0–10, không bị giới hạn theo số này.">
                        Điểm tối đa
                      </div>
                      <div style={{ width: 110 }}></div>
                    </div>

                    {(t.criterias ?? []).map((tc, i) => (
                      <div key={tc.criteriaId}
                        className="flex items-center px-4 py-3"
                        style={{ borderBottom: i < cCount - 1 ? '1px solid #f0f0f0' : 'none' }}>
                        <div style={{ flex: 1 }}>
                          <div className="flex items-center gap-2">
                            <div style={{ width: 7, height: 7, background: COLORS[i % COLORS.length], borderRadius: 2, flexShrink: 0 }} />
                            <span className="text-sm font-bold" style={{ color: '#000' }}>{tc.criteriaName}</span>
                          </div>
                          {tc.description && (
                            <div className="text-xs mt-0.5 pl-3.5" style={{ color: '#757575' }}>{tc.description}</div>
                          )}
                        </div>
                        <div style={{ width: 100, textAlign: 'center' }}>
                          <span className="px-2 py-0.5 text-xs font-bold"
                            style={{ background: 'rgba(118,185,0,.1)', color: '#5a8d00', borderRadius: 2 }}>
                            {tc.weight}%
                          </span>
                        </div>
                        <div style={{ width: 110, textAlign: 'center' }}>
                          {/* Chỉ hiển thị tham khảo (weight/10) — KHÔNG phải maxScore thật dùng để
                              giới hạn ô nhập điểm (maxScore thật luôn = 10, xem saveCrit bên dưới).
                              Giám khảo vẫn chấm tự do 0–10 cho mọi tiêu chí bất kể trọng số. */}
                          <span className="text-sm" style={{ color: '#000' }}>
                            {(Number(tc.weight ?? 0) / 10).toFixed(1)}
                          </span>
                        </div>
                        <div className="flex gap-2 justify-end" style={{ width: 110 }}>
                          <button className="btn-hover px-2.5 py-1 text-xs font-bold"
                            onClick={() => openEditCrit(t.id, tc)}
                            style={{ background: 'rgba(118,185,0,.1)', border: '1px solid rgba(118,185,0,.3)', color: '#5a8d00', borderRadius: 2 }}>
                            Sửa
                          </button>
                          <button className="btn-hover px-2.5 py-1 text-xs font-bold"
                            onClick={() => removeCrit(t.id, tc.criteriaId)}
                            style={{ background: 'rgba(229,32,32,.08)', border: '1px solid rgba(229,32,32,.25)', color: '#e52020', borderRadius: 2 }}>
                            Gỡ
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  className="btn-hover text-xs font-bold mt-1"
                  onClick={() => openAddCrit(t.id)}
                  style={{
                    width: '100%', padding: '8px 12px',
                    background: '#f7f7f7', border: '1px dashed #cccccc',
                    color: '#757575', borderRadius: 2,
                  }}>
                  + Thêm tiêu chí vào bộ
                </button>
              </div>
            )}
          </div>
        );
      })}

      {/* ── Phân trang ──────────────────────────────────────────────────────── */}
      {totalPagesTmpl > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            className="btn-hover px-3 py-1.5 text-xs font-bold"
            onClick={() => setPageTmpl(p => Math.max(1, p - 1))}
            disabled={currentPageTmpl === 1}
            style={{ background: '#f7f7f7', border: '1px solid #cccccc', color: currentPageTmpl === 1 ? '#ccc' : '#000', borderRadius: 2 }}>
            ← Trước
          </button>
          {Array.from({ length: totalPagesTmpl }, (_, i) => i + 1).map(n => (
            <button key={n}
              className="btn-hover px-3 py-1.5 text-xs font-bold"
              onClick={() => setPageTmpl(n)}
              style={{
                borderRadius: 2, border: '1px solid',
                background:  currentPageTmpl === n ? '#000' : '#f7f7f7',
                color:       currentPageTmpl === n ? '#fff' : '#000',
                borderColor: currentPageTmpl === n ? '#000' : '#cccccc',
              }}>{n}</button>
          ))}
          <button
            className="btn-hover px-3 py-1.5 text-xs font-bold"
            onClick={() => setPageTmpl(p => Math.min(totalPagesTmpl, p + 1))}
            disabled={currentPageTmpl === totalPagesTmpl}
            style={{ background: '#f7f7f7', border: '1px solid #cccccc', color: currentPageTmpl === totalPagesTmpl ? '#ccc' : '#000', borderRadius: 2 }}>
            Sau →
          </button>
        </div>
      )}
      </div>
    </>
  );
}
