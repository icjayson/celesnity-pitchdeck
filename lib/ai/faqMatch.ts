/**
 * Tìm câu trả lời soạn sẵn gần nhất (so khớp từ khóa tiếng Việt đã bỏ dấu).
 * Thuần TypeScript, dùng được cả ở server (khi không có khóa API / hết ngân sách / lỗi)
 * và ở trình duyệt (khi offline).
 */
import { faq, type FaqItem } from "@/content/faq";
import { fold, tokens } from "./text";

export type FaqMatch = { item: FaqItem; score: number };

type Indexed = { item: FaqItem; qFold: string; bag: Set<string>; phrases: string[] };

const index: Indexed[] = faq.map((item) => ({
  item,
  qFold: fold(item.q),
  bag: new Set([...tokens(item.q), ...item.keywords.flatMap(tokens)]),
  phrases: item.keywords.map(fold).filter((k) => k.includes(" ")),
}));

/** Trọng số hiếm (IDF): từ xuất hiện ở ít câu hỏi thì có giá trị phân biệt cao hơn. */
const idf = new Map<string, number>();
{
  const df = new Map<string, number>();
  for (const it of index) for (const t of it.bag) df.set(t, (df.get(t) ?? 0) + 1);
  for (const [t, n] of df) idf.set(t, Math.log(1 + index.length / n));
}

/** Câu trả lời khi không tìm được câu soạn sẵn phù hợp */
export const genericFallback = {
  answer:
    "Celesnity chưa có câu trả lời soạn sẵn cho câu hỏi này. Quý vị có thể chọn một câu hỏi gợi ý, hoặc xem mục \"Xem chi tiết\" của từng phần trong đề xuất. Đội ngũ Celesnity sẵn sàng trả lời trực tiếp trong buổi làm việc.",
  section: null as string | null,
};

const MIN_SCORE = 3;
const MIN_COVERAGE = 0.35;

/** Trả về câu hỏi thường gặp gần nhất, hoặc null nếu độ khớp quá thấp. */
export function matchFaq(question: string): FaqMatch | null {
  const qf = fold(question);
  if (!qf) return null;
  const qt = [...new Set(tokens(question))];
  const maxIdf = Math.log(1 + index.length);
  const qMass = qt.reduce((m, t) => m + (idf.get(t) ?? maxIdf), 0) || 1;
  let best: FaqMatch | null = null;
  for (const it of index) {
    if (it.qFold === qf) return { item: it.item, score: 100 };
    let score = 0;
    for (const t of qt) if (it.bag.has(t)) score += idf.get(t) ?? 0;
    // Độ phủ: phần "khối lượng" từ khóa của câu hỏi khớp được với mục này
    const coverage = score / qMass;
    for (const p of it.phrases) if (` ${qf} `.includes(` ${p} `)) score += 1.5;
    if (coverage < MIN_COVERAGE) continue;
    if (!best || score > best.score) best = { item: it.item, score };
  }
  return best && best.score >= MIN_SCORE ? best : null;
}

/** Câu trả lời soạn sẵn (luôn có giá trị, dùng câu chung khi không khớp). */
export function fallbackAnswer(question: string): { answer: string; section: string | null; id: string | null } {
  const m = matchFaq(question);
  if (!m) return { ...genericFallback, id: null };
  return { answer: m.item.a, section: m.item.section, id: m.item.id };
}
