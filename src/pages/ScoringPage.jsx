import { calcScore } from '../utils.jsx';

export default function ScoringPage({ teams, criteria, onEdit }) {
  return (
    <div className="animate-fadeUp">
      <div className="mb-7">
        <h2 className="text-xl font-bold m-0" style={{ color:'#e6f4ea' }}>Bảng chấm điểm</h2>
        <p className="text-sm mt-1" style={{ color:'#7da88a' }}>Chấm và quản lý điểm số các đội thi · {criteria.length} tiêu chí</p>
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns:'1fr 1fr' }}>
        {teams.map((t, i) => {
          const score = calcScore(t.scores, criteria);
          return (
            <div key={t.id} className="card-hover rounded-2xl p-6" style={{ background:'#131f16', border:'1px solid #1e3022', animationDelay:`${i*0.07}s` }}>
              <div className="flex justify-between items-start">
                <div className="text-sm font-bold" style={{ color:'#3ddc84' }}>{t.id}</div>
                <div className="text-right">
                  <div className="text-3xl font-black leading-none" style={{ color:'#3ddc84' }}>{score.toFixed(2)}</div>
                  <div className="text-[10px]" style={{ color:'#7da88a' }}>/10 · {criteria.length} tiêu chí</div>
                </div>
              </div>
              <div className="text-sm font-semibold mt-1" style={{ color:'#e6f4ea' }}>{t.name}</div>
              {/* Mini bars */}
              <div className="mt-3.5 flex flex-col gap-1.5">
                {criteria.slice(0,3).map((c, ci) => (
                  <div key={ci} className="flex items-center gap-2">
                    <div className="text-[10px] shrink-0" style={{ color:'#4d7a5c', width:90 }}>{c.label}</div>
                    <div className="flex-1 h-1 rounded-full" style={{ background:'rgba(0,0,0,.3)' }}>
                      <div style={{ height:'100%', width:`${((t.scores[ci]||0)/10)*100}%`, background:'#3ddc84', borderRadius:99 }}/>
                    </div>
                    <div className="text-[11px] font-bold w-6 text-right" style={{ color:'#e6f4ea' }}>{t.scores[ci]||0}</div>
                  </div>
                ))}
                {criteria.length>3 && <div className="text-[10px]" style={{ color:'#4d7a5c' }}>+{criteria.length-3} tiêu chí khác...</div>}
              </div>
              <div className="flex justify-end mt-4">
                <button className="btn-hover flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold"
                  onClick={() => onEdit(t)} style={{ background:'#131f16', border:'1px solid #1e3022', color:'#3ddc84' }}>
                  ≡ Chấm / Sửa
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
