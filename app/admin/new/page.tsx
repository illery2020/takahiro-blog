import ArticleForm from "@/components/articleForm";
import { getUniqueGenres } from "@/lib/supabase";

// サーバーコンポーネントとして定義
export default async function New() {
  const genres = await getUniqueGenres(); // ★ サーバーサイドでジャンル一覧を取得

  return (
    // ★ ArticleForm コンポーネントに genres をプロップとして渡す
    <ArticleForm genres={genres} />
  );
}
