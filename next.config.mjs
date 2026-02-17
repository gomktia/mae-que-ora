/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.converteai.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.converteai.net',
      },
    ],
  },
};

export default nextConfig;
