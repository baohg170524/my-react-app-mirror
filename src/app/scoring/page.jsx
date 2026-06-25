'use client';
import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import Notif from '@/components/Notif';
import EditModal from '@/components/EditModal';
import ScoringPage from '@/pages/ScoringPage';
import { useCurrentUser } from '@/hooks/useAuth';
import { eventRolesApi } from '@/features/events/api/eventRoles';
import { tracksApi } from '@/features/events/api/roundTrack';
import { templatesApi } from '@/features/events/api/templates';
import { submitResultsApi } from '@/features/events/api/submitResults';
import { eventsApi } from '@/features/events/api/events';
import { scoresApi } from '@/services/api';

// ─── Inner component (needs useSearchParams → must be inside Suspense) ────────

function ScoringInner() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const eventId      = searchParams.get('eventId');

  const { data: currentUser } = useCurrentUser();

  const [criteria, setCriteria]       = useState([]);
  const [teams, setTeams]             = useState([]);
  const [eventRoleId, setEventRoleId] = useState(null);
  const [editT, setEditT]             = useState(null);
  const [notif, setNotif]             = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  // Khi không có eventId — event selector
  const [events, setEvents]               = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  const sn = useCallback((m, t = 's') => {
    setNotif({ m, t });
    setTimeout(() => setNotif(null), 3000);
  }, []);

  // Load danh sách sự kiện khi chưa có eventId
  useEffect(() => {
    if (eventId || !currentUser?.id) return;
    setEventsLoading(true);
    eventsApi.list()
      .then(setEvents)
      .catch(console.error)
      .finally(() => setEventsLoading(false));
  }, [eventId, currentUser?.id]);

  // Load dữ liệu chấm điểm khi đã có eventId
  useEffect(() => {
    if (!currentUser?.id || !eventId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Lấy eventRole của judge → eventRoleId + trackId
        const role = await eventRolesApi.getUserRole(currentUser.id, eventId);
        if (cancelled) return;

        if (!role.trackId) throw new Error('Bạn chưa được phân công track trong sự kiện này');
        setEventRoleId(role.id);

        // 2. Lấy track → templateId
        const track = await tracksApi.getById(role.trackId);
        if (cancelled) return;

        if (!track.templateId) throw new Error('Track chưa được gắn bộ tiêu chí');

        // 3. Lấy template → criterias[]
        const template = await templatesApi.getById(track.templateId);
        if (cancelled) return;

        const mappedCriteria = (template.criterias ?? []).map(c => ({
          id:      c.criteriaId,
          label:   c.criteriaName,
          labelVi: c.criteriaName,
          weight:  c.weight,
          desc:    c.description ?? '',
          levels:  [],
        }));
        setCriteria(mappedCriteria);

        // 4. Lấy danh sách bài nộp của track
        const submissions = await submitResultsApi.list({ trackId: role.trackId });
        if (cancelled) return;

        setTeams(submissions.map(s => ({
          id:       s.id,
          name:     s.teamName,
          scores:   Array(mappedCriteria.length).fill(0),
          comments: Array(mappedCriteria.length).fill(''),
        })));
      } catch (e) {
        if (!cancelled) setError(e?.message ?? 'Không thể tải dữ liệu chấm điểm');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [currentUser?.id, eventId]);

  const saveEdit = async (submitResultId, scores, cmts) => {
    try {
      await scoresApi.save({
        eventRoleId,
        submitResultId,
        details: criteria.map((c, i) => ({ criteriaId: c.id, score: scores[i] ?? 0 })),
      });
      setTeams(p => p.map(t => t.id === submitResultId ? { ...t, scores, comments: cmts } : t));
      setEditT(null);
      sn('Đã lưu điểm thành công!');
    } catch {
      sn('Lưu điểm thất bại, vui lòng thử lại', 'e');
    }
  };

  // ── Chưa chọn sự kiện ─────────────────────────────────────────────────────
  if (!eventId) {
    return (
      <>
        <Navbar />
        <Notif n={notif} />
        <main style={{ minHeight: '100vh', background: '#f7f7f7', padding: '28px 32px', fontFamily: 'Inter, sans-serif' }}>
          <div className="animate-fadeUp" style={{ maxWidth: 640 }}>
            <h2 className="text-xl font-bold mb-1" style={{ color: '#000' }}>Chấm điểm</h2>
            <p className="text-sm mb-6" style={{ color: '#757575' }}>
              Chọn sự kiện bạn muốn chấm điểm.
            </p>

            {eventsLoading ? (
              <div className="flex items-center gap-3 py-10">
                <span className="loading loading-spinner" style={{ color: '#76b900' }} />
                <span className="text-sm" style={{ color: '#757575' }}>Đang tải danh sách sự kiện...</span>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-sm" style={{ color: '#757575' }}>Không có sự kiện nào.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {events.map(e => (
                  <button
                    key={e.id}
                    className="card-hover p-5 text-left w-full"
                    style={{ background: '#fff', border: '1px solid #cccccc', borderRadius: 2 }}
                    onClick={() => router.push(`/scoring?eventId=${e.id}`)}
                  >
                    <div className="text-sm font-bold" style={{ color: '#000' }}>{e.title}</div>
                    <div className="text-xs mt-1" style={{ color: '#757575' }}>
                      {new Date(e.startDate).toLocaleDateString('vi-VN')}
                      {' – '}
                      {new Date(e.endDate).toLocaleDateString('vi-VN')}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </main>
      </>
    );
  }

  // ── Đã có eventId — flow chấm điểm ────────────────────────────────────────
  return (
    <>
      <Navbar />
      <Notif n={notif} />
      {editT && (
        <EditModal
          team={editT}
          criteria={criteria}
          onClose={() => setEditT(null)}
          onSave={(s, c) => saveEdit(editT.id, s, c)}
        />
      )}
      <main style={{ minHeight: '100vh', background: '#f7f7f7', padding: '28px 32px', fontFamily: 'Inter, sans-serif' }}>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="loading loading-spinner" style={{ color: '#76b900' }} />
            <span className="ml-3 text-sm" style={{ color: '#757575' }}>Đang tải dữ liệu...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-sm font-semibold mb-4" style={{ color: '#d32f2f' }}>{error}</p>
            <button
              className="btn btn-outline text-sm"
              onClick={() => router.push('/scoring')}
            >
              ← Chọn sự kiện khác
            </button>
          </div>
        ) : teams.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm" style={{ color: '#757575' }}>Chưa có đội nào nộp bài trong track của bạn.</p>
            <button
              className="btn btn-outline text-sm mt-4"
              onClick={() => router.push('/scoring')}
            >
              ← Chọn sự kiện khác
            </button>
          </div>
        ) : (
          <ScoringPage teams={teams} criteria={criteria} onEdit={setEditT} />
        )}
      </main>
    </>
  );
}

// ─── Page export — Suspense required by useSearchParams ───────────────────────

export default function ScoringRoute() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#f7f7f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="text-sm" style={{ color: '#757575' }}>Đang tải...</span>
      </div>
    }>
      <ScoringInner />
    </Suspense>
  );
}
