/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["firebasestorage.googleapis.com"],
  },
  distDir: "out",
  output: "export",
  trailingSlash: true,
};

module.exports = nextConfig;
