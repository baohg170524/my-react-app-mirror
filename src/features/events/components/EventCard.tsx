"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { manageApi } from "../api/manage";
import { useUserRole } from "@/hooks/useUserRole";
import { formatDate } from "@/lib/date";
import type { Event } from "../types/event.types";

interface Props {
  event: Event;
  onJoin: (id: string) => void;
  isJoining: boolean;
  joinError?: string | null;
}

/** Number of distinct teams in an event (from its roles). Only runs when
 *  authenticated — the roles endpoint requires a token. */
function useEventTeamCount(eventId: string): number {
  const enabled =
    typeof window !== "undefined" && !!localStorage.getItem("accessToken");
  const { data } = useQuery({
    queryKey: ["eventTeamCount", eventId],
    queryFn: () => manageApi.listEventRoles(eventId),
    enabled,
    staleTime: 2 * 60_000,
  });
  return new Set((data ?? []).map((r) => r.teamId).filter(Boolean)).size;
}


/** Badge label + colour token per UI status. */
const STATUS_META: Record<Event["status"], { label: string; accent: string }> = {
  open:   { label: "Đang diễn ra", accent: "var(--color-primary)" },
  hidden: { label: "Ẩn",           accent: "var(--color-stone)" },
  ended:  { label: "Đã kết thúc",  accent: "var(--color-ash)" },
};

export function EventCard({ event, onJoin, isJoining, joinError }: Props) {
  const isAdmin = useUserRole() === "admin";
  const isOpen = event.status === "open";
  const isLoggedIn = typeof window !== "undefined" && !!localStorage.getItem("accessToken");
  // Only disable the join action/button for logged in non-admins when closed or joining
  const joinDisabled = !isAdmin && isLoggedIn && (!isOpen || isJoining);
  const meta = STATUS_META[event.status];
  const teamCount = useEventTeamCount(event.id);

  return (
    <article
      className="card"
      style={{ padding: "var(--space-xl)", gap: "var(--space-sm)", cursor: "default", position: "relative", minHeight: 200 }}
    >
      {/* Corner square — monogreen signature */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          background: meta.accent,
        }}
      />

      {/* Status badge */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <span
          className="badge-tag"
          style={{
            background: isOpen ? "rgba(118,185,0,0.1)" : "var(--color-surface-soft)",
            color: isOpen ? "var(--color-primary)" : "var(--color-stone)",
            border: `1px solid ${isOpen ? "var(--color-primary)" : "var(--color-hairline)"}`,
          }}
        >
          {meta.label}
        </span>
      </div>

      {/* Title — links to the event dashboard. Works for open AND closed events
          (the "Tham gia" button below is disabled when closed, so the title is
          the reliable way in). */}
      <Link href={`/events/${event.id}`} style={{ textDecoration: "none" }}>
        <h3
          className="card__title"
          style={{
            margin: 0,
            color: "var(--color-ink)",
            transition: "color 150ms",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-ink)")}
        >
          {event.title}
        </h3>
      </Link>

      {/* Start Date */}
      <p style={{ margin: 0, fontSize: "var(--fs-caption-md)", color: "var(--color-mute)", display: "flex", alignItems: "center", gap: 6 }}>
        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        {formatDate(event.startDate)}
      </p>

      {/* Team count badge */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xs)", flex: 1 }}>
        <span className="badge-tag" style={{ fontSize: "var(--fs-utility-xs)" }}>
          {teamCount} đội tham gia
        </span>
      </div>

      {/* Open event — role-aware dashboard at /events/[id] */}
      <div style={{ marginTop: "var(--space-sm)" }}>
        <Link
        href={`/events/${event.id}`}
        style={{ textDecoration: "none" }}
      >
        <button
          className="btn btn-primary btn-sm"
          style={{ width: "100%", minHeight: 44 }}
          disabled={joinDisabled}
          onClick={isAdmin || !isLoggedIn ? undefined : () => onJoin(event.id)}
          aria-label={`Xem chi tiết: ${event.title}`}
        >
          {isAdmin
            ? "Xem chi tiết"
            : isJoining
              ? "Đang xử lý…"
              : event.status === "ended"
                ? "Đã kết thúc"
                : "Xem chi tiết"}
        </button>
        </Link>
        
        {joinError && (
          <p style={{ margin: "6px 0 0", fontSize: "var(--fs-caption-sm)", color: "var(--color-error)" }}>
            {joinError}
          </p>
        )}
      </div>
    </article>
  );
}
