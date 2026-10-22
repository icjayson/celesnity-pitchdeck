import type { NextConfig } from "next";
import { PORTAL_REWRITES } from "./lib/portalDecks";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  /** Đường dẫn cũ (trước khi chia deck theo khách hàng) → deck Hòa Phát */
  async redirects() {
    return [
      ...["/phu-luc", "/ban-in", "/v1"].map((source) => ({ source, destination: `/hoa-phat${source}`, permanent: false })),
      // Deck Siam Cement Group đổi slug: /scg-vietnam[-vi|-th] → /scg[-vi|-th]
      ...[
        ["/scg-vietnam", "/scg"],
        ["/scg-vietnam-vi", "/scg-vi"],
        ["/scg-vietnam-th", "/scg-th"],
      ].flatMap(([from, to]) => [
        { source: from, destination: to, permanent: false },
        { source: `${from}/:path*`, destination: `${to}/:path*`, permanent: false },
      ]),
    ];
  },
  /** Báo cáo tĩnh trong public/decks/<slug>/: giữ đường dẫn ngắn /<slug> như các deck */
  async rewrites() {
    return [
      // /report: bản đầy đủ, có giá hợp đồng chính thức và so sánh thị trường. /v1: chỉ phí pilot.
      { source: "/saigon-food/report", destination: "/decks/saigon-food/bao-cao-pilot-v2.html" },
      { source: "/saigon-food/v1", destination: "/decks/saigon-food/bao-cao-pilot-v1.html" },
      // Cổng deck: /investor-deck/<region>, /sales-deck/<language>[/<depth>] → PDF trong public/briefings
      ...PORTAL_REWRITES,
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
