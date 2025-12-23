import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enforce trailing slash consistency for SEO
  trailingSlash: false,
  
  // Allow external images for testimonial avatars
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

export default nextConfig;
