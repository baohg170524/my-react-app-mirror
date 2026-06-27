'use client';

import { Navbar } from '@/components/Navbar';
import { GlobalProfile } from '@/features/user/components/GlobalProfile';
import { useCurrentUser } from '@/hooks/useAuth';

export default function ProfilePage() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return null;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="p-8 text-center text-mute mt-8">Vui lòng đăng nhập để xem hồ sơ.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto">
          <GlobalProfile />
        </div>
      </main>
    </div>
  );
}
