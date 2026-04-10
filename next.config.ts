import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // This wildcard (*.) allows both cdn. and devcdn. 
        hostname: '*.waltonplaza.com.bd',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
