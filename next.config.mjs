import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true
  },
  turbopack: {
    resolveAlias: {
      'react-router-dom': './src/lib/reactRouterCompat.jsx'
    }
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(process.cwd(), 'src'),
      'react-router-dom': path.resolve(process.cwd(), 'src/lib/reactRouterCompat.jsx')
    };
    return config;
  }
};

export default nextConfig;
