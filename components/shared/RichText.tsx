import { Fragment, type ReactNode } from "react";

const ESC = "\u0000";

/** Hiển thị văn bản có **đậm** và *nghiêng*. "\*" là dấu sao thường. */
export function RichText({ text, strongClass }: { text: string; strongClass?: string }) {
  return <>{renderRich(text, strongClass)}</>;
}

export function renderRich(text: string, strongClass?: string): ReactNode[] {
  const src = text.replace(/`#gia-tri`/g, "phần Giá trị").replace(/`([^`]+)`/g, "$1").replace(/\\\*/g, ESC);
  const parts = src.split(/(==[^=]+==|\*\*[^*]+\*\*|\*[^*]+\*)/g).filter((p) => p !== "");
  return parts.map((p, i) => {
    const restore = (s: string) => s.replace(new RegExp(ESC, "g"), "*");
    if (p.startsWith("==") && p.endsWith("==")) {
      return (
        <mark
          key={i}
          className="my-2 inline-block bg-transparent text-[1.3em] font-semibold leading-snug tracking-[-0.015em] text-current [background:linear-gradient(transparent_55%,color-mix(in_srgb,var(--color-orange-500)_40%,transparent)_55%)]"
        >
          {restore(p.slice(2, -2))}
        </mark>
      );
    }
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={i} className={strongClass ?? "font-semibold"}>
          {restore(p.slice(2, -2))}
        </strong>
      );
    }
    if (p.startsWith("*") && p.endsWith("*") && p.length > 2) {
      return <em key={i}>{restore(p.slice(1, -1))}</em>;
    }
    return <Fragment key={i}>{restore(p)}</Fragment>;
  });
}

/** Văn bản thuần, bỏ ký hiệu định dạng (dùng cho aria-label, gói tri thức) */
export function plainText(text: string): string {
  return text.replace(/\\\*/g, ESC).replace(/==([^=]+)==/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(new RegExp(ESC, "g"), "*");
}
