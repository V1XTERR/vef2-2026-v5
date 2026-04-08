import Link from "next/link";
import { client } from "../lib/sanity";

async function getFrontpage() {
  return await client.fetch(`*[_type == "post"][0]{
    title,
    body
  }`);
}

function portableTextToString(blocks: any[]) {
  if (!blocks) return "";
  return blocks
    .map((block) =>
      block.children?.map((child: any) => child.text).join("")
    )
    .join("\n");
}

export default async function Home() {
  const data = await getFrontpage();
  const text = portableTextToString(data?.body);

  return (
    <section className="hero">
      <span className="hero__tag">Velkomin</span>
      <h1 className="hero__title">{data?.title ?? "Bloggið mitt"}</h1>
      <div className="hero__body">
        {text ? (
          text.split("\n").map((paragraph: string, i: number) =>
            paragraph.trim() ? <p key={i}>{paragraph}</p> : null
          )
        ) : (
          <p>Engin lýsing til staðar.</p>
        )}
      </div>
      <div className="hero__cta">
        <Link href="/posts">Skoða allar greinar →</Link>
      </div>
    </section>
  );
}
