// src/features/events/__tests__/components/accessibility.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EventDashboardProvider } from '@/features/events/contexts/EventDashboardContext';
import { Sidebar } from '@/features/events/components/EventDashboard/Sidebar';

jest.mock('@/hooks/useAuth', () => ({
  useCurrentUser: () => ({
    data: {
      id: 'user-test',
      email: 'student@test',
      fullName: 'Student Tester',
      role: 'STUDENT',
      createdAt: '',
      stats: { eventsJoined: 0, projectScore: 0, rank: 0 },
    },
  }),
}));

jest.mock('@/features/teams/hooks/useTeams', () => ({
  useMyTeamForEvent: () => ({ data: null, isLoading: false }),
}));

function renderSidebar() {
  return render(
    <EventDashboardProvider>
      <Sidebar eventId="evt-test" />
    </EventDashboardProvider>,
  );
}

describe('Accessibility - Sidebar Navigation (role-aware)', () => {
  it('exposes a nav landmark + tablist', () => {
    renderSidebar();
    expect(screen.getByRole('navigation', { name: /event dashboard navigation/i })).toBeInTheDocument();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders the student-no-team tab set (2 tabs: Chi tiết, Tạo đội)', () => {
    renderSidebar();
    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(2);
    expect(tabs[0]).toHaveAttribute('aria-label', expect.stringContaining('Chi tiết sự kiện'));
    expect(tabs[1]).toHaveAttribute('aria-label', expect.stringContaining('Tạo đội'));
  });

  it('first tab is active by default', () => {
    renderSidebar();
    const [first, second] = screen.getAllByRole('tab');
    expect(first).toHaveAttribute('aria-selected', 'true');
    expect(second).toHaveAttribute('aria-selected', 'false');
  });

  it('tabs are keyboard focusable and reachable via Tab', async () => {
    const user = userEvent.setup();
    renderSidebar();
    const [first, second] = screen.getAllByRole('tab');
    first.focus();
    expect(document.activeElement).toBe(first);
    await user.tab();
    expect(document.activeElement).toBe(second);
  });

  it('tabs carry focus-visible outline classes', () => {
    renderSidebar();
    const [first] = screen.getAllByRole('tab');
    expect(first.className).toContain('focus-visible:outline');
  });

  it('tabs expose sr-only labels for screen readers', () => {
    const { container } = renderSidebar();
    expect(container.querySelectorAll('.sr-only').length).toBeGreaterThan(0);
  });
});
