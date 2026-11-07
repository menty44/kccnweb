import { AuthShell } from "../components/auth-shell";

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Continue your journey."
      description="Sign in to pick up where you left off with KCCN."
    >
      <form className="mt-9 space-y-5">
        <label className="block text-sm font-semibold text-zinc-200">
          Email address
          <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#f4b942] focus:ring-4 focus:ring-[#f4b942]/10" name="email" placeholder="you@example.com" type="email" />
        </label>
        <label className="block text-sm font-semibold text-zinc-200">
          Password
          <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#f4b942] focus:ring-4 focus:ring-[#f4b942]/10" name="password" placeholder="Enter your password" type="password" />
        </label>
        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-zinc-400"><input className="accent-[#f4b942]" name="remember" type="checkbox" /> Remember me</label>
          <a className="font-semibold text-[#ffd66f] hover:text-[#fff0b7]" href="/forgot-password">Forgot password?</a>
        </div>
        <button className="w-full rounded-xl bg-[#f4b942] px-5 py-3.5 text-sm font-bold text-[#17120a] transition hover:-translate-y-0.5 hover:bg-[#ffd369]" type="submit">Sign in to KCCN</button>
      </form>
      <p className="mt-8 text-center text-sm text-zinc-400">New to KCCN? <a className="font-bold text-[#ffd66f] hover:text-[#fff0b7]" href="/register">Create an account</a></p>
    </AuthShell>
  );
}
