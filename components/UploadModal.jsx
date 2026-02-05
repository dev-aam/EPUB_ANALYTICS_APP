"use client";

import { useState } from "react";

export default function UploadModal({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;
    setLoading(true);
    await onUpload(file);
    setLoading(false);
  };

  return (
    <form className="card flex flex-col gap-4 p-6" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-lg font-semibold text-ink">Upload an EPUB</h2>
        <p className="text-sm text-slate-500">Add new books to your analytics dashboard.</p>
      </div>
      <input
        accept=".epub"
        className="w-full rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500"
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        type="file"
      />
      <button
        className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!file || loading}
        type="submit"
      >
        {loading ? "Uploading..." : "Upload EPUB"}
      </button>
    </form>
  );
}
