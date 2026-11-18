"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AuthApiError } from "../../lib/auth-api";
import {
  getMedia,
  getMediaById,
  type MediaItem,
  type PageMetadata,
} from "../../lib/media-api";

const PAGE_SIZE = 10;

function displayName(item: MediaItem) {
  return (
    (typeof item.title === "string" && item.title) ||
    (typeof item.name === "string" && item.name) ||
    (item.id != null ? `Media #${item.id}` : "Untitled media")
  );
}

function pickString(item: MediaItem, keys: string[]) {
  for (const key of keys) {
    const value = item[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return "";
}

function getPublishValue(item: MediaItem) {
  const keys = ["publish", "published", "isPublished", "publishedAt", "publishStatus", "status"];
  for (const key of keys) {
    if (!(key in item)) continue;
    const value = item[key];
    if (typeof value === "boolean") return value ? "Published" : "Unpublished";
    if (typeof value === "string" && value.trim()) return value;
    if (typeof value === "number") return String(value);
  }
  return "—";
}

function getUrlValue(item: MediaItem) {
  return (
    pickString(item, ["url", "fileUrl", "streamUrl", "mediaUrl", "videoUrl", "imageUrl", "photoUrl", "src", "link"]) ||
    "—"
  );
}

function isAudio(item: MediaItem, url: string) {
  const type = pickString(item, ["mediaType", "type", "mimeType", "format", "contentType", "fileType"]).toLowerCase();
  if (type.includes("audio")) return true;
  if (type.includes("video") || type.includes("image") || type.includes("photo")) return false;
  return /\.(mp3|wav|ogg|m4a|aac|flac|oga|opus)(\?|#|$)/i.test(url);
}

function isVideo(item: MediaItem, url: string) {
  const type = pickString(item, ["mediaType", "type", "mimeType", "format", "contentType", "fileType"]).toLowerCase();
  if (type.includes("video")) return true;
  if (type.includes("audio") || type.includes("image") || type.includes("photo")) return false;
  return /\.(mp4|webm|ogv|mov|m4v|avi|mkv)(\?|#|$)/i.test(url);
}

function isPhoto(item: MediaItem, url: string) {
  const type = pickString(item, ["mediaType", "type", "mimeType", "format", "contentType", "fileType"]).toLowerCase();
  if (type.includes("image") || type.includes("photo") || type.includes("picture")) return true;
  if (type.includes("video") || type.includes("audio")) return false;
  return /\.(jpg|jpeg|png|gif|webp|bmp|svg|avif)(\?|#|$)/i.test(url);
}

function MediaViewer({
  item,
  loading,
  error,
  onClose,
}: {
  item: MediaItem | null;
  loading: boolean;
  error: string;
  onClose: () => void;
}) {
  const url = item ? getUrlValue(item) : "—";
  const hasUrl = url !== "—";
  const audio = item && hasUrl ? isAudio(item, url) : false;
  const video = item && hasUrl ? isVideo(item, url) : false;
  const photo = item && hasUrl ? isPhoto(item, url) : false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label="Media viewer">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c77c14]">View media</p>
            <h2 className="mt-1 truncate text-lg font-bold text-slate-900">{item ? displayName(item) : "Media"}</h2>
          </div>
          <button className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100" onClick={onClose} type="button">
            Close
          </button>
        </div>

        <div className="p-5">
          {loading ? (
            <p className="py-10 text-center text-sm text-slate-500">Loading media...</p>
          ) : error ? (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</div>
          ) : !item ? (
            <p className="py-10 text-center text-sm text-slate-500">No media selected.</p>
          ) : !hasUrl ? (
            <p className="py-10 text-center text-sm text-slate-600">No media URL available for this entry.</p>
          ) : (
            <div className="space-y-4">
              <div className="overflow-hidden rounded-xl bg-slate-950">
                {video ? (
                  <video className="max-h-[60vh] w-full bg-black" controls playsInline preload="metadata" src={url}>
                    Your browser does not support the video tag.
                  </video>
                ) : audio ? (
                  <div className="flex w-full items-center justify-center bg-slate-900 p-6 sm:p-10">
                    <audio className="w-full max-w-2xl" controls preload="metadata" src={url}>
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ) : photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt={displayName(item)} className="max-h-[60vh] w-full object-contain" src={url} />
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-sm text-slate-300">Preview unavailable for this format. You can open the media URL directly.</p>
                    <a className="mt-3 inline-block font-medium text-[#f4b942] underline break-all" href={url} rel="noreferrer" target="_blank">{url}</a>
                  </div>
                )}
              </div>
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Publish</p>
                  <p className="mt-1 text-slate-900">{getPublishValue(item)}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">URL</p>
                  <a className="mt-1 block break-all text-[#0f2f5f] underline" href={url} rel="noreferrer" target="_blank">{url}</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MediaPage() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [meta, setMeta] = useState<PageMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewItem, setViewItem] = useState<MediaItem | null>(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewError, setViewError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const result = await getMedia({ search, page, size: PAGE_SIZE });
        if (cancelled) return;
        setItems(result.items);
        setMeta(result.page);
      } catch (caughtError) {
        if (cancelled) return;
        setItems([]);
        setMeta(null);
        setError(
          caughtError instanceof AuthApiError
            ? caughtError.message
            : "Unable to load media. Please try again.",
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

  async function openView(id: string | number) {
    setViewerOpen(true);
    setViewItem(null);
    setViewError("");
    setViewLoading(true);
    try {
      const item = await getMediaById(id);
      setViewItem(item);
    } catch (caughtError) {
      setViewError(
        caughtError instanceof AuthApiError
          ? caughtError.message
          : "Unable to load media. Please try again.",
      );
    } finally {
      setViewLoading(false);
    }
  }

  function submitSearch(e: FormEvent<HTMLFormElement>) {
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
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c77c14]">Media</p>
            <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-900 sm:text-3xl">Media</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Browse media entries. Use <strong>View</strong> to load and present a photo, video, or audio file.
            </p>
          </div>
          <form className="flex w-full gap-2 sm:w-auto" onSubmit={submitSearch}>
            <label className="sr-only" htmlFor="media-search">Search media</label>
            <input
              id="media-search"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0f2f5f] focus:ring-4 focus:ring-[#0f2f5f]/10 sm:w-72"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search media"
              type="search"
              value={query}
            />
            <button className="rounded-xl bg-[#0f2f5f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163f7a]" type="submit">
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
                <th className="px-5 py-3.5">Media</th>
                <th className="px-5 py-3.5">Publish</th>
                <th className="px-5 py-3.5">URL</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td className="px-5 py-10 text-center text-slate-500" colSpan={4}>Loading media...</td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td className="px-5 py-10 text-center text-slate-500" colSpan={4}>No media found.</td>
                </tr>
              ) : (
                items.map((item, index) => {
                  const key = item.id != null ? String(item.id) : String(index);
                  const url = getUrlValue(item);
                  return (
                    <tr className="hover:bg-slate-50/70" key={key}>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900">{displayName(item)}</p>
                        <p className="mt-0.5 text-xs text-slate-500">ID: {item.id != null ? String(item.id) : "—"}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-700">{getPublishValue(item)}</td>
                      <td className="max-w-xs px-5 py-4 text-slate-700">
                        {url === "—" ? (
                          <span className="text-slate-400">—</span>
                        ) : (
                          <a className="block truncate text-[#0f2f5f] underline" href={url} rel="noreferrer" target="_blank" title={url}>
                            {url}
                          </a>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          className="rounded-lg bg-[#0f2f5f] px-3.5 py-1.5 text-sm font-semibold text-white transition hover:bg-[#163f7a] disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={item.id == null}
                          onClick={() => item.id != null && openView(item.id)}
                          type="button"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>{meta && meta.totalElements > 0 ? `Showing ${from}–${to} of ${meta.totalElements} items` : "No results"}</p>
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

      {viewerOpen && (
        <MediaViewer
          item={viewItem}
          loading={viewLoading}
          error={viewError}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  );
}
