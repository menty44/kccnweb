type Point = { label: string; value: number };
type SeriesPoint = { label: string; a: number; b: number };

function formatNumber(value: number) {
  return new Intl.NumberFormat().format(value);
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4">
        <h2 className="text-base font-bold tracking-[-0.02em] text-slate-900 sm:text-lg">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      {children}
    </article>
  );
}

export function LineTrendChart({
  data,
  color = "#0f2f5f",
  valueLabel = "Total",
}: {
  data: Point[];
  color?: string;
  valueLabel?: string;
}) {
  const width = 640;
  const height = 220;
  const padX = 36;
  const padY = 24;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;
  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);
  const range = Math.max(max - min, 1);

  const points = data.map((d, i) => {
    const x = padX + (data.length === 1 ? innerW / 2 : (i / (data.length - 1)) * innerW);
    const y = padY + innerH - ((d.value - min) / range) * innerH;
    return { ...d, x, y };
  });

  const line = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const area = `${line} L ${points[points.length - 1]?.x ?? padX} ${padY + innerH} L ${points[0]?.x ?? padX} ${padY + innerH} Z`;
  const ticks = 4;
  const gridValues = Array.from({ length: ticks + 1 }, (_, i) => Math.round(min + (range * i) / ticks));

  return (
    <div>
      <div className="h-56 w-full sm:h-64">
        <svg aria-label={`${valueLabel} trend chart`} className="h-full w-full" preserveAspectRatio="none" viewBox={`0 0 ${width} ${height}`} role="img">
          {gridValues.map((gv, i) => {
            const y = padY + innerH - ((gv - min) / range) * innerH;
            return (
              <g key={gv + "-" + i}>
                <line x1={padX} x2={width - padX} y1={y} y2={y} stroke="#e2e8f0" strokeWidth="1" />
                <text x={4} y={y + 4} fill="#94a3b8" fontSize="10">
                  {formatNumber(gv)}
                </text>
              </g>
            );
          })}
          <path d={area} fill={color} opacity="0.12" />
          <path d={line} fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          {points.map((p) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r="4" fill="#fff" stroke={color} strokeWidth="2" />
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-2 grid gap-1 text-[11px] text-slate-500" style={{ gridTemplateColumns: `repeat(${Math.min(data.length, 12)}, minmax(0, 1fr))` }}>
        {data.map((d, i) => (
          <span className={`truncate text-center ${data.length > 8 && i % 2 === 1 ? "hidden sm:block" : ""}`} key={d.label} title={d.label}>
            {d.label}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-600">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
        {valueLabel}
      </div>
    </div>
  );
}

export function GroupedBarChart({
  data,
  labelA,
  labelB,
  colorA = "#0f2f5f",
  colorB = "#f4b942",
}: {
  data: SeriesPoint[];
  labelA: string;
  labelB: string;
  colorA?: string;
  colorB?: string;
}) {
  const width = 640;
  const height = 240;
  const padX = 36;
  const padY = 24;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;
  const max = Math.max(...data.flatMap((d) => [d.a, d.b]), 1);
  const groupW = innerW / Math.max(data.length, 1);
  const barW = Math.min(groupW * 0.28, 26);
  const gap = Math.min(barW * 0.25, 6);
  const ticks = 4;
  const gridValues = Array.from({ length: ticks + 1 }, (_, i) => Math.round((max * i) / ticks));

  return (
    <div>
      <div className="h-56 w-full sm:h-64">
        <svg aria-label={`${labelA} vs ${labelB} comparison chart`} className="h-full w-full" preserveAspectRatio="none" viewBox={`0 0 ${width} ${height}`} role="img">
          {gridValues.map((gv, i) => {
            const y = padY + innerH - (gv / max) * innerH;
            return (
              <g key={gv + "-" + i}>
                <line x1={padX} x2={width - padX} y1={y} y2={y} stroke="#e2e8f0" strokeWidth="1" />
                <text x={4} y={y + 4} fill="#94a3b8" fontSize="10">
                  {formatNumber(gv)}
                </text>
              </g>
            );
          })}
          {data.map((d, i) => {
            const cx = padX + groupW * i + groupW / 2;
            const hA = (d.a / max) * innerH;
            const hB = (d.b / max) * innerH;
            const xA = cx - gap / 2 - barW;
            const xB = cx + gap / 2;
            const yA = padY + innerH - hA;
            const yB = padY + innerH - hB;
            return (
              <g key={d.label}>
                <rect x={xA} y={yA} width={barW} height={Math.max(hA, 0)} rx="4" fill={colorA} />
                <rect x={xB} y={yB} width={barW} height={Math.max(hB, 0)} rx="4" fill={colorB} />
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-2 grid gap-1 text-[11px] text-slate-500" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}>
        {data.map((d) => (
          <span className="truncate text-center" key={d.label} title={d.label}>
            {d.label}
          </span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: colorA }} />{labelA}</span>
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: colorB }} />{labelB}</span>
      </div>
    </div>
  );
}

export function StatPairChart({
  leftLabel,
  rightLabel,
  leftValue,
  rightValue,
}: {
  leftLabel: string;
  rightLabel: string;
  leftValue: number;
  rightValue: number;
}) {
  const max = Math.max(leftValue, rightValue, 1);
  const diff = rightValue - leftValue;
  const pct = leftValue === 0 ? (rightValue > 0 ? 100 : 0) : Math.round((diff / leftValue) * 100);
  const up = diff >= 0;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {[
          { label: leftLabel, value: leftValue, color: "#94a3b8" },
          { label: rightLabel, value: rightValue, color: "#0f2f5f" },
        ].map((item) => (
          <div className="rounded-xl bg-slate-50 p-4" key={item.label}>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{formatNumber(item.value)}</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full" style={{ width: `${(item.value / max) * 100}%`, backgroundColor: item.color }} />
            </div>
          </div>
        ))}
      </div>
      <p className={`mt-4 text-sm font-semibold ${up ? "text-emerald-600" : "text-rose-600"}`}>
        {up ? "▲" : "▼"} {Math.abs(pct)}% {up ? "increase" : "decrease"} vs {leftLabel.toLowerCase()}
      </p>
    </div>
  );
}

export function DashboardCharts() {
  const allTime: Point[] = [
    { label: "Jan", value: 120 },
    { label: "Feb", value: 180 },
    { label: "Mar", value: 240 },
    { label: "Apr", value: 310 },
    { label: "May", value: 420 },
    { label: "Jun", value: 520 },
    { label: "Jul", value: 610 },
    { label: "Aug", value: 760 },
    { label: "Sep", value: 880 },
    { label: "Oct", value: 1020 },
    { label: "Nov", value: 1180 },
    { label: "Dec", value: 1340 },
  ];

  const todayVsYesterday: SeriesPoint[] = [
    { label: "Users", a: 24, b: 31 },
    { label: "Media", a: 12, b: 15 },
    { label: "Vol.", a: 8, b: 6 },
    { label: "Donations", a: 18, b: 22 },
  ];

  const weekCompare: SeriesPoint[] = [
    { label: "Mon", a: 42, b: 48 },
    { label: "Tue", a: 38, b: 45 },
    { label: "Wed", a: 51, b: 44 },
    { label: "Thu", a: 47, b: 53 },
    { label: "Fri", a: 62, b: 58 },
    { label: "Sat", a: 55, b: 64 },
    { label: "Sun", a: 49, b: 57 },
  ];

  const thisMonth: Point[] = [
    { label: "W1", value: 210 },
    { label: "W2", value: 265 },
    { label: "W3", value: 240 },
    { label: "W4", value: 320 },
  ];

  const thisYear: Point[] = [
    { label: "Jan", value: 420 },
    { label: "Feb", value: 460 },
    { label: "Mar", value: 510 },
    { label: "Apr", value: 580 },
    { label: "May", value: 640 },
    { label: "Jun", value: 700 },
    { label: "Jul", value: 760 },
    { label: "Aug", value: 810 },
    { label: "Sep", value: 870 },
    { label: "Oct", value: 940 },
    { label: "Nov", value: 990 },
    { label: "Dec", value: 1080 },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c77c14]">Analytics</p>
          <h2 className="mt-1 text-xl font-bold tracking-[-0.03em] text-slate-900 sm:text-2xl">Performance overview</h2>
        </div>
        <p className="text-xs text-slate-500">Sample data</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <ChartCard title="All time" subtitle="Cumulative activity trend across all time">
          <LineTrendChart data={allTime} valueLabel="Cumulative activity" />
        </ChartCard>

        <ChartCard title="Today vs yesterday" subtitle="Side-by-side comparison by category">
          <GroupedBarChart data={todayVsYesterday} labelA="Yesterday" labelB="Today" />
        </ChartCard>

        <ChartCard title="This week vs last week" subtitle="Daily activity compared week over week">
          <GroupedBarChart data={weekCompare} labelA="Last week" labelB="This week" colorA="#64748b" colorB="#0f2f5f" />
        </ChartCard>

        <ChartCard title="This month" subtitle="Weekly activity trend for the current month">
          <LineTrendChart data={thisMonth} color="#1f5a9c" valueLabel="Monthly activity" />
        </ChartCard>

        <div className="xl:col-span-2">
          <ChartCard title="This year" subtitle="Monthly activity trend for the current year">
            <LineTrendChart data={thisYear} color="#c77c14" valueLabel="Yearly activity" />
          </ChartCard>
        </div>
      </div>
    </section>
  );
}
