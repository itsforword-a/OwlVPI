/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['cdn.discordapp.com'],
  },
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
}

export default nextConfig
