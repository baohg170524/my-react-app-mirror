'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 h-auto md:h-20 bg-canvas border-b border-hairline flex items-center px-4 md:px-6 gap-3 md:gap-4 lg:left-60 z-40 py-4 md:py-0">
      <button
        type="button"
        onClick={() => router.push('/')}
        className="flex items-center justify-center w-9 h-9 rounded-sm border border-hairline text-ink hover:bg-surface-soft transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary shrink-0"
        aria-label="Quay lại trang chủ"
      >
        <ArrowLeft size={18} aria-hidden="true" />
      </button>
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <h1 className="t-heading-md text-ink m-0 truncate text-sm md:text-lg lg:text-xl">{title}</h1>
        {subtitle && <p className="t-body-sm text-mute m-0 hidden md:block text-xs md:text-body-sm">{subtitle}</p>}
      </div>
    </header>
  );
}
