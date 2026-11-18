import { AuthApiError } from "./auth-api";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_AUTH_API_URL ?? "http://localhost:8080";

export type HalLink = { href: string; templated?: boolean; type?: string };

export type HalLinks = {
  self?: HalLink;
  first?: HalLink;
  last?: HalLink;
  next?: HalLink;
  prev?: HalLink;
  [key: string]: HalLink | undefined;
};

export type PageMetadata = {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
};

export type MediaItem = {
  id?: number | string;
  title?: string;
  name?: string;
  description?: string;
  type?: string;
  mediaType?: string;
  url?: string;
  fileUrl?: string;
  streamUrl?: string;
  thumbnailUrl?: string;
  status?: string;
  duration?: number | string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  _links?: HalLinks;
  [key: string]: unknown;
};

export type MediaPageResponse = {
  _embedded?: Record<string, MediaItem[]>;
  _links?: HalLinks;
  page?: PageMetadata;
};

export type GetMediaParams = {
  search?: string;
  page?: number;
  size?: number;
  limit?: number;
};

export type MediaListResult = {
  items: MediaItem[];
  page: PageMetadata;
  links: HalLinks;
};

type ApiErrorPayload = {
  error?: string;
  message?: string;
};

function authHeader(accessToken?: string) {
  const token = accessToken ?? sessionStorage.getItem("kccn.authToken") ?? "";
  if (!token) {
    throw new AuthApiError("You are not signed in. Please sign in again.");
  }
  return { Accept: "application/json", Authorization: `Bearer ${token}` };
}

function extractMediaItems(data: MediaPageResponse): MediaItem[] {
  const embedded = data._embedded;
  if (!embedded) return [];

  const preferredKeys = ["media", "mediaList", "mediaItems", "items", "content"];
  for (const key of preferredKeys) {
    const value = embedded[key];
    if (Array.isArray(value)) return value as MediaItem[];
  }

  for (const value of Object.values(embedded)) {
    if (Array.isArray(value)) return value as MediaItem[];
  }

  return [];
}

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json().catch(() => ({}))) as T & ApiErrorPayload;
  if (!response.ok) {
    const err = payload as ApiErrorPayload;
    throw new AuthApiError(
      err.message ?? err.error ?? "Request failed. Please try again.",
    );
  }
  return payload as T;
}

export async function getMedia(
  params: GetMediaParams = {},
  accessToken?: string,
): Promise<MediaListResult> {
  const searchParams = new URLSearchParams();
  if (params.search && params.search.trim()) {
    searchParams.set("search", params.search.trim());
  }
  if (typeof params.page === "number") {
    searchParams.set("page", String(Math.max(0, params.page)));
  }
  if (typeof params.size === "number") {
    searchParams.set("size", String(params.size));
  } else if (typeof params.limit === "number") {
    searchParams.set("limit", String(params.limit));
  }

  const query = searchParams.toString();
  const url = `${apiBaseUrl}/api/admin/media${query ? `?${query}` : ""}`;

  let response: Response;
  try {
    response = await fetch(url, {
      headers: authHeader(accessToken),
      method: "GET",
    });
  } catch {
    throw new AuthApiError("We could not reach the media service. Please try again.");
  }

  const data = await parseResponse<MediaPageResponse>(response);
  const items = extractMediaItems(data);
  const page = data.page ?? {
    size: items.length,
    totalElements: items.length,
    totalPages: 1,
    number: 0,
  };

  return {
    items,
    page,
    links: data._links ?? {},
  };
}

export async function getMediaById(
  id: string | number,
  accessToken?: string,
): Promise<MediaItem> {
  const encodedId = encodeURIComponent(String(id));
  const url = `${apiBaseUrl}/api/admin/media/${encodedId}`;

  let response: Response;
  try {
    response = await fetch(url, {
      headers: authHeader(accessToken),
      method: "GET",
    });
  } catch {
    throw new AuthApiError("We could not reach the media service. Please try again.");
  }

  return parseResponse<MediaItem>(response);
}
