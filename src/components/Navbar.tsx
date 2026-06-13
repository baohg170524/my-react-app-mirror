"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();

  // Focus main on route change for keyboard/a11y
  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main");
    if (main) main.focus();
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
          {[
            { label: "Trang chủ", href: "/" },
            { label: "Sự kiện", href: "/events" },
            { label: "Dự án", href: "/projects" },
          ].map(({ label, href }) => (
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
          <Link href="/account" className="btn btn-outline-on-dark btn-sm">
            Tài khoản
          </Link>
        </div>
      </nav>
    </header>
  );
}
