import Reader from "../../../components/Reader";

const sampleBooks = {
  "sample-1": {
    id: "sample-1",
    title: "The Art of Reading",
    author: "Jane Doe",
    file_url: "/sample.epub"
  },
  "sample-2": {
    id: "sample-2",
    title: "Analytics for Stories",
    author: "Alex Rivera",
    file_url: "/sample.epub"
  }
};

export default function ReaderPage({ params }) {
  const book = sampleBooks[params.bookId] ?? sampleBooks["sample-1"];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-ink">Reader</h2>
        <p className="text-sm text-slate-500">Your reading session is being tracked automatically.</p>
      </div>
      <Reader book={book} />
    </section>
  );
}
