"use client";

import Link from "next/link";
import { useState } from "react";
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

/** Nhãn vai trò của user trong event (Judge/Mentor/Team Leader/Team Member/EC).
 *  Trả null cho admin hoặc vai trò không xác định → không hiển thị badge. */
function roleLabel(roleName?: string | null): string | null {
  switch ((roleName ?? "").toLowerCase()) {
    case "eventcoordinator":
      return "EC";
    case "judge":
      return "Giám khảo";
    case "mentor":
      return "Người hướng dẫn";
    case "teamleader":
      return "Team Leader";
    case "teammember":
    case "member":
      return "Team Member";
    default:
      return null;
  }
}

/** Giai đoạn sự kiện theo thời gian (đồng bộ với AdminEventDashboard/Header). */
type EventPhase = "active" | "upcoming" | "ended";

function eventPhase(event: Event): EventPhase {
  const now = Date.now();
  const start = new Date(event.startDate).getTime();
  const end = new Date(event.endDate).getTime();
  if (!Number.isNaN(start) && now < start) return "upcoming";
  if (event.status === "closed" || (!Number.isNaN(end) && now > end)) return "ended";
  return "active";
}

/** Nhãn + màu badge cho từng giai đoạn (inline style theo phong cách card). */
const PHASE_BADGE: Record<EventPhase, { label: string; bg: string; color: string; border: string }> = {
  active: {
    label: "Đang diễn ra",
    bg: "rgba(255,255,255,0.95)",
    color: "var(--color-primary)",
    border: "var(--color-primary)",
  },
  upcoming: {
    label: "Sắp tới",
    bg: "rgba(255,255,255,0.95)",
    color: "var(--color-ink)",
    border: "var(--color-hairline)",
  },
  ended: {
    label: "Đã kết thúc",
    bg: "rgba(255,255,255,0.95)",
    color: "var(--color-stone)",
    border: "var(--color-hairline)",
  },
};

export function EventCard({ event, onJoin, isJoining, joinError }: Props) {
  const [imgError, setImgError] = useState(false);
  const isAdmin = useUserRole() === "admin";
  const isOpen = event.status === "open";
  const isLoggedIn = typeof window !== "undefined" && !!localStorage.getItem("accessToken");
  // Only disable the join action/button for logged in non-admins when closed or joining
  const joinDisabled = !isAdmin && isLoggedIn && (!isOpen || isJoining);
  // Nhãn vai trò — chỉ có ở danh sách "Của tôi" (event.myRole); admin không hiển thị.
  const myRoleLabel = isAdmin ? null : roleLabel(event.myRole);
  // Giai đoạn theo thời gian → nhãn badge (Sắp tới / Đang diễn ra / Đã kết thúc).
  const phase = eventPhase(event);

  return (
    <article
      className="card"
      style={{ padding: "var(--space-xl)", gap: "var(--space-sm)", cursor: "default", position: "relative", minHeight: 200 }}
    >
      {/* Event Photo — bấm vào ảnh cũng vào chi tiết sự kiện */}
      <Link
        href={`/events/${event.id}`}
        aria-label={`Xem chi tiết: ${event.title}`}
        style={{ display: "block", width: "100%", height: 160, borderRadius: "var(--radius-sm)", overflow: "hidden", position: "relative", flexShrink: 0, marginTop: "var(--space-xs)", cursor: "pointer" }}
      >
        {/* Status badge — góc trên trái ảnh: Sắp tới / Đang diễn ra / Đã kết thúc */}
        <span
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            zIndex: 2,
            background: PHASE_BADGE[phase].bg,
            color: PHASE_BADGE[phase].color,
            border: `1px solid ${PHASE_BADGE[phase].border}`,
            fontSize: "var(--fs-caption-sm)",
            fontWeight: 700,
            letterSpacing: "0.4px",
            padding: "3px 10px",
            borderRadius: 0,
            boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
          }}
        >
          {PHASE_BADGE[phase].label}
        </span>
        {myRoleLabel && (
          <span
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 2,
              background: "rgba(255,255,255,0.95)",
              color: "#4a7a00",
              fontSize: "var(--fs-caption-sm)",
              fontWeight: 700,
              letterSpacing: "0.4px",
              padding: "4px 11px",
              borderRadius: 999,
              boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
            }}
          >
            {myRoleLabel}
          </span>
        )}
        {event.photoEventUrl && !imgError ? (
          <img
            src={event.photoEventUrl}
            alt={event.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
            onError={() => setImgError(true)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, rgba(118, 185, 0, 0.1) 0%, rgba(118, 185, 0, 0.02) 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 40, opacity: 0.2 }}>📸</span>
          </div>
        )}
      </Link>

      {/* Title — bấm vào tên cũng vào chi tiết sự kiện */}
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
