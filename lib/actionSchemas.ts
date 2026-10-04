/**
 * Schema cho các hành động trợ lý được phép.
 * - Trình duyệt dùng `actionSchemas` (chung, chỉ kiểm tra kiểu): deck nào cũng chỉ có section và use case của mình trên trang.
 * - Server dùng `deckActionSchemas(...)`: enum đúng section và use case của deck đang hỏi, nên trợ lý của khách hàng này
 *   không thể trỏ tới nội dung của khách hàng khác.
 */
import { z } from "zod";

const calculator = z
  .object({
    volumePerYear: z.number().positive().max(10_000_000).optional(),
    escapeRatePct: z.number().min(0).max(20).optional(),
    costPerEscape: z.number().min(0).max(100_000_000).optional(),
    extraCatchShare: z.number().min(0).max(1).optional(),
    volumePerMonth: z.number().positive().max(1_000_000).optional(),
    earlyWeeks: z.number().min(0).max(52).optional(),
    warrantyRatePct: z.number().min(0).max(30).optional(),
    costPerClaim: z.number().min(0).max(100_000_000).optional(),
    programCostPerYear: z.number().min(0).max(100_000_000_000).optional(),
  })
  .strict();

export const actionSchemas = {
  scroll_to_section: z.object({ id: z.string().min(1).max(64) }).strict(),
  open_use_case: z.object({ uc: z.string().min(1).max(32) }).strict(),
  set_timeline_month: z.object({ month: z.number().int().min(1).max(12) }).strict(),
  set_calculator: calculator,
  run_simulation: z.object({ option: z.enum(["A", "B", "C", "ncc-moi"]) }).strict(),
} as const;

export type ActionName = keyof typeof actionSchemas;
export type ActionInput<N extends ActionName> = z.infer<(typeof actionSchemas)[N]>;

const asEnum = (xs: string[]) => z.enum((xs.length ? xs : ["_"]) as [string, ...string[]]);

/** Schema chặt theo deck (server) */
export function deckActionSchemas(sectionIds: string[], useCaseIds: string[]) {
  return {
    ...actionSchemas,
    scroll_to_section: z.object({ id: asEnum(sectionIds) }).strict(),
    open_use_case: z.object({ uc: asEnum(useCaseIds) }).strict(),
  } as const;
}
