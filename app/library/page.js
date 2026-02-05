import BookCard from "../../components/BookCard";

const sampleBooks = [
  {
    id: "sample-1",
    title: "The Art of Reading",
    author: "Jane Doe",
    cover_url: "/covers/sample-cover-1.jpg",
    progress: 42
  },
  {
    id: "sample-2",
    title: "Analytics for Stories",
    author: "Alex Rivera",
    cover_url: "/covers/sample-cover-2.jpg",
    progress: 76
  }
];

export default function LibraryPage() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-ink">Your Library</h2>
        <p className="text-sm text-slate-500">Track reading progress across your EPUB collection.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sampleBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
