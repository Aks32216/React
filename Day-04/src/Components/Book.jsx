const Book = ({ book }) => {
  return (
    <article
      className="book"
      data-category={book.category}
      data-status={book.status}
    >
      <div className="book-spine" aria-hidden="true">
        <span>{book.category}</span>
      </div>

      <div className="book-body">
        <header className="book-head">
          <p className="book-category">{book.category}</p>
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">by {book.author}</p>
        </header>

        {book.notes && <blockquote className="book-notes">{book.notes}</blockquote>}

        <footer className="book-foot">
          <span className="tag tag-format">{book.format}</span>
          <span className={book.isOwned ? "tag tag-owned" : "tag tag-wish"}>
            {book.isOwned ? "In my collection" : "Not owned"}
          </span>
          <span className="tag tag-status">{book.status}</span>
        </footer>
      </div>
    </article>
  );
};

export default Book;
