import { DashboardCharts } from "../components/dashboard-charts";

const highlights = [
  { label: "Media items", value: "—", note: "Connect your media library to see activity here." },
  { label: "Users", value: "—", note: "Registered members will appear in this overview." },
  { label: "Volunteers", value: "—", note: "Track volunteer sign-ups and participation." },
  { label: "Donations", value: "—", note: "Monitor giving and campaign progress." },
];

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c77c14]">Home</p>
        <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-900 sm:text-3xl">
          Welcome to your dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Manage media, people, volunteers, and donations for Kratos from one place. Use the menu to
          navigate between sections.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {highlights.map((item) => (
          <article
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            key={item.label}
          >
            <p className="text-sm font-semibold text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-900">{item.value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.note}</p>
          </article>
        ))}
      </section>

      <DashboardCharts />
    </div>
  );
}
