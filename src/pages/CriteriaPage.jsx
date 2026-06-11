import { useState } from 'react';
import { totalWeight } from '../utils.jsx';

const BLANK = { id:'', label:'', labelVi:'', weight:'', desc:'', levels:[
  {range:'0–2',desc:''},{range:'3–4',desc:''},{range:'5–7',desc:''},{range:'8–10',desc:''},
]};

const COLORS = ['#3ddc84','#60a5fa','#f4a261','#c084fc','#fb923c','#34d399'];

export default function CriteriaPage({ criteria, setCriteria, sn }) {
  const [ed,  setEd] = useState(null);
  const [f,    setF] = useState({ ...BLANK });
  const tw = totalWeight(criteria);

  const openNew = () => { setF({ ...BLANK, id:`C-${String(criteria.length+1).padStart(3,'0')}` }); setEd('new'); };
  const openEdit = c => { setF({ ...c, levels: c.levels.map(l=>({...l})) }); setEd(c.id); };
  const close = () => setEd(null);

  const save = () => {
    if (!f.label.trim() || !f.weight) { sn('Vui lòng điền tên và trọng số','e'); return; }
    const nw = Number(f.weight);
    const ow = criteria.filter(c=>c.id!==f.id).reduce((s,c)=>s+Number(c.weight),0);
    if (ow+nw > 100) { sn(`Tổng trọng số vượt 100% (hiện: ${ow+nw}%)`,'e'); return; }
    if (ed==='new') setCriteria(p=>[...p,{...f,weight:nw}]);
    else             setCriteria(p=>p.map(c=>c.id===f.id?{...f,weight:nw}:c));
    sn(ed==='new'?'Đã thêm tiêu chí!':'Đã cập nhật tiêu chí!');
    close();
  };
  const del = id => { setCriteria(p=>p.filter(c=>c.id!==id)); sn('Đã xóa tiêu chí.'); };
  const updLv = (li,k,v) => { const l=[...f.levels]; l[li]={...l[li],[k]:v}; setF({...f,levels:l}); };

  return (
    <div className="animate-fadeUp">
      {/* Modal */}
      {ed !== null && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ maxWidth:620 }}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-lg font-bold" style={{ color:'#e6f4ea' }}>{ed==='new'?'Thêm tiêu chí mới':'Chỉnh sửa tiêu chí'}</div>
                <div className="text-xs mt-1" style={{ color:'#7da88a' }}>Định nghĩa tiêu chí và thang điểm đánh giá.</div>
              </div>
              <button className="btn-hover text-xl" onClick={close} style={{ background:'transparent', border:'none', color:'#7da88a' }}>✕</button>
            </div>

            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns:'1fr 1fr' }}>
              {[['Tên tiêu chí (EN) *','label','VD: Technical Quality'],['Tên tiêu chí (VI)','labelVi','VD: Chất lượng kỹ thuật']].map(([lb,k,ph])=>(
                <div key={k}><label className="block text-xs mb-1.5" style={{ color:'#7da88a' }}>{lb}</label>
                  <input value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} placeholder={ph} className="input-field"/></div>
              ))}
            </div>
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns:'1fr 120px' }}>
              <div><label className="block text-xs mb-1.5" style={{ color:'#7da88a' }}>Mô tả tiêu chí</label>
                <input value={f.desc} onChange={e=>setF({...f,desc:e.target.value})} placeholder="Mô tả ngắn..." className="input-field"/></div>
              <div><label className="block text-xs mb-1.5" style={{ color:'#7da88a' }}>Trọng số (%) *</label>
                <input type="number" min="1" max="100" value={f.weight} onChange={e=>setF({...f,weight:e.target.value})}
                  className="input-field text-center text-lg font-bold" style={{ color:'#3ddc84' }}/></div>
            </div>

            {/* Weight info */}
            {(()=>{
              const ow=criteria.filter(c=>c.id!==f.id).reduce((s,c)=>s+Number(c.weight),0);
              const rem=100-ow;
              return (<div className="rounded-xl p-3 mb-4 flex gap-3 text-xs" style={{ background:'rgba(0,0,0,.2)', color:'#7da88a' }}>
                <span>Đã dùng: <strong style={{ color:'#3ddc84' }}>{ow}%</strong></span>
                <span>·</span>
                <span>Còn lại: <strong style={{ color:rem>=0?'#3ddc84':'#ff4d6d' }}>{rem}%</strong></span>
              </div>);
            })()}

            {/* Levels */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs font-semibold" style={{ color:'#7da88a' }}>THANG ĐIỂM MÔ TẢ</label>
                <button className="btn-hover px-3 py-1 rounded-lg text-xs font-bold" onClick={()=>setF({...f,levels:[...f.levels,{range:'',desc:''}]})}
                  style={{ background:'rgba(61,220,132,.12)', border:'1px solid #1e3022', color:'#3ddc84' }}>+ Thêm mức</button>
              </div>
              {f.levels.map((lv,li)=>(
                <div key={li} className="grid gap-2 mb-2 items-center" style={{ gridTemplateColumns:'110px 1fr 32px' }}>
                  <input value={lv.range} onChange={e=>updLv(li,'range',e.target.value)} placeholder="8–10"
                    className="input-field text-center font-bold" style={{ color:'#3ddc84' }}/>
                  <input value={lv.desc} onChange={e=>updLv(li,'desc',e.target.value)} placeholder="Mô tả mức điểm..." className="input-field"/>
                  <button className="btn-hover rounded-lg flex items-center justify-center text-sm"
                    style={{ width:32, height:38, background:'rgba(255,77,109,.12)', border:'none', color:'#ff4d6d' }}
                    onClick={()=>setF({...f,levels:f.levels.filter((_,i)=>i!==li)})}>✕</button>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button className="btn-ghost" onClick={close}>Hủy</button>
              <button className="btn-primary" onClick={save}>{ed==='new'?'✓ Thêm tiêu chí':'✓ Lưu thay đổi'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-7">
        <div>
          <h2 className="text-xl font-bold m-0" style={{ color:'#e6f4ea' }}>Tiêu chí chấm điểm</h2>
          <p className="text-sm mt-1" style={{ color:'#7da88a' }}>Quản lý bộ tiêu chí. Tất cả điểm chấm sẽ dựa theo bộ này.</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={openNew}>+ Thêm tiêu chí</button>
      </div>

      {/* Weight bar */}
      <div className="rounded-2xl p-5 mb-6" style={{ background:'#131f16', border:'1px solid #1e3022' }}>
        <div className="flex justify-between mb-2.5">
          <span className="text-sm" style={{ color:'#7da88a' }}>Tổng trọng số</span>
          <span className="text-sm font-bold" style={{ color:tw===100?'#3ddc84':'#f4a261' }}>{tw}% / 100% {tw===100?'✓ Hợp lệ':'⚠ Cần đủ 100%'}</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden flex gap-0.5" style={{ background:'rgba(0,0,0,.3)' }}>
          {criteria.map((c,i)=>(
            <div key={i} style={{ height:'100%', width:`${c.weight}%`, background:COLORS[i%COLORS.length], borderRadius:99, transition:'width .4s' }}/>
          ))}
        </div>
        <div className="flex gap-3 mt-2.5 flex-wrap">
          {criteria.map((c,i)=>(
            <div key={i} className="flex items-center gap-1.5 text-[11px]" style={{ color:'#7da88a' }}>
              <div style={{ width:8, height:8, borderRadius:99, background:COLORS[i%COLORS.length] }}/>
              {c.label} ({c.weight}%)
            </div>
          ))}
        </div>
      </div>

      {/* Empty */}
      {criteria.length===0 && (
        <div className="text-center py-20" style={{ color:'#7da88a' }}>
          <div className="text-5xl mb-3">⚖️</div>
          <div className="text-base font-bold mb-1.5" style={{ color:'#3ddc84' }}>Chưa có tiêu chí nào</div>
          <div className="text-sm">Bấm "+ Thêm tiêu chí" để bắt đầu.</div>
        </div>
      )}

      {/* Cards */}
      {criteria.map((c,i)=>(
        <div key={c.id} className="card-hover rounded-2xl p-6 mb-3.5" style={{ background:'#131f16', border:'1px solid #1e3022', animationDelay:`${i*0.06}s` }}>
          <div className="flex justify-between items-start mb-3.5">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <div className="px-3 py-1 rounded-lg text-xs font-bold" style={{ background:'rgba(61,220,132,.12)', border:'1px solid rgba(61,220,132,.3)', color:'#3ddc84' }}>{c.weight}%</div>
                <div className="text-base font-bold" style={{ color:'#e6f4ea' }}>{c.label}</div>
                {c.labelVi && <div className="text-sm" style={{ color:'#7da88a' }}>— {c.labelVi}</div>}
              </div>
              {c.desc && <div className="text-xs ml-0.5" style={{ color:'#7da88a' }}>{c.desc}</div>}
            </div>
            <div className="flex gap-2 ml-4">
              <button className="btn-hover px-3.5 py-1.5 rounded-xl text-xs font-bold" onClick={()=>openEdit(c)}
                style={{ background:'rgba(61,220,132,.08)', border:'1px solid #1e3022', color:'#3ddc84' }}>✏️ Sửa</button>
              <button className="btn-hover px-3.5 py-1.5 rounded-xl text-xs font-bold" onClick={()=>del(c.id)}
                style={{ background:'rgba(255,77,109,.12)', border:'1px solid rgba(255,77,109,.3)', color:'#ff4d6d' }}>🗑 Xóa</button>
            </div>
          </div>
          {c.levels && c.levels.length>0 && (
            <div className={`grid gap-2`} style={{ gridTemplateColumns:`repeat(${Math.min(c.levels.length,4)},1fr)` }}>
              {c.levels.map((lv,li)=>(
                <div key={li} className="rounded-xl p-2.5" style={{ background:'rgba(0,0,0,.2)', border:'1px solid #1e3022' }}>
                  <div className="text-[11px] font-bold mb-0.5" style={{ color:'#3ddc84' }}>{lv.range}</div>
                  <div className="text-[11px] leading-snug"     style={{ color:'#7da88a' }}>{lv.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
