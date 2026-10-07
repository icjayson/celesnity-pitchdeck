"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { List, X, FileDown, BookOpen, Presentation, Handshake } from "lucide-react";
import { useDeck } from "@/components/deck/DeckProvider";
import { plainText } from "./RichText";
import { scrollToSection } from "@/lib/actions";

/** Mục lục bên trái (thu gọn được) và thanh tiến độ chia 3 hồi. */
export function SiteChrome() {
  const { acts, sections, basePath, quickLink } = useDeck();
  const [active, setActive] = useState<string>(sections[0].id);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(Math.min(1, h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Nhóm mục lục theo đúng thứ tự trên trang: các section liền nhau cùng hồi gộp một nhóm
  const tocGroups = sections.reduce<{ act: number; list: typeof sections }[]>((acc, s) => {
    const last = acc[acc.length - 1];
    if (last && last.act === s.act) last.list.push(s);
    else acc.push({ act: s.act, list: [s] });
    return acc;
  }, []);
  const activeSection = sections.find((s) => s.id === active);
  const darkNow = activeSection?.theme === "dark" || activeSection?.theme === "navy";

  return (
    <div data-hide-in-print>
      {/* Thanh tiến độ: 3 hồi */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-1 gap-1 bg-transparent" aria-hidden>
        {acts.map((a) => {
          const ids = sections.filter((s) => s.act === a.n).map((s) => s.id);
          const firstIdx = sections.findIndex((s) => s.id === ids[0]);
          const lastIdx = sections.findIndex((s) => s.id === ids[ids.length - 1]);
          const start = firstIdx / sections.length;
          const end = (lastIdx + 1) / sections.length;
          const fill = Math.max(0, Math.min(1, (progress - start) / (end - start)));
          return (
            <div key={a.n} className="h-full flex-1 bg-blue-300/25">
              <div className="h-full bg-orange-500 transition-[width] duration-200" style={{ width: `${fill * 100}%` }} />
            </div>
          );
        })}
      </div>

      {/* Nút mở mục lục */}
      <div className="fixed left-4 top-4 z-40 flex items-center gap-2" data-hide-in-presenter>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="toc"
          className={`flex h-10 items-center gap-2 rounded-[var(--radius-control)] border px-3 text-[14px] font-medium backdrop-blur transition-colors ${
            darkNow
              ? "border-white/15 bg-navy-900/70 text-white hover:bg-navy-800"
              : "border-line-200 bg-white/85 text-navy-900 hover:bg-mist-50"
          }`}
        >
          {open ? <X size={16} strokeWidth={1.5} aria-hidden /> : <List size={16} strokeWidth={1.5} aria-hidden />}
          <span>Mục lục</span>
        </button>
        {quickLink ? (
          <button
            type="button"
            onClick={() => {
              scrollToSection(quickLink.section);
              setOpen(false);
            }}
            className="flex h-10 items-center gap-2 rounded-[var(--radius-control)] bg-orange-500 px-3.5 text-[14px] font-semibold text-navy-900 shadow-[0_10px_24px_-12px_rgba(232,98,10,0.7)] transition-colors hover:bg-orange-600"
          >
            <Handshake size={16} strokeWidth={1.75} aria-hidden />
            <span>{quickLink.label}</span>
          </button>
        ) : null}
      </div>

      {open ? (
        <nav
          id="toc"
          aria-label="Mục lục"
          className="fixed bottom-4 left-4 top-16 z-40 w-[min(360px,calc(100vw-32px))] overflow-y-auto rounded-[var(--radius-card)] border border-line-200 bg-white p-5 text-navy-900 shadow-[0_24px_60px_-20px_rgba(10,31,68,0.35)]"
        >
          <ol className="flex flex-col gap-1 text-[14px]">
            {tocGroups.map(({ act: n, list }, gi) => {
              return (
                <li key={`${n}-${gi}`} className="mb-3">
                  {n > 0 ? (
                    <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-orange-700">
                      {acts[n - 1].label} {acts[n - 1].title}
                    </p>
                  ) : null}
                  <ol className="flex flex-col">
                    {list.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => {
                            scrollToSection(s.id);
                            setOpen(false);
                          }}
                          aria-current={active === s.id ? "true" : undefined}
                          className={`w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-blue-100 ${
                            active === s.id ? "bg-blue-100 font-medium text-blue-600" : ""
                          }`}
                        >
                          {plainText(s.eyebrow)}
                        </button>
                      </li>
                    ))}
                  </ol>
                </li>
              );
            })}
          </ol>
          <div className="mt-2 flex flex-col gap-1 border-t border-line-200 pt-4 text-[14px]">
            <Link href={`${basePath}/phu-luc`} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-mist-50">
              <BookOpen size={16} strokeWidth={1.5} aria-hidden /> Phụ lục
            </Link>
            <Link href={`${basePath}/ban-in`} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-mist-50">
              <FileDown size={16} strokeWidth={1.5} aria-hidden /> Bản in / PDF
            </Link>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                window.dispatchEvent(new CustomEvent("landing:presenter-toggle"));
              }}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-mist-50"
            >
              <Presentation size={16} strokeWidth={1.5} aria-hidden /> Chế độ trình chiếu (phím P)
            </button>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
