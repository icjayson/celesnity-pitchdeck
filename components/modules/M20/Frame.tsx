"use client";
/**
 * Khung giao diện Minder AI cho M20: thanh trên (logo, tên sản phẩm, ngày, nhãn mô phỏng) và thanh bên.
 * Phong cách lấy theo giao diện Minder Platform; token nằm trong .minder-frame (app/globals.css).
 */
import type { ReactNode } from "react";
import { Activity, Calculator, DraftingCompass, FlaskConical, Inbox, ListChecks } from "lucide-react";

/** Thứ tự icon khớp thứ tự nhãn thanh bên trong deck (copy.sidebar) */
const SIDEBAR_ICONS = [Inbox, Calculator, Activity, DraftingCompass, ListChecks];

/** Logo mark: nền navy, hai quỹ đạo cắt nhau và ngôi sao bốn cánh */
export function LogoMark({ size = 24 }: { size?: number }) {
  return (
    <svg aria-hidden focusable="false" width={size} height={size} viewBox="0 0 256 256" fill="none" className="shrink-0 rounded-[7px]">
      <rect width="256" height="256" fill="#07002e" />
      <g fill="none" stroke="#ffffff" strokeWidth="3.8">
        <ellipse cx="128" cy="127" rx="31" ry="85" transform="rotate(42 128 127)" />
        <ellipse cx="131" cy="129" rx="40" ry="78" transform="rotate(58 131 129)" />
      </g>
      <path d="M 145 122 Q 148 155 181 158 Q 148 161 145 194 Q 142 161 109 158 Q 142 155 145 122 Z" fill="#ffffff" />
    </svg>
  );
}

export function Frame({
  product,
  dayLabel,
  simLabel,
  sidebar,
  active,
  children,
  className = "",
}: {
  product: string;
  dayLabel: string;
  simLabel: string;
  /** Nhãn thanh bên; không đặt thì không có thanh bên */
  sidebar?: string[];
  /** Mục đang chọn trên thanh bên */
  active?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`minder-frame relative overflow-hidden rounded-[16px] text-left shadow-[0_40px_90px_-40px_rgba(6,20,46,0.6),0_0_0_1px_rgba(0,0,0,0.06)] ${className}`}
    >
      <div className="mf-canvas mf-line flex h-11 items-center gap-2.5 border-b px-4">
        <LogoMark size={24} />
        <span className="text-[14px] font-semibold tracking-[-0.01em]">{product}</span>
        <span aria-hidden className="mf-muted">
          ·
        </span>
        <span className="mf-muted truncate text-[13px]">{dayLabel}</span>
        <span className="mf-muted-bg mf-muted ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11.5px] font-medium">
          <FlaskConical aria-hidden size={12} strokeWidth={1.5} />
          {simLabel}
        </span>
      </div>
      <div className="flex">
        {sidebar ? (
          // Thanh bên chỉ để minh họa (không có thao tác): ẩn với trình đọc màn hình
          <ul aria-hidden className="mf-canvas mf-line hidden w-[184px] shrink-0 flex-col gap-0.5 border-r p-2 md:flex">
            {sidebar.map((s, i) => {
              const Icon = SIDEBAR_ICONS[i] ?? Inbox;
              const on = i === active;
              return (
                <li key={s} className={`flex h-9 items-center gap-2.5 rounded-[10px] px-2.5 text-[13.5px] ${on ? "mf-selected font-semibold" : "mf-muted"}`}>
                  <Icon size={16} strokeWidth={1.5} />
                  {s}
                </li>
              );
            })}
          </ul>
        ) : null}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
