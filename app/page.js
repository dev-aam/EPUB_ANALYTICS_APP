import Link from "next/link";

export default function HomePage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="card p-8">
        <p className="text-sm font-semibold text-accent">Welcome</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">Your reading analytics command center.</h2>
        <p className="mt-4 text-slate-600">
          Upload EPUBs, read them in a beautiful browser-based reader, and track time spent, pages read,
          streaks, and daily progress.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white" href="/upload">
            Upload a book
          </Link>
          <Link className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-ink" href="/library">
            View library
          </Link>
        </div>
      </div>
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-ink">What you can track</h3>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li>• Reading time by day, week, and book</li>
          <li>• Pages completed with in-session progress</li>
          <li>• Daily streaks to keep momentum</li>
          <li>• Completion rate across your library</li>
        </ul>
      </div>
    </section>
  );
}
