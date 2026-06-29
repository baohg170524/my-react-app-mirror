'use client';
import { Navbar } from '@/components/Navbar';
import AppealsPanel from '@/features/events/components/shared/AppealsPanel';

export default function AppealsRoute() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#f7f7f7', padding: '28px 32px', fontFamily: 'Inter, sans-serif' }}>
        <AppealsPanel />
      </main>
    </>
  );
}
