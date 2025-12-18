/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: [
      "demo.excelr.com",
      "demo3.excelr.com",   // for demo site images
      "www.excelr.com",    // for production site images
      "excelr.com",        // backup
      "excelrcom.b-cdn.net" // CDN backup if used
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'excelrcom.b-cdn.net',
        pathname: '/assets/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/:slug',
        destination: '/course/:slug',
      },
    ];
  }, 
};

module.exports = nextConfig;