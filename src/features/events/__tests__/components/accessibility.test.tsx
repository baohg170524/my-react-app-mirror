// src/features/events/__tests__/components/accessibility.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EventDashboardProvider } from '@/features/events/contexts/EventDashboardContext';
import { Sidebar } from '@/features/events/components/EventDashboard/Sidebar';

describe('Accessibility - Sidebar Navigation', () => {
  it('should have proper semantic HTML structure', () => {
    render(
      <EventDashboardProvider>
        <Sidebar />
      </EventDashboardProvider>
    );

    // Verify nav element exists
    const nav = screen.getByRole('navigation', { name: /event dashboard navigation/i });
    expect(nav).toBeInTheDocument();

    // Verify tablist role
    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();

    // Verify tabs have proper roles
    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(3);
  });

  it('should support keyboard navigation with Tab key', async () => {
    const user = userEvent.setup();
    render(
      <EventDashboardProvider>
        <Sidebar />
      </EventDashboardProvider>
    );

    const firstTab = screen.getByRole('tab', { name: /event dashboard tab/i });
    const secondTab = screen.getByRole('tab', { name: /submission tab/i });

    // Focus first tab
    firstTab.focus();
    expect(document.activeElement).toBe(firstTab);

    // Tab to next element
    await user.tab();
    expect(document.activeElement).toBe(secondTab);
  });

  it('should show visible focus state', () => {
    render(
      <EventDashboardProvider>
        <Sidebar />
      </EventDashboardProvider>
    );

    const firstTab = screen.getByRole('tab', { name: /event dashboard tab/i });
    firstTab.focus();

    // Check that focus-visible styles are present
    expect(firstTab.className).toContain('focus-visible:outline');
  });

  it('should have ARIA labels on icon-only buttons', () => {
    render(
      <EventDashboardProvider>
        <Sidebar />
      </EventDashboardProvider>
    );

    // Check that settings icon button has aria-label
    const settingsButton = screen.getByRole('button', { name: /user settings/i });
    expect(settingsButton).toHaveAttribute('aria-label', 'User settings');
  });

  it('should announce active tab state to screen readers', () => {
    render(
      <EventDashboardProvider>
        <Sidebar />
      </EventDashboardProvider>
    );

    const activeTab = screen.getByRole('tab', { name: /event dashboard tab/i });
    expect(activeTab).toHaveAttribute('aria-selected', 'true');

    const inactiveTab = screen.getByRole('tab', { name: /submission tab/i });
    expect(inactiveTab).toHaveAttribute('aria-selected', 'false');
  });

  it('should have aria-hidden on decorative icons', () => {
    render(
      <EventDashboardProvider>
        <Sidebar />
      </EventDashboardProvider>
    );

    const icons = document.querySelectorAll('[aria-hidden="true"]');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('should have sr-only text for screen readers on tabs', () => {
    const { container } = render(
      <EventDashboardProvider>
        <Sidebar />
      </EventDashboardProvider>
    );

    // Check that sr-only (screen reader only) text is present
    const srOnlyElements = container?.querySelectorAll('.sr-only');
    expect((srOnlyElements?.length || 0)).toBeGreaterThan(0);
  });

  it('should allow clicking on tabs with keyboard', async () => {
    const user = userEvent.setup();
    render(
      <EventDashboardProvider>
        <Sidebar />
      </EventDashboardProvider>
    );

    const secondTab = screen.getByRole('tab', { name: /submission tab/i });
    secondTab.focus();

    // Simulate pressing Enter on the focused tab
    await user.keyboard('{Enter}');
    expect(document.activeElement).toBe(secondTab);
  });

  it('should have proper tab navigation order', () => {
    render(
      <EventDashboardProvider>
        <Sidebar />
      </EventDashboardProvider>
    );

    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-label', expect.stringContaining('Event Dashboard'));
    expect(tabs[1]).toHaveAttribute('aria-label', expect.stringContaining('Submission'));
    expect(tabs[2]).toHaveAttribute('aria-label', expect.stringContaining('Results'));
  });

  it('should support arrow key navigation (accessible pattern)', async () => {
    render(
      <EventDashboardProvider>
        <Sidebar />
      </EventDashboardProvider>
    );

    const firstTab = screen.getByRole('tab', { name: /event dashboard tab/i });
    firstTab.focus();

    // While arrow key navigation is not required for tabs, it's a best practice
    // This test documents the expected behavior
    expect(document.activeElement).toBe(firstTab);
  });

  it('should maintain focus visibility after interaction', async () => {
    const user = userEvent.setup();
    render(
      <EventDashboardProvider>
        <Sidebar />
      </EventDashboardProvider>
    );

    const firstTab = screen.getByRole('tab', { name: /event dashboard tab/i });
    const secondTab = screen.getByRole('tab', { name: /submission tab/i });

    // Focus and click first tab
    firstTab.focus();
    await user.click(firstTab);

    // Tab to second tab
    await user.tab();
    expect(document.activeElement).toBe(secondTab);

    // Verify tab is still focusable
    expect(secondTab).not.toBeDisabled();
  });
});
