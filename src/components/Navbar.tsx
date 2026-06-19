"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useCurrentUser, useIsAuthenticated, useLogout } from "@/hooks/useAuth";

type NavLink = { label: string; href: string };

const ADMIN_LINKS: NavLink[] = [
  { label: "Sự kiện",    href: "/" },
  { label: "Tiêu chí",  href: "/criteria" },
  { label: "Chấm điểm", href: "/scoring" },
  { label: "Xếp hạng",  href: "/leaderboard" },
  { label: "Bài nộp",   href: "/submission" },
  { label: "Phúc khảo", href: "/appeals" },
  { label: "Phê duyệt", href: "/approval" },
];

const MENTOR_LINKS: NavLink[] = [
  { label: "Sự kiện",    href: "/" },
  { label: "Chấm điểm", href: "/scoring" },
  { label: "Xếp hạng",  href: "/leaderboard" },
  { label: "Bài nộp",   href: "/submission" },
  { label: "Phúc khảo", href: "/appeals" },
];

const STUDENT_LINKS: NavLink[] = [
  { label: "Sự kiện",    href: "/" },
  { label: "Xếp hạng",  href: "/team-ranking" },
  { label: "Nộp bài",   href: "/submit-project" },
  { label: "Phúc khảo", href: "/team-appeal" },
  { label: "Đăng ký",   href: "/dang-ky" },
];

const GUEST_LINKS: NavLink[] = [
  { label: "Sự kiện", href: "/" },
];

export function Navbar() {
  const pathname = usePathname();
  const isAuthenticated = useIsAuthenticated();
  const { data: user } = useCurrentUser();
  const logout = useLogout();

  // Focus main on route change for keyboard/a11y
  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main");
    if (main) main.focus();
  }, [pathname]);

  const links: NavLink[] =
    !isAuthenticated          ? GUEST_LINKS   :
    user?.role === "ADMIN"    ? ADMIN_LINKS   :
    user?.role === "MENTOR"   ? MENTOR_LINKS  :
    user?.role === "STUDENT"  ? STUDENT_LINKS :
    GUEST_LINKS;

  return (
    <header>
      <nav
        className="primary-nav sticky-chrome"
        style={{ position: "sticky", top: 0, zIndex: 30 }}
      >
        <Link
          href="/"
          className="primary-nav__brand"
          style={{ fontSize: "var(--fs-heading-sm)", textDecoration: "none" }}
        >
          SWP<span style={{ color: "var(--color-primary)" }}>·</span>SE1907
        </Link>

        <ul className="primary-nav__links">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                style={{
                  color:
                    pathname === href
                      ? "var(--color-primary)"
                      : "var(--color-on-dark)",
                  fontWeight: pathname === href ? 700 : 400,
                  fontSize: "var(--fs-body-md)",
                  textDecoration: "none",
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="primary-nav__cluster">
          {isAuthenticated ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {user?.fullName && (
                <span
                  style={{
                    fontSize: "var(--fs-body-sm)",
                    color: "var(--color-on-dark-mute)",
                  }}
                >
                  {user.fullName}
                </span>
              )}
              <button
                type="button"
                onClick={() => logout.mutate()}
                disabled={logout.isPending}
                className="btn btn-outline-on-dark btn-sm"
              >
                {logout.isPending ? "Đang đăng xuất…" : "Đăng xuất"}
              </button>
            </div>
          ) : (
            <Link href="/auth" className="btn btn-outline-on-dark btn-sm">
              Đăng nhập
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
