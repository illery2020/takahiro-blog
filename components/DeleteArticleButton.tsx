"use client";

import { deleteArticle } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface DeleteArticleButtonProps {
  articleId: string;
}
export default function DeleteArticleButton({
  articleId,
}: DeleteArticleButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (
      !window.confirm("本当にこの記事を削除しますか？この操作は元に戻せません")
    ) {
      return;
    }

    try {
      await deleteArticle(articleId);
      alert("記事が正常に削除されました");
      router.push("/");
    } catch (error) {
      console.error("記事の削除中にエラーが発生しました。", error);
      alert(`記事の削除に失敗しました: ${(error as Error).message}`);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="ml-4 bg-red-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-red-700 transition-colors"
    >
      記事を削除
    </button>
  );
}
