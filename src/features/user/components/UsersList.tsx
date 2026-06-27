"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  usersApi,
  schoolsApi,
  type UserSummary,
  type SchoolModel,
  type CreateUserPayload,
} from "@/services/api";
import { useIsAuthenticated } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { getErrorMessage } from "@/lib/apiError";

const PAGE_SIZE = 20;

const errMsg = getErrorMessage;

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
  const isAdmin = useUserRole() === "admin";
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [filter, setFilter] = useState<"all" | "pending">("all");
  const [page, setPage] = useState(1);
  const [actionError, setActionError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [editUser, setEditUser] = useState<UserSummary | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const usersQuery = useQuery({
    queryKey: ["users", "list", filter, debounced, page],
    queryFn: () =>
      usersApi.list({
        search: debounced,
        pageNumber: page,
        pageSize: PAGE_SIZE,
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
    onError: (e) => setActionError(errMsg(e)),
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

  // Admin: create a new account.
  const createMutation = useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => {
      setActionError(null);
      setShowCreate(false);
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
    },
    onError: (e) => setActionError(errMsg(e)),
  });

  // Admin: edit a user's info (name, student code, school, status).
  const editMutation = useMutation({
    mutationFn: (vars: { id: string; user: UserSummary; edits: { fullName: string; studentCode: string; schoolId: string; isApproved: boolean } }) =>
      usersApi.update(vars.id, {
        schoolId: vars.edits.schoolId || null,
        studentCode: vars.edits.studentCode.trim() || null,
        fullName: vars.edits.fullName.trim(),
        // Role is intentionally NOT editable here — keep the user's existing flags.
        isStudent: vars.user.isStudent,
        isAdmin: vars.user.isAdmin,
        isApproved: vars.edits.isApproved,
        isFpt: vars.user.isFpt,
        photoStudentCardUrl: null,
      }),
    onSuccess: () => {
      setActionError(null);
      setEditUser(null);
      queryClient.invalidateQueries({ queryKey: ["users", "list"] });
    },
    onError: (e) => setActionError(errMsg(e)),
  });

  const users = usersQuery.data?.data ?? [];
  const total = usersQuery.data?.totalItems ?? users.length;
  const totalPages = Math.max(1, usersQuery.data?.totalPages ?? 1);
  const currentPage = Math.min(page, totalPages);
  const schoolName = (id: string | null) =>
    id ? schoolsQuery.data?.data?.find((s) => s.id === id)?.schoolName ?? "—" : "—";

  const onType = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebounced(v.trim());
      setPage(1);
    }, 300);
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
                    ? `${total} tài khoản bị vô hiệu hóa`
                    : `${total} người dùng`}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", flexWrap: "wrap" }}>
              <input
                className="text-input"
                value={query}
                onChange={onType}
                placeholder="Tìm theo tên hoặc email…"
                style={{ width: 280, maxWidth: "100%" }}
              />
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setActionError(null);
                    setShowCreate(true);
                  }}
                  className="t-body-sm"
                  style={{
                    fontWeight: 700,
                    background: "var(--color-primary)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "var(--radius-sm)",
                    padding: "9px 16px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  + Thêm tài khoản
                </button>
              )}
            </div>
          </div>

          {/* Filter tabs */}
          {isAuthenticated && (
            <div style={{ display: "flex", gap: "var(--space-sm)" }}>
              {([
                { id: "all", label: "Tất cả" },
                { id: "pending", label: "Bị vô hiệu hóa" },
              ] as const).map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  className={`pill-tab${filter === id ? " is-active" : ""}`}
                  onClick={() => {
                    setFilter(id);
                    setPage(1);
                  }}
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
              {filter === "pending" ? "Không có tài khoản bị vô hiệu hóa." : "Không có người dùng nào."}
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
                              {u.isApproved ? "Hoạt động" : "Vô hiệu hóa"}
                            </Badge>
                          </td>
                          <td style={{ ...td, textAlign: "right" }}>
                            <div style={{ display: "inline-flex", gap: "var(--space-sm)", justifyContent: "flex-end" }}>
                              {isAdmin && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActionError(null);
                                    setEditUser(u);
                                  }}
                                  className="t-caption-sm"
                                  style={{
                                    fontWeight: 700,
                                    background: "none",
                                    border: "1px solid var(--color-hairline-strong)",
                                    color: "var(--color-ink)",
                                    borderRadius: "var(--radius-sm)",
                                    padding: "4px 10px",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Sửa
                                </button>
                              )}
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
                                {pending ? "Đang lưu…" : u.isApproved ? "Vô hiệu hóa" : "Kích hoạt"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-md)" }}>
                  <span className="t-caption-sm" style={{ color: "var(--color-mute)" }}>
                    Trang {currentPage}/{totalPages}
                  </span>
                  <div style={{ display: "flex", gap: "var(--space-sm)" }}>
                    <button
                      type="button"
                      disabled={currentPage <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="t-caption-sm"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontWeight: 700,
                        color: "var(--color-ink)",
                        background: "none",
                        border: "1px solid var(--color-hairline-strong)",
                        borderRadius: "var(--radius-sm)",
                        padding: "4px 10px",
                        cursor: currentPage <= 1 ? "not-allowed" : "pointer",
                        opacity: currentPage <= 1 ? 0.4 : 1,
                      }}
                    >
                      <ChevronLeft size={14} aria-hidden="true" /> Trước
                    </button>
                    <button
                      type="button"
                      disabled={currentPage >= totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className="t-caption-sm"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontWeight: 700,
                        color: "var(--color-ink)",
                        background: "none",
                        border: "1px solid var(--color-hairline-strong)",
                        borderRadius: "var(--radius-sm)",
                        padding: "4px 10px",
                        cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
                        opacity: currentPage >= totalPages ? 0.4 : 1,
                      }}
                    >
                      Sau <ChevronRight size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {isAdmin && showCreate && (
        <CreateUserModal
          schools={schoolsQuery.data?.data ?? []}
          busy={createMutation.isPending}
          onClose={() => setShowCreate(false)}
          onSubmit={(payload) => createMutation.mutate(payload)}
        />
      )}

      {isAdmin && editUser && (
        <EditUserModal
          user={editUser}
          schools={schoolsQuery.data?.data ?? []}
          busy={editMutation.isPending}
          onClose={() => setEditUser(null)}
          onSubmit={(edits) =>
            editMutation.mutate({ id: editUser.id, user: editUser, edits })
          }
        />
      )}
    </main>
  );
}

