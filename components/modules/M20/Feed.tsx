"use client";
/**
 * M20 biến thể "feed" (#mot-ngay): một ngày Minder AI gửi gì, cho ai, theo quy tắc nào.
 * Đổi vai trò để thấy phân quyền; bấm quy tắc để xem quy tắc do quản lý đặt; Xác nhận · Không đúng · Không cần; Hỏi thêm.
 */
import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import type { FeedScenario } from "@/decks/types";
import { Frame } from "./Frame";
import { LockedCard, OutputCard, type Feedback } from "./OutputCard";
import { MfSegmented, RuleCard } from "./RuleCard";

export function Feed({ data, simLabel }: { data: FeedScenario; simLabel: string }) {
  const { copy } = data;
  const [role, setRole] = useState(data.roles[0]?.id ?? "");
  const [feedback, setFeedback] = useState<Record<string, Feedback | undefined>>({});
  const [ruleOpen, setRuleOpen] = useState<string | null>(null);

  const rows = data.items
    .map((item) => {
      const locked = item.restricted?.find((r) => r.role === role && r.hideCard);
      if (locked) return { item, locked: locked.text };
      return item.roles.includes(role) ? { item, locked: null } : null;
    })
    .filter((r): r is { item: (typeof data.items)[number]; locked: string | null } => r !== null);
  const open = rows.filter((r) => !r.locked);
  const confirmed = open.filter((r) => feedback[r.item.id] === "confirm").length;
  const roleLabel = data.roles.find((r) => r.id === role)?.label ?? "";

  return (
    <div>
      <Frame product={data.product} dayLabel={data.dayLabel} simLabel={simLabel} sidebar={copy.sidebar} active={0}>
        <div className="flex flex-col gap-4 p-3 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="text-[16px] font-semibold tracking-[-0.01em]">{copy.feedTitle}</h4>
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2.5">
              <span className="mf-muted text-[12.5px]">
                {copy.roleLabel}
              </span>
              <MfSegmented ariaLabel={copy.roleLabel} options={data.roles.map((r) => ({ value: r.id, label: r.label }))} value={role} onChange={setRole} />
            </div>
          </div>

          <ol className="relative flex flex-col gap-3" aria-label={`${copy.feedTitle} · ${roleLabel}`}>
            {rows.map(({ item, locked }) => (
              <li key={item.id} data-step className="grid grid-cols-1 gap-1.5 sm:grid-cols-[76px_1fr] sm:gap-4">
                <span className="mf-muted pt-0 text-[12.5px] font-semibold tabular sm:pt-5 sm:text-right">{item.time}</span>
                {locked ? (
                  <LockedCard item={item} text={locked} />
                ) : (
                  <OutputCard
                    item={item}
                    data={data}
                    role={role}
                    feedback={feedback[item.id]}
                    onFeedback={(f) => setFeedback((m) => ({ ...m, [item.id]: f }))}
                    onOpenRule={setRuleOpen}
                  />
                )}
              </li>
            ))}
          </ol>

          <p className="mf-line mf-muted border-t pt-3 text-right text-[12.5px] tabular" role="status">
            {copy.counter.replace("{n}", String(confirmed)).replace("{total}", String(open.length))}
          </p>
        </div>
      </Frame>
      {ruleOpen ? <RuleDrawer data={data} ruleId={ruleOpen} onClose={() => setRuleOpen(null)} /> : null}
    </div>
  );
}

/** Ngăn quy tắc: hộp thoại bên phải, Esc hoặc bấm nền để đóng, trả focus về chỗ cũ */
function RuleDrawer({ data, ruleId, onClose }: { data: FeedScenario; ruleId: string; onClose: () => void }) {
  const rule = data.rules.find((r) => r.id === ruleId);
  const closeRef = useRef<HTMLButtonElement>(null);
  const uid = useId();

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);

  if (!rule) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[rgba(6,20,46,0.35)]" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${uid}-h`}
        className="minder-frame flex h-full w-[min(460px,100vw)] flex-col gap-4 overflow-y-auto p-4 shadow-[0_0_60px_rgba(0,0,0,0.25)] sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <p className="mf-muted text-[12.5px] font-medium">{data.copy.ruleTitle}</p>
          <button ref={closeRef} type="button" onClick={onClose} className="mf-btn mf-btn-outline" aria-label={data.copy.close}>
            <X aria-hidden size={15} strokeWidth={1.5} />
            {data.copy.close}
          </button>
        </div>
        <RuleCard rule={rule} data={data} headingId={`${uid}-h`} />
      </div>
    </div>
  );
}
