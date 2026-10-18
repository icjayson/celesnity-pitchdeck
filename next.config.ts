import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  /** Đường dẫn cũ (trước khi chia deck theo khách hàng) → deck Hòa Phát */
  async redirects() {
    return ["/phu-luc", "/ban-in", "/v1"].map((source) => ({ source, destination: `/hoa-phat${source}`, permanent: false }));
  },
  /** Báo cáo tĩnh trong public/decks/<slug>/: giữ đường dẫn ngắn /<slug> như các deck */
  async rewrites() {
    return [
      { source: "/saigon-food", destination: "/decks/saigon-food/bao-cao-pilot.html" },
      { source: "/saigon-food/report", destination: "/decks/saigon-food/bao-cao-pilot.html" },
      { source: "/saigon-food/report-v2", destination: "/decks/saigon-food/bao-cao-pilot-v2.html" },
    ];
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
