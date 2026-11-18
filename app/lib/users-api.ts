import { AuthApiError } from "./auth-api";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_AUTH_API_URL ?? "http://localhost:8080";

export type UserDetails = {
  id: number | string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  roles: string[];
};

export type PageMetadata = {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
};

export type HalLinks = {
  self?: { href: string };
  first?: { href: string };
  last?: { href: string };
  next?: { href: string };
  prev?: { href: string };
  [key: string]: { href: string } | undefined;
};

export type UsersPageResponse = {
  _embedded?: Record<string, UserDetails[]>;
  _links?: HalLinks;
  page?: PageMetadata;
};

export type GetUsersParams = {
  search?: string;
  page?: number;
  size?: number;
  limit?: number;
};

export type UsersResult = {
  users: UserDetails[];
  page: PageMetadata;
  links: HalLinks;
};

type ApiErrorPayload = {
  error?: string;
  message?: string;
};

function extractUsers(data: UsersPageResponse): UserDetails[] {
  const embedded = data._embedded;
  if (!embedded) return [];

  const preferredKeys = ["users", "userDetailsList", "userDtoList", "userList"];
  for (const key of preferredKeys) {
    const value = embedded[key];
    if (Array.isArray(value)) return value;
  }

  for (const value of Object.values(embedded)) {
    if (Array.isArray(value)) return value as UserDetails[];
  }

  return [];
}

export async function getUsers(
  params: GetUsersParams = {},
  accessToken?: string,
): Promise<UsersResult> {
  const token = accessToken ?? sessionStorage.getItem("kccn.authToken") ?? "";
  if (!token) {
    throw new AuthApiError("You are not signed in. Please sign in again.");
  }

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
  const url = `${apiBaseUrl}/api/users${query ? `?${query}` : ""}`;

  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
  } catch {
    throw new AuthApiError("We could not reach the users service. Please try again.");
  }

  const payload = (await response.json().catch(() => ({}))) as
    | UsersPageResponse
    | ApiErrorPayload;

  if (!response.ok) {
    const err = payload as ApiErrorPayload;
    throw new AuthApiError(
      err.message ?? err.error ?? "Unable to load users. Please try again.",
    );
  }

  const data = payload as UsersPageResponse;
  const users = extractUsers(data);
  const page = data.page ?? {
    size: users.length,
    totalElements: users.length,
    totalPages: 1,
    number: 0,
  };

  return {
    users,
    page,
    links: data._links ?? {},
  };
}
