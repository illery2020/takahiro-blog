import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Takahiro Blog",
  description: "A simple and modern blog built with Next.js.",
};

// 使用しているフォントの初期化（任意）
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${inter.className} bg-bg-light flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow">
          <div className="max-w-3xl mx-auto px-4 py-8">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
