"use client";

import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { useLogin, useRegister } from "@/hooks/useAuth";
import type { AxiosError } from "axios";
import type { ApiError } from "@/services/api";

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
        required
        style={{ height: 44 }}
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
  });
  const [clientError, setClientError] = useState("");
  const [isSwitching, setIsSwitching] = useState(false);
  const switchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loginMutation = useLogin();
  const registerMutation = useRegister();

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
    loginMutation.mutate(loginForm);
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setClientError("");
    if (registerForm.password !== registerForm.confirmPassword) {
      setClientError("Mật khẩu xác nhận không khớp.");
      return;
    }
    registerMutation.mutate(registerForm);
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
              Software
              <br />
              Project
              <br />
              Platform
            </h1>
            <p className="auth-brand-desc">
              Nền tảng quản lý dự án phần mềm dành cho sinh viên và mentor tại
              FPT University.
            </p>

            <ul className="auth-feature-list">
              {[
                "Quản lý dự án theo nhóm",
                "Theo dõi tiến độ theo thời gian thực",
                "Kết nối sinh viên và mentor",
                "Đánh giá & phản hồi chuyên sâu",
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
