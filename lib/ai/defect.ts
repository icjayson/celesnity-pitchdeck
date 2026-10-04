/**
 * Trích xuất hồ sơ lỗi xe (M6 kiểu "defect"): lời công nhân / QA báo lỗi trên chuyền lắp ráp → DefectCard gắn VIN.
 * AI (structured outputs) khi có khóa và ngân sách; còn lại: câu mẫu → kết quả soạn sẵn, câu khác → quy tắc.
 * Phần quy tắc thuần TypeScript, chạy được ở server và trình duyệt. Quy tắc KHÔNG phải AI: UI ghi nhãn trung thực.
 */
import { z } from "zod";
import type { DefectCard } from "@/decks/types";
import { budgetAvailable, recordUsage } from "./budget";
import { defectOffline, type DefectResult } from "./defectRules";
import { completeJson, hasApiKey, OaiError } from "./openai";
import type { AssistantContext } from "./prompt";

export type { DefectMode, DefectResult } from "./defectRules";

const MAX = 300;

export const DefectCardSchema = z.object({
  vin: z.string(),
  model: z.string(),
  cong_doan: z.enum(["BODY", "PAINT", "TRIM", "CHASSIS", "QC", ""]),
  tram: z.string(),
  linh_kien: z.string(),
  trieu_chung: z.string(),
  lo: z.string(),
  do_ga: z.string(),
  ca: z.string(),
  muc_do: z.enum(["Thấp", "Trung bình", "Cao"]),
  thong_tin_con_thieu: z.array(z.string()),
  la_bao_loi: z.boolean(),
});

const DEFECT_JSON_SCHEMA = {
  type: "object",
  properties: {
    vin: { type: "string" },
    model: { type: "string" },
    cong_doan: { type: "string", enum: ["BODY", "PAINT", "TRIM", "CHASSIS", "QC", ""] },
    tram: { type: "string" },
    linh_kien: { type: "string" },
    trieu_chung: { type: "string" },
    lo: { type: "string" },
    do_ga: { type: "string" },
    ca: { type: "string" },
    muc_do: { type: "string", enum: ["Thấp", "Trung bình", "Cao"] },
    thong_tin_con_thieu: { type: "array", items: { type: "string" } },
    la_bao_loi: { type: "boolean" },
  },
  required: ["vin", "model", "cong_doan", "tram", "linh_kien", "trieu_chung", "lo", "do_ga", "ca", "muc_do", "thong_tin_con_thieu", "la_bao_loi"],
  additionalProperties: false,
};

/** Trích xuất một lời báo lỗi xe. Không bao giờ ném lỗi. */
export async function extractDefect(ctx: AssistantContext, text: string): Promise<DefectResult> {
  const fallback = ctx.extractFallback as Record<string, DefectCard>;
  const input = text.trim().slice(0, MAX);
  if (!hasApiKey() || !budgetAvailable(ctx.slug)) return defectOffline(input, fallback);
  try {
    const res = await completeJson<unknown>({
      system: ctx.extract.system,
      user: `<bao_loi>${input}</bao_loi>`,
      schemaName: "the_ho_so_loi_xe",
      schema: DEFECT_JSON_SCHEMA,
    });
    recordUsage(res.usage, ctx.slug);
    const parsed = DefectCardSchema.safeParse(res.data);
    if (!parsed.success) return defectOffline(input, fallback);
    return { card: { ...parsed.data, thong_tin_con_thieu: parsed.data.thong_tin_con_thieu.slice(0, 4) }, mode: "ai" };
  } catch (err) {
    if (err instanceof OaiError) console.error(`[extract] API error ${err.status}: ${err.message}`);
    else console.error("[extract] unexpected error", err);
    return defectOffline(input, fallback);
  }
}
