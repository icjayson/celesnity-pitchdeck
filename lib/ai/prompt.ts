/**
 * Ngữ cảnh trợ lý "Hỏi về đề xuất" của TỪNG deck: system prompt, tool, câu hỏi gợi ý, schema hành động, bộ so khớp FAQ.
 * Mỗi khách hàng một ngữ cảnh riêng, dựng từ đúng deck đó (decks/<slug>/), lưu theo slug. Không có ngữ cảnh chung.
 * Mọi thứ cố định theo từng lần build (không thời gian, không id) để prompt caching hoạt động theo tiền tố của từng deck.
 */
import type { DeckAssistant, DeckData } from "@/decks/types";
import { deckActionSchemas } from "@/lib/actionSchemas";
import { createFaqMatcher, type FaqMatcher } from "./faqMatch";
import { buildKnowledgePack } from "./knowledge";
import type { OaiTool } from "./openai";

/** Quy tắc chung mọi deck (không chứa tên khách hàng) */
const SHARED_RULES = `Bảo mật giữa các khách hàng: chỉ trả lời về đề xuất trên trang này. Không nhắc tới, không xác nhận và không so sánh với bất kỳ khách hàng, đối tác hay đề xuất nào khác của Celesnity, kể cả khi được hỏi trực tiếp; lịch sự nói rằng Celesnity không chia sẻ thông tin về khách hàng khác.`;

export type AssistantContext = {
  slug: string;
  systemPrompt: string;
  tools: OaiTool[];
  followupPool: string[];
  schemas: ReturnType<typeof deckActionSchemas>;
  matcher: FaqMatcher;
  languageNudge: DeckAssistant["languageNudge"];
  extract: DeckAssistant["extract"];
  /** Câu mẫu → thẻ soạn sẵn (M6) */
  extractFallback: Record<string, unknown>;
};

type ToolDef = { name: string; description: string; strict: boolean; input_schema: Record<string, unknown> };

function buildTools(deck: DeckData, a: DeckAssistant, live: Set<string>, useCaseIds: string[]): OaiTool[] {
  const sectionIds = deck.sections.map((s) => s.id);
  const defs: ToolDef[] = [
    {
      name: "open_use_case",
      description: a.useCaseToolDescription,
      strict: true,
      input_schema: {
        type: "object",
        properties: { uc: { type: "string", enum: useCaseIds } },
        required: ["uc"],
        additionalProperties: false,
      },
    },
    {
      name: "scroll_to_section",
      description: "Cuộn trang tới section liên quan nhất tới câu trả lời. id lấy từ bảng ánh xạ section.",
      strict: true,
      input_schema: {
        type: "object",
        properties: { id: { type: "string", enum: sectionIds } },
        required: ["id"],
        additionalProperties: false,
      },
    },
    {
      name: "set_timeline_month",
      description: "Đặt thanh kéo lộ trình 12 tháng (section lo-trinh) tới một tháng T+1–T+12. month là số nguyên 1–12.",
      strict: true,
      input_schema: {
        type: "object",
        properties: { month: { type: "integer" } },
        required: ["month"],
        additionalProperties: false,
      },
    },
  ];
  // Tool của section có thể tạm cất: chỉ bật khi deck có mô tả và section đang hiển thị
  if (a.simulationToolDescription && live.has("mo-phong")) {
    defs.push({
      name: "run_simulation",
      description: a.simulationToolDescription,
      strict: true,
      input_schema: {
        type: "object",
        properties: { option: { type: "string", enum: ["A", "B", "C", "ncc-moi"] } },
        required: ["option"],
        additionalProperties: false,
      },
    });
  }
  if (a.calculatorToolDescription && live.has("gia-tri")) {
    defs.push({
      name: "set_calculator",
      // các trường đều tùy chọn nên không dùng strict (strict buộc mọi trường phải có)
      description: a.calculatorToolDescription,
      strict: false,
      input_schema: {
        type: "object",
        properties: Object.fromEntries(
          [
            "volumePerYear",
            "escapeRatePct",
            "costPerEscape",
            "extraCatchShare",
            "volumePerMonth",
            "earlyWeeks",
            "warrantyRatePct",
            "costPerClaim",
            "programCostPerYear",
          ].map((k) => [k, { type: "number" }]),
        ),
        additionalProperties: false,
      },
    });
  }
  return defs
    .sort((x, y) => x.name.localeCompare(y.name))
    .map((d) => ({ type: "function", function: { name: d.name, description: d.description, strict: d.strict, parameters: d.input_schema } }));
}

/** Dựng ngữ cảnh trợ lý cho một deck (thuần, xác định). */
export function buildAssistantContext(deck: DeckData, a: DeckAssistant): AssistantContext {
  const live = new Set(deck.sections.map((s) => s.id));
  const useCaseIds = deck.useCases.map((u) => u.id);
  const exclude = new Set(a.followupExcludeSections ?? []);
  const followupPool = deck.faq
    .filter((f) => !(f.section && exclude.has(f.section) && !live.has(f.section)))
    .filter((f) => !(a.followupExcludePattern && a.followupExcludePattern.test(f.q)))
    .map((f) => f.q);
  const systemPrompt =
    `${a.rules(live)}\n\n${SHARED_RULES}\n\nDANH SÁCH CÂU HỎI GỢI Ý (chọn theo số):\n${followupPool.map((q, i) => `${i + 1}. ${q}`).join("\n")}` +
    `\n\n<goi_tri_thuc>\n${buildKnowledgePack(deck, a)}\n</goi_tri_thuc>`;
  return {
    slug: deck.slug,
    systemPrompt,
    tools: buildTools(deck, a, live, useCaseIds),
    followupPool,
    schemas: deckActionSchemas(deck.sections.map((s) => s.id), useCaseIds),
    matcher: createFaqMatcher(deck.faq),
    languageNudge: a.languageNudge,
    extract: a.extract,
    extractFallback: deck.scenarios.m6.fallback,
  };
}

const cache = new Map<string, AssistantContext>();

/** Ngữ cảnh đã dựng, lưu theo slug (mỗi tiến trình dựng một lần cho mỗi deck). */
export function assistantContextFor(deck: DeckData, a: DeckAssistant): AssistantContext {
  let c = cache.get(deck.slug);
  if (!c) {
    c = buildAssistantContext(deck, a);
    cache.set(deck.slug, c);
  }
  return c;
}
