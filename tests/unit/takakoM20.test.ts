import { describe, expect, it } from "vitest";
import { m20 } from "@/decks/takako-vietnam/scenarios";
import { takakoDeck } from "@/decks/takako-vietnam";

const roleIds = new Set(m20.roles.map((r) => r.id));
const ruleIds = new Set(m20.rules.map((r) => r.id));
const itemIds = new Set(m20.items.map((i) => i.id));

describe("Takako M20: dữ liệu Minder AI làm việc", () => {
  it("mỗi thẻ trỏ tới một quy tắc có thật và có ít nhất một nguồn", () => {
    for (const item of m20.items) {
      expect(ruleIds.has(item.ruleId), `${item.id} → ${item.ruleId}`).toBe(true);
      expect(item.sources.length, item.id).toBeGreaterThan(0);
    }
  });

  it("vai trò trong roles và restricted đều có trong danh sách vai trò", () => {
    for (const item of m20.items) {
      for (const r of item.roles) expect(roleIds.has(r), `${item.id}: ${r}`).toBe(true);
      for (const r of item.restricted ?? []) expect(roleIds.has(r.role), `${item.id}: ${r.role}`).toBe(true);
    }
  });

  it("phần ẩn theo vai trò chỉ trỏ tới mục có thật (hoặc cách tính)", () => {
    for (const item of m20.items) {
      const keys = new Set([...item.fields.map((f) => f.k), "calc"]);
      for (const r of item.restricted ?? []) for (const k of r.hideKeys ?? []) expect(keys.has(k), `${item.id}: ${k}`).toBe(true);
    }
  });

  it("trang bìa và demo quy tắc trỏ tới thẻ có thật; demo có output cho mọi ngưỡng", () => {
    for (const id of m20.coverIds) expect(itemIds.has(id), id).toBe(true);
    const demo = m20.items.find((i) => i.id === m20.ruleDemoId);
    expect(demo).toBeDefined();
    const rule = m20.rules.find((r) => r.id === demo!.ruleId);
    for (const t of rule!.threshold!.options) expect(demo!.byThreshold?.[t], t).toBeDefined();
  });

  it("cách tính cộng đúng: tổng các dòng đóng góp bằng dòng tổng", () => {
    const num = (v: string) => Number(v.replace(/[^\d,+-]/g, "").replace(",", ".")) || 0;
    for (const item of m20.items) {
      if (!item.calc) continue;
      const parts = item.calc.filter((c) => !c.total).reduce((s, c) => s + num(c.v), 0);
      const total = item.calc.find((c) => c.total);
      expect(total, item.id).toBeDefined();
      expect(parts).toBeCloseTo(num(total!.v), 5);
    }
  });

  it("người đặt quy tắc là vai trò, không phải tên cá nhân", () => {
    for (const r of m20.rules) expect(r.owner).toMatch(/^(Trưởng phòng|Kế toán trưởng|Giám đốc)/);
  });

  it("deck không dùng module của bộ Mô hình AI Thế giới thực; lõi bản đồ ghi Minder AI; có trợ lý", () => {
    expect(takakoDeck.features?.assistant).toBe(true);
    expect(takakoDeck.brand.coreLabel).toBe("Minder AI");
    const modules = takakoDeck.sections.flatMap((s) => s.blocks.flatMap((b) => (b.kind === "module" ? [b.id] : [])));
    const worldModel = ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M10", "M12", "M18", "M19"];
    expect(modules.filter((id) => worldModel.includes(id))).toEqual([]);
  });

  it("bản đồ M8 có đủ ba đảo và bảng ba giai đoạn", () => {
    expect(takakoDeck.islands).toHaveLength(3);
    const banDo = takakoDeck.sections.find((s) => s.id === "ban-do");
    expect(banDo?.details?.some((d) => d.title.startsWith("Bảng ba"))).toBe(true);
  });

  it("FAQ gợi ý nhanh trỏ tới câu hỏi có thật", () => {
    const ids = new Set(takakoDeck.faq.map((f) => f.id));
    for (const id of takakoDeck.quickFaqIds) expect(ids.has(id), id).toBe(true);
  });
});
