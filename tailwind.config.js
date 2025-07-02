/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // これが重要
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // pagesディレクトリも使っているなら
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // componentsディレクトリも使っているなら
  ],
  theme: {
    extend: {
      colors: {
        "accent-blue": "#003366",
        "text-primary": "#333333",
        "text-secondary": "#6B7280",
        "bg-light": "#F8F8F8",
        "border-light": "#E5E7EB",
      },
    },
  },
  plugins: [],
};
