"use client";
/**
 * Nhập giọng nói qua Web Speech API (vi-VN). `supported` = false khi trình duyệt không hỗ trợ
 * (giao diện ẩn nút micro). Dùng chung cho trợ lý và M6.
 */
import { useCallback, useEffect, useRef, useState } from "react";

type RecognitionResult = { isFinal: boolean; 0: { transcript: string } };
type RecognitionEvent = { resultIndex: number; results: ArrayLike<RecognitionResult> };
type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  onresult: ((e: RecognitionEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
};
type RecognitionCtor = new () => Recognition;

function getCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export type SpeechState = "idle" | "listening" | "error";

export function useSpeech(opts: { onText: (text: string, final: boolean) => void; onEnd?: (finalText: string) => void }) {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<SpeechState>("idle");
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<Recognition | null>(null);
  const textRef = useRef("");
  const optsRef = useRef(opts);
  optsRef.current = opts;

  useEffect(() => {
    setSupported(getCtor() !== null);
    return () => recRef.current?.abort();
  }, []);

  const stop = useCallback(() => {
    recRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    const Ctor = getCtor();
    if (!Ctor) return;
    recRef.current?.abort();
    const rec = new Ctor();
    rec.lang = "vi-VN";
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 1;
    textRef.current = "";
    setError(null);
    rec.onresult = (e) => {
      let finalText = "";
      let interim = "";
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interim += r[0].transcript;
      }
      const text = (finalText + interim).trim();
      textRef.current = text;
      optsRef.current.onText(text, interim === "");
    };
    rec.onerror = (e) => {
      const msg =
        e.error === "not-allowed" || e.error === "service-not-allowed"
          ? "Trình duyệt chưa cho phép dùng micro."
          : e.error === "no-speech"
            ? "Chưa nghe thấy giọng nói. Quý vị thử lại nhé."
            : "Không nhận được giọng nói. Quý vị có thể gõ chữ.";
      setError(msg);
      setState("error");
    };
    rec.onend = () => {
      setState((s) => (s === "error" ? "error" : "idle"));
      recRef.current = null;
      optsRef.current.onEnd?.(textRef.current);
    };
    recRef.current = rec;
    try {
      rec.start();
      setState("listening");
    } catch {
      setState("error");
      setError("Không bật được micro. Quý vị có thể gõ chữ.");
    }
  }, []);

  const toggle = useCallback(() => {
    if (state === "listening") stop();
    else start();
  }, [state, start, stop]);

  return { supported, state, error, start, stop, toggle, listening: state === "listening" };
}
