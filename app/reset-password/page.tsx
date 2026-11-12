"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "../components/auth-shell";
import { AuthApiError, resetPassword } from "../lib/auth-api";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const resetToken = sessionStorage.getItem("kccn.passwordResetToken");

    if (!resetToken) {
      setError("Your password reset session has expired. Please request a new code.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await resetPassword(resetToken, password);
      sessionStorage.removeItem("kccn.passwordResetToken");
      router.push("/login");
    } catch (caughtError) {
      setError(
        caughtError instanceof AuthApiError
          ? caughtError.message
          : "Unable to reset your password. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Choose a new password"
      title="Secure your account."
      description="Use a strong new password that you have not used for this account before."
    >
      <form className="mt-9 space-y-5" onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold text-zinc-200">
          New password
          <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#f4b942] focus:ring-4 focus:ring-[#f4b942]/10" minLength={8} name="password" placeholder="Create a new password" required type="password" />
        </label>
        <label className="block text-sm font-semibold text-zinc-200">
          Confirm new password
          <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#f4b942] focus:ring-4 focus:ring-[#f4b942]/10" minLength={8} name="confirmPassword" placeholder="Confirm your new password" required type="password" />
        </label>
        {error && <p className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200" role="alert">{error}</p>}
        <button className="w-full rounded-xl bg-[#f4b942] px-5 py-3.5 text-sm font-bold text-[#17120a] transition hover:-translate-y-0.5 hover:bg-[#ffd369] disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting} type="submit">{isSubmitting ? "Resetting password..." : "Reset password"}</button>
      </form>
    </AuthShell>
  );
}
