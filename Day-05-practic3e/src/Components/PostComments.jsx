import React from "react";

const PostComments = ({ post }) => {
  const [comments, setComments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [errors, setErrors] = React.useState(null);

  React.useEffect(() => {
    const controller = new AbortController();

    async function loadComments() {
      try {
        setLoading(true);
        setErrors(null);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error("failed to fetch comments");
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        if (error.name !== "AbortError") setErrors(error.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadComments();

    return () => controller.abort();
  }, [post.id]);

  if (loading)
    return (
      <div className="state state--inline">
        <span className="state__spinner" />
        <p className="state__title">Loading comments...</p>
      </div>
    );
  if (errors)
    return (
      <div className="state state--inline state--error">
        <p className="state__title">Could not load comments</p>
        <p className="state__hint">{errors}</p>
      </div>
    );
  if (!comments || comments.length === 0)
    return (
      <div className="state state--inline">
        <p className="state__title">No comments yet</p>
        <p className="state__hint">Nobody has replied to this post.</p>
      </div>
    );

  return (
    <div className="comments">
      <h3 className="comments__title">
        Comments
        <span className="posts__count">{comments.length}</span>
      </h3>
      <div className="comments__list">
        {comments.map((comment) => (
          <article className="comment" key={comment.id}>
            <div className="comment__avatar" aria-hidden="true">
              {comment.email[0].toUpperCase()}
            </div>
            <div className="comment__bubble">
              <div className="comment__head">
                <span className="comment__name">{comment.name}</span>
                <span className="comment__email">{comment.email}</span>
              </div>
              <p className="comment__body">{comment.body}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PostComments;
