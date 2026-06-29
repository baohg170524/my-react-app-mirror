'use client';

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

type NotifType = 's' | 'e';

interface NotifItem {
  id: number;
  m: string;
  t: NotifType;
}

interface NotifyApi {
  /** Show a success (green) toast. */
  success: (message: string) => void;
  /** Show an error (red) toast. */
  error: (message: string) => void;
  /** Show a toast with an explicit type ('s' | 'e'). */
  show: (message: string, type?: NotifType) => void;
}

const NotificationContext = createContext<NotifyApi | null>(null);

const AUTO_DISMISS_MS = 3000;

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<NotifItem[]>([]);
  const nextId = useRef(1);

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const show = useCallback(
    (message: string, type: NotifType = 's') => {
      if (!message) return;
      const id = nextId.current++;
      setItems((prev) => [...prev, { id, m: message, t: type }]);
      setTimeout(() => remove(id), AUTO_DISMISS_MS);
    },
    [remove],
  );

  // `show` is stable (memoised), so this api object is stable too.
  const api = useMemo<NotifyApi>(
    () => ({
      success: (m: string) => show(m, 's'),
      error: (m: string) => show(m, 'e'),
      show,
    }),
    [show],
  );

  return (
    <NotificationContext.Provider value={api}>
      {children}
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          pointerEvents: 'none',
        }}
      >
        {items.map((n) => (
          <div
            key={n.id}
            className="animate-slideDown"
            role="status"
            onClick={() => remove(n.id)}
            style={{
              background: n.t === 'e' ? '#ff4d6d' : '#3ddc84',
              color: '#000',
              padding: '12px 20px',
              fontWeight: 700,
              fontSize: 13,
              fontFamily: 'Inter,sans-serif',
              borderRadius: 6,
              maxWidth: 360,
              boxShadow: '0 4px 24px rgba(0,0,0,.5)',
              cursor: 'pointer',
              pointerEvents: 'auto',
            }}
          >
            {n.m}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

/**
 * Access the global notification API. Must be used under <NotificationProvider>
 * (mounted once in the root layout).
 */
export function useNotify(): NotifyApi {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotify must be used within a NotificationProvider');
  }
  return ctx;
}
