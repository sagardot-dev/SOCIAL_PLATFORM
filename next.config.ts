import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dqs8qc9o4jfra.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
   typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
}; 

export default nextConfig;
