import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /** Đường dẫn cũ (trước khi chia deck theo khách hàng) → deck Hòa Phát */
  async redirects() {
    return ["/phu-luc", "/ban-in", "/v1"].map((source) => ({ source, destination: `/hoa-phat${source}`, permanent: false }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
