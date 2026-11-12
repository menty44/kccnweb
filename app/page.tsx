import Image from "next/image";

const PlayIcon = ({ className = "" }: { className?: string }) => (
  <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5.14v13.72a1 1 0 0 0 1.5.87l10.65-6.86a1.03 1.03 0 0 0 0-1.74L9.5 4.27A1 1 0 0 0 8 5.14Z" fill="currentColor" />
  </svg>
);

const ArrowUpRight = () => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const Waveform = () => (
  <div aria-hidden="true" className="flex h-7 items-center gap-1">
    {[12, 21, 15, 27, 18, 11, 24, 16, 20, 10, 25, 14, 22, 12, 18].map((height, index) => (
      <span className="w-1 rounded-full bg-[#f7b844]" key={index} style={{ height }} />
    ))}
  </div>
);

const programs = [
  { time: "07:00", title: "Morning Devotion", type: "Live now", image: "sunrise" },
  { time: "12:30", title: "The Word Today", type: "Teaching", image: "teaching" },
  { time: "18:00", title: "Kratos Music Programmes and studio recording", type: "Music", image: "worship" },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#f7f5f0] text-[#12223b]">
      <section className="relative isolate overflow-hidden bg-[#090b10] px-5 pb-16 pt-5 text-white sm:px-8 lg:px-12 lg:pb-24">
        <div className="hero-grid absolute inset-0 opacity-30" />
        <div className="motion-aurora absolute -right-48 -top-64 h-[42rem] w-[42rem] rounded-full bg-[#6041c8]/30 blur-[100px]" />
        <div className="motion-aurora-delayed absolute -bottom-48 -left-32 h-[32rem] w-[32rem] rounded-full bg-[#ffb700]/15 blur-[100px]" />
        <svg aria-hidden="true" className="absolute -right-28 top-24 h-[32rem] w-[44rem] opacity-40" fill="none" viewBox="0 0 704 512">
          <path d="M92 430C166 132 312 116 390 216c87 112 146 41 282-178" stroke="url(#hero-wave)" strokeLinecap="round" strokeWidth="2" />
          <path d="M34 471C125 252 252 230 340 297c100 76 212-10 351-222" stroke="url(#hero-wave)" strokeLinecap="round" strokeWidth="2" />
          <path d="M197 45c60 18 98 54 117 108 31 90 107 104 227 42" stroke="url(#hero-wave)" strokeLinecap="round" strokeWidth="2" />
          <defs>
            <linearGradient id="hero-wave" x1="20" x2="683" y1="30" y2="470" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F4B942" stopOpacity="0" />
              <stop offset=".48" stopColor="#F4B942" />
              <stop offset="1" stopColor="#9D7BFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between">
          <a className="flex items-center gap-3" href="#">
            <Image alt="Kratos logo" className="h-11 w-11 object-contain" height={44} priority src="/logoone.png" width={44} />
            <span className="hidden text-sm font-bold tracking-[0.18em] sm:block">Kratos</span>
          </a>
          <div className="hidden items-center rounded-full border border-white/10 bg-white/[0.04] px-2 py-1.5 text-sm font-medium text-zinc-300 backdrop-blur-md md:flex">
            <a className="rounded-full px-3 py-1.5 transition hover:bg-white/10 hover:text-white" href="#watch">Watch</a>
            <a className="rounded-full px-3 py-1.5 transition hover:bg-white/10 hover:text-white" href="#listen">Listen</a>
            <a className="rounded-full px-3 py-1.5 transition hover:bg-white/10 hover:text-white" href="#about">Our mission</a>
            <a className="rounded-full px-3 py-1.5 transition hover:bg-white/10 hover:text-white" href="#connect">Connect</a>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <a className="rounded-full px-4 py-2.5 text-zinc-200 transition hover:bg-white/10 hover:text-white" href="/login">Login</a>
            <a className="rounded-full bg-white px-4 py-2.5 text-[#111319] transition hover:bg-[#f4b942]" href="/register">Register</a>
          </div>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-14 pb-5 pt-20 lg:grid-cols-[1.03fr_.97fr] lg:items-center lg:pt-28">
          <div className="max-w-2xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f4b942]/25 bg-[#f4b942]/10 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffd66f]">
              <span className="motion-ping h-1.5 w-1.5 rounded-full bg-[#f4b942]" />
              Streaming live from Uganda
            </p>
            <h1 className="text-5xl font-bold leading-[0.95] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              A brighter signal <span className="bg-gradient-to-r from-[#f7bf4b] via-[#ffe197] to-[#f7bf4b] bg-clip-text text-transparent">for your soul.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-400">
              Discover live gospel video, uplifting audio, and a community created to empower lives across Uganda and beyond.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a className="inline-flex items-center gap-3 rounded-full bg-[#f4b942] px-6 py-3.5 text-sm font-bold text-[#15120b] shadow-lg shadow-[#f4b942]/15 transition hover:-translate-y-0.5 hover:bg-[#ffd369]" href="#watch">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#16130d] text-[#f7c969]"><PlayIcon className="h-3 w-3" /></span>
                Watch Kratos Live
              </a>
              <a className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-bold text-white transition hover:border-white/30 hover:bg-white/[0.08]" href="#listen">
                Listen to Radio <ArrowUpRight />
              </a>
            </div>
            <div className="mt-12 flex items-center gap-7 text-sm text-zinc-400">
              <div><p className="text-xl font-bold text-white">24/7</p><p className="mt-1 text-xs">Inspiration</p></div>
              <span className="h-8 w-px bg-white/15" />
              <div><p className="text-xl font-bold text-white">Live</p><p className="mt-1 text-xs">Gospel &amp; worship</p></div>
              <span className="h-8 w-px bg-white/15" />
              <div><p className="text-xl font-bold text-white">kratos</p><p className="mt-1 text-xs">Uganda</p></div>
            </div>
          </div>

          <div id="watch" className="motion-float relative mx-auto w-full max-w-[34rem]">
            <div className="absolute -inset-5 rounded-[2.2rem] bg-gradient-to-br from-[#f4b942]/30 via-transparent to-[#8f65ff]/30 blur-xl" />
            <div className="relative overflow-hidden rounded-[1.65rem] border border-white/15 bg-white/[0.06] p-3 shadow-2xl shadow-black/50 backdrop-blur-xl">
              <div className="relative flex aspect-[1.2/1] overflow-hidden rounded-[1.15rem] bg-[radial-gradient(circle_at_42%_23%,#f1bd4c_0,transparent_9%),radial-gradient(circle_at_78%_18%,#8668e6_0,transparent_28%),linear-gradient(140deg,#111827_0%,#1d173a_53%,#12161e_100%)]">
                <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-70" fill="none" viewBox="0 0 540 450">
                  <circle cx="270" cy="210" r="115" stroke="#F4B942" strokeDasharray="3 12" strokeOpacity=".7" />
                  <circle cx="270" cy="210" r="150" stroke="white" strokeOpacity=".16" />
                  <path d="M31 310C135 258 174 376 272 286c89-82 149 13 249-129" stroke="#F4B942" strokeLinecap="round" strokeWidth="2" />
                </svg>
                <div className="absolute left-[13%] top-[13%] h-10 w-24 rounded-full bg-[#f4b942]/80 blur-[5px]" />
                <div className="absolute bottom-0 left-1/2 h-48 w-32 -translate-x-1/2 rounded-t-full bg-[#0b0d13] shadow-[0_-8px_0_#f4b942]" />
                <div className="absolute bottom-10 left-1/2 h-16 w-40 -translate-x-1/2 rounded-t-[100%] bg-[#25203c]" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#090b10] via-[#090b10]/70 to-transparent p-5 pt-20">
                  <div>
                    <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffd66f]"><span className="h-1.5 w-1.5 rounded-full bg-[#f4b942]" /> Live now</p>
                    <p className="text-sm font-bold">Morning Glory Service</p>
                  </div>
                  <button aria-label="Play Morning Glory Service" className="grid h-12 w-12 place-items-center rounded-full bg-[#f4b942] pl-0.5 text-[#17120a] transition hover:scale-105">
                    <PlayIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between px-2 py-3 text-xs">
                <span className="font-semibold text-zinc-300">Kratos TV &bull; Online</span>
                <span className="flex items-center gap-1.5 font-bold text-[#ffd66f]"><i className="h-1.5 w-1.5 rounded-full bg-[#f4b942]" /> 1.2k watching</span>
              </div>
            </div>
            <div className="absolute -bottom-7 -left-5 rounded-2xl border border-white/10 bg-[#181b23]/90 px-4 py-3 text-white shadow-xl shadow-black/30 backdrop-blur sm:-left-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#ffd66f]">Daily inspiration</p>
              <p className="mt-0.5 text-sm font-bold">Streaming hope, 24/7</p>
            </div>
          </div>
        </div>
      </section>

      <section id="listen" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c77c14]">Always with you</p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Listen. Watch. Be renewed.</h2>
          </div>
          <a className="inline-flex items-center gap-2 text-sm font-bold text-[#1f5a9c] hover:text-[#102e60]" href="#connect">Explore all programs <ArrowUpRight /></a>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.08fr_.92fr]">
          <article className="rounded-[1.5rem] bg-[#f7b844] p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#83540d]">Kratos Radio</p>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#102e60]">The sound of hope</h3>
              </div>
              <span className="rounded-full bg-[#102e60] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#f7c969]">On air</span>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <button aria-label="Play Kratos Radio" className="grid h-14 w-14 place-items-center rounded-full bg-[#102e60] pl-1 text-[#f7c969] transition hover:scale-105"><PlayIcon className="h-5 w-5" /></button>
              <div>
                <p className="text-sm font-bold text-[#102e60]">Gospel &amp; Grace</p>
                <p className="mt-0.5 text-sm text-[#76500f]">Your soundtrack for a better day.</p>
              </div>
              <div className="ml-auto hidden sm:block"><Waveform /></div>
            </div>
          </article>

          <article className="rounded-[1.5rem] bg-[#e8eef5] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#55749b]">Scripture for today</p>
            <blockquote className="mt-4 max-w-md text-xl font-bold leading-snug tracking-[-0.025em] text-[#102e60]">&ldquo;For we are God&apos;s handiwork, created in Christ Jesus to do good works.&rdquo;</blockquote>
            <p className="mt-4 text-sm font-semibold text-[#55749b]">Ephesians 2:10</p>
          </article>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c77c14]">What&apos;s on</p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Made for every moment.</h2>
            </div>
            <a className="rounded-full border border-[#d6e0ed] px-5 py-2.5 text-sm font-bold text-[#1f5a9c] transition hover:border-[#1f5a9c]" href="#connect">View schedule</a>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {programs.map((program) => (
              <article className="group rounded-[1.25rem] border border-[#e5ebf2] p-4 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[#102e60]/5" key={program.title}>
                <div className={`relative h-40 overflow-hidden rounded-xl ${program.image === "sunrise" ? "bg-[linear-gradient(145deg,#f9c95f,#f4974c_42%,#30558d_100%)]" : program.image === "teaching" ? "bg-[linear-gradient(145deg,#315f9d,#6e9cd1_60%,#e0c779_100%)]" : "bg-[linear-gradient(145deg,#272456,#a94b92_48%,#f4b24f_100%)]"}`}>
                  <div className="absolute -right-4 -top-10 h-40 w-40 rounded-full border-[18px] border-white/30" />
                  <div className="absolute bottom-4 left-4 rounded-full bg-[#102e60]/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">{program.type}</div>
                  <button aria-label={`Play ${program.title}`} className="absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-white text-[#102e60] opacity-0 transition group-hover:opacity-100"><PlayIcon className="h-3.5 w-3.5" /></button>
                </div>
                <div className="flex items-center justify-between px-1 pb-1 pt-4">
                  <div>
                    <p className="text-xs font-bold text-[#c77c14]">{program.time}</p>
                    <h3 className="mt-1 text-lg font-bold tracking-[-0.025em]">{program.title}</h3>
                  </div>
                  <ArrowUpRight />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#eaf0f6] px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center rounded-full bg-[#1f5a9c]">
            <div className="absolute inset-7 rounded-full border border-white/25" />
            <div className="relative text-center text-white">
              <p className="text-6xl font-bold tracking-[-0.06em]">Kratos</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-[#f7c969]">Empowering lives</p>
            </div>
            <span className="absolute -bottom-3 rounded-full bg-[#f7b844] px-5 py-2 text-xs font-bold text-[#102e60]">Est. in faith</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c77c14]">More than a broadcast</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-[-0.045em] sm:text-4xl">A network growing faith, unity, and opportunity.</h2>
            <p className="mt-5 max-w-2xl leading-7 text-[#48627f]">Kratos brings together Christian media, youth development, education, outreach, and compassionate service to create positive transformation in kratos, Uganda, and beyond.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Gospel media & outreach", "Youth mentorship", "Education & support", "Events & community"].map((item) => (
                <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 text-sm font-bold" key={item}>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#dce9f7] text-[#1f5a9c]">+</span>{item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer id="connect" className="bg-[#0d234b] px-5 py-12 text-blue-100 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <div className="flex items-center gap-3 text-white"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f7b844] text-base font-black text-[#102e60]">K</span><span className="font-bold tracking-[0.15em]">Kratos</span></div>
            <p className="mt-5 max-w-xs text-sm leading-6 text-blue-200">kratos Christian Community Network — inspiring and empowering lives through faith.</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f7c969]">Find us</p>
            <p className="mt-4 text-sm leading-6">kratos Town Council<br />kratos District, Uganda<br />East Africa</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f7c969]">Get in touch</p>
            <a className="mt-4 block text-sm hover:text-[#f7c969]" href="mailto:kratoschristiancommunity.net@gmail.com">kratoschristiancommunity.net@gmail.com</a>
            <a className="mt-2 block text-sm hover:text-[#f7c969]" href="tel:+256792948448">+256 792 948 448</a>
            <p className="mt-1 text-sm">+256 751 493 937 / +256 752 045 413</p>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-5 text-xs text-blue-300">© 2026 kratos Christian Community Network Limited. All rights reserved.</div>
      </footer>
    </main>
  );
}
