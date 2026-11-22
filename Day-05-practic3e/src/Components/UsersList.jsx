import React, { useEffect } from "react";
import User from "./User";

const MAX_RETRIES = 5;

const UsersList = ({ onSelectUser, onClearUser, selectedUser }) => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [errors, setErrors] = React.useState(null);
  const [retryCount, setRetryCount] = React.useState(0);
  const [userQuery, setUserQuery] = React.useState("");
  const [debouncedQuery, setDebouncedQuery] = React.useState("");

  useEffect(() => {
    if (retryCount > MAX_RETRIES) {
      return;
    }
    const controller = new AbortController();

    async function loadUsers() {
      try {
        setLoading(true);
        setErrors(null);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error("failed to fetch users details");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        if (error.name !== "AbortError") setErrors(error.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => controller.abort();
  }, [retryCount]);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(userQuery);
    }, 500);

    return () => clearTimeout(id);
  }, [userQuery]);

  const derivedUser = users.filter((user) =>
    user.name
      .trim()
      .toLowerCase()
      .includes(debouncedQuery.trim().toLowerCase()),
  );

  const isRetryLimitExceeded = retryCount >= MAX_RETRIES;

  if (loading)
    return (
      <main className="book">
        <div className="state">
          <span className="state__spinner" />
          <p className="state__title">Loading contacts...</p>
        </div>
      </main>
    );
  if (errors)
    return (
      <main className="book">
        <div className="state state--error">
          <p className="state__title">
            {isRetryLimitExceeded
              ? "Retry limit exceeded"
              : "Something went wrong"}
          </p>
          <p className="state__hint">
            {isRetryLimitExceeded
              ? `We tried ${MAX_RETRIES} times and could not load the users. Please try again later.`
              : errors}
          </p>
          <div className="state__meter" aria-hidden="true">
            {Array.from({ length: MAX_RETRIES }, (_, i) => (
              <span
                key={i}
                className={i < retryCount ? "pip pip--used" : "pip"}
              />
            ))}
          </div>
          <p className="state__tries">
            {retryCount} of {MAX_RETRIES} retries used
          </p>
          <button
            className="retry-btn"
            disabled={isRetryLimitExceeded}
            onClick={() => setRetryCount((prev) => prev + 1)}
          >
            {isRetryLimitExceeded ? "No retries left" : "Retry"}
          </button>
        </div>
      </main>
    );
  if (users.length === 0)
    return (
      <main className="book">
        <div className="state">
          <p className="state__title">No users</p>
          <p className="state__hint">There is nobody in the directory yet.</p>
        </div>
      </main>
    );

  if (selectedUser)
    return (
      <main className="book book--detail">
        <button className="back-btn" onClick={onClearUser}>
          <span aria-hidden="true">←</span> All users
        </button>
        <div className="detail-card">
          <User user={selectedUser} />
        </div>
      </main>
    );

  return (
    <main className="book">
      <header className="book__head">
        <p className="book__kicker">Directory</p>
        <h1 className="book__title">
          Meet the <mark>people</mark>.
        </h1>
        <p className="book__count">{derivedUser.length} contacts</p>
      </header>
      <input
        className="search"
        type="search"
        placeholder="Search people by name..."
        aria-label="Search people by name"
        value={userQuery}
        onChange={(e) => setUserQuery(e.target.value)}
      />
      <section className="contacts">
        {derivedUser.map((user) => {
          return <User key={user.id} user={user} onSelect={onSelectUser} />;
        })}
      </section>
    </main>
  );
};

export default UsersList;
