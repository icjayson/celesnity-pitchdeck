"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Ghim nội dung khi cuộn và chia quãng cuộn thành `steps` bước.
 * Mỗi khi người xem cuộn qua một bước, gọi `onStep(i)`; tới bước cuối thì thả ghim để cuộn tiếp.
 * Người xem tự chọn thì lựa chọn đó được giữ cho tới khi cuộn sang bước kế tiếp, rồi đồng bộ lại theo cuộn.
 * Chỉ ghim khi màn hình đủ rộng (≥1024px), đủ cao để chứa nội dung, và không bật giảm chuyển động;
 * trường hợp khác hiển thị bình thường (nội dung vẫn điều khiển bằng tay được).
 */
export function ScrollSteps({
  steps,
  onStep,
  disabled = false,
  perStepVh = 55,
  children,
}: {
  steps: number;
  onStep: (i: number) => void;
  /** true khi người xem đã tự điều khiển: ngừng đồng bộ theo cuộn nhưng vẫn giữ ghim */
  disabled?: boolean;
  perStepVh?: number;
  children: ReactNode;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [pin, setPin] = useState(false);
  const [top, setTop] = useState(0);
  /** Hệ số thu nhỏ khi nội dung cao hơn màn hình một chút (tối thiểu 0,62) */
  const [scale, setScale] = useState(1);
  const [boxH, setBoxH] = useState(0);
  const last = useRef(-1);
  const cb = useRef(onStep);
  cb.current = onStep;
  const off = useRef(disabled);
  off.current = disabled;

  // Quyết định có ghim không, theo kích thước màn hình và nội dung
  useEffect(() => {
    let maxH = 0;
    let lastW = window.innerWidth;
    const measure = () => {
      // Dùng chiều cao lớn nhất từng gặp, để nội dung đổi theo bước không làm bật/tắt ghim
      if (window.innerWidth !== lastW) {
        lastW = window.innerWidth;
        maxH = 0;
      }
      maxH = Math.max(maxH, inner.current?.offsetHeight ?? 0);
      const h = maxH;
      const room = window.innerHeight - 48;
      const s = h > room ? room / h : 1;
      const ok = !reduced && window.innerWidth >= 1024 && h > 0 && s >= 0.62;
      setPin(ok);
      setScale(ok ? s : 1);
      setBoxH(h);
      setTop(ok ? Math.max(24, Math.round((window.innerHeight - h * s) / 2)) : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (inner.current) ro.observe(inner.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduced]);

  // Đồng bộ bước theo vị trí cuộn
  useEffect(() => {
    if (!pin) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = outer.current;
      if (!el || off.current) return;
      const r = el.getBoundingClientRect();
      const span = r.height - boxH * scale;
      const p = Math.max(0, Math.min(0.9999, (top - r.top) / Math.max(1, span)));
      const i = Math.floor(p * steps);
      if (i !== last.current) {
        last.current = i;
        cb.current(i);
      }
    };
    // Tính ngay trong sự kiện cuộn (rẻ) để bước luôn khớp vị trí, kể cả khi cuộn nhanh
    const onScroll = () => tick();
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pin, steps, top, scale, boxH]);

  const h = boxH;
  return (
    <div
      ref={outer}
      // Chế độ trình chiếu đọc các thuộc tính này để dừng đúng từng bước
      data-scroll-steps={pin ? steps : undefined}
      data-sticky-top={pin ? top : undefined}
      data-box-h={pin ? Math.round(h * scale) : undefined}
      style={pin ? { height: `calc(${h * scale}px + ${(steps - 1) * perStepVh}vh)` } : undefined}
    >
      <div
        ref={inner}
        style={
          pin
            ? { position: "sticky", top, ...(scale < 1 ? { transform: `scale(${scale})`, transformOrigin: "top center", marginBottom: -h * (1 - scale) } : {}) }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
}
