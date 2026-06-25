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

// Per-event role is fetched on event open; mock it to a participant.
jest.mock('@/features/events/hooks/useEvents', () => ({
  useMyEventRole: () => ({ role: 'participant', label: 'Người tham gia' }),
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

  it('renders the participant tab set (4 tabs)', () => {
    renderSidebar();
    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(4);
    expect(tabs[0]).toHaveAttribute('aria-label', expect.stringContaining('Chi tiết sự kiện'));
    expect(tabs[1]).toHaveAttribute('aria-label', expect.stringContaining('Đăng ký / Đội của tôi'));
    expect(tabs[2]).toHaveAttribute('aria-label', expect.stringContaining('Nộp bài'));
    expect(tabs[3]).toHaveAttribute('aria-label', expect.stringContaining('Bảng xếp hạng'));
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

  it('each tab is wired to the tabpanel via aria-controls', () => {
    renderSidebar();
    for (const tab of screen.getAllByRole('tab')) {
      expect(tab).toHaveAttribute('aria-controls', 'event-tabpanel');
    }
  });

  it('Arrow keys move focus and activate the next/previous tab', async () => {
    const user = userEvent.setup();
    renderSidebar();
    const [first, second] = screen.getAllByRole('tab');
    first.focus();
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(second);
    expect(second).toHaveAttribute('aria-selected', 'true');
    await user.keyboard('{ArrowUp}');
    expect(document.activeElement).toBe(first);
    expect(first).toHaveAttribute('aria-selected', 'true');
  });

  it('Home/End jump to the first/last tab', async () => {
    const user = userEvent.setup();
    renderSidebar();
    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    await user.keyboard('{End}');
    expect(document.activeElement).toBe(tabs[tabs.length - 1]);
    await user.keyboard('{Home}');
    expect(document.activeElement).toBe(tabs[0]);
  });
});
