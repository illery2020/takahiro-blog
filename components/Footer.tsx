export default function Footer() {
  return (
    <footer className="bg-bg-light py-8 mt-12 text-center text-text-secondary text-sm border-border-light">
      <div className="max-w-3xl mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
        {/* 他のフッター情報やリンクをここに追加できます */}
      </div>
    </footer>
  );
}
