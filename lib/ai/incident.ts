/**
 * Trích xuất thẻ sự cố (M6 kiểu "incident"): lời trưởng ca báo một sự cố trên dây chuyền → IncidentCard.
 * AI (structured outputs) khi có khóa và ngân sách; còn lại: câu mẫu → kết quả soạn sẵn, câu khác → quy tắc.
 * Phần quy tắc thuần TypeScript, chạy được ở server và trình duyệt. Quy tắc KHÔNG phải AI: UI ghi nhãn trung thực.
 */
import { z } from "zod";
import type { IncidentCard } from "@/decks/types";
import { budgetAvailable, recordUsage } from "./budget";
import { incidentOffline, type IncidentResult } from "./incidentRules";
import { completeJson, hasApiKey, OaiError } from "./openai";
import type { AssistantContext } from "./prompt";

export type { IncidentMode, IncidentResult } from "./incidentRules";

const MAX = 300;

export const IncidentCardSchema = z.object({
  khu_vuc: z.string(),
  su_co: z.string(),
  thoi_gian: z.string(),
  day_chuyen: z.string(),
  lo: z.string(),
  muc_do: z.enum(["Thấp", "Trung bình", "Cao"]),
  thong_tin_con_thieu: z.array(z.string()),
  la_su_co: z.boolean(),
});

const INCIDENT_JSON_SCHEMA = {
  type: "object",
  properties: {
    khu_vuc: { type: "string" },
    su_co: { type: "string" },
    thoi_gian: { type: "string" },
    day_chuyen: { type: "string" },
    lo: { type: "string" },
    muc_do: { type: "string", enum: ["Thấp", "Trung bình", "Cao"] },
    thong_tin_con_thieu: { type: "array", items: { type: "string" } },
    la_su_co: { type: "boolean" },
  },
  required: ["khu_vuc", "su_co", "thoi_gian", "day_chuyen", "lo", "muc_do", "thong_tin_con_thieu", "la_su_co"],
  additionalProperties: false,
};

/** Trích xuất một lời báo sự cố. Không bao giờ ném lỗi. */
export async function extractIncident(ctx: AssistantContext, text: string): Promise<IncidentResult> {
  const fallback = ctx.extractFallback as Record<string, IncidentCard>;
  const input = text.trim().slice(0, MAX);
  if (!hasApiKey() || !budgetAvailable(ctx.slug)) return incidentOffline(input, fallback);
  try {
    const res = await completeJson<unknown>({
      system: ctx.extract.system,
      user: `<bao_su_co>${input}</bao_su_co>`,
      schemaName: "the_su_co",
      schema: INCIDENT_JSON_SCHEMA,
    });
    recordUsage(res.usage, ctx.slug);
    const parsed = IncidentCardSchema.safeParse(res.data);
    if (!parsed.success) return incidentOffline(input, fallback);
    return { card: parsed.data, mode: "ai" };
  } catch (err) {
    if (err instanceof OaiError) console.error(`[extract] API error ${err.status}: ${err.message}`);
    else console.error("[extract] unexpected error", err);
    return incidentOffline(input, fallback);
  }
}
