import { useState } from 'react';

export default function TeamAppealPage({ myTeam, onSubmit }) {
  const [f,    setF]    = useState({ name: myTeam?.name || '', id: myTeam?.id || '', email: myTeam?.email || '', reason: '' });
  const [done, setDone] = useState(false);
  const ok = f.name && f.id && f.email && f.reason;
  const go = () => { if (!ok) return; onSubmit(f); setDone(true); };

  if (done) return (
    <div className="flex items-center justify-center min-h-96 animate-fadeUp">
      <div className="text-center">
        <div style={{ width: 56, height: 56, background: 'rgba(118,185,0,.12)', border: '2px solid #76b900', borderRadius: 2, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>✓</div>
        <div className="text-xl font-bold mb-2" style={{ color: '#76b900' }}>Đơn đã được nộp thành công!</div>
        <div className="text-sm" style={{ color: '#757575' }}>Ban giám khảo sẽ xem xét và phản hồi sớm nhất có thể.</div>
        <button className="btn btn-outline mt-6" onClick={() => setDone(false)}>Nộp đơn khác</button>
      </div>
    </div>
  );

  return (
    <div className="animate-fadeUp" style={{ maxWidth: 700, margin: '0 auto' }}>
      <div className="mb-6">
        <h2 className="text-xl font-bold m-0" style={{ color: '#000' }}>Đơn xin phúc khảo</h2>
        <p className="text-sm mt-1" style={{ color: '#757575' }}>Điền đầy đủ thông tin để gửi yêu cầu phúc khảo điểm số.</p>
      </div>

      <div style={{ background: '#fff', border: '1px solid #cccccc', borderRadius: 2 }}>
        <div className="flex items-center gap-3.5 p-5" style={{ background: '#f7f7f7', borderBottom: '1px solid #cccccc' }}>
          <div>
            <div className="text-sm font-bold" style={{ color: '#000' }}>Đơn xin phúc khảo</div>
            <div className="text-xs" style={{ color: '#757575' }}>Điền đầy đủ thông tin để gửi yêu cầu phúc khảo.</div>
          </div>
        </div>
        <div className="p-7">
          <div className="grid gap-5 mb-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {[['Tên nhóm', 'name', 'VD: Nhóm Sao Băng'], ['Mã nhóm', 'id', 'VD: T-001']].map(([lb, k, ph]) => (
              <div key={k}>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#757575' }}>{lb}</label>
                <input value={f[k]} onChange={e => setF({ ...f, [k]: e.target.value })} placeholder={ph} className="input-field" />
              </div>
            ))}
          </div>
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#757575' }}>Gmail</label>
            <input value={f.email} onChange={e => setF({ ...f, email: e.target.value })}
              placeholder="example@gmail.com" type="email" className="input-field" />
          </div>
          <div className="mb-7">
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#757575' }}>Lý do phúc khảo</label>
            <textarea value={f.reason} onChange={e => setF({ ...f, reason: e.target.value })} rows={4}
              placeholder="Trình bày lý do bạn muốn phúc khảo..." className="input-field resize-y leading-relaxed"
              style={{ height: 'auto' }} />
          </div>
          <button onClick={go} className="btn btn-primary w-full" disabled={!ok}>
            Xác nhận nộp đơn
          </button>
        </div>
      </div>
    </div>
  );
}
