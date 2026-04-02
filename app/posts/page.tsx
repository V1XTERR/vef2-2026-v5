import Link from "next/link";
import { client } from "../../lib/sanity";

async function getPosts() {
  return await client.fetch(`*[_type == "post"]{
    _id,
    title,
    slug
  }`);
}

export default async function Page() {
  const posts = await getPosts();

  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          marginBottom: "2rem",
        }}
      >
        Posts
      </h1>

      {posts.length === 0 && <p>No posts yet...</p>}

      {posts.map((p: any) =>
        p.slug?.current ? (
          <Link key={p._id} href={`/posts/${p.slug.current}`}>
            <div
              style={{
                padding: "1rem",
                marginBottom: "1rem",
                border: "1px solid #333",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              <p style={{ fontSize: "1.2rem" }}>{p.title}</p>
            </div>
          </Link>
        ) : null
      )}
    </main>
  );
}