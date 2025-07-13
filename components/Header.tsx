import { getUniqueGenres } from "@/lib/supabase";
import { link } from "fs";
import Link from "next/link";

export default async function Header() {
  const genres = await getUniqueGenres();
  return (
    <header className="bg-bg-light py-4 shadow-sm border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-accent-blue hover:text-blue-600 transition-colors"
        >
          My Blog
        </Link>
        <nav>
          {genres.map((genre) => (
            <Link
              key={genre}
              href={`/genres/${genre}`}
              className="text-text-secondary hover:text-accent-blue transition-colors mr-4"
            >
              {genre
                .replace(/-/g, " ")
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Link>
          ))}
          <Link
            href="/admin/new"
            className="ml-6 bg-accent-blue text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-opacity-90 transition-colors"
          >
            記事を投稿
          </Link>
        </nav>
      </div>
    </header>
  );
}
