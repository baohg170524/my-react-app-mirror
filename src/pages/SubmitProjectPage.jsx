import { useState } from 'react';

export default function SubmitProjectPage({ myTeam, submissions, onSubmit }) {
  const myS = submissions.find(s => s.teamId === myTeam?.id);
  const [f, setF]     = useState({ projectName:'', teamName:myTeam?.name||'', repo:'' });
  const [ed, setEd]   = useState(!myS);
  const ok = f.projectName.trim() && f.teamName.trim() && f.repo.trim();

  const go = () => { if (!ok) return; onSubmit({ ...f, teamId:myTeam?.id }); setEd(false); };

  return (
    <div className="animate-fadeUp" style={{ maxWidth:680, margin:'0 auto' }}>
      <div className="mb-6">
        <h2 className="text-xl font-bold m-0" style={{ color:'#e6f4ea' }}>Nộp bài</h2>
        <p className="text-sm mt-1" style={{ color:'#7da88a' }}>Nộp bài dự thi của nhóm bạn.</p>
      </div>
      {/* Status card */}
      {myS && !ed && (
        <div className="rounded-2xl p-7 mb-6" style={{ background:'linear-gradient(135deg,#131f16,rgba(61,220,132,.06))', border:'1.5px solid #3ddc84' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center text-2xl rounded-xl" style={{ width:44, height:44, background:'rgba(61,220,132,.12)', border:'1.5px solid #3ddc84' }}>✅</div>
            <div>
              <div className="text-base font-bold" style={{ color:'#3ddc84' }}>Bài đã được nộp thành công</div>
              <div className="text-xs mt-0.5" style={{ color:'#7da88a' }}>Nộp lúc {myS.submittedAt}</div>
            </div>
            <span className="badge-accent ml-auto">{myS.status}</span>
          </div>
          {[['TÊN DỰ ÁN',myS.projectName],['TÊN NHÓM',myS.teamName]].map(([k,v])=>(
            <div key={k} className="rounded-xl p-3.5 mb-2.5 grid items-center" style={{ background:'rgba(0,0,0,.25)', gridTemplateColumns:'120px 1fr' }}>
              <span className="text-[11px] tracking-widest" style={{ color:'#4d7a5c' }}>{k}</span>
              <span className="text-sm font-bold" style={{ color:'#e6f4ea' }}>{v}</span>
            </div>
          ))}
          <div className="rounded-xl p-3.5 mb-4 grid items-center gap-2" style={{ background:'rgba(0,0,0,.25)', gridTemplateColumns:'120px 1fr' }}>
            <span className="text-[11px] tracking-widest" style={{ color:'#4d7a5c' }}>REPO</span>
            <a href={myS.repo} target="_blank" rel="noreferrer" className="text-xs break-all" style={{ color:'#3ddc84', textDecoration:'none' }}>🔗 {myS.repo}</a>
          </div>
          <button className="btn-hover w-full rounded-xl py-3 text-sm font-semibold" onClick={()=>{ setF({projectName:myS.projectName,teamName:myS.teamName,repo:myS.repo}); setEd(true); }}
            style={{ background:'rgba(0,0,0,.2)', border:'1px solid #1e3022', color:'#7da88a' }}>✏️ Chỉnh sửa bài nộp</button>
        </div>
      )}
      {/* Form */}
      {ed && (
        <div className="rounded-2xl overflow-hidden" style={{ background:'linear-gradient(135deg,#131f16,rgba(61,220,132,.04))', border:'1.5px solid #1e3022' }}>
          <div className="flex items-center gap-3.5 p-5" style={{ background:'rgba(61,220,132,.12)', borderBottom:'1px solid #1e3022' }}>
            <div className="flex items-center justify-center text-lg rounded-xl" style={{ width:40, height:40, background:'rgba(61,220,132,.2)', border:'1.5px solid #3ddc84' }}>📦</div>
            <div><div className="text-sm font-bold" style={{ color:'#3ddc84' }}>Form nộp bài</div><div className="text-xs" style={{ color:'#7da88a' }}>Điền đầy đủ thông tin bài dự thi.</div></div>
          </div>
          <div className="p-7">
            {[['Tên bài / Tên dự án *','projectName','VD: SmartFarm AI, EduBot Platform...'],['Tên nhóm *','teamName','VD: Nhóm Sao Băng']].map(([lb,k,ph])=>(
              <div key={k} className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color:'#e6f4ea' }}>{lb}</label>
                <input value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} placeholder={ph} className="input-field text-sm"/>
              </div>
            ))}
            <div className="mb-7">
              <label className="block text-sm font-semibold mb-2" style={{ color:'#e6f4ea' }}>Link repo GitHub *</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none">🔗</span>
                <input value={f.repo} onChange={e=>setF({...f,repo:e.target.value})} placeholder="https://github.com/your-team/project"
                  className="input-field text-sm" style={{ paddingLeft:42 }}/>
              </div>
              {f.repo && !f.repo.startsWith('https://') && <div className="text-[11px] mt-1.5" style={{ color:'#f4a261' }}>⚠ Link nên bắt đầu bằng https://</div>}
            </div>
            <div className="flex gap-3">
              {myS && <button className="btn-ghost flex-1" onClick={()=>setEd(false)}>Hủy</button>}
              <button onClick={go} style={{ flex:3, background:ok?'#3ddc84':'rgba(61,220,132,.15)', color:ok?'#000':'#4d7a5c' }}
                className="btn-hover rounded-xl py-3.5 font-bold text-sm flex items-center justify-center gap-2 border-0">
                 {myS ? 'Cập nhật bài nộp' : 'Xác nhận nộp bài'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
