import { AuthShell } from "../components/auth-shell";

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Join the community"
      title="Start with a little hope."
      description="Create your free KCCN account and make every moment more meaningful."
    >
      <form className="mt-9 space-y-4">
        <label className="block text-sm font-semibold text-zinc-200">
          Full name
          <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#f4b942] focus:ring-4 focus:ring-[#f4b942]/10" name="name" placeholder="Your full name" type="text" />
        </label>
        <label className="block text-sm font-semibold text-zinc-200">
          Email address
          <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#f4b942] focus:ring-4 focus:ring-[#f4b942]/10" name="email" placeholder="you@example.com" type="email" />
        </label>
        <label className="block text-sm font-semibold text-zinc-200">
          Password
          <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#f4b942] focus:ring-4 focus:ring-[#f4b942]/10" name="password" placeholder="Create a secure password" type="password" />
        </label>
        <label className="flex items-start gap-2 pt-1 text-xs leading-5 text-zinc-400">
          <input className="mt-1 accent-[#f4b942]" name="terms" type="checkbox" />
          I agree to receive KCCN updates and accept the community terms.
        </label>
        <button className="w-full rounded-xl bg-[#f4b942] px-5 py-3.5 text-sm font-bold text-[#17120a] transition hover:-translate-y-0.5 hover:bg-[#ffd369]" type="submit">Create my account</button>
      </form>
      <p className="mt-8 text-center text-sm text-zinc-400">Already have an account? <a className="font-bold text-[#ffd66f] hover:text-[#fff0b7]" href="/login">Sign in</a></p>
    </AuthShell>
  );
}
