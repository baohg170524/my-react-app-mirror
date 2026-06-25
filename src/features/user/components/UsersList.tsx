"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { usersApi, schoolsApi, type UserSummary } from "@/services/api";
import { useIsAuthenticated } from "@/hooks/useAuth";

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "primary" | "success" | "warning";
}) {
  const map = {
    neutral: { bg: "var(--color-surface-soft)", fg: "var(--color-mute)", bd: "var(--color-hairline)" },
    primary: { bg: "rgba(118,185,0,0.1)", fg: "var(--color-primary)", bd: "var(--color-primary)" },
    success: { bg: "rgba(118,185,0,0.1)", fg: "var(--color-primary)", bd: "var(--color-primary)" },
    warning: { bg: "var(--color-surface-soft)", fg: "var(--color-stone)", bd: "var(--color-hairline-strong)" },
  }[tone];
  return (
    <span
      className="badge-tag"
      style={{ background: map.bg, color: map.fg, border: `1px solid ${map.bd}`, fontSize: "var(--fs-utility-xs)" }}
    >
      {children}
    </span>
  );
}

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "12px 10px",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--color-mute)",
  borderBottom: "1px solid var(--color-hairline-strong)",
  whiteSpace: "nowrap",
};
const td: React.CSSProperties = {
  padding: "12px 10px",
  fontSize: "var(--fs-body-sm)",
  color: "var(--color-ink)",
  borderBottom: "1px solid var(--color-hairline)",
  verticalAlign: "top",
};

