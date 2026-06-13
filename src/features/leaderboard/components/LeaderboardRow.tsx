"use client";

import { useState } from "react";
import type { LeaderboardEntry, BadgeTier } from "../types/leaderboard.types";

const BADGE_COLOR: Record<NonNullable<BadgeTier>, string> = {
  gold:   "#f59e0b",
  silver: "#94a3b8",
  bronze: "#b45309",
};

const RANK_COLOR = (rank: number) =>
  rank === 1 ? "#f59e0b" : rank === 2 ? "#94a3b8" : rank === 3 ? "#b45309" : "var(--color-stone)";

interface Props {
  entry: LeaderboardEntry;
  isCurrentUser: boolean;
}

function AvatarCell({ entry }: { entry: LeaderboardEntry }) {
  const [err, setErr] = useState(false);
  const initials = entry.fullName.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  if (err || !entry.avatar) {
    return (
      <div style={{ width: 32, height: 32, borderRadius: "var(--radius-full)", background: "var(--color-surface-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "var(--color-mute)", flexShrink: 0 }}>
        {initials}
      </div>
    );
  }
  return (
    <img
      src={entry.avatar}
      alt={entry.fullName}
      width={32}
      height={32}
      loading="lazy"
      onError={() => setErr(true)}
      style={{ borderRadius: "var(--radius-full)", flexShrink: 0, objectFit: "cover" }}
    />
  );
}

export function LeaderboardRow({ entry, isCurrentUser }: Props) {
  return (
    <div
      aria-label={isCurrentUser ? `Vị trí của bạn, hạng ${entry.rank}` : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-md)",
        padding: "10px var(--space-lg)",
        borderLeft: isCurrentUser ? "2px solid var(--color-primary)" : "2px solid transparent",
        background: isCurrentUser ? "rgba(118,185,0,0.04)" : "transparent",
        borderBottom: "var(--border-hairline)",
        transition: "background 150ms",
      }}
    >
      {/* Rank */}
      <span style={{ width: 28, fontWeight: 700, fontSize: "var(--fs-body-md)", color: RANK_COLOR(entry.rank), textAlign: "center", flexShrink: 0 }}>
        {entry.rank}
      </span>

      {/* Badge square */}
      <div style={{ width: 10, height: 10, flexShrink: 0, background: entry.badge ? BADGE_COLOR[entry.badge] : "transparent" }} />

      <AvatarCell entry={entry} />

      {/* Name */}
      <span style={{ flex: 1, fontSize: "var(--fs-body-sm)", fontWeight: isCurrentUser ? 700 : 400, color: "var(--color-ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {entry.fullName}
        {isCurrentUser && (
          <span style={{ marginLeft: 6, fontSize: "var(--fs-caption-xs)", color: "var(--color-primary)", fontWeight: 700 }}>
            (Bạn)
          </span>
        )}
      </span>

      {/* Score */}
      <span style={{ fontSize: "var(--fs-body-md)", fontWeight: 700, color: "var(--color-ink)", flexShrink: 0 }}>
        {entry.score.toLocaleString("vi-VN")}
      </span>
    </div>
  );
}
