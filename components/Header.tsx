import Link from "next/link";

export default function Header() {
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
          <Link
            href="/"
            className="text-text-secondary hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          {/* 他のナビゲーションリンクをここに追加できます */}
        </nav>
      </div>
    </header>
  );
}
