"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Charity = {
  title: string;
  date: string;
  summary: string;
  description: string;
  colors: string;
  photos: string[];
};

const charities: Charity[] = [
  {
    title: "Back to School Drive",
    date: "18 February 2026",
    summary: "School supplies and encouragement for families in Kagadi.",
    description:
      "Our volunteers gathered learning supplies and shared a day of encouragement with local families as children prepared for a new school term.",
    colors: "from-[#f6c453] via-[#f4984a] to-[#a74f83]",
    photos: ["Supplies ready for distribution", "Volunteers welcoming families", "A day of learning and hope"],
  },
  {
    title: "Community Food Share",
    date: "12 December 2025",
    summary: "Practical support and fellowship for our neighbours.",
    description:
      "The Kratos community came together to prepare and distribute food parcels, sharing conversation, prayer, and practical help with neighbours.",
    colors: "from-[#1f5a9c] via-[#537fb5] to-[#b4d2ec]",
    photos: ["Food parcels prepared with care", "Neighbours gathering together", "Volunteers serving the community"],
  },
  {
    title: "Clean & Green Kagadi",
    date: "24 August 2025",
    summary: "A day caring for shared spaces across the town.",
    description:
      "Young people, families, and community leaders joined hands to clean shared spaces and plant new life around Kagadi.",
    colors: "from-[#195c4d] via-[#4d9b78] to-[#b7d77a]",
    photos: ["Community members at work", "Young volunteers planting", "A refreshed shared space"],
  },
];

const CloseIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
    <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
  </svg>
);

