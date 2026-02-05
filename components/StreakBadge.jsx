export default function StreakBadge({ streak }) {
  return (
    <div className="card flex items-center gap-3 p-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-xl">🔥</div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Current streak</p>
        <p className="text-2xl font-semibold text-ink">{streak} days</p>
      </div>
    </div>
  );
}
