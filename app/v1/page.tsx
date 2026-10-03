import { Fragment } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { meta, parkedSections } from "@/content/content.vi";
import { Section, ThemeSeam } from "@/components/shared/Section";

export const metadata: Metadata = { title: `V1 · Các section đã gỡ · ${meta.title}`, robots: { index: false, follow: false } };

/** Thứ tự như trên trang chính trước khi gỡ */
const ORDER = ["mo-phong", "phong-thi", "gia-tri", "kiem-soat", "loi-moi"];
const list = [...parkedSections].sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

/** /v1: tổng hợp các section đã gỡ khỏi trang chính (dữ liệu trong `parkedSections` của content/content.vi.ts) */
export default function V1() {
  return (
    <>
      <header className="theme-light border-b border-line-200">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-10 sm:px-8 sm:py-14">
          <Link href="/" className="inline-flex w-fit items-center gap-2 text-[14px] font-medium text-blue-600 hover:text-navy-900">
            <ArrowLeft size={16} strokeWidth={1.5} aria-hidden /> Về trang chính
          </Link>
          <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-orange-700">V1 · Lưu trữ</p>
          <h1 className="text-[32px] font-semibold tracking-[-0.025em] sm:text-[40px]">Các section đã gỡ khỏi trang chính</h1>
          <ol className="flex flex-wrap gap-2 text-[14px]">
            {list.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="inline-flex items-center gap-2 rounded-full border border-line-200 bg-white px-3 py-1.5 hover:border-blue-300">
                  <span className="tabular text-ink-500">{String(i + 1).padStart(2, "0")}</span>
                  {s.eyebrow}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </header>
      <main>
        {list.map((s, i) => {
          const prev = list[i - 1];
          return (
            <Fragment key={s.id}>
              {prev ? <ThemeSeam from={prev.theme} to={s.theme} /> : null}
              <Section s={s} />
            </Fragment>
          );
        })}
      </main>
    </>
  );
}
