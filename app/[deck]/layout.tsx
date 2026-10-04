import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { deckSlugs, getDeck } from "@/decks/registry";
import { DeckProvider } from "@/components/deck/DeckProvider";

type Props = { children: React.ReactNode; params: Promise<{ deck: string }> };

/** Chỉ các deck có trong registry; slug lạ → 404 */
export const dynamicParams = false;
export function generateStaticParams() {
  return deckSlugs.map((deck) => ({ deck }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const deck = getDeck((await params).deck);
  if (!deck) return {};
  return { title: deck.meta.title, description: deck.meta.description, robots: { index: false, follow: false } };
}

/** Mỗi deck chỉ đưa đúng dữ liệu của mình xuống trình duyệt */
export default async function DeckLayout({ children, params }: Props) {
  const deck = getDeck((await params).deck);
  if (!deck) notFound();
  return <DeckProvider deck={deck}>{children}</DeckProvider>;
}
