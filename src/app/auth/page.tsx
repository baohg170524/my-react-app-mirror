"use client";

import {
  useState,
  useRef,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { useLogin, useRegister } from "@/hooks/useAuth";
import type { AxiosError } from "axios";
import { schoolsApi } from "@/services/api";
import type { ApiError, SchoolModel } from "@/services/api";

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = "login" | "register";

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  /** Selected school ID (from backend `/Schools`). */
  schoolId: string;
  studentCode: string;
}

// ─── Tiny field component ─────────────────────────────────────────────────────

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--color-mute)",
        }}
      >
        {label}
      </label>
      <input
        className="text-input"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={{ height: 44 }}
      />
    </div>
  );
}

// ─── Field label (shared with select / upload) ────────────────────────────────

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--color-mute)",
      }}
    >
      {children}
    </label>
  );
}

// ─── School select ────────────────────────────────────────────────────────────

function SchoolSelect({
  value,
  onChange,
  schools,
  isLoading,
  isError,
  isEmpty,
  onRetry,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  schools: SchoolModel[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  onRetry: () => void;
}) {
  const placeholder = isLoading
    ? "Đang tải danh sách trường…"
    : isError
      ? "Không tải được danh sách trường"
      : isEmpty
        ? "Chưa có trường nào trong hệ thống"
        : "— Chọn trường —";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <FieldLabel>Trường</FieldLabel>
      <select
        className="auth-select"
        value={value}
        onChange={onChange}
        disabled={isLoading || isError || isEmpty}
        style={{ color: value === "" ? "var(--color-mute)" : "var(--color-ink)" }}
      >
        <option value="" disabled style={{ color: "var(--color-ink)" }}>
          {placeholder}
        </option>
        {schools.map((s) => (
          <option key={s.id} value={s.id} style={{ color: "var(--color-ink)" }}>
            {s.schoolName}
          </option>
        ))}
      </select>
      {(isError || isEmpty) && (
        <div
          style={{
            fontSize: 12,
            color: isError ? "var(--color-error)" : "var(--color-mute)",
            display: "flex",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <span>
            {isError
              ? "Không kết nối được tới máy chủ."
              : "Vui lòng liên hệ admin để được thêm trường."}
          </span>
          {isError && (
            <button
              type="button"
              onClick={onRetry}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "var(--color-primary)",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Thử lại
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Student-card upload (UI only — preview, not submitted) ────────────────────

function CardUpload({
  preview,
  fileName,
  onSelect,
  onClear,
}: {
  preview: string | null;
  fileName: string | null;
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <FieldLabel>Ảnh thẻ sinh viên</FieldLabel>

      {preview ? (
        <div className="auth-upload-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Ảnh thẻ sinh viên" />
          <div className="auth-upload-meta">
            <span className="auth-upload-name">{fileName}</span>
            <button type="button" onClick={onClear} className="auth-upload-remove">
              Xóa
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="auth-upload-drop"
          onClick={() => inputRef.current?.click()}
        >
          <span className="auth-upload-plus">+</span>
          <span>Nhấn để tải ảnh thẻ</span>
          <span className="auth-upload-hint">PNG, JPG · tối đa 5MB</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onSelect}
        style={{ display: "none" }}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    schoolId: "",
    studentCode: "",
  });
  // Student-card image is UI-only (preview), not sent in the register payload.
  const [cardImage, setCardImage] = useState<{
    preview: string;
    name: string;
  } | null>(null);
  const [clientError, setClientError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSwitching, setIsSwitching] = useState(false);
  const switchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const schoolsQuery = useQuery({
    queryKey: ["schools"],
    queryFn: () => schoolsApi.list(),
    staleTime: 5 * 60_000,
  });
  const schools = schoolsQuery.data?.data ?? [];
  const selectedSchool = schools.find((s) => s.id === registerForm.schoolId);
  // Treat any school whose name contains "FPT" as the FPT-University case
  // (no student-card upload required, student code recommended).
  const isFptSchool = !!selectedSchool?.schoolName.toUpperCase().includes("FPT");

  const isPending = loginMutation.isPending || registerMutation.isPending;
  const serverError =
    (loginMutation.error as AxiosError<ApiError>)?.response?.data?.message ||
    (registerMutation.error as AxiosError<ApiError>)?.response?.data?.message;

  const isRegister = mode === "register";

  // ── sliding transform values ───────────────────────────────────────────────
  // The dark (intro) panel starts left and slides right on register mode.
  // The form panel starts right and slides left on register mode.
  // The spine (72 px) sits fixed at 50% and has z-index:20 so panels slide behind it.
  const SPINE = 72;
  const darkTransform = isRegister
    ? `translateX(calc(100% + ${SPINE}px))`
    : "translateX(0)";
  const formTransform = isRegister
    ? `translateX(calc(-100% - ${SPINE}px))`
    : "translateX(0)";
  const EASE = "transform 0.68s cubic-bezier(0.76, 0, 0.24, 1)";

  // ── handlers ──────────────────────────────────────────────────────────────

  function switchMode() {
    if (isSwitching) return;
    setClientError("");
    setSuccessMessage("");
    loginMutation.reset();
    registerMutation.reset();

    setIsSwitching(true);

    // wait one paint for the spinner to appear before swapping form content
    if (switchTimerRef.current) clearTimeout(switchTimerRef.current);
    switchTimerRef.current = setTimeout(() => {
      setMode((m) => (m === "login" ? "register" : "login"));
    }, 100);

    // hide spinner after slide animation completes (680ms) + fade buffer
    setTimeout(() => setIsSwitching(false), 720);
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setClientError("");
    setSuccessMessage("");
    loginMutation.mutate(loginForm);
  }

  // Card upload is required for non-FPT schools (UI-only — not sent yet).
  const needsCard = registerForm.schoolId !== "" && !isFptSchool;

  function handleSchoolChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setRegisterForm((f) => ({ ...f, schoolId: value }));
    const next = schools.find((s) => s.id === value);
    const nextIsFpt = !!next?.schoolName.toUpperCase().includes("FPT");
    if (value === "" || nextIsFpt) setCardImage(null);
  }

  function handleCardSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setClientError("Vui lòng chọn một file ảnh hợp lệ.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setClientError("Ảnh thẻ không được vượt quá 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setClientError("");
      setCardImage({ preview: reader.result as string, name: file.name });
    };
    reader.readAsDataURL(file);
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setClientError("");
    setSuccessMessage("");

    if (!registerForm.phone.trim()) {
      setClientError("Vui lòng nhập số điện thoại.");
      return;
    }
    if (!/^0\d{9}$/.test(registerForm.phone.trim())) {
      setClientError("Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.");
      return;
    }
    if (!registerForm.schoolId) {
      setClientError("Vui lòng chọn trường.");
      return;
    }
    if (needsCard && !cardImage) {
      setClientError("Vui lòng tải ảnh thẻ sinh viên.");
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      setClientError("Mật khẩu xác nhận không khớp.");
      return;
    }

    registerMutation.mutate(
      {
        schoolId: registerForm.schoolId,
        studentCode: registerForm.studentCode.trim() || undefined,
        email: registerForm.email.trim(),
        password: registerForm.password,
        fullName: registerForm.fullName.trim(),
        isStudent: true,
      },
      {
        onSuccess: () => {
          // Backend returns the user but no tokens — prompt user to log in.
          setSuccessMessage(
            "Đăng ký thành công. Vui lòng đăng nhập để tiếp tục.",
          );
          setLoginForm({
            email: registerForm.email.trim(),
            password: "",
          });
          setRegisterForm({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            schoolId: "",
            studentCode: "",
          });
          setCardImage(null);
          setMode("login");
        },
      },
    );
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── scoped styles ──────────────────────────────────────────────────── */}
      <style>{`
        .auth-root {
          position: fixed;
          inset: 0;
          overflow: hidden;
          background: var(--color-surface-dark);
          font-family: var(--font-sans);
        }

        /* ── dark intro panel ─────────────────────────────────────────────── */
        .auth-dark {
          position: absolute;
          top: 0;
          left: 0;
          width: calc(50% - ${SPINE / 2}px);
          height: 100%;
          background: var(--color-surface-dark);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 64px 56px;
          z-index: 15;
          transition: ${EASE};
          overflow: hidden;
        }

        /* subtle dot-grid background on dark panel */
        .auth-dark::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(
            circle,
            rgba(118, 185, 0, 0.12) 1px,
            transparent 1px
          );
          background-size: 28px 28px;
          pointer-events: none;
        }

        /* ── corner squares ───────────────────────────────────────────────── */
        .auth-cs-tl {
          position: absolute;
          top: 0;
          left: 0;
          width: 14px;
          height: 14px;
          background: var(--color-primary);
          z-index: 1;
        }
        .auth-cs-br {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 14px;
          height: 14px;
          background: var(--color-primary);
          z-index: 1;
        }

        /* ── spine ────────────────────────────────────────────────────────── */
        .auth-spine {
          position: absolute;
          top: 0;
          left: calc(50% - ${SPINE / 2}px);
          width: ${SPINE}px;
          height: 100%;
          background: var(--color-surface-elevated);
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-left: 1px solid var(--color-hairline-strong);
          border-right: 1px solid var(--color-hairline-strong);
        }

        .auth-spine-line {
          width: 1px;
          flex: 1;
          background: var(--color-hairline-strong);
        }

        .auth-spine-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          border: none;
          background: transparent;
          padding: 16px 0;
        }

        .auth-spine-arrow {
          width: 36px;
          height: 36px;
          border-radius: 2px;
          background: var(--color-primary);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          transition: background 80ms linear;
        }
        .auth-spine-btn:hover .auth-spine-arrow {
          background: var(--color-primary-dark);
        }

        .auth-spine-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-on-dark-mute);
          writing-mode: vertical-rl;
        }

        /* ── form panel ───────────────────────────────────────────────────── */
        .auth-form-panel {
          position: absolute;
          top: 0;
          right: 0;
          width: calc(50% - ${SPINE / 2}px);
          height: 100%;
          background: var(--color-canvas);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: ${EASE};
        }

        /* ── switching spinner overlay ────────────────────────────────────── */
        .auth-spinner-overlay {
          position: absolute;
          inset: 0;
          background: var(--color-canvas);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
          opacity: 0;
          pointer-events: none;
          transition: opacity 120ms ease;
        }
        .auth-spinner-overlay.is-active {
          opacity: 1;
          pointer-events: auto;
        }
        .auth-spinner {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 2px solid var(--color-hairline);
          border-top-color: var(--color-primary);
          animation: auth-spin 0.55s linear infinite;
        }
        @keyframes auth-spin {
          to { transform: rotate(360deg); }
        }

        .auth-form-inner {
          width: 100%;
          max-width: 380px;
          padding: 0 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* ── brand on dark panel ──────────────────────────────────────────── */
        .auth-brand-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 4px;
        }

        .auth-brand-name {
          font-size: 32px;
          font-weight: 700;
          line-height: 1.15;
          color: var(--color-on-dark);
          margin: 0 0 16px 0;
        }

        .auth-brand-desc {
          font-size: 15px;
          font-weight: 400;
          line-height: 1.65;
          color: var(--color-on-dark-mute);
          margin: 0;
          max-width: 320px;
        }

        .auth-feature-list {
          list-style: none;
          padding: 0;
          margin: 24px 0 0 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .auth-feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 400;
          color: var(--color-on-dark-mute);
        }

        .auth-feature-dot {
          width: 6px;
          height: 6px;
          background: var(--color-primary);
          border-radius: 0;
          flex-shrink: 0;
        }

        /* ── form heading ─────────────────────────────────────────────────── */
        .auth-form-heading {
          font-size: 32px;
          font-weight: 700;
          line-height: 1.2;
          color: var(--color-ink);
          margin: 0;
        }

        .auth-form-sub {
          font-size: 14px;
          color: var(--color-mute);
          margin: 2px 0 0 0;
        }

        /* ── error ────────────────────────────────────────────────────────── */
        .auth-error {
          font-size: 13px;
          color: var(--color-error);
          padding: 10px 12px;
          background: rgba(229, 32, 32, 0.06);
          border-left: 2px solid var(--color-error);
          border-radius: 0;
        }

        /* ── submit button override ───────────────────────────────────────── */
        .auth-submit {
          width: 100%;
          height: 44px;
          background: var(--color-primary);
          color: #fff;
          border: none;
          border-radius: 2px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 80ms linear;
          margin-top: 4px;
        }
        .auth-submit:hover:not(:disabled) {
          background: var(--color-primary-dark);
        }
        .auth-submit:disabled {
          background: var(--color-surface-soft);
          color: var(--color-ash);
          cursor: not-allowed;
        }

        /* ── form content fade when mode changes ──────────────────────────── */
        .auth-form-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* ── school select ────────────────────────────────────────────────── */
        .auth-select {
          box-sizing: border-box;
          height: 44px;
          width: 100%;
          padding: 0 36px 0 12px;
          font-size: 14px;
          font-family: inherit;
          color: var(--color-ink);
          background-color: var(--color-canvas);
          border: var(--border-hairline);
          border-radius: 2px;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.6' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
        }
        .auth-select:focus {
          outline: none;
          border: var(--border-primary-2);
          padding: 0 35px 0 11px;
        }

        /* ── student-card upload ──────────────────────────────────────────── */
        .auth-upload-drop {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          width: 100%;
          padding: 20px 12px;
          background: var(--color-canvas);
          border: 1px dashed var(--color-hairline-strong);
          border-radius: 2px;
          cursor: pointer;
          font-size: 13px;
          color: var(--color-mute);
          transition: border-color 80ms linear, background 80ms linear;
        }
        .auth-upload-drop:hover {
          border-color: var(--color-primary);
          background: rgba(118, 185, 0, 0.04);
        }
        .auth-upload-plus {
          font-size: 22px;
          font-weight: 700;
          color: var(--color-primary);
          line-height: 1;
        }
        .auth-upload-hint {
          font-size: 11px;
          color: var(--color-ash);
        }
        .auth-upload-preview {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 8px;
          border: 1px solid var(--color-hairline-strong);
          border-radius: 2px;
          background: var(--color-canvas);
        }
        .auth-upload-preview img {
          width: 100%;
          max-height: 180px;
          object-fit: contain;
          border-radius: 2px;
          background: var(--color-surface-soft);
        }
        .auth-upload-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .auth-upload-name {
          font-size: 12px;
          color: var(--color-mute);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .auth-upload-remove {
          flex-shrink: 0;
          background: none;
          border: none;
          padding: 0;
          font-size: 12px;
          font-weight: 700;
          color: var(--color-error);
          cursor: pointer;
        }

        /* ── responsive ───────────────────────────────────────────────────── */
        @media (max-width: 768px) {
          .auth-dark { display: none; }
          .auth-spine { display: none; }
          .auth-form-panel {
            width: 100% !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="auth-root">
        {/* ── Dark intro panel ───────────────────────────────────────────── */}
        <div className="auth-dark" style={{ transform: darkTransform }}>
          <div className="auth-cs-tl" />
          <div className="auth-cs-br" />

          <div style={{ position: "relative", zIndex: 1 }}>
            <p className="auth-brand-tag">SWP SE1907</p>
            <h1 className="auth-brand-name">
              HACKATHON
              <br />
              FPT UNIVERSITY
            </h1>
            <p className="auth-brand-desc">
              Nền tảng quản lý cuộc thi hackathon
            </p>

            <ul className="auth-feature-list">
              {[
                "Quản lý cuộc thi",
                "Theo dõi tiến độ theo thời gian thực",
                "Giao diện trực quan, dễ sử dụng",
                "Tối ưu trải nghiệm thi đấu",
              ].map((f) => (
                <li key={f} className="auth-feature-item">
                  <span className="auth-feature-dot" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Center spine ───────────────────────────────────────────────── */}
        <div className="auth-spine">
          <div className="auth-spine-line" />

          <button
            className="auth-spine-btn"
            onClick={switchMode}
            aria-label={isRegister ? "Chuyển sang đăng nhập" : "Chuyển sang đăng ký"}
          >
            <div className="auth-spine-arrow">
              {isRegister ? "«" : "»"}
            </div>
            <span className="auth-spine-label">
              {isRegister ? "Đăng nhập" : "Đăng kí"}
            </span>
          </button>

          <div className="auth-spine-line" />
        </div>

        {/* ── Form panel ─────────────────────────────────────────────────── */}
        <div className="auth-form-panel" style={{ transform: formTransform }}>
          {/* spinner masks form content during panel slide */}
          <div className={`auth-spinner-overlay${isSwitching ? " is-active" : ""}`}>
            <div className="auth-spinner" />
          </div>

          <div className="auth-form-inner">
            {/* heading */}
            <div>
              <h2 className="auth-form-heading">
                {isRegister ? "Đăng ký" : "Đăng nhập"}
              </h2>
              <p className="auth-form-sub">
                {isRegister
                  ? "Tạo tài khoản mới để bắt đầu"
                  : "Chào mừng trở lại"}
              </p>
            </div>

            {/* error */}
            {(clientError || serverError) && (
              <div className="auth-error">{clientError || serverError}</div>
            )}
            {successMessage && !clientError && !serverError && (
              <div
                className="auth-error"
                style={{
                  color: "var(--color-successDeep, #3f8500)",
                  background: "rgba(118, 185, 0, 0.08)",
                  borderLeftColor: "var(--color-primary)",
                }}
              >
                {successMessage}
              </div>
            )}

            {/* ── Login form ─────────────────────────────────────────────── */}
            {!isRegister && (
              <form
                className="auth-form-content"
                onSubmit={handleLogin}
                noValidate
              >
                <Field
                  label="Email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="ten@email.com"
                  autoComplete="email"
                />
                <Field
                  label="Mật khẩu"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm((f) => ({ ...f, password: e.target.value }))
                  }
                  placeholder="••••••••"
                  autoComplete="current-password"
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: -8,
                  }}
                >
                  <a
                    href="/auth/forgot-password"
                    style={{
                      fontSize: 13,
                      color: "var(--color-primary)",
                      textDecoration: "none",
                    }}
                  >
                    Quên mật khẩu?
                  </a>
                </div>

                <button
                  type="submit"
                  className="auth-submit"
                  disabled={isPending}
                >
                  {loginMutation.isPending ? "Đang đăng nhập…" : "Đăng nhập"}
                </button>
              </form>
            )}

            {/* ── Register form ──────────────────────────────────────────── */}
            {isRegister && (
              <form
                className="auth-form-content"
                onSubmit={handleRegister}
                noValidate
              >
                <Field
                  label="Họ và tên"
                  value={registerForm.fullName}
                  onChange={(e) =>
                    setRegisterForm((f) => ({ ...f, fullName: e.target.value }))
                  }
                  placeholder="Nguyễn Văn A"
                  autoComplete="name"
                />
                <Field
                  label="Email"
                  type="email"
                  value={registerForm.email}
                  onChange={(e) =>
                    setRegisterForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="ten@email.com"
                  autoComplete="email"
                />
                <Field
                  label="Số điện thoại"
                  type="tel"
                  value={registerForm.phone}
                  onChange={(e) =>
                    setRegisterForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  placeholder="09xxxxxxxx"
                  autoComplete="tel"
                />

                <SchoolSelect
                  value={registerForm.schoolId}
                  onChange={handleSchoolChange}
                  schools={schools}
                  isLoading={schoolsQuery.isLoading}
                  isError={schoolsQuery.isError}
                  isEmpty={
                    !schoolsQuery.isLoading &&
                    !schoolsQuery.isError &&
                    schools.length === 0
                  }
                  onRetry={() => schoolsQuery.refetch()}
                />

                {/* Optional student code — most relevant for FPT students. */}
                {registerForm.schoolId !== "" && (
                  <Field
                    label={
                      isFptSchool
                        ? "Mã số sinh viên (FPT)"
                        : "Mã số sinh viên (tùy chọn)"
                    }
                    value={registerForm.studentCode}
                    onChange={(e) =>
                      setRegisterForm((f) => ({
                        ...f,
                        studentCode: e.target.value,
                      }))
                    }
                    placeholder="VD: SE123456"
                  />
                )}

                {/* Non-FPT schools must upload a student-card photo (UI-only). */}
                {needsCard && (
                  <CardUpload
                    preview={cardImage?.preview ?? null}
                    fileName={cardImage?.name ?? null}
                    onSelect={handleCardSelect}
                    onClear={() => setCardImage(null)}
                  />
                )}

                <Field
                  label="Mật khẩu"
                  type="password"
                  value={registerForm.password}
                  onChange={(e) =>
                    setRegisterForm((f) => ({
                      ...f,
                      password: e.target.value,
                    }))
                  }
                  placeholder="Tối thiểu 8 ký tự"
                  autoComplete="new-password"
                />
                <Field
                  label="Xác nhận mật khẩu"
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={(e) =>
                    setRegisterForm((f) => ({
                      ...f,
                      confirmPassword: e.target.value,
                    }))
                  }
                  placeholder="Nhập lại mật khẩu"
                  autoComplete="new-password"
                />

                <button
                  type="submit"
                  className="auth-submit"
                  disabled={isPending}
                >
                  {registerMutation.isPending ? "Đang đăng ký…" : "Tạo tài khoản"}
                </button>
              </form>
            )}

            {/* mobile fallback switch */}
            <p
              style={{
                fontSize: 13,
                color: "var(--color-mute)",
                textAlign: "center",
                display: "none",
              }}
              className="mobile-switch"
            >
              {isRegister ? "Đã có tài khoản? " : "Chưa có tài khoản? "}
              <button
                onClick={switchMode}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-primary)",
                  cursor: "pointer",
                  fontWeight: 700,
                  padding: 0,
                  fontSize: "inherit",
                }}
              >
                {isRegister ? "Đăng nhập" : "Đăng ký"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* show mobile switch link only on small screens */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-switch { display: block !important; }
        }
      `}</style>
    </>
  );
}
