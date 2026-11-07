import { AuthShell } from "../components/auth-shell";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Password recovery"
      title="Let&apos;s get you back in."
      description="Enter the email linked to your account and we will send a verification code."
    >
      <form className="mt-9 space-y-5">
        <label className="block text-sm font-semibold text-zinc-200">
          Email address
          <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#f4b942] focus:ring-4 focus:ring-[#f4b942]/10" name="email" placeholder="you@example.com" type="email" />
        </label>
        <a className="block w-full rounded-xl bg-[#f4b942] px-5 py-3.5 text-center text-sm font-bold text-[#17120a] transition hover:-translate-y-0.5 hover:bg-[#ffd369]" href="/otp">Send verification code</a>
      </form>
      <p className="mt-8 text-center text-sm text-zinc-400"><a className="font-bold text-[#ffd66f] hover:text-[#fff0b7]" href="/login">Back to sign in</a></p>
    </AuthShell>
  );
}
