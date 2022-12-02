/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.GITHUB_ACTIONS ? "/lg-note" : "",
  trailingSlash: true,
};

module.exports = nextConfig;
