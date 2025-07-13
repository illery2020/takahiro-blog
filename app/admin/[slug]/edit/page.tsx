import ArticleForm from "@/components/articleForm";
import { getArticles, getUniqueGenres } from "@/lib/supabase";
import { notFound } from "next/navigation";

// サーバーコンポーネントとして定義
export default async function Edit({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const genres = await getUniqueGenres(); // ★ サーバーサイドでジャンル一覧を取得

  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((art) => art.slug === slug);
  console.log(article);

  if (!article) {
    notFound();
  }
  return (
    // ★ ArticleForm コンポーネントに genres をプロップとして渡す
    <ArticleForm genres={genres} article={article} />
  );
}
