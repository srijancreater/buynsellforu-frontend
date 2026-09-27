/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow external images from Unsplash
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'buy.stripe.com' },
      { protocol: 'https', hostname: 'api.qrserver.com' },
    ],
  },
};

export default nextConfig;
