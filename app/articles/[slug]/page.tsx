import { promises as fs } from "fs";
import { notFound } from "next/navigation";
import path from "path";

async function getArticles() {
  const jsonDirectory = path.join(process.cwd(), "data");
  const filePath = path.join(jsonDirectory, "articles.json");

  const fileContents = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(fileContents);
  return data;
}

export default async function ArticleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const articles = await getArticles();
  const article = articles.find((art) => art.slug === params.slug);

  if (!article) {
    notFound();
  }
  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.excerpt}</p>
      <p>{article.content}</p>
      <p>公開日:{article.date}</p>
    </div>
  );
}
