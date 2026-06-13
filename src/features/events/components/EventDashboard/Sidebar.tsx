'use client';

import React from 'react';
import { BarChart3, Upload, Trophy, Settings } from 'lucide-react';
import { useEventDashboard } from '@/features/events/contexts/EventDashboardContext';

const tabs = [
  { id: 'dashboard' as const, label: 'Event Dashboard', icon: BarChart3 },
  { id: 'submission' as const, label: 'Submission', icon: Upload },
  { id: 'results' as const, label: 'Results', icon: Trophy },
];

export function Sidebar() {
  const { activeTab, setActiveTab } = useEventDashboard();

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-16 md:w-60 bg-surface-dark border-r border-hairline-strong flex flex-col lg:w-60 z-50"
      role="navigation"
      aria-label="Event dashboard navigation"
    >
      {/* Tabs */}
      <nav className="flex-1 pt-0" role="tablist">
        <ul className="list-none p-0 m-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <li key={tab.id} role="presentation">
                <button
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-4 py-4 flex items-center gap-3 border-b border-hairline-strong transition-colors duration-150 cursor-pointer min-h-12 ${
                    isActive
                      ? 'bg-surface-dark text-on-dark border-l-4 border-l-primary'
                      : 'bg-surface-dark text-on-dark hover:bg-[rgba(255,255,255,0.08)] border-l-4 border-l-transparent'
                  } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
                  aria-label={`${tab.label} tab`}
                >
                  <Icon
                    size={18}
                    className={isActive ? 'text-primary opacity-100' : 'text-on-dark opacity-75'}
                    aria-hidden="true"
                  />
                  <span className="text-body-strong text-sm font-bold hidden md:inline">{tab.label}</span>
                  <span className="sr-only">{tab.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="border-t border-hairline-strong p-4 flex items-center gap-3 bg-surface-dark">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          KT
        </div>

        {/* User Info - Hidden on Mobile */}
        <div className="hidden md:flex flex-col flex-1 min-w-0">
          <p className="text-on-dark text-body-sm font-bold truncate text-opacity-100">Kim Test</p>
          <span className="inline-block bg-primary/20 text-primary text-caption-xs px-2 py-1 rounded-full text-xs mt-1 w-fit font-semibold">
            Leader
          </span>
        </div>

        {/* Settings Icon - Visible on Mobile */}
        <button
          className="md:hidden p-2 text-on-dark opacity-75 hover:opacity-100 hover:bg-[rgba(255,255,255,0.08)] rounded-sm transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="User settings"
        >
          <Settings size={18} aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
