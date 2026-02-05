"use client";

import { useEffect, useRef, useState } from "react";
import { initializeRenderer } from "../lib/epubRenderer";
import { endSession, startSession } from "../lib/tracking";

export default function Reader({ book }) {
  const viewerRef = useRef(null);
  const sessionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!book?.file_url || !viewerRef.current) return;

    sessionRef.current = startSession(book.id);

    const { rendition } = initializeRenderer({
      url: book.file_url,
      containerId: "viewer",
      onPageChange: (location) => {
        const total = location?.locations?.total ?? 1;
        const current = location?.locations?.location ?? 1;
        const percentage = Math.round((current / total) * 100);
        sessionRef.current.pagesRead = Math.max(sessionRef.current.pagesRead, 1);
        setProgress(percentage);
      }
    });

    return () => {
      rendition?.destroy();
    };
  }, [book]);

  useEffect(() => {
    const handleUnload = async () => {
      if (!sessionRef.current) return;
      const session = endSession(sessionRef.current);
      await fetch("/api/reading-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(session)
      });
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  return (
    <div className="card flex h-[70vh] flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-ink">{book.title}</p>
          <p className="text-xs text-slate-500">{book.author || "Unknown author"}</p>
        </div>
        <div className="text-sm text-slate-500">{progress}% read</div>
      </div>
      <div className="flex-1 bg-white" id="viewer" ref={viewerRef} />
    </div>
  );
}
