import type { Metadata, Viewport } from "next";
import "./globals.css";
import { meta } from "@/content/content.vi";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06142e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
