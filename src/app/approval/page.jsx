'use client';
import { useState, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import Notif from '@/components/Notif';
import PheDuyetPage from '@/pages/PheDuyetPage';

const INIT_REGS = [
  { id:'R-001', type:'fpt', hocKi:'K19', gmail:'teamalpha@gmail.com', leader:{ name:'Nguyễn Văn An', mssv:'SE170001' }, members:[{ name:'Trần Thị Bình', id:'SE170002' }], status:'Đã xác nhận', date:'07/06/2026 10:00' },
  { id:'R-002', type:'external', truong:'ĐH Bách Khoa HN', gmail:'bachkhoa@gmail.com', leader:{ name:'Phạm Minh Đức', cccd:'012345678901' }, members:[{ name:'Hoàng Thị Em', id:'012345678902' }], status:'Chờ duyệt', date:'08/06/2026 09:30' },
];

export default function ApprovalRoute() {
  const [regs, setRegs] = useState(INIT_REGS);
  const [notif, setNotif] = useState(null);

  const sn = useCallback((m, t = 's') => {
    setNotif({ m, t });
    setTimeout(() => setNotif(null), 3000);
  }, []);

  const acceptReg = (id) => { setRegs(p => p.map(r => r.id === id ? { ...r, status: 'Đã duyệt' } : r)); sn('Đã chấp nhận!'); };
  const rejectReg = (id) => { setRegs(p => p.map(r => r.id === id ? { ...r, status: 'Từ chối' } : r)); sn('Đã từ chối.', 'e'); };

  return (
    <>
      <Navbar />
      <Notif n={notif} />
      <main style={{ minHeight: '100vh', background: '#f7f7f7', padding: '28px 32px', fontFamily: 'Inter, sans-serif' }}>
        <PheDuyetPage registrations={regs} onAccept={acceptReg} onReject={rejectReg} />
      </main>
    </>
  );
}
