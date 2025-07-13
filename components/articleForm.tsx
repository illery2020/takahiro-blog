"use client";

import { createArticles, updateArticle } from "@/lib/supabase";
import { Article } from "@/types/article";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useState } from "react";

export default function ArticleForm({
  genres,
  article,
}: {
  genres: string[];
  article?: Article;
}) {
  // 各入力フィールドの状態を管理するための useState を定義
  const [title, setTitle] = useState(article?.title || "");
  const [slug, setSlug] = useState(article?.slug || "");
  const [excerpt, setExcerpt] = useState(article?.excerpt || "");
  const [content, setContent] = useState(article?.content || "");
  const [date, setDate] = useState(
    article?.title ? new Date(article.date).toISOString().slice(0, 16) : ""
  );
  const [genre, setGenre] = useState(article?.genre || "");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルト送信を防ぐ
    const submitArticleData: Omit<Article, "id"> = {
      title: title,
      slug: slug,
      excerpt: excerpt,
      content: content,
      date: new Date(date).toISOString(),
      genre: genre,
    };
    try {
      let resultArticle: Article | null;
      if (article) {
        if (!article.id) {
          throw new Error("編集対象の記事IDが見つかりません。");
        }
        resultArticle = await updateArticle(article.id, submitArticleData);
        alert("記事が正常に更新されました！");
      } else {
        resultArticle = await createArticles(submitArticleData);
        console.log("記事が正常に作成されました", resultArticle);
      }
      if (resultArticle) {
        alert("記事が正常に投稿されました");
        router.push(`/articles/${resultArticle.slug}`);
      } else {
        alert("記事の投稿に失敗しました");
      }
    } catch (error) {
      console.error("記事の投稿中にエラーが発生しました", error);
      alert(`記事の投稿中にエラーが発生しました: ${(error as Error).message}`);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8 text-text-primary">
        {article ? "記事を編集" : "新しい記事を投稿"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow-md"
      >
        {/* タイトル */}
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-text-primary mb-2"
          >
            タイトル
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-3 border border-border-light rounded-md focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition duration-200"
            placeholder="記事のタイトルを入力してください"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        {/* スラッグ */}
        <div>
          <label
            htmlFor="slug"
            className="block text-lg font-medium text-text-primary mb-2"
          >
            スラッグ (URLの一部になります)
          </label>
          <input
            type="text"
            id="slug"
            className="w-full p-3 border border-border-light rounded-md focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition duration-200"
            placeholder="例: my-first-blog-post (半角英数字とハイフン)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        {/* 抜粋 */}
        <div>
          <label
            htmlFor="excerpt"
            className="block text-lg font-medium text-text-primary mb-2"
          >
            抜粋 (記事の概要)
          </label>
          <textarea
            id="excerpt"
            rows={3} // 表示行数
            className="w-full p-3 border border-border-light rounded-md focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition duration-200 resize-y"
            placeholder="記事の簡単な説明を入力してください"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
            autoComplete="off"
          ></textarea>
        </div>

        {/* コンテンツ (記事本文) */}
        <div>
          <label
            htmlFor="content"
            className="block text-lg font-medium text-text-primary mb-2"
          >
            コンテンツ (記事本文)
          </label>
          <textarea
            id="content"
            rows={10} // 表示行数
            className="w-full p-3 border border-border-light rounded-md focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition duration-200 resize-y"
            placeholder="ここに記事の本文を入力してください"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            autoComplete="off"
          ></textarea>
        </div>

        {/* 公開日 */}
        <div>
          <label
            htmlFor="date"
            className="block text-lg font-medium text-text-primary mb-2"
          >
            公開日
          </label>
          <input
            type="datetime-local" // 日付と時刻を選択できるタイプ
            id="date"
            className="w-full p-3 border border-border-light rounded-md focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition duration-200"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        {/* ジャンル */}
        <div>
          <label
            htmlFor="genre"
            className="block text-lg font-medium text-text-primary mb-2"
          >
            ジャンル
          </label>
          <select
            id="genre"
            className="w-full p-3 border border-border-light rounded-md focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition duration-200"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          >
            <option value="">ジャンルを選択してください </option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {/* 表示用のジャンル名に変換（例: "web-development" -> "Web Development"） */}
                {g
                  .replace(/-/g, " ")
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </option>
            ))}
          </select>
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          className="w-full bg-accent-blue text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-opacity-90 transition duration-200 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2"
        >
          {article ? "記事を編集" : "記事を投稿"}
        </button>
      </form>
    </div>
  );
}
