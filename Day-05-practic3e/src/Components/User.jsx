import React from 'react'

const User = ({user, onSelect}) => {
  // first letter of the first two words, e.g. "Leanne Graham" -> "LG"
  const initials = user.name
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <article className="contact" data-tone={user.id % 5}>
      <div className="contact__top">
        <div className="contact__avatar" aria-hidden="true">{initials}</div>
        <div className="contact__who">
          <h2 className="contact__name">{user.name}</h2>
          <p className="contact__handle">@{user.username}</p>
        </div>
      </div>

      <div className="contact__chips">
        <span className="chip">{user.address?.city}</span>
        <span className="chip chip--dark">{user.company?.name}</span>
      </div>

      <dl className="contact__list">
        <div>
          <dt>Email</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{user.phone}</dd>
        </div>
      </dl>

      {onSelect && (
        <button className="contact__btn" onClick={() => onSelect(user)}>
          View posts <span aria-hidden="true">→</span>
        </button>
      )}
    </article>
  )
}

export default User
