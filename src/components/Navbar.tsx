"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useIsAuthenticated, useLogout } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { getNavLinksFor } from "@/lib/nav/getNavLinksFor";

export function Navbar() {
  const pathname = usePathname();
  const isAuthenticated = useIsAuthenticated();
  const logout = useLogout();
  const role = useUserRole();
  const links = getNavLinksFor(role);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main");
    if (main) main.focus({ preventScroll: true });
  }, [pathname]);

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
                  color: pathname === href ? "var(--color-primary)" : "var(--color-on-dark)",
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
            <button
              type="button"
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
              className="btn btn-outline-on-dark btn-sm"
            >
              {logout.isPending ? "Đang đăng xuất…" : "Đăng xuất"}
            </button>
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
