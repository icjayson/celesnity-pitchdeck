"use client";
/**
 * Dòng trạng thái đổi chữ bằng hiệu ứng "xoá ghi": con trỏ khối quét từ trái sang phải, ký tự nào nó đi qua
 * đổi từ chữ cũ sang chữ mới; tới cuối thì con trỏ biến mất. Giảm chuyển động: đổi chữ ngay.
 * Chuyển từ minder-platform (celesnity-web/app/_components/ui/text-wipe.tsx).
 */
import { useEffect, useState } from "react";

const WIPE_MS_PER_CHAR = 20;
const WIPE_CURSOR = "█";

export function TextWipe({ text, className }: { text: string; className?: string }) {
  const [shown, setShown] = useState(text);
  const [target, setTarget] = useState(text);
  const [cursor, setCursor] = useState<number | null>(null);
  if (text !== target) {
    setTarget(text);
    if (prefersReducedMotion()) setShown(text);
    else if (cursor === null) setCursor(0);
  }

  useEffect(() => {
    if (cursor === null) return undefined;
    const timer = setTimeout(() => {
      const next = cursor + 1;
      if (next > Math.max(shown.length, target.length)) {
        setShown(target);
        setCursor(null);
      } else {
        setCursor(next);
      }
    }, WIPE_MS_PER_CHAR);
    return () => clearTimeout(timer);
  }, [cursor, shown.length, target]);

  if (cursor === null) return <span className={className}>{shown}</span>;
  return (
    <span className={`whitespace-pre ${className ?? ""}`} aria-label={target}>
      <span aria-hidden="true">{target.slice(0, cursor)}</span>
      <span aria-hidden="true">{WIPE_CURSOR}</span>
      <span aria-hidden="true">{shown.slice(cursor + 1)}</span>
    </span>
  );
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
