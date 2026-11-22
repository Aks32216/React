import React from "react";
import PostComments from "./PostComments";

const UserPosts = ({ user }) => {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [errors, setErrors] = React.useState(null);
  const [selectedPost,setSelectedPost] = React.useState(null);

  React.useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      try {
        setLoading(true);
        setErrors(null);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error("failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        if (error.name !== "AbortError") setErrors(error.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    return () => controller.abort();
  }, [user.id]);

  if (loading)
    return (
      <section className="posts">
        <div className="state state--inline">
          <span className="state__spinner" />
          <p className="state__title">Loading posts...</p>
        </div>
      </section>
    );
  if (errors)
    return (
      <section className="posts">
        <div className="state state--inline state--error">
          <p className="state__title">Could not load posts</p>
          <p className="state__hint">{errors}</p>
        </div>
      </section>
    );
  if (!posts || posts.length === 0)
    return (
      <section className="posts">
        <div className="state state--inline">
          <p className="state__title">No posts found</p>
          <p className="state__hint">{user.name} has not written anything yet.</p>
        </div>
      </section>
    );

  if (selectedPost)
    return (
      <section className="posts">
        <button className="back-btn" onClick={() => setSelectedPost(null)}>
          <span aria-hidden="true">←</span> All posts
        </button>
        <article className="post post--open">
          <h3 className="post__title">{selectedPost.title}</h3>
          <p className="post__body">{selectedPost.body}</p>
        </article>
        <PostComments post={selectedPost} />
      </section>
    );

  return (
    <section className="posts">
      <h2 className="posts__title">
        Posts by {user.name}
        <span className="posts__count">{posts.length}</span>
      </h2>
      <div className="posts__list">
        {posts.map((post, i) => (
          <article className="post" key={post.id}>
            <span className="post__num">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="post__title">{post.title}</h3>
              <p className="post__body">{post.body}</p>
              <button
                className="post__btn"
                onClick={() => setSelectedPost(post)}
              >
                Read comments <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default UserPosts;
