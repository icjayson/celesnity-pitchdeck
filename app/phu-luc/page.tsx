import Link from "next/link";
import type { Metadata } from "next";
import { appendix, meta } from "@/content/content.vi";
import { Blocks } from "@/components/shared/Blocks";
import { RichText } from "@/components/shared/RichText";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: `Phụ lục · ${meta.title}`, robots: { index: false, follow: false } };

export default function Appendix() {
  return (
    <main className="theme-light min-h-screen">
      <div className="mx-auto max-w-[1040px] px-4 py-16 sm:px-8 sm:py-24">
        <Link href="/" className="mb-12 inline-flex items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-navy-900">
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden /> Về trang chính
        </Link>
        <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-orange-700">Phụ lục</p>
        <h1 className="mb-16 mt-3 text-[36px] font-semibold tracking-[-0.025em] sm:text-[44px]">Nhà máy siêu thông minh</h1>
        <div className="flex flex-col gap-20">
          {appendix.map((a) => (
            <section key={a.id} id={a.id} className="flex flex-col gap-6">
              <h2 className="text-[26px] font-semibold tracking-[-0.02em] sm:text-[30px]">
                <RichText text={a.title} />
              </h2>
              <Blocks blocks={a.blocks} skipModules />
            </section>
          ))}
        </div>
        <p className="muted mt-20 text-[14px]">{meta.footer}</p>
      </div>
    </main>
  );
}
