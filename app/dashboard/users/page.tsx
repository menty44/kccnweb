"use client";

import { useEffect, useState } from "react";
import { AuthApiError } from "../../lib/auth-api";
import { getUsers, type UserDetails, type PageMetadata } from "../../lib/users-api";

const PAGE_SIZE = 20;

function Badge({ children, tone = "slate" }: { children: string; tone?: "slate" | "green" | "amber" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700",
    green: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-800",
  } as const;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export default function UsersPage() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [meta, setMeta] = useState<PageMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const result = await getUsers({ search, page, size: PAGE_SIZE });
        if (cancelled) return;
        setUsers(result.users);
        setMeta(result.page);
      } catch (caughtError) {
        if (cancelled) return;
        setUsers([]);
        setMeta(null);
        setError(
          caughtError instanceof AuthApiError
            ? caughtError.message
            : "Unable to load users. Please try again.",
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [search, page]);

  function submitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPage(0);
    setSearch(query.trim());
  }

  const totalPages = meta?.totalPages ?? 0;
  const canPrev = page > 0;
  const canNext = meta ? page < meta.totalPages - 1 : false;
  const from = meta && meta.totalElements > 0 ? meta.number * meta.size + 1 : 0;
  const to = meta ? Math.min((meta.number + 1) * meta.size, meta.totalElements) : 0;

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c77c14]">Users</p>
            <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-900 sm:text-3xl">Users</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Browse and search registered users. Results are ordered by newest first.
            </p>
          </div>
          <form className="flex w-full gap-2 sm:w-auto" onSubmit={submitSearch}>
            <label className="sr-only" htmlFor="user-search">Search users</label>
            <input
              id="user-search"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0f2f5f] focus:ring-4 focus:ring-[#0f2f5f]/10 sm:w-72"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or email"
              type="search"
              value={query}
            />
            <button
              className="rounded-xl bg-[#0f2f5f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163f7a]"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {error && (
          <div className="border-b border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700" role="alert">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3.5">User</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Roles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td className="px-5 py-10 text-center text-slate-500" colSpan={4}>
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td className="px-5 py-10 text-center text-slate-500" colSpan={4}>
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr className="hover:bg-slate-50/70" key={String(user.id)}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e8eef8] text-xs font-bold text-[#0f2f5f]">
                          {(user.fullName || user.email || "U").charAt(0).toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-900">{user.fullName || "—"}</p>
                          <p className="text-xs text-slate-500">ID: {String(user.id)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-700">{user.email}</td>
                    <td className="px-5 py-4">
                      <Badge tone={user.emailVerified ? "green" : "amber"}>
                        {user.emailVerified ? "Verified" : "Unverified"}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {user.roles?.length ? (
                          user.roles.map((role) => <Badge key={role}>{role}</Badge>)
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {meta && meta.totalElements > 0
              ? `Showing ${from}–${to} of ${meta.totalElements} users`
              : "No results"}
          </p>
          <div className="flex items-center gap-2">
            <button
              className="rounded-lg border border-slate-300 px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!canPrev || loading}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              type="button"
            >
              Previous
            </button>
            <span className="min-w-[7rem] text-center text-xs font-medium text-slate-500">
              Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
            </span>
            <button
              className="rounded-lg border border-slate-300 px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!canNext || loading}
              onClick={() => setPage((p) => p + 1)}
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
