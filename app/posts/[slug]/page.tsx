import { client } from "../../../lib/sanity";
import { PortableText } from "@portabletext/react";

export default async function Page({ params }: any) {
  const resolvedParams = await params;

  const slug = Array.isArray(resolvedParams.slug)
    ? resolvedParams.slug[0]
    : resolvedParams.slug;

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug]{
      title,
      body
    }[0]`,
    { slug }
  );

  if (!post) {
    return <div style={{ padding: "2rem" }}>Post not found</div>;
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{post.title}</h1>
      <PortableText value={post.body} />
    </main>
  );
}