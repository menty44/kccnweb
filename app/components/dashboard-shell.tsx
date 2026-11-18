"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

type NavItem = {
  href?: string;
  label: string;
  icon: ReactNode;
  action?: "logout";
};

function IconHome() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" />
    </svg>
  );
}

function IconMedia() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 9l5 3-5 3V9Z" fill="currentColor" stroke="none" />
      <path strokeLinecap="round" d="M7 20h10" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconVolunteers() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10Z" />
    </svg>
  );
}

function IconDonations() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M17 7.5c0-1.38-2.24-2.5-5-2.5S7 6.12 7 7.5 9.24 10 12 10s5 1.12 5 2.5S14.76 15 12 15s-5-1.12-5-2.5" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.83 2.83l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.92V20a2 2 0 0 1-4 0v-.15a1 1 0 0 0-.67-.92 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.83-2.83l.1-.1A1 1 0 0 0 6.6 15a1 1 0 0 0-.92-.6H5.5a2 2 0 0 1 0-4h.15a1 1 0 0 0 .92-.67 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.83-2.83l.1.1A1 1 0 0 0 10.6 6a1 1 0 0 0 .6-.92V4.93a2 2 0 0 1 4 0v.15a1 1 0 0 0 .6.92 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.83 2.83l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .92.6h.15a2 2 0 0 1 0 4h-.15a1 1 0 0 0-.92.67Z" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function IconCollapse() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: <IconHome /> },
  { href: "/dashboard/media", label: "Media", icon: <IconMedia /> },
  { href: "/dashboard/users", label: "Users", icon: <IconUsers /> },
  { href: "/dashboard/volunteers", label: "Volunteers", icon: <IconVolunteers /> },
  { href: "/dashboard/donations", label: "Donations", icon: <IconDonations /> },
  { href: "/dashboard/settings", label: "Settings", icon: <IconSettings /> },
  { label: "Logout", icon: <IconLogout />, action: "logout" },
];

export default function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("kccn.authToken");
    if (!token) {
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [router]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function logout() {
    sessionStorage.removeItem("kccn.authToken");
    setProfileOpen(false);
    setMobileOpen(false);
    router.push("/login");
  }

  function isActive(href?: string) {
    if (!href) return false;
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const navContent = (
    <div className="flex h-full flex-col">
      <div className={`flex items-center gap-3 border-b border-slate-200 px-4 py-4 ${collapsed ? "justify-center" : ""}`}>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0f2f5f] text-sm font-black text-[#f7c969]">K</span>
        {!collapsed && <span className="text-sm font-bold tracking-[0.14em] text-slate-900">Kratos</span>}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const base =
            "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition";
          const state = active
            ? "bg-[#0f2f5f] text-white shadow-sm"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900";

          if (item.action === "logout") {
            return (
              <button
                key={item.label}
                className={`${base} ${state} ${collapsed ? "justify-center px-0" : ""}`}
                onClick={logout}
                title={collapsed ? item.label : undefined}
                type="button"
              >
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              className={`${base} ${state} ${collapsed ? "justify-center px-0" : ""}`}
              href={item.href!}
              title={collapsed ? item.label : undefined}
            >
              <span className="shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="hidden border-t border-slate-200 p-2 lg:block">
        <button
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 ${collapsed ? "justify-center px-0" : ""}`}
          onClick={() => setCollapsed((value) => !value)}
          type="button"
        >
          <span className={`shrink-0 transition-transform ${collapsed ? "rotate-180" : ""}`}>
            <IconCollapse />
          </span>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  );

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 text-sm font-medium text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        {/* Mobile overlay */}
        <div
          aria-hidden="true"
          className={`fixed inset-0 z-30 bg-slate-900/40 transition-opacity lg:hidden ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-200 bg-white shadow-sm transition-all duration-200 lg:static lg:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          } ${collapsed ? "lg:w-20" : "lg:w-64"} w-64`}
        >
          {navContent}
        </aside>

        {/* Main area */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
            <div className="flex items-center gap-3">
              <button
                aria-label="Open menu"
                className="grid h-10 w-10 place-items-center rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
                onClick={() => setMobileOpen(true)}
                type="button"
              >
                <IconMenu />
              </button>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#c77c14]">Dashboard</p>
                <p className="text-sm font-bold text-slate-900">Kratos Admin</p>
              </div>
            </div>

            <div className="relative" ref={profileRef}>
              <button
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                onClick={() => setProfileOpen((open) => !open)}
                type="button"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#f4b942] to-[#d98d1f] text-xs font-bold text-[#17120a]">
                  U
                </span>
                <span className="hidden sm:block">Account</span>
                <IconChevronDown />
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg"
                  role="menu"
                >
                  <Link
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    href="/dashboard/profile"
                    onClick={() => setProfileOpen(false)}
                    role="menuitem"
                  >
                    Profile
                  </Link>
                  <Link
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    href="/dashboard/settings"
                    onClick={() => setProfileOpen(false)}
                    role="menuitem"
                  >
                    Settings
                  </Link>
                  <div className="my-1 h-px bg-slate-100" />
                  <button
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                    onClick={logout}
                    role="menuitem"
                    type="button"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
