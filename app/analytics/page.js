"use client";

import { useEffect, useState } from "react";
import Charts from "../../components/Charts";
import StreakBadge from "../../components/StreakBadge";

const fallbackData = {
  pagesData: [
    { date: "Mon", pages: 12 },
    { date: "Tue", pages: 18 },
    { date: "Wed", pages: 8 },
    { date: "Thu", pages: 24 },
    { date: "Fri", pages: 16 }
  ],
  minutesData: [
    { date: "Mon", minutes: 30 },
    { date: "Tue", minutes: 42 },
    { date: "Wed", minutes: 18 },
    { date: "Thu", minutes: 55 },
    { date: "Fri", minutes: 36 }
  ],
  streak: 4,
  totals: {
    booksCompleted: 3,
    pagesRead: 245,
    minutesRead: 520
  }
};

export default function AnalyticsPage() {
  const [data, setData] = useState(fallbackData);

  useEffect(() => {
    const loadAnalytics = async () => {
      const response = await fetch("/api/analytics");
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    };

    loadAnalytics();
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Analytics</h2>
          <p className="text-sm text-slate-500">Daily performance snapshots and streak tracking.</p>
        </div>
        <StreakBadge streak={data.streak} />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Books completed</p>
          <p className="text-2xl font-semibold text-ink">{data.totals.booksCompleted}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Pages read</p>
          <p className="text-2xl font-semibold text-ink">{data.totals.pagesRead}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Minutes read</p>
          <p className="text-2xl font-semibold text-ink">{data.totals.minutesRead}</p>
        </div>
      </div>
      <Charts pagesData={data.pagesData} minutesData={data.minutesData} />
    </section>
  );
}
