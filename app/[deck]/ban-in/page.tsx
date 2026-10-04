import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDeck } from "@/decks/registry";
import { Section } from "@/components/shared/Section";
import { Blocks } from "@/components/shared/Blocks";
import { RichText } from "@/components/shared/RichText";
import { PrintTrigger } from "./PrintTrigger";

type Props = { params: Promise<{ deck: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const deck = getDeck((await params).deck);
  return { title: deck ? `Bản in · ${deck.meta.title}` : "Bản in", robots: { index: false, follow: false } };
}

/** Bản in: toàn bộ nội dung, mọi lớp chi tiết đều mở, nền sáng. Nguồn cho `npm run pdf`. */
export default async function PrintVersion({ params }: Props) {
  const deck = getDeck((await params).deck);
  if (!deck) notFound();
  const { appendix, closing, meta, sections, acts, basePath } = deck;
  return (
    <main className="theme-light" data-print-root>
      <div className="mx-auto flex max-w-[1040px] items-center justify-between gap-4 px-4 pt-8 sm:px-8" data-hide-in-print>
        <Link href={basePath} className="text-[14px] font-medium text-blue-600">
          Về trang chính
        </Link>
        <PrintTrigger />
      </div>
      {sections.map((s) => (
        <div key={s.id} className="print-section">
          <Section s={{ ...s, theme: s.theme === "dark" || s.theme === "navy" ? "light" : s.theme, layout: "default" }} acts={acts} partner={deck.party.short} printMode />
        </div>
      ))}
      <section className="theme-light">
        <div className="mx-auto flex max-w-[1040px] flex-col gap-4 px-4 pb-24 sm:px-8">
          <h2 className="text-[28px] font-semibold tracking-[-0.02em]">
            <RichText text={closing.headline} />
          </h2>
          <p className="muted">{closing.lead}</p>
          <blockquote className="max-w-[68ch] text-[18px]">{closing.story}</blockquote>
          <p className="font-semibold">{closing.tagline}</p>
          <p className="font-semibold text-orange-700">{closing.owner}</p>
          <p>{closing.thanks}</p>
        </div>
      </section>
      <section className="theme-mist">
        <div className="mx-auto flex max-w-[1040px] flex-col gap-16 px-4 py-24 sm:px-8">
          <h2 className="text-[32px] font-semibold tracking-[-0.02em]">Phụ lục</h2>
          {appendix.map((a) => (
            <div key={a.id} className="flex flex-col gap-6">
              <h3 className="text-[24px] font-semibold">
                <RichText text={a.title} />
              </h3>
              <Blocks blocks={a.blocks} skipModules partner={deck.party.short} />
            </div>
          ))}
          <p className="muted text-[14px]">{meta.footer}</p>
        </div>
      </section>
    </main>
  );
}
