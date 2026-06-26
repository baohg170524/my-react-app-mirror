'use client';
import { useState, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import Notif from '@/components/Notif';
import AppealManagementPage from '@/views/AppealManagementPage';
import { INIT_CRITERIA, INIT_TEAMS, INIT_APPEALS } from '@/data';

export default function AppealsRoute() {
  const [criteria] = useState(INIT_CRITERIA);
  const [teams, setTeams] = useState(INIT_TEAMS);
  const [appeals, setAppeals] = useState(INIT_APPEALS);
  const [notif, setNotif] = useState(null);

  const sn = useCallback((m, t = 's') => {
    setNotif({ m, t });
    setTimeout(() => setNotif(null), 3000);
  }, []);

  const updateAppeal = (aid, status, scores) => {
    setAppeals(p => p.map(a => a.id === aid ? { ...a, status } : a));
    if (scores) {
      const a = appeals.find(x => x.id === aid);
      if (a) setTeams(p => p.map(t => t.id === a.teamId ? { ...t, scores } : t));
    }
    sn(status === 'Từ chối' ? 'Đã từ chối đơn.' : `Đơn đã cập nhật: ${status}`);
  };

  const deleteAppeal = (id) => {
    setAppeals(p => p.filter(a => a.id !== id));
    sn('Đã xóa đơn.');
  };

  return (
    <>
      <Navbar />
      <Notif n={notif} />
      <main style={{ minHeight: '100vh', background: '#f7f7f7', padding: '28px 32px', fontFamily: 'Inter, sans-serif' }}>
        <AppealManagementPage
          appeals={appeals} teams={teams} criteria={criteria}
          onUpdate={updateAppeal} onDel={deleteAppeal} />
      </main>
    </>
  );
}
