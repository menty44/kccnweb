import { AuthShell } from "../components/auth-shell";

export default function OtpPage() {
  return (
    <AuthShell
      eyebrow="Verify your identity"
      title="Check your inbox."
      description="We sent a six-digit verification code to your email address."
    >
      <form className="mt-9">
        <label className="block text-sm font-semibold text-zinc-200">
          Verification code
          <div className="mt-3 grid grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((digit) => (
              <input aria-label={`Verification digit ${digit}`} className="aspect-square min-w-0 rounded-xl border border-white/10 bg-white/[0.06] text-center text-xl font-bold text-white outline-none transition focus:border-[#f4b942] focus:ring-4 focus:ring-[#f4b942]/10" inputMode="numeric" key={digit} maxLength={1} type="text" />
            ))}
          </div>
        </label>
        <button className="mt-7 w-full rounded-xl bg-[#f4b942] px-5 py-3.5 text-sm font-bold text-[#17120a] transition hover:-translate-y-0.5 hover:bg-[#ffd369]" type="submit">Verify code</button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-400">Didn&apos;t receive it? <button className="font-bold text-[#ffd66f] hover:text-[#fff0b7]" type="button">Resend code</button></p>
      <p className="mt-4 text-center text-sm text-zinc-400"><a className="font-bold text-[#ffd66f] hover:text-[#fff0b7]" href="/login">Back to sign in</a></p>
    </AuthShell>
  );
}
