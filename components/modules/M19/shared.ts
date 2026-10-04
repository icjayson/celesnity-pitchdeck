import type { GenealogyData } from "@/decks/types";

export type Group = GenealogyData["defect"]["nodes"][number]["group"];
export type DefectNode = GenealogyData["defect"]["nodes"][number];
export type Vehicle = GenealogyData["vehicles"][number];
export type Lot = GenealogyData["lots"][number];
export type Loc = Lot["vins"][number]["location"];

export const LOCS: Loc[] = ["plant", "dealer", "customer"];

/** Màu theo nhóm nút: xe (navy), quy trình (blue-600), linh kiện (blue-400), con người (orange), lịch sử (ink). */
export const GROUP: Record<Group, { name: string; dot: string; ring: string; stroke: string }> = {
  xe: { name: "Xe", dot: "bg-navy-900", ring: "border-navy-900", stroke: "var(--color-navy-900)" },
  "quy-trinh": { name: "Quy trình", dot: "bg-blue-600", ring: "border-blue-600", stroke: "var(--color-blue-600)" },
  "linh-kien": { name: "Linh kiện", dot: "bg-blue-400", ring: "border-blue-400", stroke: "var(--color-blue-400)" },
  "con-nguoi": { name: "Con người", dot: "bg-orange-500", ring: "border-orange-500", stroke: "var(--color-orange-500)" },
  "lich-su": { name: "Lịch sử", dot: "bg-ink-500", ring: "border-ink-500", stroke: "var(--color-ink-500)" },
};

/** Thứ tự xếp theo chiều kim đồng hồ: xe ở trên, linh kiện bên phải, lịch sử và con người ở dưới, quy trình bên trái. */
export const GROUP_ORDER: Group[] = ["xe", "linh-kien", "lich-su", "con-nguoi", "quy-trinh"];

/** Vị trí tâm (phần trăm) của 12 nút. side "l"/"r" bám mép trái/phải, "c" canh giữa theo x. */
export type Slot = { side: "l" | "r" | "c"; x: number; y: number };
export const SLOTS: Slot[] = [
  { side: "c", x: 35, y: 8 },
  { side: "c", x: 65, y: 8 },
  { side: "r", x: 92, y: 30 },
  { side: "r", x: 92, y: 50 },
  { side: "r", x: 92, y: 70 },
  { side: "c", x: 86, y: 92 },
  { side: "c", x: 62, y: 92 },
  { side: "c", x: 38, y: 92 },
  { side: "c", x: 14, y: 92 },
  { side: "l", x: 8, y: 70 },
  { side: "l", x: 8, y: 50 },
  { side: "l", x: 8, y: 30 },
];

export function sortByGroup(nodes: DefectNode[]): DefectNode[] {
  return [...nodes].sort((a, b) => GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group));
}

export const FADE_CSS = `@keyframes m19-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.m19-in{animation:m19-in 320ms cubic-bezier(.22,1,.36,1) both}`;