export default function CharityPage() {
  const [isVolunteerFormOpen, setIsVolunteerFormOpen] = useState(false);
  const [selectedCharity, setSelectedCharity] = useState<Charity | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  function submitVolunteerForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasSubmitted(true);
  }

  function closeVolunteerForm() {
    setIsVolunteerFormOpen(false);
    setHasSubmitted(false);
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#12223b]">
      <header className="relative isolate overflow-hidden bg-[#090b10] px-5 py-5 text-white sm:px-8 lg:px-12">
        <div className="hero-grid absolute inset-0 opacity-30" />
        <div className="motion-aurora absolute -right-36 -top-44 h-96 w-96 rounded-full bg-[#6041c8]/30 blur-[100px]" />
        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between">
          <Link className="flex items-center gap-3" href="/">
            <Image alt="Kratos logo" className="h-11 w-11 object-contain" height={44} priority src="/logoone.png" width={44} />
            <span className="text-sm font-bold tracking-[0.18em]">Kratos</span>
          </Link>
          <Link className="rounded-full px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 hover:text-white" href="/">
            Back home
          </Link>
        </nav>
        <div className="relative z-10 mx-auto max-w-7xl py-20 sm:py-28">
          <p className="inline-flex rounded-full border border-[#f4b942]/25 bg-[#f4b942]/10 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffd66f]">
            Kratos community care
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-6xl">
            Serving our neighbours with <span className="text-[#f7bf4b]">hope in action.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Join the Kratos community as we respond with compassion, practical support, and faith across Kagadi and beyond.
          </p>
          <button className="mt-9 rounded-full bg-[#f4b942] px-6 py-3.5 text-sm font-bold text-[#15120b] transition hover:-translate-y-0.5 hover:bg-[#ffd369]" onClick={() => setIsVolunteerFormOpen(true)} type="button">
            Volunteer with us
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c77c14]">Our recent work</p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">Past charities, lasting impact.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#48627f]">Select a charity to see its story, date, and event photo placeholders.</p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {charities.map((charity) => (
            <button className="group overflow-hidden rounded-[1.5rem] border border-[#e1e8f0] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#102e60]/10" key={charity.title} onClick={() => setSelectedCharity(charity)} type="button">
              <div className={`relative h-48 bg-gradient-to-br ${charity.colors} p-5`}>
                <span className="rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#102e60]">View story</span>
                <div className="absolute bottom-5 right-5 grid h-12 w-12 place-items-center rounded-full bg-white text-xl font-bold text-[#102e60] transition group-hover:scale-110">+</div>
              </div>
              <div className="p-5">
                <p className="text-xs font-bold text-[#c77c14]">{charity.date}</p>
                <h3 className="mt-2 text-xl font-bold tracking-[-0.03em]">{charity.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#48627f]">{charity.summary}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {isVolunteerFormOpen && (
        <div aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-[#090b10]/70 p-5 backdrop-blur-sm" role="dialog">
          <div className="relative w-full max-w-lg rounded-[1.5rem] bg-white p-6 shadow-2xl sm:p-8">
            <button aria-label="Close volunteer form" className="absolute right-5 top-5 rounded-full p-2 text-[#48627f] transition hover:bg-[#eaf0f6] hover:text-[#102e60]" onClick={closeVolunteerForm} type="button">
              <CloseIcon />
            </button>
            {hasSubmitted ? (
              <div className="py-8 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c77c14]">Thank you</p>
                <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">Your interest has been received.</h2>
                <p className="mt-4 leading-7 text-[#48627f]">Our charity team will contact you soon with the next steps.</p>
                <button className="mt-7 rounded-full bg-[#102e60] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1f5a9c]" onClick={closeVolunteerForm} type="button">Close</button>
              </div>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c77c14]">Get involved</p>
                <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">Volunteer with Kratos.</h2>
                <p className="mt-3 pr-7 text-sm leading-6 text-[#48627f]">Tell us how to reach you and we&apos;ll share upcoming charity opportunities.</p>
                <form className="mt-7 space-y-4" onSubmit={submitVolunteerForm}>
                  <label className="block text-sm font-bold">Full names<input className="mt-1.5 w-full rounded-xl border border-[#d6e0ed] px-4 py-3 font-normal outline-none transition focus:border-[#1f5a9c] focus:ring-2 focus:ring-[#1f5a9c]/15" name="fullName" required type="text" /></label>
                  <label className="block text-sm font-bold">Phone number<input className="mt-1.5 w-full rounded-xl border border-[#d6e0ed] px-4 py-3 font-normal outline-none transition focus:border-[#1f5a9c] focus:ring-2 focus:ring-[#1f5a9c]/15" name="phone" required type="tel" /></label>
                  <label className="block text-sm font-bold">Email address<input className="mt-1.5 w-full rounded-xl border border-[#d6e0ed] px-4 py-3 font-normal outline-none transition focus:border-[#1f5a9c] focus:ring-2 focus:ring-[#1f5a9c]/15" name="email" required type="email" /></label>
                  <button className="w-full rounded-full bg-[#f4b942] px-5 py-3.5 text-sm font-bold text-[#15120b] transition hover:bg-[#ffd369]" type="submit">I&apos;d like to volunteer</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {selectedCharity && (
        <div aria-modal="true" className="fixed inset-0 z-50 overflow-y-auto bg-[#090b10]/70 p-5 backdrop-blur-sm sm:grid sm:place-items-center" role="dialog">
          <article className="relative mx-auto my-5 w-full max-w-4xl overflow-hidden rounded-[1.5rem] bg-white shadow-2xl sm:my-0">
            <button aria-label="Close charity details" className="absolute right-5 top-5 z-10 rounded-full bg-white/90 p-2 text-[#102e60] shadow-sm transition hover:bg-white" onClick={() => setSelectedCharity(null)} type="button">
              <CloseIcon />
            </button>
            <div className={`bg-gradient-to-br ${selectedCharity.colors} px-6 pb-12 pt-16 text-white sm:px-10`}>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">Charity event</p>
              <h2 className="mt-3 text-4xl font-bold tracking-[-0.05em]">{selectedCharity.title}</h2>
              <p className="mt-3 text-sm font-bold text-white/85">{selectedCharity.date}</p>
            </div>
            <div className="p-6 sm:p-10">
              <p className="max-w-2xl leading-7 text-[#48627f]">{selectedCharity.description}</p>
              <h3 className="mt-8 text-xl font-bold tracking-[-0.03em]">Event photos</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {selectedCharity.photos.map((caption, index) => (
                  <div className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${selectedCharity.colors} p-4 text-white`} key={caption}>
                    <div className="flex h-full items-end rounded-lg border border-white/30 bg-black/10 p-3 text-sm font-bold leading-5">{caption}<span className="ml-auto text-xs text-white/80">Photo {index + 1}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
