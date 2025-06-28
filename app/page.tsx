import { supabase } from "@/lib/supabse";
import { Article } from "@/types/article";
import Link from "next/link";
import path from "path";

const jsonDirectroy = path.join(process.cwd(), "data");

async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase.from("articles").select("*");
  if (error) {
    console.error("Error fetcing articles:", error.message);
    throw new Error("記事の取得に失敗しました");
  }
  return data as Article[];
}

export default async function Home() {
  const articles = await getArticles();
  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8">ブログ記事一覧</h1>
      <ul>
        {articles.map((article) => (
          <li
            key={article.id}
            className="bg-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow"
          >
            <Link href={`/articles/${article.slug}`} className="block">
              <h3 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 mb-2">
                {article.title}
              </h3>
            </Link>

            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <p className="text-sm text-gray-500">公開日:{article.date}</p>
            <Link
              href={`/articles/${article.slug}`}
              className="text-blue-600 font-medium hover:underline block mt-2"
            >
              続きを読む
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
