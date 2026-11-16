import React from "react";

const BookForm = ({ onAdd }) => {
  const EMPTY_BOOK = {
    title: "",
    author: "",
    category: "Self-Help",
    format: "paperback",
    isOwned: false,
    notes: "",
    status: "bought",
  };

  const [values, setValues] = React.useState(EMPTY_BOOK);
  const [errors, setErrors] = React.useState({});

  function validate() {
    const e = {};
    const title = values.title.trim();
    const author = values.author.trim();

    if (!title) e.title = "Title is required";
    else if (title.length < 2) e.title = "Title must be at least 2 characters";
    else if (title.length > 100) e.title = "Title must be under 100 characters";

    if (!author) e.author = "Author is required";
    else if (!/^[\p{L}\s.'-]+$/u.test(author))
      e.author = "Author can't contain numbers";

    if (values.notes.length > 300)
      e.notes = "Notes must be under 300 characters";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const foundErrors = validate();
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) {
      return;
    }
    onAdd({
      ...values,
      id: crypto.randomUUID(),
      title: values.title.trim(),
      author: values.author.trim(),
    });
    setValues(EMPTY_BOOK);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <form className="bookform" onSubmit={(e) => handleSubmit(e)} noValidate>
      <header className="bookform-head">
        <p className="bookform-kicker">Catalogue Card</p>
        <h2 className="bookform-title">Add a New Volume</h2>
      </header>

      <div className="bookform-grid">
        <div className="field">
          <label className="field-label" htmlFor="form-title">
            Title
          </label>
          <input
            className={`field-input${errors.title ? " is-invalid" : ""}`}
            name="title"
            id="form-title"
            placeholder="e.g. Atomic Habits"
            value={values.title}
            onChange={handleChange}
          />
          {errors.title && <p className="field-error">{errors.title}</p>}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="form-author">
            Author
          </label>
          <input
            className={`field-input${errors.author ? " is-invalid" : ""}`}
            name="author"
            id="form-author"
            placeholder="e.g. James Clear"
            value={values.author}
            onChange={handleChange}
          />
          {errors.author && <p className="field-error">{errors.author}</p>}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="form-category">
            Category
          </label>
          <select
            className="field-input field-select"
            id="form-category"
            name="category"
            value={values.category}
            onChange={handleChange}
          >
            <option>Self-Help</option>
            <option>Programming</option>
            <option>History</option>
            <option>Sci-Fi</option>
            <option>Finance</option>
          </select>
        </div>

        <fieldset className="field">
          <legend className="field-label">Format</legend>
          <div className="choice-row">
            {["paperback", "ebook"].map((f) => (
              <label key={f} className="choice">
                <input
                  type="radio"
                  name="format"
                  value={f}
                  checked={values.format === f}
                  onChange={handleChange}
                />
                <span>{f}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="field field-wide">
          <legend className="field-label">Status</legend>
          <div className="choice-row">
            {["bought", "in-progress", "completed"].map((s) => (
              <label key={s} className="choice">
                <input
                  type="radio"
                  name="status"
                  value={s}
                  checked={values.status === s}
                  onChange={handleChange}
                />
                <span>{s}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="field field-wide">
          <label className="field-label" htmlFor="form-notes">
            Notes
          </label>
          <textarea
            className="field-input field-textarea"
            id="form-notes"
            name="notes"
            placeholder="A line or two to remember it by..."
            value={values.notes}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      <footer className="bookform-foot">
        <label className="owned">
          <input
            type="checkbox"
            name="isOwned"
            checked={values.isOwned}
            onChange={handleChange}
          />
          <span>I own this book</span>
        </label>
        <button className="bookform-submit" type="submit">
          Add to Shelf
        </button>
      </footer>
    </form>
  );
};

export default BookForm;
