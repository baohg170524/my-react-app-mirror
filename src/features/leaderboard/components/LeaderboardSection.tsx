"use client";

import { useLeaderboard } from "../hooks/useLeaderboard";
import { useCurrentUser } from "@/hooks/useAuth";
import { LeaderboardRow } from "./LeaderboardRow";

function SkeletonRow() {
  return (
    <div style={{ height: 52, padding: "10px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: "var(--border-hairline)" }}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
      {[28, 10, 32, 120, 48].map((w, i) => (
        <div key={i} style={{ height: i === 2 ? 32 : 12, width: i === 4 ? "auto" : w, flex: i === 3 ? 1 : undefined, background: "var(--color-surface-soft)", borderRadius: i === 2 ? "var(--radius-full)" : "var(--radius-sm)", animation: `pulse 1.4s ease-in-out ${i * 0.08}s infinite` }} />
      ))}
    </div>
  );
}

export function LeaderboardSection() {
  const { data: entries, isLoading, error } = useLeaderboard();
  const { data: me } = useCurrentUser();

  return (
    <div className="container" style={{ paddingTop: "var(--space-section)", paddingBottom: "var(--space-section)" }}>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--space-xl) var(--space-xxl)", borderBottom: "var(--border-hairline)" }}>
          <h2 className="t-heading-md" style={{ margin: 0 }}>Bảng xếp hạng</h2>
          <div style={{ display: "flex", gap: 16, fontSize: "var(--fs-caption-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-mute)" }}>
            <span style={{ width: 28, textAlign: "center" }}>Hạng</span>
            <span style={{ width: 120 }}>Tên</span>
            <span>Điểm</span>
          </div>
        </div>

        {/* Rows */}
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
        ) : error ? (
          <p style={{ padding: "var(--space-xl)", color: "var(--color-error)", fontSize: "var(--fs-body-sm)", margin: 0 }}>
            Không thể tải bảng xếp hạng.
          </p>
        ) : (
          entries?.map((entry) => (
            <LeaderboardRow
              key={entry.userId}
              entry={entry}
              isCurrentUser={entry.userId === me?.id}
            />
          ))
        )}
      </div>
    </div>
  );
}
