import React from "react";
import GithubUser from "./GithubUser";

const GitHub = () => {
  const [users, setUsers] = React.useState([]);
  const [query, setQuery] = React.useState(30);

  React.useEffect(() => {
    async function githubUsers() {
      const response = await fetch(
        `https://api.github.com/users?per_page=${query}`,
      );
      const data = await response.json();
      setUsers(data);
      setQuery(data.length);
    }

    githubUsers();
  }, [query]);

  return (
    <main className="desk">
      <header className="desk__head">
        <p className="desk__tag">Day 05 / fetch</p>
        <h1 className="desk__title">Github Users</h1>
        <p className="desk__status">
          <span
            className={users.length === 0 ? "dot dot--wait" : "dot dot--live"}
          />
          <input
            className="desk__input"
            aria-label="Number of users to load"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          {users.length === 0
            ? "Printing badges..."
            : `${users.length} badges printed`}
        </p>
      </header>

      <section className="badges">
        {users.length === 0
          ? Array.from({ length: 8 }, (_, i) => (
              <div className="badge badge--ghost" key={i}>
                <div className="badge__slot" aria-hidden="true" />
                <div className="ghost ghost--avatar" />
                <div className="ghost ghost--line" />
                <div className="ghost ghost--tag" />
                <div className="ghost ghost--btn" />
              </div>
            ))
          : users.map((user) => {
              return <GithubUser key={user.id} user={user} />;
            })}
      </section>
    </main>
  );
};

export default GitHub;
