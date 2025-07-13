import DeleteArticleButton from "@/components/DeleteArticleButton";
import { getArticles } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ArticleDetailPage({
  params,
}: {
  // ★ ここを修正: params: { slug: string }; を Promise<{ slug: string }>; に戻す
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ★ ここは await のままでOK
  const articles = await getArticles();
  const article = articles.find((art) => art.slug === slug);

  if (!article) {
    notFound();
  }
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-text-primary">
        {article.title}
      </h1>
      <p className="text-sm text-accent-blue mb-2">{article.genre}</p>
      <p className="text-sm text-text-secondary mb-8">公開日:{article.date}</p>

      <p className="text-text-secondary mb-4">{article.excerpt}</p>
      <div className="mb-8 flex">
        <Link
          href={`/admin/${article.slug}/edit`}
          className="inline-block bg-accent-blue text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-opacity-90 transition-colors"
        >
          記事を編集
        </Link>
        <DeleteArticleButton articleId={article.id} />
      </div>
      <p className="text-lg leading-relaxed text-text-primary">
        {article.content}
      </p>
    </div>
  );
}
