"use client";
/**
 * Bộ điều phối hành động trên trang. Trợ lý AI (và chế độ trình chiếu) phát hành động;
 * các module lắng nghe và tự thực thi. Mọi đầu vào được kiểm tra lại ở đây trước khi phát.
 */
import { actionSchemas, type ActionInput, type ActionName } from "./actionSchemas";

export { actionSchemas };
export type { ActionInput, ActionName };

const EVENT = "landing:action";

type Detail = { name: ActionName; input: unknown };

/** Phát một hành động. Trả về false nếu đầu vào không hợp lệ. */
export function dispatchAction(name: string, input: unknown): boolean {
  if (!(name in actionSchemas)) return false;
  const parsed = actionSchemas[name as ActionName].safeParse(input);
  if (!parsed.success) return false;
  if (name === "scroll_to_section") {
    const { id } = parsed.data as ActionInput<"scroll_to_section">;
    scrollAndSettle(id);
  }
  window.dispatchEvent(new CustomEvent<Detail>(EVENT, { detail: { name: name as ActionName, input: parsed.data } }));
  return true;
}

let cancelSettle: (() => void) | null = null;

/**
 * Cuộn mượt tới section rồi chỉnh lại nếu bị lệch: các module tải muộn phía trên làm trang dài thêm
 * trong lúc cuộn, nên điểm dừng đầu tiên thường hụt. Người dùng tự cuộn hoặc chạm thì dừng chỉnh.
 */
function scrollAndSettle(id: string) {
  cancelSettle?.();
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });

  let corrections = 0;
  let lastY = -1;
  const started = Date.now();
  const stop = () => {
    window.clearInterval(timer);
    ["wheel", "touchstart", "keydown"].forEach((t) => window.removeEventListener(t, stop));
    cancelSettle = null;
  };
  const timer = window.setInterval(() => {
    const y = window.scrollY;
    if (y !== lastY) {
      lastY = y; // còn đang cuộn
      return;
    }
    const off = el.getBoundingClientRect().top;
    if (Math.abs(off) <= 8 || corrections >= 4 || Date.now() - started > 10000) return stop();
    corrections += 1;
    lastY = -1;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 200);
  ["wheel", "touchstart", "keydown"].forEach((t) => window.addEventListener(t, stop, { passive: true }));
  cancelSettle = stop;
}

/** Đăng ký lắng nghe một hành động. Trả về hàm hủy đăng ký. */
export function onAction<N extends ActionName>(name: N, handler: (input: ActionInput<N>) => void): () => void {
  const listener = (e: Event) => {
    const d = (e as CustomEvent<Detail>).detail;
    if (d?.name === name) handler(d.input as ActionInput<N>);
  };
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}

/** Cuộn tới một section (dùng chung cho mục lục, trợ lý, trình chiếu) */
export function scrollToSection(id: string) {
  dispatchAction("scroll_to_section", { id });
}
