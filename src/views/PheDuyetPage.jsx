import { useState } from 'react';

function DetailModal({ reg, onClose, onAccept, onReject }) {
  const isFpt = reg.type === 'fpt';
  return (
    <div className="modal-overlay items-center" style={{ padding: 24 }}>
      <div className="modal-box" style={{ maxWidth: 580 }}>
        <div className="flex justify-between items-start mb-5">
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#000', margin: 0 }}>Chi tiết đăng ký</h3>
            <div className="text-xs mt-1" style={{ color: '#757575' }}>{reg.id} · Nộp lúc {reg.date}</div>
          </div>
          <button className="btn-hover" onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#757575', fontSize: 18 }}>✕</button>
        </div>

        <div className={`flex items-center gap-3 p-4 mb-4 ${isFpt ? 'card-fpt' : 'card-ext'}`}>
          <div className="font-black text-sm flex items-center justify-center"
            style={{ width: 32, height: 32, background: isFpt ? 'rgba(118,185,0,.15)' : '#f7f7f7', border: `1px solid ${isFpt ? '#76b900' : '#cccccc'}`, color: isFpt ? '#5a8d00' : '#757575', borderRadius: 2 }}>
            {isFpt ? 'FPT' : 'EXT'}
          </div>
          <div>
            <div className="text-sm font-bold" style={{ color: isFpt ? '#5a8d00' : '#000' }}>
              {isFpt ? 'Sinh viên FPT University' : `Trường ngoài: ${reg.truong || ''}`}
            </div>
            {isFpt && <div className="text-xs" style={{ color: '#757575' }}>Học kì: {reg.hocKi}</div>}
          </div>
        </div>

        <div className="mb-3">
          <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#757575' }}>LEADER NHÓM</div>
          <div className="p-3 grid gap-2" style={{ background: '#f7f7f7', gridTemplateColumns: '1fr 1fr', borderRadius: 2 }}>
            <div><div className="text-xs mb-0.5" style={{ color: '#757575' }}>HỌ TÊN</div><div className="text-sm font-bold" style={{ color: '#000' }}>{reg.leader?.name}</div></div>
            <div><div className="text-xs mb-0.5" style={{ color: '#757575' }}>{isFpt ? 'MSSV' : 'CCCD'}</div><div className="text-sm font-bold" style={{ color: '#000' }}>{reg.leader?.mssv || reg.leader?.cccd}</div></div>
          </div>
        </div>

        {reg.members && reg.members.filter(m => m.name).length > 0 && (
          <div className="mb-3">
            <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#757575' }}>THÀNH VIÊN</div>
            {reg.members.filter(m => m.name).map((m, i) => (
              <div key={i} className="p-3 mb-1 grid gap-2" style={{ background: '#f7f7f7', gridTemplateColumns: '1fr 1fr', borderRadius: 2 }}>
                <div className="text-sm font-bold" style={{ color: '#000' }}>{m.name}</div>
                <div className="text-sm" style={{ color: '#757575' }}>{m.id || '—'}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mb-5 p-3" style={{ background: '#f7f7f7', borderRadius: 2 }}>
          <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#757575' }}>GMAIL NHẬN THÔNG BÁO</div>
          <div className="text-sm font-bold" style={{ color: '#76b900' }}>{reg.gmail}</div>
        </div>

        {!isFpt && reg.status === 'Chờ duyệt' && (
          <div className="flex gap-3">
            <button className="btn btn-outline flex-1" onClick={() => onReject(reg.id)}
              style={{ color: '#e52020', borderColor: 'rgba(229,32,32,.4)' }}>Từ chối</button>
            <button className="btn btn-primary flex-1" onClick={() => onAccept(reg.id)}>Chấp nhận</button>
          </div>
        )}
        {(isFpt || reg.status !== 'Chờ duyệt') && (
          <button className="btn btn-outline w-full" onClick={onClose}>Đóng</button>
        )}
      </div>
    </div>
  );
}

export default function PheDuyetPage({ registrations, onAccept, onReject }) {
  const [viewing, setViewing] = useState(null);

  const fptList      = registrations.filter(r => r.type === 'fpt');
  const pendingList  = registrations.filter(r => r.type === 'external' && r.status === 'Chờ duyệt');
  const resolvedList = registrations.filter(r => r.type === 'external' && r.status !== 'Chờ duyệt');

  return (
    <div className="animate-fadeUp">
      {viewing && (
        <DetailModal reg={viewing} onClose={() => setViewing(null)}
          onAccept={id => { onAccept(id); setViewing(null); }}
          onReject={id => { onReject(id); setViewing(null); }}
        />
      )}

      <div className="flex justify-between items-start mb-7">
        <div>
          <h2 className="text-xl font-bold m-0" style={{ color: '#000' }}>Phê duyệt tài khoản</h2>
          <p className="text-sm mt-1" style={{ color: '#757575' }}>Quản lý đơn đăng ký tham gia từ các đội thi.</p>
        </div>
        <div className="flex gap-2">
          {[
            { v: fptList.length,      l: 'FPT Auto',   c: '#76b900', bg: 'rgba(118,185,0,.1)',  border: 'rgba(118,185,0,.3)'  },
            { v: pendingList.length,  l: 'Chờ duyệt',  c: '#df6500', bg: 'rgba(223,101,0,.08)', border: 'rgba(223,101,0,.3)'  },
            { v: resolvedList.length, l: 'Đã xử lý',   c: '#000',    bg: '#f7f7f7',             border: '#cccccc'             },
          ].map(({ v, l, c, bg, border }) => (
            <div key={l} className="px-4 py-2 text-center"
              style={{ background: bg, border: `1px solid ${border}`, borderRadius: 2, minWidth: 72 }}>
              <div className="text-lg font-bold" style={{ color: c }}>{v}</div>
              <div className="text-xs" style={{ color: '#757575' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FPT auto ── */}
      {fptList.length > 0 && (
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-xs font-bold uppercase tracking-widest" style={{ color: '#5a8d00' }}>FPT — XÁC NHẬN TỰ ĐỘNG</div>
            <div className="flex-1 h-px" style={{ background: 'rgba(118,185,0,.3)' }} />
            <span className="badge-accent">{fptList.length} đội</span>
          </div>
          {fptList.map((r, i) => (
            <div key={r.id} className="card-fpt mb-2 p-4 flex items-center gap-4 animate-fadeUp" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="font-black text-xs flex items-center justify-center shrink-0"
                style={{ width: 32, height: 32, background: 'rgba(118,185,0,.15)', border: '1px solid #76b900', color: '#5a8d00', borderRadius: 2 }}>FPT</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold" style={{ color: '#000' }}>{r.leader?.name}</span>
                  <span className="text-xs" style={{ color: '#757575' }}>· HK {r.hocKi} · {r.members?.filter(m => m.name).length + 1} thành viên</span>
                </div>
                <div className="text-xs mt-0.5" style={{ color: '#76b900' }}>{r.gmail}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="badge-accent">Đã xác nhận</span>
                <button className="btn-hover px-3 py-1.5 text-xs font-bold"
                  style={{ background: '#f7f7f7', border: '1px solid #cccccc', color: '#000', borderRadius: 2 }}
                  onClick={() => setViewing(r)}>Xem</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Pending external ── */}
      {pendingList.length > 0 && (
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-xs font-bold uppercase tracking-widest" style={{ color: '#df6500' }}>NGOÀI FPT — CHỜ XÉT DUYỆT</div>
            <div className="flex-1 h-px" style={{ background: 'rgba(223,101,0,.2)' }} />
            <span className="badge-warn">{pendingList.length} đơn</span>
          </div>
          {pendingList.map((r, i) => (
            <div key={r.id} className="card-ext mb-2 p-4 flex items-center gap-4 animate-fadeUp" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="font-black text-xs flex items-center justify-center shrink-0"
                style={{ width: 32, height: 32, background: '#f7f7f7', border: '1px solid #cccccc', color: '#757575', borderRadius: 2 }}>EXT</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold" style={{ color: '#000' }}>{r.leader?.name}</span>
                  <span className="text-xs" style={{ color: '#757575' }}>· {r.truong} · {r.members?.filter(m => m.name).length + 1} thành viên</span>
                </div>
                <div className="text-xs mt-0.5" style={{ color: '#df6500' }}>{r.gmail}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="badge-warn">Chờ duyệt</span>
                <button className="btn-hover px-3 py-1.5 text-xs font-bold"
                  style={{ background: '#f7f7f7', border: '1px solid #cccccc', color: '#000', borderRadius: 2 }}
                  onClick={() => setViewing(r)}>Xem</button>
                <button className="btn-hover px-3 py-1.5 text-xs font-bold"
                  style={{ background: 'rgba(118,185,0,.1)', border: '1px solid rgba(118,185,0,.3)', color: '#5a8d00', borderRadius: 2 }}
                  onClick={() => onAccept(r.id)}>OK</button>
                <button className="btn-hover px-3 py-1.5 text-xs font-bold"
                  style={{ background: 'rgba(229,32,32,.08)', border: '1px solid rgba(229,32,32,.25)', color: '#e52020', borderRadius: 2 }}
                  onClick={() => onReject(r.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Resolved ── */}
      {resolvedList.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="text-xs font-bold uppercase tracking-widest" style={{ color: '#757575' }}>ĐÃ XỬ LÝ</div>
            <div className="flex-1 h-px" style={{ background: '#cccccc' }} />
          </div>
          {resolvedList.map((r, i) => (
            <div key={r.id} className="mb-2 p-4 flex items-center gap-4 animate-fadeUp"
              style={{ background: '#f7f7f7', border: '1px solid #e5e5e5', opacity: .75, animationDelay: `${i * 0.04}s`, borderRadius: 2 }}>
              <div className="font-black text-xs flex items-center justify-center shrink-0"
                style={{ width: 32, height: 32, background: '#fff', border: '1px solid #cccccc', color: '#757575', borderRadius: 2 }}>EXT</div>
              <div className="flex-1">
                <div className="text-sm font-bold" style={{ color: '#000' }}>{r.leader?.name}</div>
                <div className="text-xs" style={{ color: '#757575' }}>{r.truong}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={r.status === 'Đã duyệt' ? 'badge-accent' : 'badge-danger'}>
                  {r.status === 'Đã duyệt' ? 'Đã duyệt' : 'Từ chối'}
                </span>
                <button className="btn-hover px-3 py-1.5 text-xs font-bold"
                  style={{ background: 'transparent', border: '1px solid #cccccc', color: '#757575', borderRadius: 2 }}
                  onClick={() => setViewing(r)}>Xem</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {registrations.length === 0 && (
        <div className="text-center py-20" style={{ color: '#757575' }}>
          <div className="text-sm font-bold">Chưa có đơn đăng ký nào</div>
        </div>
      )}
    </div>
  );
}
