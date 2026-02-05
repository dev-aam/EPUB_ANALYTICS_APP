import Link from "next/link";
import ProgressBar from "./ProgressBar";

export default function BookCard({ book }) {
  return (
    <div className="card flex flex-col gap-4 p-4">
      <div className="flex items-start gap-4">
        <div className="h-24 w-16 overflow-hidden rounded-lg bg-slate-100">
          {book.cover_url ? (
            <img alt={book.title} className="h-full w-full object-cover" src={book.cover_url} />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">No cover</div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-ink">{book.title}</h3>
          <p className="text-sm text-slate-500">{book.author || "Unknown author"}</p>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Progress</span>
          <span>{book.progress ?? 0}%</span>
        </div>
        <ProgressBar value={book.progress ?? 0} />
      </div>
      <Link
        className="mt-auto rounded-full border border-slate-200 px-3 py-2 text-center text-sm font-semibold text-ink"
        href={`/reader/${book.id}`}
      >
        Continue reading
      </Link>
    </div>
  );
}
