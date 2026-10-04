/**
 * Hình học dùng chung cho cảnh "Nhà máy sống" (SVG và Canvas cùng một hệ tọa độ viewBox 800 × 520).
 * Phép chiếu isometric trên lưới 30°: x đi xuống phải, y đi xuống trái, z đi lên.
 */
/** Ba vị trí đảo cố định: trái · giữa · phải (tên giữ theo bản đầu tiên; mỗi deck tự gán đảo của mình vào vị trí) */
export type IslandId = "gia-dung" | "dien-lanh" | "thep";

export const VB_W = 800;
export const VB_H = 520;

export const C30 = Math.cos(Math.PI / 6);
export const S30 = 0.5;

export type Pt = [number, number];

/** Nửa cạnh mặt đảo (đơn vị cục bộ) và độ dày tấm đảo */
export const HALF = 58;
export const SLAB = 14;

export const ISLAND_IDS: IslandId[] = ["gia-dung", "dien-lanh", "thep"];

/** Tâm mặt trên của mỗi đảo, trong tọa độ viewBox */
export const ISLAND_POS: Record<IslandId, { x: number; y: number }> = {
  "gia-dung": { x: 170, y: 322 },
  "dien-lanh": { x: 400, y: 368 },
  thep: { x: 630, y: 322 },
};

/** Lõi Mô hình AI Thế giới thực */
export const CORE = { x: 400, y: 112, r: 30 };

/** Chiếu một điểm cục bộ của đảo (gốc ở tâm mặt trên) ra tọa độ viewBox */
export function iso(ox: number, oy: number, x: number, y: number, z = 0): Pt {
  return [ox + (x - y) * C30, oy + (x + y) * S30 - z];
}

export function islandPoint(id: IslandId, x: number, y: number, z = 0): Pt {
  const o = ISLAND_POS[id];
  return iso(o.x, o.y, x, y, z);
}

const f = (n: number) => (Math.round(n * 10) / 10).toString();

export function poly(pts: Pt[]): string {
  return "M" + pts.map((p) => `${f(p[0])} ${f(p[1])}`).join("L") + "Z";
}

export type BoxFaces = { top: string; left: string; right: string };

/** Khối hộp: mặt trên, mặt trước trái (+y), mặt trước phải (+x) */
export function box(ox: number, oy: number, x0: number, y0: number, w: number, d: number, h: number, z0 = 0): BoxFaces {
  const P = (x: number, y: number, z: number) => iso(ox, oy, x, y, z);
  const x1 = x0 + w;
  const y1 = y0 + d;
  const z1 = z0 + h;
  return {
    top: poly([P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)]),
    left: poly([P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)]),
    right: poly([P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), P(x1, y0, z1)]),
  };
}

export type CylFaces = { body: string; cx: number; cy: number; rx: number; ry: number };

/** Trụ đứng (ống khói, cuộn thép, bồn) */
export function cyl(ox: number, oy: number, x: number, y: number, r: number, h: number, z0 = 0): CylFaces {
  const [bx, by] = iso(ox, oy, x, y, z0);
  const ty = by - h;
  const rx = r * C30 * Math.SQRT2;
  const ry = r * S30 * Math.SQRT2;
  return {
    body: `M${f(bx - rx)} ${f(ty)}L${f(bx - rx)} ${f(by)}A${f(rx)} ${f(ry)} 0 0 0 ${f(bx + rx)} ${f(by)}L${f(bx + rx)} ${f(ty)}Z`,
    cx: bx,
    cy: ty,
    rx,
    ry,
  };
}

export function line(pts: Pt[]): string {
  return "M" + pts.map((p) => `${f(p[0])} ${f(p[1])}`).join("L");
}

/** Đường nối mảnh từ mỗi đảo lên lõi */
export const CONNECTORS: Record<IslandId, { from: Pt; ctrl: Pt; to: Pt }> = {
  "gia-dung": { from: [176, 286], ctrl: [206, 150], to: [374, 126] },
  "dien-lanh": { from: [400, 318], ctrl: [400, 230], to: [400, 143] },
  thep: { from: [622, 282], ctrl: [594, 150], to: [426, 126] },
};

/** Đường tia "Nhân rộng": gia dụng → điện lạnh → thép, vòng nhẹ phía trên mặt đảo */
export const BEAM_SEGMENTS: { a: Pt; c: Pt; b: Pt }[] = [
  { a: [182, 300], c: [286, 250], b: [400, 330] },
  { a: [400, 330], c: [514, 250], b: [618, 300] },
];

/** Lấy mẫu đường tia thành dãy điểm cách đều theo độ dài */
export function sampleBeam(n = 160): Pt[] {
  const raw: Pt[] = [];
  for (const s of BEAM_SEGMENTS) {
    for (let i = 0; i <= 80; i++) {
      const t = i / 80;
      const u = 1 - t;
      raw.push([u * u * s.a[0] + 2 * u * t * s.c[0] + t * t * s.b[0], u * u * s.a[1] + 2 * u * t * s.c[1] + t * t * s.b[1]]);
    }
  }
  const acc = [0];
  for (let i = 1; i < raw.length; i++) acc.push(acc[i - 1] + Math.hypot(raw[i][0] - raw[i - 1][0], raw[i][1] - raw[i - 1][1]));
  const total = acc[acc.length - 1];
  const out: Pt[] = [];
  let j = 0;
  for (let i = 0; i < n; i++) {
    const d = (i / (n - 1)) * total;
    while (j < acc.length - 2 && acc[j + 1] < d) j++;
    const seg = acc[j + 1] - acc[j] || 1;
    const t = (d - acc[j]) / seg;
    out.push([raw[j][0] + (raw[j + 1][0] - raw[j][0]) * t, raw[j][1] + (raw[j + 1][1] - raw[j][1]) * t]);
  }
  return out;
}

/** Nhánh "tương lai mờ" (Dự báo trước): tỏa ra từ dây chuyền gia dụng sang khoảng trống phía trái */
export const FUTURE_START: Pt = [150, 262];
export const FUTURE_BRANCHES: { ctrl: Pt; end: Pt }[] = [
  { ctrl: [128, 196], end: [92, 150] },
  { ctrl: [96, 238], end: [52, 212] },
  { ctrl: [100, 280], end: [48, 276] },
];
/** Nhánh được chọn (viền orange) */
export const FUTURE_CHOSEN = 1;

/** Màu theo token (mục 5.1) */
export const HEX = {
  navy950: "#06142E",
  navy900: "#0A1F44",
  navy800: "#0F2A5C",
  navy700: "#16367A",
  blue600: "#1F5FD6",
  blue500: "#2F7BF6",
  blue400: "#4FA3F7",
  blue300: "#8DB8FF",
  blue100: "#E6F0FF",
  white: "#FFFFFF",
  orange500: "#FF7A1A",
  orange700: "#C2500A",
  line200: "#DCE3EE",
};

/** Trộn hai màu hex theo tỉ lệ t (0 = b, 1 = a) */
export function mix(a: string, b: string, t: number): string {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (p: number, s: number) => (p >> s) & 255;
  const m = (s: number) => Math.round(ch(pa, s) * t + ch(pb, s) * (1 - t));
  return "#" + ((1 << 24) | (m(16) << 16) | (m(8) << 8) | m(0)).toString(16).slice(1);
}
