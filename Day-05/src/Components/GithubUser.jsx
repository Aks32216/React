const GithubUser = ({ user }) => {
  return (
    <article className="badge">
      <div className="badge__slot" aria-hidden="true" />
      <img
        className="badge__avatar"
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        loading="lazy"
      />
      <h2 className="badge__name">{user.login}</h2>
      <div className="badge__tags">
        <span className="badge__type">{user.type}</span>
        {user.site_admin && <span className="badge__admin">Staff</span>}
      </div>
      <p className="badge__id">ID {String(user.id).padStart(8, "0")}</p>
      <a
        className="badge__link"
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
      >
        View profile →
      </a>
    </article>
  );
};

export default GithubUser;
