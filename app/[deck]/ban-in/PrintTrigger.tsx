"use client";
import { useEffect } from "react";
import { Printer } from "lucide-react";

/** Tự mở hộp thoại in khi URL có ?print=1; luôn có nút in. */
export function PrintTrigger() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("print") === "1") {
      const t = setTimeout(() => window.print(), 600);
      return () => clearTimeout(t);
    }
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.print()}
      data-hide-in-print
      className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-control)] bg-orange-500 px-4 text-[14px] font-medium text-navy-900 hover:bg-orange-600"
    >
      <Printer size={16} strokeWidth={1.5} aria-hidden /> In hoặc lưu PDF
    </button>
  );
}
