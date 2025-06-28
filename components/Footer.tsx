export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-12 text-center text-gray-600 text-sm">
      <div className="max-w-3xl mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
        {/* 他のフッター情報やリンクをここに追加できます */}
      </div>
    </footer>
  );
}
