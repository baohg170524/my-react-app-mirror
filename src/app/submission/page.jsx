'use client';
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import SubmissionPage from '@/views/SubmissionPage';
import { getAllSubmissions } from '@/services/submissionService';

export default function SubmissionRoute() {
  const [submissions, setSubmissions] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);

  useEffect(() => {
    getAllSubmissions({ PageSize: 100 })
      .then(result => setSubmissions(result.items))
      .catch(err  => setError(err?.response?.data?.message ?? err?.message ?? 'Lỗi tải dữ liệu'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#f7f7f7', padding: '28px 32px', fontFamily: 'Inter, sans-serif' }}>
        {loading ? (
          <div style={{ color: '#7da88a', textAlign: 'center', paddingTop: 80, fontSize: 14 }}>
            Đang tải danh sách bài nộp…
          </div>
        ) : error ? (
          <div style={{ color: '#ff4d6d', textAlign: 'center', paddingTop: 80, fontSize: 14 }}>
            {error}
          </div>
        ) : (
          <SubmissionPage submissions={submissions} teams={[]} />
        )}
      </main>
    </>
  );
}
