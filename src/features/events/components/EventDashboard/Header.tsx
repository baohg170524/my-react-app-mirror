'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
  subtitle?: string;
  status?: 'open' | 'closed';
  submissionType?: string;
}

export function Header({ title, subtitle, status, submissionType }: HeaderProps) {
  const router = useRouter();
  const getStatusColor = (status?: string) => {
    if (status === 'open') return 'bg-primary text-on-primary';
    if (status === 'closed') return 'bg-stone text-on-dark';
    return '';
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-auto md:h-20 bg-canvas border-b border-hairline flex items-center px-4 md:px-6 gap-3 md:gap-4 lg:left-60 z-40 py-4 md:py-0">
      <button
        onClick={() => router.push('/')}
        className="flex items-center justify-center w-9 h-9 rounded-sm border border-hairline text-ink hover:bg-surface-soft transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex-shrink-0"
        aria-label="Quay lại danh sách sự kiện"
      >
        <ArrowLeft size={18} aria-hidden="true" />
      </button>
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <h1 className="t-heading-md text-ink m-0 truncate text-sm md:text-lg lg:text-xl">{title}</h1>
        {subtitle && <p className="t-body-sm text-mute m-0 hidden md:block text-xs md:text-body-sm">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2 md:gap-3 ml-auto flex-shrink-0">
        {status && (
          <span
            className={`inline-block px-2 md:px-3 py-1 rounded-sm text-xs md:text-body-sm font-bold uppercase whitespace-nowrap ${getStatusColor(
              status
            )}`}
          >
            {status === 'open' ? 'Open' : 'Closed'}
          </span>
        )}

        {submissionType && (
          <span className="inline-block bg-surface-soft text-ink px-2 md:px-3 py-1 rounded-sm text-caption-xs md:text-caption-sm font-bold uppercase whitespace-nowrap">
            {submissionType}
          </span>
        )}
      </div>
    </header>
  );
}
