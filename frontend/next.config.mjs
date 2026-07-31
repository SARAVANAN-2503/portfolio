/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow imports from ../shared via the file system
  transpilePackages: [],
  // Enable typed routes for App Router
  typedRoutes: true,
};

export default nextConfig;
