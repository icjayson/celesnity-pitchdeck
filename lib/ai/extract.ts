/**
 * Trích xuất thẻ (M6) bằng structured outputs, theo cấu hình trích xuất của đúng deck đang hỏi.
 * Không có khóa / hết ngân sách / lỗi → quy tắc hoặc kết quả soạn sẵn của deck đó.
 */
import { z } from "zod";
import { budgetAvailable, recordUsage } from "./budget";
import type { CaseCard } from "@/decks/types";
import { extractOffline, type ExtractResult } from "./extractRules";
import { extractIncident, type IncidentResult } from "./incident";
import type { AssistantContext } from "./prompt";
import { completeJson, hasApiKey, OaiError } from "./openai";

export const EXTRACT_MAX_CHARS = 300;

export const CaseCardSchema = z.object({
  tram: z.string(),
  trieu_chung: z.string(),
  lo: z.string(),
  model: z.string().nullable(),
  muc_do: z.enum(["Thấp", "Trung bình", "Cao"]),
  thong_tin_con_thieu: z.array(z.string()),
  la_bao_loi: z.boolean(),
});

/** JSON Schema tương ứng CaseCardSchema (structured outputs, strict) */
const CASE_CARD_JSON_SCHEMA = {
  type: "object",
  properties: {
    tram: { type: "string" },
    trieu_chung: { type: "string" },
    lo: { type: "string" },
    model: { type: ["string", "null"] },
    muc_do: { type: "string", enum: ["Thấp", "Trung bình", "Cao"] },
    thong_tin_con_thieu: { type: "array", items: { type: "string" } },
    la_bao_loi: { type: "boolean" },
  },
  required: ["tram", "trieu_chung", "lo", "model", "muc_do", "thong_tin_con_thieu", "la_bao_loi"],
  additionalProperties: false,
};

/** Trích xuất một lời báo lỗi (deck kiểu "case"). Không bao giờ ném lỗi. */
export async function extractCase(ctx: AssistantContext, text: string): Promise<ExtractResult> {
  const fallback = ctx.extractFallback as Record<string, CaseCard>;
  const input = text.trim().slice(0, EXTRACT_MAX_CHARS);
  if (!hasApiKey() || !budgetAvailable(ctx.slug)) return extractOffline(input, fallback);
  try {
    const res = await completeJson<unknown>({
      system: ctx.extract.system,
      user: `<loi_bao>${input}</loi_bao>`,
      schemaName: "the_ho_so_loi",
      schema: CASE_CARD_JSON_SCHEMA,
    });
    recordUsage(res.usage, ctx.slug);
    const parsed = CaseCardSchema.safeParse(res.data);
    if (!parsed.success) return extractOffline(input, fallback);
    return { card: parsed.data, mode: "ai" };
  } catch (err) {
    if (err instanceof OaiError) console.error(`[extract] API error ${err.status}: ${err.message}`);
    else console.error("[extract] unexpected error", err);
    return extractOffline(input, fallback);
  }
}

/** Trích xuất theo kiểu của deck ("case" hoặc "incident") */
export async function extractCard(ctx: AssistantContext, text: string): Promise<ExtractResult | IncidentResult> {
  return ctx.extract.kind === "incident" ? extractIncident(ctx, text) : extractCase(ctx, text);
}
