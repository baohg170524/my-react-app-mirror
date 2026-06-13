'use client';

import React, { createContext, useContext, useState } from 'react';

type Tab = 'dashboard' | 'submission' | 'results';

interface EventDashboardContextType {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const EventDashboardContext = createContext<EventDashboardContextType | undefined>(undefined);

export function EventDashboardProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <EventDashboardContext.Provider value={{ activeTab, setActiveTab, isModalOpen, setIsModalOpen, isLoading, setIsLoading }}>
      {children}
    </EventDashboardContext.Provider>
  );
}

export function useEventDashboard() {
  const context = useContext(EventDashboardContext);
  if (!context) throw new Error('useEventDashboard must be used within EventDashboardProvider');
  return context;
}
