"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "../components/auth-shell";
import {
  AuthApiError,
  generateOtp,
  type OtpPurpose,
  verifyOtp,
} from "../lib/auth-api";

function getOtpContext() {
  const searchParams = new URLSearchParams(window.location.search);
  const email = searchParams.get("email") ?? "";
  const purpose = searchParams.get("purpose");

  if (
    !email ||
    (purpose !== "REGISTRATION" && purpose !== "PASSWORD_RESET")
  ) {
    throw new AuthApiError("Your verification session is invalid. Please start again.");
  }

  return { email, purpose: purpose as OtpPurpose };
}

export default function OtpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const otp = new FormData(event.currentTarget).getAll("otp").join("");

    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const { email, purpose } = getOtpContext();
      const result = await verifyOtp(email, purpose, otp);

      if (purpose === "PASSWORD_RESET") {
        if (!result.resetToken) {
          throw new AuthApiError(
            "The verification service did not return a password reset token.",
          );
        }

        sessionStorage.setItem("kccn.passwordResetToken", result.resetToken);
        router.push("/reset-password");
        return;
      }

      router.push("/login");
    } catch (caughtError) {
      setError(
        caughtError instanceof AuthApiError
          ? caughtError.message
          : "Unable to verify that code. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const { email, purpose } = getOtpContext();
      await generateOtp(email, purpose);
      setMessage("A new verification code has been sent.");
    } catch (caughtError) {
      setError(
        caughtError instanceof AuthApiError
          ? caughtError.message
          : "Unable to resend the code. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Verify your identity"
      title="Check your inbox."
      description="We sent a six-digit verification code to your email address."
    >
      <form className="mt-9" onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold text-zinc-200">
          Verification code
          <div className="mt-3 grid grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((digit) => (
              <input aria-label={`Verification digit ${digit}`} className="aspect-square min-w-0 rounded-xl border border-white/10 bg-white/[0.06] text-center text-xl font-bold text-white outline-none transition focus:border-[#f4b942] focus:ring-4 focus:ring-[#f4b942]/10" inputMode="numeric" key={digit} maxLength={1} name="otp" pattern="[0-9]" required type="text" />
            ))}
          </div>
        </label>
        {error && <p className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200" role="alert">{error}</p>}
        {message && <p className="mt-5 rounded-xl border border-green-400/30 bg-green-400/10 px-4 py-3 text-sm text-green-200" role="status">{message}</p>}
        <button className="mt-7 w-full rounded-xl bg-[#f4b942] px-5 py-3.5 text-sm font-bold text-[#17120a] transition hover:-translate-y-0.5 hover:bg-[#ffd369] disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting} type="submit">{isSubmitting ? "Verifying..." : "Verify code"}</button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-400">Didn&apos;t receive it? <button className="font-bold text-[#ffd66f] hover:text-[#fff0b7] disabled:opacity-60" disabled={isSubmitting} onClick={handleResend} type="button">Resend code</button></p>
      <p className="mt-4 text-center text-sm text-zinc-400"><a className="font-bold text-[#ffd66f] hover:text-[#fff0b7]" href="/login">Back to sign in</a></p>
    </AuthShell>
  );
}
