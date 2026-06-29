"use client";

import Link from "next/link";
import { useUserRole } from "@/hooks/useUserRole";
import type { Event } from "../types/event.types";

interface Props {
  event: Event;
  onJoin: (id: string) => void;
  isJoining: boolean;
  joinError?: string | null;
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function EventCard({ event, onJoin, isJoining, joinError }: Props) {
  const isAdmin = useUserRole() === "admin";
  const isOpen = event.status === "open";
  const isLoggedIn = typeof window !== "undefined" && !!localStorage.getItem("accessToken");
  // Only disable the join action/button for logged in non-admins when closed or joining
  const joinDisabled = !isAdmin && isLoggedIn && (!isOpen || isJoining);

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
          background: event.status === "open" ? "var(--color-primary)" : "var(--color-ash)",
        }}
      />
      {/* Event Photo */}
      <div style={{ width: "100%", height: 160, borderRadius: "var(--radius-sm)", overflow: "hidden", position: "relative", flexShrink: 0, marginTop: "var(--space-xs)" }}>
        {event.photoEventUrl ? (
          <img
            src={event.photoEventUrl}
            alt={event.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, rgba(118, 185, 0, 0.1) 0%, rgba(118, 185, 0, 0.02) 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 40, opacity: 0.2 }}>📸</span>
          </div>
        )}
      </div>

      {/* Status badge */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <span
          className="badge-tag"
          style={{
            background: event.status === "open" ? "rgba(118,185,0,0.1)" : "var(--color-surface-soft)",
            color: event.status === "open" ? "var(--color-primary)" : "var(--color-stone)",
            border: `1px solid ${event.status === "open" ? "var(--color-primary)" : "var(--color-hairline)"}`,
          }}
        >
          {event.status === "open" ? "Mở" : "Đã đóng"}
        </span>
      </div>

      {/* Title — the only link on card */}

      <h3
        className="card__title"
        style={{
          margin: 0,
          color: "var(--color-ink)",
          transition: "color 150ms",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-ink)")}
      >
        {event.title}
      </h3>


      {/* Start Date */}
      <p style={{ margin: 0, fontSize: "var(--fs-caption-md)", color: "var(--color-mute)", display: "flex", alignItems: "center", gap: 6 }}>
        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        {formatDate(event.startDate)}
      </p>

      {/* Open event — role-aware dashboard at /events/[id] handles admin redirect to /manage */}
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
                : event.status === "closed"
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
