import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white py-4 shadow-sm border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
        >
          My Blog
        </Link>
        <nav>
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          {/* 他のナビゲーションリンクをここに追加できます */}
        </nav>
      </div>
    </header>
  );
}
