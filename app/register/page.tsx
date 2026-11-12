"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "../components/auth-shell";
import { AuthApiError, generateOtp, register } from "../lib/auth-api";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    setError("");
    setIsSubmitting(true);

    try {
      await register(fullName, email, password);
      await generateOtp(email, "REGISTRATION");
      router.push(`/otp?email=${encodeURIComponent(email)}&purpose=REGISTRATION`);
    } catch (caughtError) {
      setError(
        caughtError instanceof AuthApiError
          ? caughtError.message
          : "Unable to create your account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Join the community"
      title="Start with a little hope."
      description="Create your free Kratos account and make every moment more meaningful."
    >
      <form className="mt-9 space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold text-zinc-200">
          Full name
          <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#f4b942] focus:ring-4 focus:ring-[#f4b942]/10" name="fullName" placeholder="Your full name" required type="text" />
        </label>
        <label className="block text-sm font-semibold text-zinc-200">
          Email address
          <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#f4b942] focus:ring-4 focus:ring-[#f4b942]/10" name="email" placeholder="you@example.com" required type="email" />
        </label>
        <label className="block text-sm font-semibold text-zinc-200">
          Password
          <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#f4b942] focus:ring-4 focus:ring-[#f4b942]/10" minLength={8} name="password" placeholder="Create a secure password" required type="password" />
        </label>
        <label className="flex items-start gap-2 pt-1 text-xs leading-5 text-zinc-400">
          <input className="mt-1 accent-[#f4b942]" name="terms" type="checkbox" />
          I agree to receive Kratos updates and accept the community terms.
        </label>
        {error && <p className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200" role="alert">{error}</p>}
        <button className="w-full rounded-xl bg-[#f4b942] px-5 py-3.5 text-sm font-bold text-[#17120a] transition hover:-translate-y-0.5 hover:bg-[#ffd369] disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting} type="submit">{isSubmitting ? "Creating account..." : "Create my account"}</button>
      </form>
      <p className="mt-8 text-center text-sm text-zinc-400">Already have an account? <a className="font-bold text-[#ffd66f] hover:text-[#fff0b7]" href="/login">Sign in</a></p>
    </AuthShell>
  );
}
