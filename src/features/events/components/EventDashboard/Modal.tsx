'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-0 bg-black/70"
      onClick={onClose}
    >
      {/* Dialog with 3-section layout */}
      <dialog
        open={isOpen}
        className="relative z-[101] w-full max-w-2xl bg-canvas border border-hairline rounded-sm shadow-2xl mx-4 flex flex-col h-auto max-h-[90vh]"
        aria-labelledby="modal-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section (Fixed) */}
        <div className="flex items-center justify-between gap-4 p-6 md:p-8 border-b border-hairline flex-shrink-0">
          <h2 id="modal-title" className="t-heading-sm text-ink m-0 flex-1">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-mute hover:text-ink bg-surface-soft hover:bg-surface-dark rounded-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex-shrink-0"
            aria-label="Close dialog"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Content Section (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-4 modal-content">
          {children}
        </div>

        {/* Footer Section (Fixed) */}
        <div className="flex gap-3 justify-end p-6 md:p-8 border-t border-hairline flex-shrink-0 bg-canvas">
          {/* Buttons provided by form */}
        </div>
      </dialog>
    </div>
  );
}
