import { supabase } from "@/lib/supabse";
import { Article } from "@/types/article";
import { Metadata } from "next";
import { notFound } from "next/navigation";

async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase.from("articles").select("*");
  if (error) {
    console.error("Error fetcing articles:", error.message);
    throw new Error("記事の取得に失敗しました");
  }
  return data as Article[];
}

export async function generateMetafata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((art) => art.slug === slug);

  if (!article) {
    return {
      title: "記事が見つかりません",
      description: "お探しの記事は存在しないか、削除された可能性があります。",
    };
  }
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((art) => art.slug === slug);

  if (!article) {
    notFound();
  }
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-gray-900">{article.title}</h1>
      <p className="text-sm text-blue-600 mb-2">{article.genre}</p>
      <p className="text-sm text-gray-500 mb-8">公開日:{article.date}</p>
      <p className="text-gray-600 mb-4">{article.excerpt}</p>
      <p className="text-lg leading-relaxed text-gray-700">{article.content}</p>
    </div>
  );
}
