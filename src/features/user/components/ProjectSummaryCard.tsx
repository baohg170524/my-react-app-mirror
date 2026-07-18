"use client";

import { useUserProfile } from "../hooks/useUserProfile";

export function ProjectSummaryCard() {
  const { data: profile, isLoading } = useUserProfile();
  const ps = profile?.projectSummary;

  return (
    <div className="container" style={{ paddingTop: "var(--space-xl)", paddingBottom: 0 }}>
      <div
        className="card"
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: "var(--space-xxl)",
          padding: "var(--space-xl) var(--space-xxl)",
        }}
      >
        {isLoading ? (
          <>
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
            {[140, 200, 80].map((w, i) => (
              <div key={i} style={{ height: 16, width: w, background: "var(--color-surface-soft)", borderRadius: "var(--radius-sm)", animation: "pulse 1.4s ease-in-out infinite" }} />
            ))}
          </>
        ) : !ps ? (
          <p style={{ margin: 0, color: "var(--color-mute)", fontSize: "var(--fs-body-sm)" }}>
            Chưa có dự án nào đang hoạt động.
          </p>
        ) : (
          <>
            {/* Semester + project */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: "0 0 2px 0", fontSize: "var(--fs-caption-md)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-mute)" }}>
                {ps.semesterName}
              </p>
              <h2 style={{ margin: 0, fontSize: "var(--fs-heading-md)", fontWeight: 700, color: "var(--color-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {ps.projectName}
              </h2>
            </div>

            {/* Progress bar */}
            <div style={{ flex: 2, minWidth: 120 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: "var(--fs-caption-xs)", fontWeight: 700, textTransform: "uppercase", color: "var(--color-mute)" }}>Tiến độ</span>
                <span style={{ fontSize: "var(--fs-caption-xs)", fontWeight: 700, color: "var(--color-primary)" }}>{ps.completionPct}%</span>
              </div>
              <div style={{ height: 4, background: "var(--color-surface-soft)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                {/* transform:scaleX thay vì width — animate trên GPU (compositor), tránh reflow mỗi frame. */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "var(--color-primary)",
                    borderRadius: "var(--radius-sm)",
                    transform: `scaleX(${ps.completionPct / 100})`,
                    transformOrigin: "left",
                    transition: "transform 0.6s ease",
                  }}
                />
              </div>
            </div>

            {/* Team size */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--color-mute)" strokeWidth={2}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span style={{ fontSize: "var(--fs-body-sm)", color: "var(--color-mute)", fontWeight: 700 }}>{ps.teamSize} thành viên</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
