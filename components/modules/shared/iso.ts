/** Hình khối isometric trên lưới 30° (mục 5.3). Trả về chuỗi điểm cho <polygon>. */
const C = Math.cos(Math.PI / 6); // 0.866
const S = 0.5;

type Pt = [number, number];
const pt = (p: Pt) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;

/**
 * Khối hộp với góc đáy gần người xem nhất tại (x, y).
 * w: cạnh chạy lên phải, d: cạnh chạy lên trái, h: chiều cao.
 */
export function isoBox(x: number, y: number, w: number, d: number, h: number) {
  const B: Pt = [x, y];
  const R: Pt = [x + w * C, y - w * S];
  const L: Pt = [x - d * C, y - d * S];
  const K: Pt = [x + w * C - d * C, y - w * S - d * S];
  const up = (p: Pt): Pt => [p[0], p[1] - h];
  return {
    left: [B, L, up(L), up(B)].map(pt).join(" "),
    right: [B, R, up(R), up(B)].map(pt).join(" "),
    top: [up(B), up(R), up(K), up(L)].map(pt).join(" "),
    /** các đỉnh mặt trên: gần, phải, xa, trái */
    topPts: { near: up(B), right: up(R), far: up(K), left: up(L) },
  };
}
