import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/reservatorio-3d',
  assetPrefix: '/reservatorio-3d/',
  images: { unoptimized: true },
};

export default nextConfig;
