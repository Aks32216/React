import React from "react";
import booksData from "../assets/data.json";
import Book from "./Book";
import BookForm from "./BookForm";

const Library = () => {
  const [books, setBooks] = React.useState(booksData);
  const [category, setCategory] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  // Close the popup when Escape is pressed (only listen while it is open)
  React.useEffect(() => {
    if (!isFormOpen) return;
    function onKey(e) {
      if (e.key === "Escape") setIsFormOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFormOpen]);

  function handleCategoryChange(e) {
    setCategory(e.target.value.toLowerCase());
  }

  function handleAddBooks(item) {
    setBooks((prev) => [...prev, item]);
    setIsFormOpen(false);
  }

  const visibleBooks = books
    .filter((b) => b.category.toLowerCase() === category || category === "all")
    .filter((b) => b.title.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <main className="library">
      <header className="masthead">
        <p className="masthead-kicker">Personal Collection</p>
        <h1 className="masthead-title">The Reading Room</h1>
        <p className="masthead-sub">{books.length} volumes on the shelves</p>
      </header>

      <div className="add-bar">
        <button
          type="button"
          className="add-btn"
          aria-haspopup="dialog"
          onClick={() => setIsFormOpen(true)}
        >
          + Add Book
        </button>
      </div>

      {isFormOpen && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            // only close when the dark backdrop itself is clicked
            if (e.target === e.currentTarget) setIsFormOpen(false);
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Add a new book"
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close"
              onClick={() => setIsFormOpen(false)}
            >
              ×
            </button>
            <BookForm onAdd={handleAddBooks} />
          </div>
        </div>
      )}

      <div className="toolbar">
        <div className="search">
          <label className="toolbar-label" htmlFor="search">
            Find a title
          </label>
          <input
            id="search"
            className="search-input"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Search title..."
          />
        </div>

        <div className="section-pick">
          <label className="toolbar-label" htmlFor="category">
            Browse section
          </label>
          <select
            id="category"
            className="toolbar-select"
            value={category}
            onChange={(e) => {
              handleCategoryChange(e);
            }}
          >
            <option value="all">All</option>
            <option value="programming">Programming</option>
            <option value="sci-fi">Sci-Fi</option>
            <option value="history">History</option>
            <option value="finance">Finance</option>
          </select>
        </div>
      </div>

      {visibleBooks.length === 0 ? (
        <div className="empty">No Data To show</div>
      ) : (
        <section className="shelf">
          {visibleBooks.map((vb) => {
            return <Book key={vb.id} book={vb} />;
          })}
        </section>
      )}
    </main>
  );
};

export default Library;