// ─── Modal shell ────────────────────────────────────────────────────────────────

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background: "rgba(0,0,0,0.6)",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 440,
          maxHeight: "90vh",
          overflowY: "auto",
          background: "var(--color-canvas)",
          border: "1px solid var(--color-hairline)",
          borderRadius: "var(--radius-sm)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "18px 20px",
            borderBottom: "1px solid var(--color-hairline)",
          }}
        >
          <h2 className="t-heading-sm" style={{ margin: 0 }}>{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-mute)", padding: 4, display: "flex" }}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Shared field bits ──────────────────────────────────────────────────────────

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--color-mute)",
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

const FORM_GAP: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 14 };

function PrimaryButton({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="t-body-sm"
      style={{
        fontWeight: 700,
        background: "var(--color-primary)",
        color: "#fff",
        border: "none",
        borderRadius: "var(--radius-sm)",
        padding: "10px 16px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
}

// ─── Create-user modal ──────────────────────────────────────────────────────────

function CreateUserModal({
  schools,
  busy,
  onClose,
  onSubmit,
}: {
  schools: SchoolModel[];
  busy: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateUserPayload) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [role, setRole] = useState<"student" | "admin">("student");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return setError("Vui lòng nhập email.");
    if (!password) return setError("Vui lòng nhập mật khẩu.");
    if (!fullName.trim()) return setError("Vui lòng nhập họ và tên.");
    if (!schoolId) return setError("Vui lòng chọn trường.");
    setError("");
    onSubmit({
      email: email.trim(),
      password,
      fullName: fullName.trim(),
      schoolId,
      studentCode: studentCode.trim() || null,
      isStudent: role === "student",
      isAdmin: role === "admin",
    });
  }

  return (
    <Modal title="Thêm tài khoản mới" onClose={onClose}>
      <form onSubmit={handleSubmit} style={FORM_GAP} noValidate>
        <Field label="Email">
          <input className="text-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ten@email.com" autoComplete="off" />
        </Field>
        <Field label="Mật khẩu">
          <input className="text-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tối thiểu 8 ký tự" autoComplete="new-password" />
        </Field>
        <Field label="Họ và tên">
          <input className="text-input" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nguyễn Văn A" />
        </Field>
        <Field label="Trường">
          <select className="text-input" value={schoolId} onChange={(e) => setSchoolId(e.target.value)}>
            <option value="">— Chọn trường —</option>
            {schools.map((s) => (
              <option key={s.id} value={s.id}>{s.schoolName}</option>
            ))}
          </select>
        </Field>
        <Field label="Mã số sinh viên (tùy chọn)">
          <input className="text-input" value={studentCode} onChange={(e) => setStudentCode(e.target.value)} placeholder="VD: SE123456" />
        </Field>
        <Field label="Vai trò">
          <select className="text-input" value={role} onChange={(e) => setRole(e.target.value as "student" | "admin")}>
            <option value="student">Sinh viên</option>
            <option value="admin">Admin</option>
          </select>
        </Field>

        {error && <p className="t-caption-sm" style={{ color: "var(--color-error)", margin: 0 }}>{error}</p>}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 4 }}>
          <PrimaryButton disabled={busy}>{busy ? "Đang tạo…" : "Tạo tài khoản"}</PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}

// ─── Edit-user modal ────────────────────────────────────────────────────────────

function EditUserModal({
  user,
  schools,
  busy,
  onClose,
  onSubmit,
}: {
  user: UserSummary;
  schools: SchoolModel[];
  busy: boolean;
  onClose: () => void;
  onSubmit: (edits: { fullName: string; studentCode: string; schoolId: string; isApproved: boolean }) => void;
}) {
  const [fullName, setFullName] = useState(user.fullName ?? "");
  const [studentCode, setStudentCode] = useState(user.studentCode ?? "");
  const [schoolId, setSchoolId] = useState(user.schoolId ?? "");
  const [isApproved, setIsApproved] = useState(user.isApproved);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!fullName.trim()) return setError("Vui lòng nhập họ và tên.");
    setError("");
    onSubmit({ fullName, studentCode, schoolId, isApproved });
  }

  return (
    <Modal title={`Sửa thông tin: ${user.fullName || user.email || ""}`} onClose={onClose}>
      <form onSubmit={handleSubmit} style={FORM_GAP} noValidate>
        <Field label="Email">
          <input className="text-input" value={user.email ?? ""} disabled style={{ opacity: 0.6, cursor: "not-allowed" }} />
        </Field>
        <Field label="Họ và tên">
          <input className="text-input" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nguyễn Văn A" />
        </Field>
        <Field label="Mã số sinh viên">
          <input className="text-input" value={studentCode} onChange={(e) => setStudentCode(e.target.value)} placeholder="VD: SE123456" />
        </Field>
        <Field label="Trường">
          <select className="text-input" value={schoolId} onChange={(e) => setSchoolId(e.target.value)}>
            <option value="">— Chọn trường —</option>
            {schools.map((s) => (
              <option key={s.id} value={s.id}>{s.schoolName}</option>
            ))}
          </select>
        </Field>
        <Field label="Trạng thái">
          <select className="text-input" value={isApproved ? "active" : "disabled"} onChange={(e) => setIsApproved(e.target.value === "active")}>
            <option value="active">Hoạt động</option>
            <option value="disabled">Vô hiệu hóa</option>
          </select>
        </Field>

        {error && <p className="t-caption-sm" style={{ color: "var(--color-error)", margin: 0 }}>{error}</p>}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 4 }}>
          <PrimaryButton disabled={busy}>{busy ? "Đang lưu…" : "Lưu thay đổi"}</PrimaryButton>
        </div>
      </form>
    </Modal>
  );
}
