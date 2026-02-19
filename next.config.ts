/** @type {import('next').NextConfig} */
const nextConfig = {
   swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Disable legacy browser transpilation
  experimental: {
    legacyBrowsers: false,
  },
  compress: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
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
       {
        protocol: 'https',
        hostname: 'www.excelr.com',
        pathname: '/uploads/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  async rewrites() {
    return [
      {
      source: '/:slug((?!_next/|api/|favicon.ico|favicon.png|images/)[^/]+)',
      destination: '/course/:slug',
    },
    ];
  },
};

module.exports = nextConfig;