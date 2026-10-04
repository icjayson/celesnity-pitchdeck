"use client";
/**
 * Trạng thái hội thoại của trợ lý (chỉ trong phiên, chỉ nối thêm) và đọc stream NDJSON từ /api/chat.
 * Chữ được hiện dần mượt bằng requestAnimationFrame (tắt khi giảm chuyển động).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFaqMatcher } from "@/lib/ai/faqMatch";
import { useDeck } from "@/components/deck/DeckProvider";

export type MsgKind = "ai" | "prepared" | "offline";

export type ChatMsg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  status: "streaming" | "done" | "error";
  kind?: MsgKind;
  section?: string | null;
  /** Câu hỏi gợi ý tiếp theo do trợ lý đề xuất */
  followups?: string[];
  error?: string;
};

type Action = { name: string; input: unknown };

const MAX_HISTORY = 12;
const MAX_CHARS = 1000;

const actionSection: Record<string, (input: unknown) => string | null> = {
  scroll_to_section: (i) => (i && typeof i === "object" && "id" in i ? String((i as { id: unknown }).id) : null),
  open_use_case: () => "use-case",
  set_timeline_month: () => "lo-trinh",
  set_calculator: () => "gia-tri",
  run_simulation: () => "mo-phong",
};

let seq = 0;
const newId = () => `m${Date.now().toString(36)}${(seq++).toString(36)}`;

export const chatCopy = {
  offline: "Quý vị đang ngoại tuyến. Đây là câu trả lời soạn sẵn từ đề xuất.",
  network: "Không kết nối được trợ lý. Đây là câu trả lời soạn sẵn từ đề xuất.",
  generic: "Trợ lý đang gặp sự cố. Quý vị vui lòng thử lại sau ít phút.",
};

export function useChat(opts: { onAction: (a: Action) => void; reducedMotion: boolean }) {
  // Mỗi deck có trợ lý riêng: câu trả lời soạn sẵn và yêu cầu gửi server đều gắn đúng deck này
  const { slug, faq } = useDeck();
  const matcher = useMemo(() => createFaqMatcher(faq), [faq]);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [busy, setBusy] = useState(false);
  const optsRef = useRef(opts);
  optsRef.current = opts;
  const abortRef = useRef<AbortController | null>(null);

  // Hiện chữ dần: target = toàn bộ chữ đã nhận; shown = số ký tự đang hiện
  const typing = useRef<{ id: string; target: string; shown: number; ended: boolean } | null>(null);
  const raf = useRef<number | null>(null);

  const patch = useCallback((id: string, p: Partial<ChatMsg>) => {
    setMessages((ms) => ms.map((m) => (m.id === id ? { ...m, ...p } : m)));
  }, []);

  const tick = useCallback(() => {
    raf.current = null;
    const t = typing.current;
    if (!t) return;
    const backlog = t.target.length - t.shown;
    if (backlog > 0) {
      const step = optsRef.current.reducedMotion ? backlog : Math.max(1, Math.ceil(backlog / 10));
      t.shown += step;
      patch(t.id, { text: t.target.slice(0, t.shown) });
    }
    if (t.shown < t.target.length) {
      raf.current = requestAnimationFrame(tick);
    } else if (t.ended) {
      patch(t.id, { text: t.target.trim(), status: "done" });
      typing.current = null;
    }
  }, [patch]);

  const kick = useCallback(() => {
    if (raf.current == null) raf.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(
    () => () => {
      abortRef.current?.abort();
      if (raf.current != null) cancelAnimationFrame(raf.current);
    },
    [],
  );

  const send = useCallback(
    async (raw: string) => {
      const q = raw.trim().slice(0, MAX_CHARS);
      if (!q || busy) return;

      const history = messages
        .filter((m) => m.status === "done" && m.text.trim())
        .map((m) => ({ role: m.role, content: m.text.slice(0, MAX_CHARS) }));
      const payload = [...history, { role: "user" as const, content: q }].slice(-MAX_HISTORY);

      const userMsg: ChatMsg = { id: newId(), role: "user", text: q, status: "done" };
      const aId = newId();
      setMessages((ms) => [...ms, userMsg, { id: aId, role: "assistant", text: "", status: "streaming", kind: "ai" }]);
      setBusy(true);

      const prepared = (kind: MsgKind, note?: string) => {
        const f = matcher.fallbackAnswer(q);
        typing.current = null;
        patch(aId, { text: f.answer, status: "done", kind, section: f.section, error: note });
      };

      if (typeof navigator !== "undefined" && navigator.onLine === false) {
        prepared("offline", chatCopy.offline);
        setBusy(false);
        return;
      }

      const ac = new AbortController();
      abortRef.current = ac;
      typing.current = { id: aId, target: "", shown: 0, ended: false };
      let section: string | null = null;
      let gotFallback = false;
      let errorMsg: string | null = null;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ deck: slug, messages: payload }),
          signal: ac.signal,
        });
        if (!res.body) throw new Error("no body");
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        let buf = "";
        const handle = (line: string) => {
          if (!line.trim()) return;
          let e: {
            t: string;
            d?: string;
            name?: string;
            input?: unknown;
            answer?: string;
            section?: string | null;
            message?: string;
            items?: unknown;
          };
          try {
            e = JSON.parse(line);
          } catch {
            return;
          }
          if (e.t === "text" && e.d && typing.current?.id === aId) {
            typing.current.target += e.d;
            kick();
          } else if (e.t === "action" && e.name) {
            const s = actionSection[e.name]?.(e.input) ?? null;
            if (s && (!section || e.name === "scroll_to_section")) section = s;
            patch(aId, { section });
            optsRef.current.onAction({ name: e.name, input: e.input });
          } else if (e.t === "followups" && Array.isArray(e.items)) {
            patch(aId, { followups: e.items.filter((x): x is string => typeof x === "string").slice(0, 3) });
          } else if (e.t === "fallback" && typeof e.answer === "string") {
            gotFallback = true;
            typing.current = null;
            patch(aId, { text: e.answer, status: "done", kind: "prepared", section: e.section ?? null });
          } else if (e.t === "error") {
            errorMsg = e.message ?? chatCopy.generic;
          }
        };
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          let nl: number;
          while ((nl = buf.indexOf("\n")) >= 0) {
            handle(buf.slice(0, nl));
            buf = buf.slice(nl + 1);
          }
        }
        handle(buf);

        if (!gotFallback) {
          const t = typing.current;
          if (t && t.id === aId) {
            if (!t.target.trim()) {
              typing.current = null;
              patch(aId, { status: "error", error: errorMsg ?? chatCopy.generic, text: "" });
            } else {
              t.ended = true;
              if (errorMsg) patch(aId, { error: errorMsg });
              kick();
            }
          }
        }
      } catch (err) {
        if (ac.signal.aborted) return;
        const t = typing.current;
        if (t && t.id === aId && t.target.trim()) {
          t.ended = true;
          patch(aId, { error: chatCopy.generic });
          kick();
        } else {
          prepared("offline", chatCopy.network);
        }
        void err;
      } finally {
        if (abortRef.current === ac) abortRef.current = null;
        setBusy(false);
      }
    },
    [busy, messages, kick, patch, matcher, slug],
  );

  return { messages, busy, send };
}
