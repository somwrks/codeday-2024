/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["img.clerk.com", "i.ibb.co", "i.imgur.com", "picsum.photos"],
  },
};

export default nextConfig;