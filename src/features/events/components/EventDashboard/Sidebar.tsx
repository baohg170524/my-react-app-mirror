'use client';

import React, { useRef } from 'react';
import {
  BarChart3, Upload, Trophy, Users, UserPlus, ClipboardList, FileText,
} from 'lucide-react';
import { useEventDashboard } from '@/features/events/contexts/EventDashboardContext';
import { useCurrentUser } from '@/hooks/useAuth';
import { useMyEventRole } from '@/features/events/hooks/useEvents';
import { getEventTabs, type EventTabId } from '@/lib/events/getEventTabs';

interface SidebarProps { eventId: string; }

const ICON: Record<EventTabId, React.ComponentType<{ size?: number; className?: string }>> = {
  detail:        BarChart3,
  createTeam:    UserPlus,
  myTeam:        Users,
  submission:    Upload,
  results:       FileText,
  leaderboard:   Trophy,
  judgeAssigned: ClipboardList,
};

export function Sidebar({ eventId }: SidebarProps) {
  const { activeTab, setActiveTab } = useEventDashboard();
  const { data: user } = useCurrentUser();
  const { role, label: roleLabel } = useMyEventRole(eventId, user?.id ?? '');
  const tabs = getEventTabs({ role });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow/Home/End move focus between tabs and switch view (cheap swap → activate
  // on move). Tab itself is left untouched so each tab stays in the tab order.
  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = tabs.length;
    let next: number;
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        next = (index + 1) % count;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        next = (index - 1 + count) % count;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = count - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    setActiveTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-16 md:w-60 bg-surface-dark border-r border-hairline-strong flex flex-col lg:w-60 z-50"
      role="navigation"
      aria-label="Event dashboard navigation"
    >
      <nav className="flex-1 pt-0" role="tablist" aria-orientation="vertical">
        <ul className="list-none p-0 m-0">
          {tabs.map((tab, index) => {
            const Icon = ICON[tab.id];
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id} role="presentation">
                <button
                  ref={(el) => { tabRefs.current[index] = el; }}
                  role="tab"
                  id={`event-tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls="event-tabpanel"
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(e) => onTabKeyDown(e, index)}
                  className={`w-full px-4 py-4 flex items-center gap-3 border-b border-hairline-strong transition-colors duration-150 cursor-pointer min-h-12 ${
                    isActive
                      ? 'bg-surface-dark text-on-dark border-l-4 border-l-primary'
                      : 'bg-surface-dark text-on-dark hover:bg-[rgba(255,255,255,0.08)] border-l-4 border-l-transparent'
                  } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
                  aria-label={tab.label}
                >
                  <Icon size={18} className={isActive ? 'text-primary' : 'text-on-dark opacity-75'} aria-hidden="true" />
                  <span className="text-on-dark text-sm font-bold hidden md:inline">{tab.label}</span>
                  <span className="sr-only">{tab.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-hairline-strong p-4 flex items-center gap-3 bg-surface-dark">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
          {user?.fullName?.slice(0, 2).toUpperCase() ?? '?'}
        </div>
        <div className="hidden md:flex flex-col flex-1 min-w-0">
          <p className="text-on-dark text-body-sm font-bold truncate">{user?.fullName ?? '—'}</p>
          <span className="inline-block bg-primary/20 text-on-dark text-caption-xs px-2 py-1 rounded-full text-xs mt-1 w-fit font-semibold">
            {roleLabel}
          </span>
        </div>
      </div>
    </aside>
  );
}
