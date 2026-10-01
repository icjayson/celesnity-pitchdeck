import { Sparkles, FlaskConical, Telescope, Compass } from "lucide-react";
import type { LabelVariant } from "@/content/types";
import { RichText } from "./RichText";

/** Nhãn trung thực (mục 1.4 và 5.1 của kế hoạch). */
export function Label({ variant, text, className = "" }: { variant: LabelVariant; text: string; className?: string }) {
  const styles: Record<LabelVariant, string> = {
    sim: "bg-navy-700 text-white border border-blue-300/60",
    ai: "bg-blue-100 text-navy-900 border border-blue-300",
    future: "bg-navy-800 text-blue-100 border border-blue-300/40",
    proposal: "bg-orange-100 text-orange-700 border border-orange-500/40",
  };
  const Icon = { sim: FlaskConical, ai: Sparkles, future: Telescope, proposal: Compass }[variant];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] font-medium leading-snug ${styles[variant]} ${className}`}
    >
      {variant === "ai" ? (
        <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
      ) : (
        <Icon aria-hidden size={14} strokeWidth={1.5} className="shrink-0" />
      )}
      <span>
        <RichText text={text} />
      </span>
    </span>
  );
}
