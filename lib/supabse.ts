// lib/supabase.ts
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
