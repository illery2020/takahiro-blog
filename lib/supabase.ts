// lib/supabase.ts
import { Article } from "@/types/article";
import { createClient } from "@supabase/supabase-js";

// .env.local で設定した環境変数を読み込む
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 環境変数が設定されているか確認（安全のため）
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or Anon Key environment variables.");
}

// Supabase クライアントを初期化してエクスポート
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase.from("articles").select("*");
  if (error) {
    console.error("Error fetcing articles:", error.message);
    throw new Error("記事の取得に失敗しました");
  }
  return data as Article[];
}

export async function getUniqueGenres(): Promise<string[]> {
  const { data, error } = await supabase.from("articles").select("genre");
  if (error) {
    console.error("Error fetching genres:", error.message);
    return [];
  }
  const genres = data.map((item: { genre: string }) => item.genre);
  const uniquewGenres = Array.from(new Set(genres));
  return uniquewGenres.filter(Boolean);
}

export async function createArticles(
  articleData: Omit<Article, "id">
): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .insert(articleData)
    .select()
    .single();
  if (error) {
    console.error("Error creating article:", error.message);
    throw new Error(`記事の作成に失敗しました: ${error.message}`);
  }
  return data as Article;
}

export async function updateArticle(
  id: string,
  articleData: Omit<Article, "id">
): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .update(articleData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating article:", error.message);
    throw new Error(`記事の更新に失敗しました: ${error.message}`);
  }

  return data as Article;
}

export async function deleteArticle(id: string): Promise<boolean> {
  const { data, error } = await supabase.from("articles").delete().eq("id", id);

  if (error) {
    console.error("Error updating article:", error.message);
    throw new Error(`記事の削除に失敗しました: ${error.message}`);
  }

  return true;
}
