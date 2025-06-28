/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // これが重要
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // pagesディレクトリも使っているなら
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // componentsディレクトリも使っているなら
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
