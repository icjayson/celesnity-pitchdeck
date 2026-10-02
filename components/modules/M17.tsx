"use client";
/** M17 — Thang năng lực của đội ngũ IT của Hòa Phát: 3 bậc dạng bậc thang + nguyên tắc chia vai. */
import { ArrowUpRight, BadgeCheck, Wrench } from "lucide-react";

const levels = [
  {
    n: 1,
    name: "Vận hành",
    when: "T+4–T+8",
    can: "Chạy luồng dữ liệu, giám sát mô hình, quản trị người dùng, xử lý sự cố thường gặp",
    test: "Tự chạy 1 vòng (T+4) → tự vận hành 4 tuần (T+8)",
    tone: "l1",
  },
  {
    n: 2,
    name: "Tự huấn luyện lại",
    when: "T+12",
    can: "Cập nhật mô hình riêng bằng dữ liệu mới, chấm trên bộ đề, quyết định phát hành phiên bản",
    test: "Tự huấn luyện lại không cần hỗ trợ, kết quả không kém phiên bản trước",
    tone: "l2",
  },
  {
    n: 3,
    name: "Đồng huấn luyện",
    when: "Năm thứ 2",
    can: "Đóng góp vào mô hình nền chung, cùng thiết kế bộ đề thi, đồng tác giả báo cáo kỹ thuật, dẫn dắt mở rộng sang thép",
    test: "Một vòng đóng góp qua kiểm thử bảo mật",
    tone: "l3",
  },
] as const;

const tones = {
  l1: { card: "bg-white border-line-200 text-navy-900", badge: "bg-blue-100 text-blue-600", muted: "text-ink-500", test: "bg-mist-50", bar: "bg-blue-300" },
  l2: { card: "bg-navy-900 border-navy-900 text-white", badge: "bg-white/10 text-blue-300", muted: "text-blue-300", test: "bg-white/5", bar: "bg-blue-500" },
  l3: { card: "bg-orange-500 border-orange-500 text-navy-900", badge: "bg-navy-900 text-white", muted: "text-navy-900/75", test: "bg-white/30", bar: "bg-navy-900" },
};

export default function M17(_props: { variant?: string }) {
  return (
    <div className="flex flex-col gap-8">
      {/* Bậc thang: thẻ sau cao hơn thẻ trước */}
      <ol className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
        {levels.map((l, i) => {
          const t = tones[l.tone];
          return (
            <li key={l.n} className="relative" style={{ paddingTop: `${(levels.length - 1 - i) * 40}px` }}>
              <article
                className={`relative flex h-full flex-col gap-5 overflow-hidden rounded-[var(--radius-card)] border p-6 shadow-[0_24px_50px_-34px_rgba(10,31,68,0.55)] ${t.card}`}
                style={{ minHeight: 320 + i * 40 }}
              >
                {l.tone !== "l1" ? (
                  <span aria-hidden className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl ${l.tone === "l2" ? "bg-blue-500/30" : "bg-white/35"}`} />
                ) : null}
                <div className="relative flex items-center justify-between gap-3">
                  <span className={`rounded-full px-3 py-1 text-[12px] font-semibold tracking-[0.06em] ${t.badge}`}>Bậc {l.n}</span>
                  <span className={`tabular text-[13px] font-semibold ${t.muted}`}>{l.when}</span>
                </div>
                <div className="relative flex items-end gap-3">
                  <span className="tabular text-[56px] font-semibold leading-none tracking-[-0.04em] opacity-90">{l.n}</span>
                  <h4 className="pb-1 text-[22px] font-semibold leading-tight tracking-[-0.01em]">{l.name}</h4>
                </div>
                {/* thanh độ tự chủ */}
                <div aria-hidden className="relative flex gap-1">
                  {levels.map((_, j) => (
                    <span key={j} className={`h-1.5 flex-1 rounded-full ${j <= i ? t.bar : l.tone === "l1" ? "bg-line-200" : "bg-white/20"}`} />
                  ))}
                </div>
                <div className="relative flex flex-col gap-1.5">
                  <p className={`flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] ${t.muted}`}>
                    <Wrench aria-hidden size={13} strokeWidth={1.5} /> Làm được
                  </p>
                  <p className="text-[15px] leading-relaxed">{l.can}</p>
                </div>
                <div className={`relative mt-auto flex items-start gap-2.5 rounded-[12px] p-3.5 ${t.test}`}>
                  <BadgeCheck aria-hidden size={18} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                  <div>
                    <p className={`text-[12px] font-semibold uppercase tracking-[0.08em] ${t.muted}`}>Bài kiểm tra</p>
                    <p className="text-[14px] font-medium leading-snug">{l.test}</p>
                  </div>
                </div>
              </article>
              {i < levels.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute -right-[18px] top-1/2 z-10 hidden h-8 w-8 items-center justify-center rounded-full border border-line-200 bg-white text-navy-900 shadow-sm md:flex"
                >
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>

    </div>
  );
}
