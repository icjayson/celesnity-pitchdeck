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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  window.dispatchEvent(new CustomEvent<Detail>(EVENT, { detail: { name: name as ActionName, input: parsed.data } }));
  return true;
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
