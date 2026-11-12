const authApiBaseUrl =
  process.env.NEXT_PUBLIC_AUTH_API_URL ?? "http://localhost:8080";

type ApiErrorPayload = {
  error?: string;
  message?: string;
};

export type OtpPurpose = "REGISTRATION" | "PASSWORD_RESET";

type LoginResponse = {
  accessToken?: string;
  jwt?: string;
  token?: string;
};

type VerifyOtpResponse = {
  resetToken?: string;
};

export class AuthApiError extends Error {}

async function request<T>(path: string, body: Record<string, string>) {
  let response: Response;

  try {
    response = await fetch(`${authApiBaseUrl}${path}`, {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
  } catch {
    throw new AuthApiError(
      "We could not reach the authentication service. Please try again.",
    );
  }

  const payload = (await response.json().catch(() => ({}))) as T & ApiErrorPayload;

  if (!response.ok) {
    throw new AuthApiError(
      payload.message ?? payload.error ?? "Something went wrong. Please try again.",
    );
  }

  return payload;
}

export function register(fullName: string, email: string, password: string) {
  return request("/api/auth/register", { email, fullName, password });
}

export function generateOtp(email: string, purpose: OtpPurpose) {
  return request("/api/auth/otp/generate", { email, purpose });
}

export function verifyOtp(email: string, purpose: OtpPurpose, otp: string) {
  return request<VerifyOtpResponse>("/api/auth/otp/verify", {
    email,
    otp,
    purpose,
  });
}

export async function login(email: string, password: string) {
  const payload = await request<LoginResponse>("/api/auth/login", {
    email,
    password,
  });
  const token = payload.accessToken ?? payload.jwt ?? payload.token;

  if (!token) {
    throw new AuthApiError("The authentication service did not return a token.");
  }

  return token.replace(/^Bearer\s+/i, "");
}

export function resetPassword(resetToken: string, password: string) {
  return request("/api/auth/password/reset", { password, resetToken });
}
