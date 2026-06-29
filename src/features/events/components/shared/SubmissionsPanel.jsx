'use client';
import { useState, useEffect } from 'react';
import SubmissionView from '@/views/SubmissionPage';
import { getAllSubmissions } from '@/services/submissionService';

/**
 * Danh sách bài nộp tái sử dụng từ trang /submission, nhúng vào tab dashboard.
 *
 * Props:
 *  - eventId: bắt buộc — backend yêu cầu EventId cho GET /SubmitResults.
 *  - trackId: nếu có — judge/mentor chỉ thấy bài nộp của hạng mục được giao.
 *
 * @param {{ eventId?: string | null, trackId?: string | null }} props
 */
export default function SubmissionsPanel({ eventId = null, trackId = null }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const params = {
      PageSize: 100,
      ...(eventId ? { EventId: eventId } : {}),
      ...(trackId ? { TrackId: trackId } : {}),
    };
    getAllSubmissions(params)
      .then(result => { if (!cancelled) setSubmissions(result.items); })
      .catch(err   => { if (!cancelled) setError(err?.response?.data?.message ?? err?.message ?? 'Lỗi tải dữ liệu'); })
      .finally(()  => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [eventId, trackId]);

  if (loading) {
    return (
      <div style={{ color: '#7da88a', textAlign: 'center', paddingTop: 80, fontSize: 14 }}>
        Đang tải danh sách bài nộp…
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ color: '#ff4d6d', textAlign: 'center', paddingTop: 80, fontSize: 14 }}>
        {error}
      </div>
    );
  }
  return <SubmissionView submissions={submissions} teams={[]} />;
}
