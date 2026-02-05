"use client";

import { useState } from "react";
import UploadModal from "../../components/UploadModal";

export default function UploadPage() {
  const [status, setStatus] = useState(null);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload-book", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    setStatus(result);
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-ink">Upload EPUB</h2>
        <p className="text-sm text-slate-500">Upload a new book to your library.</p>
      </div>
      <UploadModal onUpload={handleUpload} />
      {status && (
        <div className="card p-4 text-sm text-slate-600">
          {status.message}
        </div>
      )}
    </section>
  );
}