export function UsersList() {
  const isAuthenticated = useIsAuthenticated();
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [filter, setFilter] = useState<"all" | "pending">("all");
  const [actionError, setActionError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const usersQuery = useQuery({
    queryKey: ["users", "list", filter, debounced],
    queryFn: () =>
      usersApi.list({
        search: debounced,
        pageSize: 100,
        isApproved: filter === "pending" ? false : undefined,
      }),
    enabled: isAuthenticated,
    staleTime: 60_000,
  });

  // Toggle account active state via isApproved (PUT /Users/{id}).
  const toggleMutation = useMutation({
    mutationFn: (u: UserSummary) =>
      usersApi.update(u.id, {
        schoolId: u.schoolId,
        studentCode: u.studentCode,
        fullName: u.fullName,
        isStudent: u.isStudent,
        isAdmin: u.isAdmin,
        isApproved: !u.isApproved,
        isFpt: u.isFpt,
        photoStudentCardUrl: null,
      }),
    onSuccess: () => {
      setActionError(null);
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
    },
    onError: (e) =>
      setActionError(
        (e as AxiosError<{ message?: string }>)?.response?.data?.message ??
          "Thao tác thất bại. Vui lòng thử lại.",
      ),
  });

  function handleToggle(u: UserSummary) {
    if (u.isApproved && typeof window !== "undefined" &&
      !window.confirm(`Vô hiệu hóa tài khoản ${u.fullName || u.email}?`)) {
      return;
    }
    setActionError(null);
    toggleMutation.mutate(u);
  }
  const schoolsQuery = useQuery({
    queryKey: ["schools"],
    queryFn: () => schoolsApi.list(),
    enabled: isAuthenticated,
    staleTime: 5 * 60_000,
  });

  const users = usersQuery.data?.data ?? [];
  const total = usersQuery.data?.totalItems ?? users.length;
  const schoolName = (id: string | null) =>
    id ? schoolsQuery.data?.data?.find((s) => s.id === id)?.schoolName ?? "—" : "—";

  const onType = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebounced(v.trim()), 300);
  };

  return (
    <main tabIndex={-1} style={{ outline: "none", minHeight: "100vh" }}>
      <div className="container" style={{ paddingTop: "var(--space-section)" }}>
        <div className="card" style={{ padding: "var(--space-xxl)", gap: "var(--space-xl)" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--space-md)" }}>
            <div>
              <h1 className="t-heading-md" style={{ margin: 0 }}>Người dùng</h1>
              <p className="t-body-sm" style={{ margin: "2px 0 0", color: "var(--color-mute)" }}>
                {!isAuthenticated
                  ? "Danh sách tài khoản trong hệ thống"
                  : filter === "pending"
                    ? `${total} tài khoản chờ xét duyệt`
                    : `${total} người dùng`}
              </p>
            </div>
            <input
              className="text-input"
              value={query}
              onChange={onType}
              placeholder="Tìm theo tên hoặc email…"
              style={{ width: 280, maxWidth: "100%" }}
            />
          </div>

          {/* Filter tabs */}
          {isAuthenticated && (
            <div style={{ display: "flex", gap: "var(--space-sm)" }}>
              {([
                { id: "all", label: "Tất cả" },
                { id: "pending", label: "Chờ xét duyệt" },
              ] as const).map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  className={`pill-tab${filter === id ? " is-active" : ""}`}
                  onClick={() => setFilter(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {!isAuthenticated ? (
            <p className="t-body-sm" style={{ color: "var(--color-mute)", textAlign: "center", padding: "var(--space-xl)" }}>
              Vui lòng đăng nhập để xem danh sách người dùng.
            </p>
          ) : usersQuery.isError ? (
            <p className="t-body-sm" style={{ color: "var(--color-error)", textAlign: "center", padding: "var(--space-xl)" }}>
              Không tải được danh sách người dùng.
            </p>
          ) : usersQuery.isLoading ? (
            <p className="t-body-sm" style={{ color: "var(--color-mute)", textAlign: "center", padding: "var(--space-xl)" }}>
              Đang tải…
            </p>
          ) : users.length === 0 ? (
            <p className="t-body-sm" style={{ color: "var(--color-mute)", textAlign: "center", padding: "var(--space-xl)" }}>
              {filter === "pending" ? "Không có tài khoản chờ xét duyệt." : "Không có người dùng nào."}
            </p>
          ) : (
            <>
              {actionError && (
                <p className="t-caption-sm" style={{ color: "var(--color-error)", margin: 0 }}>{actionError}</p>
              )}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={th}>Họ tên</th>
                      <th style={th}>Email</th>
                      <th style={th}>MSSV</th>
                      <th style={th}>Trường</th>
                      <th style={th}>Vai trò</th>
                      <th style={th}>Trạng thái</th>
                      <th style={{ ...th, textAlign: "right" }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => {
                      const pending =
                        toggleMutation.isPending && toggleMutation.variables?.id === u.id;
                      return (
                        <tr key={u.id}>
                          <td style={{ ...td, fontWeight: 700 }}>{u.fullName || "—"}</td>
                          <td style={td}>{u.email || "—"}</td>
                          <td style={td}>{u.studentCode || "—"}</td>
                          <td style={td}>
                            {u.isFpt ? "FPT University" : schoolName(u.schoolId)}
                          </td>
                          <td style={td}>
                            <Badge tone={u.isAdmin ? "primary" : "neutral"}>
                              {u.isAdmin ? "Admin" : "User"}
                            </Badge>
                          </td>
                          <td style={td}>
                            <Badge tone={u.isApproved ? "success" : "warning"}>
                              {u.isApproved ? "Hoạt động" : "Chờ duyệt"}
                            </Badge>
                          </td>
                          <td style={{ ...td, textAlign: "right" }}>
                            <button
                              type="button"
                              disabled={pending}
                              onClick={() => handleToggle(u)}
                              className="t-caption-sm"
                              style={{
                                fontWeight: 700,
                                background: "none",
                                border: `1px solid ${u.isApproved ? "var(--color-error)" : "var(--color-primary)"}`,
                                color: u.isApproved ? "var(--color-error)" : "var(--color-primary)",
                                borderRadius: "var(--radius-sm)",
                                padding: "4px 10px",
                                cursor: pending ? "not-allowed" : "pointer",
                                opacity: pending ? 0.5 : 1,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {pending ? "Đang lưu…" : u.isApproved ? "Vô hiệu hóa" : "Duyệt"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
