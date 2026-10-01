/** Schema cho các hành động trợ lý được phép (dùng chung server và trình duyệt). */
import { z } from "zod";
import { sectionIds } from "@/content/content.vi";

export const actionSchemas = {
  scroll_to_section: z.object({ id: z.enum(sectionIds as [string, ...string[]]) }).strict(),
  open_use_case: z
    .object({ uc: z.enum(["UC0", "UC1", "UC2", "UC3", "UC4", "UC5", "nhan-rong", "thep"]) })
    .strict(),
  set_timeline_month: z.object({ month: z.number().int().min(1).max(12) }).strict(),
  set_calculator: z
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
    .strict(),
  run_simulation: z.object({ option: z.enum(["A", "B", "C", "ncc-moi"]) }).strict(),
} as const;

export type ActionName = keyof typeof actionSchemas;
export type ActionInput<N extends ActionName> = z.infer<(typeof actionSchemas)[N]>;
