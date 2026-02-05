import ePub from "epubjs";

export function initializeRenderer({ url, containerId = "viewer", onPageChange }) {
  const book = ePub(url);
  const rendition = book.renderTo(containerId, {
    width: "100%",
    height: "100%",
    flow: "paginated"
  });

  rendition.display();

  rendition.on("relocated", (location) => {
    if (onPageChange) {
      onPageChange(location);
    }
  });

  return { book, rendition };
}
