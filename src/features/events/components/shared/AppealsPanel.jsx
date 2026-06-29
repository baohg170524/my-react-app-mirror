'use client';
import { useState, useCallback } from 'react';
import Notif from '@/components/Notif';
import AppealManagementView from '@/views/AppealManagementPage';
import { INIT_CRITERIA, INIT_TEAMS, INIT_APPEALS } from '@/data';

/**
 * Phần phúc khảo tái sử dụng từ trang /appeals, nhúng vào tab dashboard.
 * Chưa có API phúc khảo → dùng dữ liệu mock như trang gốc.
 */
export default function AppealsPanel() {
  const [criteria]            = useState(INIT_CRITERIA);
  const [teams, setTeams]     = useState(INIT_TEAMS);
  const [appeals, setAppeals] = useState(INIT_APPEALS);
  const [notif, setNotif]     = useState(null);

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
      <Notif n={notif} />
      <AppealManagementView
        appeals={appeals} teams={teams} criteria={criteria}
        onUpdate={updateAppeal} onDel={deleteAppeal} />
    </>
  );
}
