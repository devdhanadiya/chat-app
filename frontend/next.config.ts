import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com", "randomuser.me", "image.remotePatterns"],
  },
};

export default nextConfig;
