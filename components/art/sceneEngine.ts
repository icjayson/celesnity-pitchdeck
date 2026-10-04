/**
 * Lớp Canvas 2D phủ lên cảnh SVG: hạt "Tự học", hạt nền, tia "Nhân rộng", quầng sáng lõi.
 * Tự viết, không thư viện. Cùng hệ tọa độ viewBox 800 × 520 với SVG.
 */
import type { IslandId } from "./geometry";
import { CORE, HALF, ISLAND_IDS, VB_W, islandPoint, sampleBeam, type Pt } from "./geometry";

export type EngineTargets = {
  state: 0 | 1 | 2 | 3;
  converge: boolean;
  steel: boolean;
  compact: boolean;
  tone: "dark" | "light";
  highlight: IslandId | "all" | null;
};

type RGB = [number, number, number];
const C = {
  white: [255, 255, 255] as RGB,
  blue300: [141, 184, 255] as RGB,
  blue400: [79, 163, 247] as RGB,
  blue500: [47, 123, 246] as RGB,
  blue600: [31, 95, 214] as RGB,
  orange: [255, 122, 26] as RGB,
};

type Particle = {
  alive: boolean;
  kind: 0 | 1; // 0: hạt nền trôi lên chậm · 1: hạt Tự học bay về lõi
  age: number;
  life: number;
  x0: number;
  y0: number;
  cx: number;
  cy: number;
  x1: number;
  y1: number;
  r: number;
  a: number;
  sprite: number;
  ph: number;
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
/** Làm mượt theo hàm mũ, ~500 ms để tới gần đích */
const approach = (v: number, target: number, dt: number) => v + (target - v) * (1 - Math.exp(-dt / 0.16));

function makeSprite(rgb: RGB, size = 48): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const h = size / 2;
  const gr = g.createRadialGradient(h, h, 0, h, h, h);
  const s = rgb.join(",");
  gr.addColorStop(0, `rgba(${s},1)`);
  gr.addColorStop(0.22, `rgba(${s},0.9)`);
  gr.addColorStop(0.45, `rgba(${s},0.28)`);
  gr.addColorStop(1, `rgba(${s},0)`);
  g.fillStyle = gr;
  g.fillRect(0, 0, size, size);
  return c;
}

export class SceneEngine {
  private ctx: CanvasRenderingContext2D;
  private pool: Particle[] = [];
  private sprites: HTMLCanvasElement[];
  private beamPts: Pt[];
  private raf = 0;
  private last = 0;
  private time = 0;
  private scale = 1;
  private dpr = 1;
  private cssW = 0;
  private cssH = 0;
  private learn = 0;
  private beam = 0;
  private steelMix = 0;
  private flash = 0;
  private accAmb = 0;
  private accLearn = 0;
  private lowPower = false;
  private fpsT = 0;
  private fpsN = 0;
  running = false;
  staticMode = false;
  targets: EngineTargets;

  constructor(
    private canvas: HTMLCanvasElement,
    targets: EngineTargets,
  ) {
    this.ctx = canvas.getContext("2d", { alpha: true })!;
    this.targets = targets;
    // 0 white · 1 blue300 · 2 blue400 · 3 blue500 · 4 orange · 5 blue600
    this.sprites = [C.white, C.blue300, C.blue400, C.blue500, C.orange, C.blue600].map((c) => makeSprite(c));
    for (let i = 0; i < 120; i++) {
      this.pool.push({ alive: false, kind: 0, age: 0, life: 1, x0: 0, y0: 0, cx: 0, cy: 0, x1: 0, y1: 0, r: 1, a: 1, sprite: 1, ph: 0 });
    }
    this.beamPts = sampleBeam(180);
  }

  private get max() {
    const m = this.targets.compact ? 40 : 120;
    return this.lowPower ? Math.round(m / 2) : m;
  }

  setTargets(t: EngineTargets) {
    this.targets = t;
  }

