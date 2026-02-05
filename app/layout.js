import "../styles/globals.css";

export const metadata = {
  title: "EPUB Analytics Reader",
  description: "Upload EPUBs, read in the browser, and track your reading analytics."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-50">
          <header className="border-b border-slate-200 bg-white">
            <div className="container flex items-center justify-between py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">EPUB Analytics Reader</p>
                <h1 className="text-lg font-semibold text-ink">Read. Track. Grow.</h1>
              </div>
              <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
                <a className="hover:text-ink" href="/library">Library</a>
                <a className="hover:text-ink" href="/upload">Upload</a>
                <a className="hover:text-ink" href="/analytics">Analytics</a>
              </nav>
            </div>
          </header>
          <main className="container py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
