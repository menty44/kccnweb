"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "../components/auth-shell";
import { AuthApiError, generateOtp } from "../lib/auth-api";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "");

    setError("");
    setIsSubmitting(true);

    try {
      await generateOtp(email, "PASSWORD_RESET");
      router.push(`/otp?email=${encodeURIComponent(email)}&purpose=PASSWORD_RESET`);
    } catch (caughtError) {
      setError(
        caughtError instanceof AuthApiError
          ? caughtError.message
          : "Unable to send a verification code. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Password recovery"
      title="Let's get you back in."
      description="Enter the email linked to your account and we will send a verification code."
    >
      <form className="mt-9 space-y-5" onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold text-zinc-200">
          Email address
          <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#f4b942] focus:ring-4 focus:ring-[#f4b942]/10" name="email" placeholder="you@example.com" required type="email" />
        </label>
        {error && <p className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200" role="alert">{error}</p>}
        <button className="w-full rounded-xl bg-[#f4b942] px-5 py-3.5 text-sm font-bold text-[#17120a] transition hover:-translate-y-0.5 hover:bg-[#ffd369] disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting} type="submit">{isSubmitting ? "Sending code..." : "Send verification code"}</button>
      </form>
      <p className="mt-8 text-center text-sm text-zinc-400"><a className="font-bold text-[#ffd66f] hover:text-[#fff0b7]" href="/login">Back to sign in</a></p>
    </AuthShell>
  );
}
