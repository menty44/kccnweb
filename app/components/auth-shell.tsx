import type { ReactNode } from "react";
import Link from "next/link";

type AuthShellProps = {
  children: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
};

export function AuthShell({
  children,
  eyebrow,
  title,
  description,
}: AuthShellProps) {
  return (
    <main className="relative grid min-h-screen overflow-hidden bg-[#090b10] px-5 py-5 text-white sm:p-8 lg:grid-cols-[.9fr_1.1fr] lg:p-10">
      <div className="hero-grid absolute inset-0 opacity-30" />
      <div className="motion-aurora absolute -left-48 top-0 h-[34rem] w-[34rem] rounded-full bg-[#6846d7]/25 blur-[100px]" />
      <div className="motion-aurora-delayed absolute -bottom-48 right-0 h-[30rem] w-[30rem] rounded-full bg-[#f4b942]/15 blur-[100px]" />

      <aside className="relative z-10 hidden flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 backdrop-blur-xl lg:flex">
        <Link className="flex items-center gap-3" href="/">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#ffd266] to-[#e69b19] text-lg font-black tracking-tighter text-[#17120a]">K</span>
          <span className="text-sm font-bold tracking-[0.18em]">KCCN</span>
        </Link>
        <div className="max-w-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffd66f]">Kagadi Christian Community Network</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.05em]">A brighter signal for your soul.</h2>
          <p className="mt-5 leading-7 text-zinc-400">Join a community made for gospel, encouragement, and growth — from Kagadi to the world.</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span className="h-2 w-2 rounded-full bg-[#f4b942]" />
          KCCN streaming live, 24/7
        </div>
      </aside>

      <section className="relative z-10 flex items-center justify-center py-10 lg:py-0">
        <div className="w-full max-w-md">
          <Link className="mb-14 flex items-center gap-3 lg:hidden" href="/">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#ffd266] to-[#e69b19] text-lg font-black tracking-tighter text-[#17120a]">K</span>
            <span className="text-sm font-bold tracking-[0.18em]">KCCN</span>
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ffd66f]">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.05em] sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-sm leading-7 text-zinc-400">{description}</p>
          {children}
        </div>
      </section>
    </main>
  );
}