  resize(cssW: number, cssH: number) {
    this.cssW = cssW;
    this.cssH = cssH;
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.canvas.width = Math.max(1, Math.round(cssW * this.dpr));
    this.canvas.height = Math.max(1, Math.round(cssH * this.dpr));
    this.scale = cssW / VB_W;
    this.redraw();
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.staticMode = false;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  /** Trạng thái tĩnh (giảm chuyển động hoặc tắt hạt): mô phỏng trước vài giây rồi vẽ một khung */
  renderStatic() {
    this.stop();
    this.staticMode = true;
    for (const p of this.pool) p.alive = false;
    const t = this.targets;
    this.learn = t.state === 1 || t.converge ? 1 : 0;
    this.beam = t.state === 3 ? 1 : 0;
    this.steelMix = t.steel ? 1 : 0;
    this.flash = 0;
    this.time = 2.2;
    for (let i = 0; i < 150; i++) this.step(1 / 30, true);
    this.draw();
  }

  redraw() {
    if (this.staticMode) this.renderStatic();
    else this.draw();
  }

  private loop = (now: number) => {
    if (!this.running) return;
    const raw = (now - this.last) / 1000;
    this.last = now;
    const dt = Math.min(0.05, raw);
    // Hạ mật độ hạt nếu máy yếu (trung bình dưới ~30 khung hình/giây trong 2 giây)
    this.fpsT += raw;
    this.fpsN++;
    if (this.fpsT > 2) {
      if (this.fpsT / this.fpsN > 0.034) this.lowPower = true;
      this.fpsT = 0;
      this.fpsN = 0;
    }
    this.step(dt, false);
    this.draw();
    this.raf = requestAnimationFrame(this.loop);
  };

  private aliveCount() {
    let n = 0;
    for (const p of this.pool) if (p.alive) n++;
    return n;
  }

  private spawn(): Particle | null {
    if (this.aliveCount() >= this.max) return null;
    for (const p of this.pool) if (!p.alive) return p;
    return null;
  }

  private pickIsland(): IslandId {
    const h = this.targets.highlight;
    if (h && h !== "all" && Math.random() < 0.7) return h;
    return ISLAND_IDS[Math.floor(Math.random() * 3)];
  }

  private spawnAmbient() {
    const p = this.spawn();
    if (!p) return;
    const id = this.pickIsland();
    const [x, y] = islandPoint(id, rand(-HALF, HALF), rand(-HALF, HALF), rand(4, 30));
    const light = this.targets.tone === "light";
    p.alive = true;
    p.kind = 0;
    p.age = 0;
    p.life = rand(5, 8.5);
    p.x0 = x;
    p.y0 = y;
    p.cy = -rand(6, 13); // vận tốc đi lên (đơn vị/giây)
    p.cx = rand(3, 8); // biên độ lắc ngang
    p.ph = rand(0, Math.PI * 2);
    p.r = rand(3.2, 4.6);
    p.a = rand(0.25, 0.55);
    p.sprite = light ? 3 : 1;
  }

  private spawnLearn() {
    const p = this.spawn();
    if (!p) return;
    const t = this.targets;
    let x0: number;
    let y0: number;
    if (t.converge) {
      const id = ISLAND_IDS[Math.floor(Math.random() * 3)];
      [x0, y0] = islandPoint(id, rand(-40, 40), rand(-40, 30), rand(6, 24));
    } else {
      // Từ băng chuyền và trạm lắp ráp của đảo gia dụng
      [x0, y0] = Math.random() < 0.75 ? islandPoint("gia-dung", rand(-48, 46), rand(3, 14), 7) : islandPoint("gia-dung", rand(-48, -26), rand(-46, -28), 24);
    }
    const x1 = CORE.x + rand(-8, 8);
    const y1 = CORE.y + rand(-6, 8);
    const light = t.tone === "light";
    p.alive = true;
    p.kind = 1;
    p.age = 0;
    p.life = rand(2.0, 3.0);
    p.x0 = x0;
    p.y0 = y0;
    p.x1 = x1;
    p.y1 = y1;
    p.cx = x0 + (x1 - x0) * 0.2 + rand(-26, 26);
    p.cy = y1 + (y0 - y1) * 0.3 + rand(-14, 14);
    p.r = rand(4.2, 6.8);
    p.a = rand(0.4, 0.9);
    p.sprite = light ? (Math.random() < 0.6 ? 3 : 5) : Math.random() < 0.65 ? 1 : 0;
  }

  private step(dt: number, prewarm: boolean) {
    const t = this.targets;
    this.time += dt;
    if (!prewarm) {
      this.learn = approach(this.learn, t.state === 1 || t.converge ? 1 : 0, dt);
      this.beam = approach(this.beam, t.state === 3 ? 1 : 0, dt);
      this.steelMix = approach(this.steelMix, t.steel ? 1 : 0, dt);
    }
    this.flash *= Math.exp(-dt * 2.5);

    const max = this.max;
    this.accAmb += dt * ((max * 0.28) / 6.5);
    while (this.accAmb >= 1) {
      this.accAmb -= 1;
      this.spawnAmbient();
    }
    this.accLearn += dt * ((max * 0.6) / 2.5) * this.learn;
    while (this.accLearn >= 1) {
      this.accLearn -= 1;
      this.spawnLearn();
    }

    for (const p of this.pool) {
      if (!p.alive) continue;
      p.age += dt;
      if (p.age >= p.life) {
        p.alive = false;
        if (p.kind === 1 && !prewarm) this.flash = Math.min(0.4, this.flash + 0.025);
      }
    }
  }

  private draw() {
    const ctx = this.ctx;
    const t = this.targets;
    const light = t.tone === "light";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.cssW) return;
    const k = this.dpr * this.scale;
    ctx.setTransform(k, 0, 0, k, 0, 0);
    ctx.globalCompositeOperation = light ? "source-over" : "lighter";

    // Quầng sáng lõi: "thở" nhẹ, sáng dần khi Tự học
    const breathe = this.staticMode ? 0 : Math.sin((this.time * Math.PI * 2) / 4.5) * 0.07;
    const energy = Math.min(1, 0.32 + 0.42 * this.learn + this.flash + breathe);
    const R = 92 * (1 + breathe * 0.6);
    const g = ctx.createRadialGradient(CORE.x, CORE.y, 0, CORE.x, CORE.y, R);
    const base = "47,123,246";
    const peak = light ? 0.22 : 0.5;
    g.addColorStop(0, `rgba(${base},${(energy * peak).toFixed(3)})`);
    g.addColorStop(0.35, `rgba(${base},${(energy * peak * 0.45).toFixed(3)})`);
    g.addColorStop(1, `rgba(${base},0)`);
    ctx.fillStyle = g;
    ctx.fillRect(CORE.x - R, CORE.y - R, R * 2, R * 2);
    if (!light && this.learn > 0.01) {
      ctx.globalAlpha = 0.35 * this.learn + this.flash;
      this.sprite(0, CORE.x, CORE.y, 16);
    }

    // Vệ tinh nhỏ trên quỹ đạo lõi
    const ang = this.time * 0.6;
    ctx.globalAlpha = light ? 0.7 : 0.8;
    this.sprite(light ? 3 : 1, CORE.x + Math.cos(ang) * 60, CORE.y + 8 + Math.sin(ang) * 20, 4.5);

    // Tia "Nhân rộng"
    if (this.beam > 0.01) this.drawBeam(light);

    // Hạt
    for (const p of this.pool) {
      if (!p.alive) continue;
      const u = p.age / p.life;
      let x: number;
      let y: number;
      let a: number;
      if (p.kind === 1) {
        const e = easeInOut(u);
        const v = 1 - e;
        x = v * v * p.x0 + 2 * v * e * p.cx + e * e * p.x1;
        y = v * v * p.y0 + 2 * v * e * p.cy + e * e * p.y1;
        a = p.a * clamp01(u / 0.15) * clamp01((1 - u) / 0.12);
      } else {
        x = p.x0 + Math.sin(p.age * 0.9 + p.ph) * p.cx;
        y = p.y0 + p.cy * p.age;
        a = p.a * clamp01(u / 0.2) * clamp01((1 - u) / 0.3);
      }
      if (a <= 0.01) continue;
      ctx.globalAlpha = a;
      this.sprite(p.sprite, x, y, p.r);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  private sprite(i: number, x: number, y: number, r: number) {
    this.ctx.drawImage(this.sprites[i], x - r, y - r, r * 2, r * 2);
  }

  private drawBeam(light: boolean) {
    const ctx = this.ctx;
    const pts = this.beamPts;
    const n = pts.length;
    const b = this.beam;
    const steel = this.steelMix;

    // Vệt nền của đường tia
    const trackA = (this.staticMode ? 0.55 : 0.22) * b;
    const grad = ctx.createLinearGradient(pts[0][0], 0, pts[n - 1][0], 0);
    const blue = light ? "47,123,246" : "79,163,247";
    grad.addColorStop(0, `rgba(${blue},${trackA})`);
    grad.addColorStop(0.7, `rgba(${blue},${trackA})`);
    const bc = light ? C.blue500 : C.blue400;
    const end = bc.map((v, i) => Math.round(v + (C.orange[i] - v) * steel)).join(",");
    grad.addColorStop(1, `rgba(${end},${Math.min(1, trackA * (1 + steel * 1.5))})`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < n; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.stroke();

    // Nút đảo trên đường tia
    const nodes = [0, Math.floor((n - 1) / 2), n - 1];
    nodes.forEach((idx, j) => {
      const isEnd = j === 2;
      ctx.globalAlpha = b * 0.9;
      this.sprite(isEnd && steel > 0.5 ? 4 : light ? 3 : 2, pts[idx][0], pts[idx][1], isEnd ? 7 : 5.5);
    });

    // Xung sáng chạy dọc tia
    const heads = this.staticMode ? [0.5] : this.targets.compact ? [0] : [0, 0.5];
    const speed = 0.2;
    for (const off of heads) {
      const s = this.staticMode ? off : (this.time * speed + off) % 1;
      const trail = 16;
      for (let k = trail; k >= 0; k--) {
        const sk = s - k * 0.011;
        if (sk < 0) continue;
        const idx = Math.min(n - 1, Math.round(sk * (n - 1)));
        const [x, y] = pts[idx];
        const fade = 1 - k / (trail + 1);
        const m = steel * clamp01((sk - 0.72) / 0.22);
        const r = k === 0 ? 8 : 2 + 3.5 * fade;
        const a = b * fade * (k === 0 ? 1 : 0.6);
        if (m < 1) {
          ctx.globalAlpha = a * (1 - m);
          this.sprite(light ? 3 : 2, x, y, r);
        }
        if (m > 0) {
          ctx.globalAlpha = a * m;
          this.sprite(4, x, y, r);
        }
      }
    }
    ctx.globalAlpha = 1;
  }
}
