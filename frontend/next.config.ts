import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ["img1.kakaocdn.net", "placehold.co"],
    contentSecurityPolicy: "default-src 'self'; img-src 'self' data: https:;",
  },
  /* config options here */
};

export default nextConfig;
