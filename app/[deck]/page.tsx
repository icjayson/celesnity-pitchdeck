import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDeck } from "@/decks/registry";
import { Section, ThemeSeam } from "@/components/shared/Section";
import { SiteChrome } from "@/components/shared/SiteChrome";
import { PresenterMode } from "@/components/presenter/PresenterMode";
import { Assistant } from "@/components/assistant/Assistant";

export default async function Page({ params }: { params: Promise<{ deck: string }> }) {
  const deck = getDeck((await params).deck);
  if (!deck) notFound();
  const { meta, sections, acts, basePath } = deck;
  return (
    <>
      <SiteChrome />
      <main>
        {sections.map((s, i) => {
          const prev = sections[i - 1];
          const firstOfAct = s.act > 0 && prev?.act !== s.act;
          return (
            <Fragment key={s.id}>
              {prev ? <ThemeSeam from={prev.theme} to={s.theme} /> : null}
              <Section s={s} acts={acts} partner={deck.party.short} firstOfAct={firstOfAct} />
            </Fragment>
          );
        })}
      </main>
      <footer className="theme-dark grain" data-hide-in-presenter>
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-12 text-[14px] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="font-medium tracking-[0.04em]">{meta.footer}</p>
          <div className="muted flex gap-6">
            <Link href={`${basePath}/phu-luc`} className="hover:text-white">
              Phụ lục
            </Link>
            <Link href={`${basePath}/ban-in`} className="hover:text-white">
              Bản in / PDF
            </Link>
          </div>
        </div>
      </footer>
      <PresenterMode />
      {deck.features?.assistant === false ? null : <Assistant />}
    </>
  );
}
