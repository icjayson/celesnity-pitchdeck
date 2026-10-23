"use client";

/**
 * Tờ rơi Minder gấp 3 (gấp cuộn) dựng bằng CSS 3D.
 *
 * Ba tấm giấy, mỗi tấm hai mặt (ảnh trong public/minder-leaflet):
 *   B (giữa)        mặt trong P3 · mặt ngoài P6
 *   C (bìa, bên trái B)  mặt trong P2 · mặt ngoài P1
 *   A (tấm gập, bên phải B, hẹp hơn 3 mm)  mặt trong P4 · mặt ngoài P5
 * Khi gấp: A gập lên mặt trong của B trước, rồi C gập đè lên A, để P1 thành bìa.
 * Độ mở p chạy từ 0 (gấp kín) → 1 (mở bìa) → 2 (mở hết).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Book, BookOpen, Columns3, FlipHorizontal2, Pause, Play, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

const W = 500; // bề rộng tấm B và C (px, đúng độ phân giải ảnh)
const WA = 485; // tấm gập A hẹp hơn 3%
const H = 1055;

const IMG = (n: number) => `/minder-leaflet/p${n}.webp`;

type Preset = { key: string; label: string; p: number; ry: number; rx: number; icon: typeof Book };

const PRESETS: Preset[] = [
  { key: "cover", label: "Front cover", p: 0, ry: -20, rx: -6, icon: Book },
  { key: "half", label: "Cover open", p: 1, ry: -14, rx: -6, icon: BookOpen },
  { key: "inside", label: "Inside", p: 2, ry: 0, rx: -4, icon: Columns3 },
  { key: "outside", label: "Outside", p: 2, ry: 180, rx: -4, icon: FlipHorizontal2 },
];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const rad = (d: number) => (d * Math.PI) / 180;

/** Góc gập của bìa C và tấm gập A theo độ mở p. */
function angles(p: number) {
  const c = 180 * (1 - smooth(clamp(p, 0, 1)));
  const a = 180 * (1 - smooth(clamp(p - 1, 0, 1)));
  return { c, a };
}

/** Nhãn mặt đang nhìn, theo độ mở và hướng xoay. */
function viewLabel(p: number, ry: number) {
  const front = Math.cos(rad(ry)) >= 0;
  if (p < 0.5) return front ? "Front cover (P1)" : "Back panel (P6)";
  if (p < 1.5) return front ? "Cover open (P2 · P5)" : "Outside, half open";
  return front ? "Inside spread (P2 · P3 · P4)" : "Outside spread (P5 · P6 · P1)";
}

