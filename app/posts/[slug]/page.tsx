import Link from "next/link";
import { client } from "../../../lib/sanity";
import { PortableText } from "@portabletext/react";

export default async function PostPage({ params }: any) {
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
    return (
      <div className="not-found">
        <h2>Grein fannst ekki</h2>
        <p>Þessi grein er ekki til eða hefur verið fjarlægð.</p>
        <Link href="/posts">← Til baka í greinar</Link>
      </div>
    );
  }

  return (
    <article className="post-page">
      <Link href="/posts" className="post-page__back">
        ← Til baka í greinar
      </Link>
      <h1 className="post-page__title">{post.title}</h1>
      <div className="post-page__body">
        <PortableText value={post.body} />
      </div>
    </article>
  );
}
