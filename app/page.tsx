import { promises } from "fs";
import { Arima } from "next/font/google";
import Link from "next/link";
import path from "path";

const jsonDirectroy = path.join(process.cwd(), "data");
const filePath = path.join(jsonDirectroy, "articles.json");

async function getArticles() {
  const fileContents = await promises.readFile(filePath, "utf-8");
  const data = JSON.parse(fileContents);
  return data;
}

export default async function Home() {
  const articles = await getArticles();
  return (
    <div>
      <h1>ブログ記事一覧</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.slug}`}>
              <h3>{article.title}</h3>
            </Link>
            <p>{article.excerpt}</p>
            <p>公開日:{article.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