export function MinderLeaflet() {
  const stageRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const hingeCRef = useRef<HTMLDivElement>(null);
  const hingeARef = useRef<HTMLDivElement>(null);
  const shadeRefs = useRef<HTMLDivElement[]>([]);
  const shadowRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  const s = useRef({
    p: 0, pT: 0,
    rx: -6, ry: -20, rxT: -6, ryT: -20,
    zoom: 1, zoomT: 1,
    vy: 0, vx: 0,
    dragging: false, sliding: false,
    spin: false, lastInput: 0,
    reduced: false,
  });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({ moved: 0, startDist: 0, startZoom: 1, downAt: 0 });

  const [label, setLabel] = useState(viewLabel(0, -20));
  const [active, setActive] = useState("cover");
  const [spin, setSpin] = useState(false);
  const [hint, setHint] = useState(true);

  const touch = useCallback(() => {
    s.current.lastInput = performance.now();
    setHint(false);
  }, []);

  /** Xoay đến góc a theo đường ngắn nhất. */
  const turnTo = (a: number) => {
    const st = s.current;
    const d = ((((a - st.ry) % 360) + 540) % 360) - 180;
    st.ryT = st.ry + d;
  };

  const applyPreset = useCallback((pr: Preset) => {
    const st = s.current;
    st.pT = pr.p;
    st.rxT = pr.rx;
    st.vx = st.vy = 0;
    turnTo(pr.ry);
    setActive(pr.key);
    touch();
  }, [touch]);

  const nextStep = useCallback(() => {
    const st = s.current;
    const order = ["cover", "half", "inside", "outside"];
    const cur = PRESETS.reduce((best, pr) => (Math.abs(pr.p - st.pT) < Math.abs(best.p - st.pT) ? pr : best), PRESETS[0]);
    const facingBack = Math.cos(rad(st.ry)) < 0;
    const key = cur.key === "inside" && facingBack ? "outside" : cur.key;
    const next = PRESETS.find((pr) => pr.key === order[(order.indexOf(key) + 1) % order.length])!;
    applyPreset(next);
  }, [applyPreset]);

  const resetView = useCallback(() => {
    const st = s.current;
    st.zoomT = 1;
    st.rxT = -6;
    st.vx = st.vy = 0;
    turnTo(Math.cos(rad(st.ry)) >= 0 ? (st.pT < 0.5 ? -20 : 0) : 180);
    touch();
  }, [touch]);

  // Vòng lặp vẽ: ghi transform trực tiếp vào DOM, không render lại React mỗi khung hình
  useEffect(() => {
    const st = s.current;
    st.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let lastLabel = "";
    const tick = (now: number) => {
      const k = st.reduced ? 1 : 0.12;
      if (!st.sliding) st.p += (st.pT - st.p) * k;
      if (!st.dragging) {
        if (Math.abs(st.vy) > 0.01 || Math.abs(st.vx) > 0.01) {
          st.ry += st.vy;
          st.rx = clamp(st.rx + st.vx, -80, 80);
          st.ryT = st.ry;
          st.rxT = st.rx;
          st.vy *= 0.88;
          st.vx *= 0.88;
        }
        if (st.spin) st.ryT += 0.25;
        st.ry += (st.ryT - st.ry) * k;
        st.rx += (st.rxT - st.rx) * k;
      }
      st.zoom += (st.zoomT - st.zoom) * k;

      // Dao động nhẹ khi để yên, để tờ rơi trông như đang cầm trên tay
      const idle = !st.reduced && !st.dragging && !st.spin && now - st.lastInput > 2500;
      const sway = idle ? Math.sin(now / 1800) * 5 : 0;
      const swayX = idle ? Math.sin(now / 2300) * 2 : 0;

      const { c, a } = angles(st.p);
      const left = Math.min(0, -W * Math.cos(rad(c)));
      const right = Math.max(W, W + WA * Math.cos(rad(a)));
      const center = (left + right) / 2;

      const stage = stageRef.current;
      if (stage && rigRef.current && groupRef.current && hingeCRef.current && hingeARef.current) {
        const vw = stage.clientWidth;
        const vh = stage.clientHeight;
        const fit = Math.min((vw * 0.86) / (right - left), (vh * 0.72) / H);
        const scale = fit * st.zoom;
        const ry = st.ry + sway;
        const rx = st.rx + swayX;
        rigRef.current.style.transform = `scale(${scale}) rotateX(${rx}deg) rotateY(${ry}deg)`;
        groupRef.current.style.left = `${-center}px`;
        hingeCRef.current.style.transform = `translateZ(${(3 * c) / 180}px) rotateY(${c}deg)`;
        hingeARef.current.style.transform = `translateZ(${(1.5 * a) / 180}px) rotateY(${-a}deg)`;
        const [c1, c2, a1, a2] = shadeRefs.current;
        const sc = 0.5 * Math.sin(rad(c));
        const sa = 0.5 * Math.sin(rad(a));
        if (c1 && c2 && a1 && a2) {
          c1.style.opacity = c2.style.opacity = String(sc);
          a1.style.opacity = a2.style.opacity = String(sa);
        }
        if (shadowRef.current) {
          const w = (right - left) * scale * Math.max(0.25, Math.abs(Math.cos(rad(ry))));
          shadowRef.current.style.width = `${w}px`;
          shadowRef.current.style.transform = `translate(-50%, ${(H * scale) / 2 * Math.cos(rad(rx)) + 18}px)`;
        }
        if (sliderRef.current && !st.sliding) sliderRef.current.value = String(Math.round(st.p * 100));
        const l = viewLabel(st.p, st.ry);
        if (l !== lastLabel) {
          lastLabel = l;
          setLabel(l);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Cuộn chuột để phóng to (cần listener không passive để chặn cuộn trang)
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const st = s.current;
      st.zoomT = clamp(st.zoomT * Math.exp(-e.deltaY * 0.0015), 0.5, 2.6);
      touch();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [touch]);

  const onPointerDown = (e: React.PointerEvent) => {
    try {
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    } catch {
      // Trình duyệt có thể từ chối giữ con trỏ (ví dụ sự kiện giả lập); kéo vẫn chạy trong vùng sân khấu
    }
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const st = s.current;
    if (pointers.current.size === 1) {
      st.dragging = true;
      st.vx = st.vy = 0;
      gesture.current.moved = 0;
      gesture.current.downAt = performance.now();
    } else if (pointers.current.size === 2) {
      const [p1, p2] = [...pointers.current.values()];
      gesture.current.startDist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      gesture.current.startZoom = st.zoomT;
    }
    touch();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const st = s.current;
    const dx = e.clientX - prev.x;
    const dy = e.clientY - prev.y;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size >= 2) {
      const [p1, p2] = [...pointers.current.values()];
      const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      if (gesture.current.startDist > 0) st.zoomT = clamp((gesture.current.startZoom * d) / gesture.current.startDist, 0.5, 2.6);
      gesture.current.moved += 10;
      return;
    }
    gesture.current.moved += Math.abs(dx) + Math.abs(dy);
    st.ry += dx * 0.4;
    st.rx = clamp(st.rx - dy * 0.3, -80, 80);
    st.ryT = st.ry;
    st.rxT = st.rx;
    // Quán tính khi thả tay: làm mượt và giới hạn, để một cú vuốt nhanh không làm tờ rơi quay mãi
    st.vy = clamp(st.vy * 0.5 + dx * 0.2, -5, 5);
    st.vx = clamp(st.vx * 0.5 - dy * 0.15, -3, 3);
    if (gesture.current.moved > 6) setActive("");
    touch();
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    const st = s.current;
    if (pointers.current.size === 0) {
      st.dragging = false;
      const tap = gesture.current.moved < 6 && performance.now() - gesture.current.downAt < 400;
      if (tap) {
        st.vx = st.vy = 0;
        nextStep();
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const st = s.current;
    const map: Record<string, () => void> = {
      ArrowLeft: () => (st.ryT -= 20),
      ArrowRight: () => (st.ryT += 20),
      ArrowUp: () => (st.rxT = clamp(st.rxT - 15, -80, 80)),
      ArrowDown: () => (st.rxT = clamp(st.rxT + 15, -80, 80)),
      "+": () => (st.zoomT = clamp(st.zoomT * 1.2, 0.5, 2.6)),
      "=": () => (st.zoomT = clamp(st.zoomT * 1.2, 0.5, 2.6)),
      "-": () => (st.zoomT = clamp(st.zoomT / 1.2, 0.5, 2.6)),
      " ": nextStep,
      Enter: nextStep,
      "0": resetView,
    };
    const fn = map[e.key];
    if (fn) {
      e.preventDefault();
      fn();
      touch();
    }
  };

  const toggleSpin = () => {
    s.current.spin = !s.current.spin;
    setSpin(s.current.spin);
    touch();
  };

  const zoomBy = (f: number) => {
    s.current.zoomT = clamp(s.current.zoomT * f, 0.5, 2.6);
    touch();
  };

  const shade = (i: number) => (el: HTMLDivElement | null) => {
    if (el) shadeRefs.current[i] = el;
  };

  const face = (n: number, back: boolean, shadeIndex?: number) => (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: back ? "rotateY(180deg)" : undefined }}
    >
      <img src={IMG(n)} alt="" draggable={false} className="pointer-events-none h-full w-full select-none" />
      {shadeIndex !== undefined && (
        <div ref={shade(shadeIndex)} className="absolute inset-0 bg-navy-950" style={{ opacity: 0.5 }} />
      )}
    </div>
  );

  return (
    <main className="relative flex h-[100dvh] flex-col overflow-hidden bg-navy-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 42%, rgba(47,123,246,.28), rgba(6,20,46,0) 70%), radial-gradient(40% 30% at 50% 100%, rgba(255,122,26,.10), rgba(6,20,46,0) 70%)",
        }}
      />

      <header className="relative z-10 flex items-center justify-between gap-4 px-5 pt-4 sm:px-8 sm:pt-6">
        <div className="flex items-center gap-3">
          <img src="/brand/celesnity-mark.png" alt="" className="h-8 w-8" />
          <div className="leading-tight">
            <div className="text-[13px] tracking-wide text-blue-300">Celesnity · Minder</div>
            <h1 className="text-[17px] font-semibold">Minder leaflet</h1>
          </div>
        </div>
        <div className="hidden text-right text-[13px] text-blue-300 sm:block" aria-live="polite">
          Viewing: <span className="text-white">{label}</span>
        </div>
      </header>

      <div
        ref={stageRef}
        role="img"
        aria-label="Minder tri-fold leaflet in 3D. Drag to rotate, scroll to zoom, tap to open or fold."
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        className="relative z-0 flex-1 cursor-grab touch-none outline-none select-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-blue-400/60"
        style={{ perspective: "2600px" }}
      >
        <div
          ref={shadowRef}
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 h-10 rounded-[50%] bg-black/50"
          style={{ filter: "blur(22px)" }}
        />
        <div ref={rigRef} className="absolute top-1/2 left-1/2 h-0 w-0" style={{ transformStyle: "preserve-3d" }}>
          {/* Tấm B ở giữa; bìa C và tấm gập A gắn vào hai mép của nó */}
          <div ref={groupRef} className="absolute" style={{ width: W, height: H, top: -H / 2, transformStyle: "preserve-3d" }}>
            {face(3, false)}
            {face(6, true)}
            <div
              ref={hingeCRef}
              className="absolute top-0"
              style={{ left: -W, width: W, height: H, transformOrigin: "100% 50%", transformStyle: "preserve-3d" }}
            >
              {face(2, false, 0)}
              {face(1, true, 1)}
            </div>
            <div
              ref={hingeARef}
              className="absolute top-0"
              style={{ left: W, width: WA, height: H, transformOrigin: "0% 50%", transformStyle: "preserve-3d" }}
            >
              {face(4, false, 2)}
              {face(5, true, 3)}
            </div>
          </div>
        </div>

        <p
          className={`pointer-events-none absolute inset-x-0 bottom-3 text-center text-[13px] text-blue-300 transition-opacity duration-700 ${hint ? "opacity-100" : "opacity-0"}`}
        >
          Drag to rotate · Scroll or pinch to zoom · Tap to open
        </p>
      </div>

      <nav
        aria-label="Leaflet controls"
        className="relative z-10 mx-auto mb-4 flex w-[min(100%_-_2rem,980px)] flex-wrap items-center justify-center gap-x-4 gap-y-3 rounded-[var(--radius-card)] border border-white/10 bg-navy-900/80 px-4 py-3 backdrop-blur sm:mb-6"
      >
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Leaflet state">
          {PRESETS.map((pr) => {
            const Icon = pr.icon;
            const on = active === pr.key;
            return (
              <button
                key={pr.key}
                type="button"
                aria-pressed={on}
                onClick={() => applyPreset(pr)}
                className={`inline-flex items-center gap-1.5 rounded-[var(--radius-control)] px-3 py-2 text-[14px] transition-colors ${
                  on ? "bg-blue-500 text-white" : "text-blue-100 hover:bg-white/10"
                }`}
              >
                <Icon size={16} aria-hidden />
                {pr.label}
              </button>
            );
          })}
        </div>

        <label className="flex min-w-[200px] flex-1 items-center gap-3 text-[13px] text-blue-300 sm:max-w-[260px]">
          <span className="whitespace-nowrap">Folded</span>
          <input
            ref={sliderRef}
            type="range"
            min={0}
            max={200}
            defaultValue={0}
            aria-label="How far the leaflet is open"
            className="w-full accent-orange-500"
            onPointerDown={() => (s.current.sliding = true)}
            onPointerUp={() => {
              s.current.sliding = false;
              s.current.pT = s.current.p;
            }}
            onChange={(e) => {
              const v = Number(e.target.value) / 100;
              s.current.p = v;
              s.current.pT = v;
              setActive("");
              touch();
            }}
          />
          <span className="whitespace-nowrap">Open</span>
        </label>

        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={toggleSpin}
            aria-pressed={spin}
            className={`inline-flex items-center gap-1.5 rounded-[var(--radius-control)] px-3 py-2 text-[14px] ${spin ? "bg-orange-500 text-white" : "text-blue-100 hover:bg-white/10"}`}
          >
            {spin ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
            Auto-rotate
          </button>
          <button type="button" onClick={() => zoomBy(1 / 1.2)} aria-label="Zoom out" className="rounded-[var(--radius-control)] p-2 text-blue-100 hover:bg-white/10">
            <ZoomOut size={18} aria-hidden />
          </button>
          <button type="button" onClick={() => zoomBy(1.2)} aria-label="Zoom in" className="rounded-[var(--radius-control)] p-2 text-blue-100 hover:bg-white/10">
            <ZoomIn size={18} aria-hidden />
          </button>
          <button type="button" onClick={resetView} aria-label="Reset view" className="rounded-[var(--radius-control)] p-2 text-blue-100 hover:bg-white/10">
            <RotateCcw size={18} aria-hidden />
          </button>
        </div>
      </nav>
    </main>
  );
}
