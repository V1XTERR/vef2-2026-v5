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
    <main style={{ padding: "2rem" }}>
      <h1>{data?.title}</h1>
      <p>{text}</p>
    </main>
  );
}
