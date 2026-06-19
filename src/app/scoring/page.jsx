'use client';
import { useState, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import Notif from '@/components/Notif';
import EditModal from '@/components/EditModal';
import ScoringPage from '@/pages/ScoringPage';
import { INIT_CRITERIA, INIT_TEAMS } from '@/data';

export default function ScoringRoute() {
  const [criteria] = useState(INIT_CRITERIA);
  const [teams, setTeams] = useState(INIT_TEAMS);
  const [editT, setEditT] = useState(null);
  const [notif, setNotif] = useState(null);

  const sn = useCallback((m, t = 's') => {
    setNotif({ m, t });
    setTimeout(() => setNotif(null), 3000);
  }, []);

  const saveEdit = (tid, scores, cmts) => {
    setTeams(p => p.map(t => t.id === tid ? { ...t, scores, comments: cmts } : t));
    setEditT(null);
    sn('Đã lưu điểm thành công!');
  };

  return (
    <>
      <Navbar />
      <Notif n={notif} />
      {editT && (
        <EditModal team={editT} criteria={criteria}
          onClose={() => setEditT(null)}
          onSave={(s, c) => saveEdit(editT.id, s, c)} />
      )}
      <main style={{ minHeight: '100vh', background: '#f7f7f7', padding: '28px 32px', fontFamily: 'Inter, sans-serif' }}>
        <ScoringPage teams={teams} criteria={criteria} onEdit={setEditT} />
      </main>
    </>
  );
}
