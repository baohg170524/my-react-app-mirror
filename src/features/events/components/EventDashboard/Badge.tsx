'use client';

import React from 'react';

interface BadgeProps {
  variant: 'success' | 'warning' | 'error' | 'primary' | 'default';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Badge({ variant, icon, children }: BadgeProps) {
  const variants = {
    success: 'bg-surface-soft text-ink border border-success-deep',
    warning: 'bg-surface-soft text-warning border border-warning',
    error: 'bg-surface-soft text-error border border-error',
    primary: 'bg-surface-soft text-ink border border-primary',
    default: 'bg-surface-soft text-ink border border-hairline',
  };

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-sm text-caption-sm font-bold ${variants[variant]}`}>
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </span>
  );
}
