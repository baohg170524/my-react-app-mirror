# Student EventDashboard UI improvements — Design

**Date:** 2026-06-22
**Status:** Approved

## Goal

Make the student event dashboard consistent and the leaderboard always reachable,
add a back-to-home button matching the admin UI, and clean up the round selector.

## Requirements

1. **Leaderboard always visible** — students can view the per-round leaderboard
   whether or not they have created a team.
2. **Consistent student tabs** — the tab set is predictable; Detail and Leaderboard
   always appear.
3. **Back-to-home button** — student header gets a back button like the admin header.
4. **Restyle the round selector** — keep the dropdown but make it cleaner; show a
   leaderboard immediately by defaulting to the first round.

Out of scope (explicitly dropped): an aggregated "toàn sự kiện" (whole-event)
leaderboard — the backend exposes only per-round results (`/FinalResults/round/{roundId}`),
so there is no overall endpoint and we will not synthesize one client-side.

## Changes

### 1. `src/lib/events/getEventTabs.ts`

Student branch always includes `leaderboard`:

- No team: `[detail, createTeam, leaderboard]`
- Has team: `[detail, myTeam, submission, results, leaderboard]`

Judge and admin branches unchanged. `LeaderboardTab` already depends only on
`eventId`, so it renders correctly without a team.

### 2. `src/features/events/components/EventDashboard/Header.tsx`

Add an `ArrowLeft` back button at the left of the header, mirroring the admin
header markup in `AdminEventDashboard.tsx`:

- 36px square (`w-9 h-9`), `rounded-sm`, `border border-hairline`, hover
  `bg-surface-soft`, focus-visible outline.
- `onClick={() => router.push('/')}` via `useRouter` from `next/navigation`.
- `aria-label="Quay lại danh sách sự kiện"`.

Header stays a `'use client'` component (already is).

### 3. `src/features/leaderboard/components/RoundLeaderboard.tsx`

- Default the selected round to the first available round once rounds load, so the
  leaderboard shows immediately instead of an empty "— Chọn vòng —" state.
- Restyle the selector: clearer label ("Xem theo vòng"), consistent `input`
  styling, sensible width.
- Keep loading / empty-data states; behavior otherwise unchanged.

### 4. `src/lib/events/__tests__/getEventTabs.test.ts`

Update the student no-team expectation to include `leaderboard`. Add/adjust an
assertion that leaderboard is present in both team states.

## Testing

- Unit: `getEventTabs` returns leaderboard for student in both team states.
- Manual: student with no team sees Detail / Tạo đội / Bảng xếp hạng; leaderboard
  renders a round immediately; back button returns to `/`.
