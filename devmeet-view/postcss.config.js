// Ensure this file is treated as an ES module
export default {
  plugins: [
    (await import("tailwindcss")).default,
    (await import("autoprefixer")).default,
  ],
};
