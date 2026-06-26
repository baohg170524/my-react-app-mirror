'use client';
import { useState, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import Notif from '@/components/Notif';
import TeamAppealPage from '@/pages/TeamAppealPage';
import { INIT_TEAMS, MY_TEAM_ID } from '@/data';

export default function TeamAppealRoute() {
  const myTeam = INIT_TEAMS.find(t => t.id === MY_TEAM_ID);
  const [notif, setNotif] = useState(null);

  const sn = useCallback((m, t = 's') => {
    setNotif({ m, t });
    setTimeout(() => setNotif(null), 3000);
  }, []);

  const handleSubmit = () => {
    sn('Đơn phúc khảo đã được gửi thành công!');
  };

  return (
    <>
      <Navbar />
      <Notif n={notif} />
      <main style={{ minHeight: '100vh', background: '#f7f7f7', padding: '28px 32px', fontFamily: 'Inter, sans-serif' }}>
        <TeamAppealPage myTeam={myTeam} onSubmit={handleSubmit} />
      </main>
    </>
  );
}
