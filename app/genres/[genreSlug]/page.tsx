import { getArticles, getUniqueGenres } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const uniqueGenres = await getUniqueGenres();
  const genreSlugs = uniqueGenres.map((genre) => ({
    genreSlug: genre,
  }));
  return genreSlugs;
}

export default async function ArticleGenrePage({
  params,
}: {
  params: Promise<{ genreSlug: string }>;
}) {
  const { genreSlug } = await params;
  const articles = await getArticles();
  const articleFilterByGenre = articles.filter(
    (art) => art.genre === genreSlug
  );
  if (articleFilterByGenre.length === 0) {
    notFound();
  }
  const displayGenreName = genreSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8">
        {displayGenreName}の記事一覧
      </h1>
      <ul>
        {articleFilterByGenre.map((article) => (
          <li
            key={article.id}
            className="bg-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow"
          >
            <Link href={`/articles/${article.slug}`} className="block">
              <h3 className="text-2xl font-semibold text-gray-800 hover:text-accent-blue mb-2">
                {article.title}
              </h3>
            </Link>
            <p className="text-sm text-accent-blue mb-2">{article.genre}</p>
            <p className="text-text-secondary mb-4">{article.excerpt}</p>
            <p className="text-sm text-text-secondary">公開日:{article.date}</p>
            <Link
              href={`/articles/${article.slug}`}
              className="text-accent-blue font-medium hover:underline block mt-2"
            >
              続きを読む
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
