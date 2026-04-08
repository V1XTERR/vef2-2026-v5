import Link from "next/link";
import { client } from "../../lib/sanity";

async function getPosts() {
  return await client.fetch(`*[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    slug
  }`);
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="posts-page">
      <div className="posts-page__header">
        <h1>Greinar</h1>
        <p>{posts.length} grein{posts.length !== 1 ? "ar" : ""} til staðar</p>
      </div>

      {posts.length === 0 ? (
        <div className="posts-empty">
          <p>Engar greinar til staðar enn.</p>
        </div>
      ) : (
        <div className="posts-list">
          {posts.map((post: any) =>
            post.slug?.current ? (
              <Link key={post._id} href={`/posts/${post.slug.current}`}>
                <div className="post-card">
                  <span className="post-card__title">{post.title}</span>
                  <span className="post-card__arrow">→</span>
                </div>
              </Link>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
