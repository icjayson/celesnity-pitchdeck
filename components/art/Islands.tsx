/**
 * Ba đảo isometric của cảnh "Nhà máy sống" (SVG thuần, không trạng thái).
 * Gia dụng: dây chuyền lắp ráp, băng chuyền, bếp và tủ · Điện lạnh: tủ lạnh, ống, dàn nóng · Thép: lò, ống khói, cuộn thép.
 */
import type { ReactNode } from "react";
import type { IslandId } from "./FactoryScene";
import { HALF, HEX, ISLAND_POS, SLAB, box, cyl, iso, line, mix, type BoxFaces, type CylFaces, type Pt } from "./geometry";

export type Tone = "dark" | "light";

export type Pal = {
  stroke: string;
  detail: string;
  grid: string;
  slabTop: string;
  slabLeft: string;
  slabRight: string;
  top: string;
  left: string;
  right: string;
};

export function paletteFor(id: IslandId, tone: Tone): Pal {
  if (id === "thep") {
    return {
      stroke: HEX.blue300,
      detail: HEX.blue300,
      grid: "rgba(141,184,255,0.22)",
      slabTop: HEX.navy800,
      slabLeft: HEX.navy700,
      slabRight: "#0C2350",
      top: "#22479A",
      left: HEX.navy700,
      right: HEX.navy800,
    };
  }
  const base = id === "gia-dung" ? (tone === "dark" ? HEX.blue500 : HEX.blue600) : tone === "dark" ? HEX.blue400 : HEX.blue500;
  const bg = tone === "dark" ? HEX.navy950 : HEX.white;
  const k = tone === "dark" ? [0.12, 0.2, 0.08, 0.34, 0.24, 0.14] : [0.05, 0.14, 0.24, 0.1, 0.2, 0.32];
  return {
    stroke: base,
    detail: tone === "dark" ? HEX.blue300 : base,
    grid: tone === "dark" ? "rgba(141,184,255,0.16)" : "rgba(31,95,214,0.14)",
    slabTop: mix(base, bg, k[0]),
    slabLeft: mix(base, bg, k[1]),
    slabRight: mix(base, bg, k[2]),
    top: mix(base, bg, k[3]),
    left: mix(base, bg, k[4]),
    right: mix(base, bg, k[5]),
  };
}

const NS = { vectorEffect: "non-scaling-stroke" as const };

function Box({ f, pal, slab = false }: { f: BoxFaces; pal: Pal; slab?: boolean }) {
  return (
    <g>
      <path {...NS} d={f.left} fill={slab ? pal.slabLeft : pal.left} />
      <path {...NS} d={f.right} fill={slab ? pal.slabRight : pal.right} />
      <path {...NS} d={f.top} fill={slab ? pal.slabTop : pal.top} />
    </g>
  );
}

function Cyl({ c, pal, children }: { c: CylFaces; pal: Pal; children?: ReactNode }) {
  return (
    <g>
      <path {...NS} d={c.body} fill={pal.left} />
      <ellipse {...NS} cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry} fill={pal.top} />
      {children}
    </g>
  );
}

function Detail({ d, pal, opacity = 0.55 }: { d: string; pal: Pal; opacity?: number }) {
  return <path {...NS} d={d} fill="none" stroke={pal.detail} strokeOpacity={opacity} strokeWidth={1} />;
}

/** Ống: nét dày theo tỉ lệ (không cố định pixel) để ống co theo khung */
function Pipe({ pts, pal }: { pts: Pt[]; pal: Pal }) {
  const d = line(pts);
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={pal.stroke} strokeWidth={4.5} />
      <path d={d} stroke={pal.top} strokeWidth={2} />
    </g>
  );
}

function Platform({ ox, oy, pal }: { ox: number; oy: number; pal: Pal }) {
  const grid: string[] = [];
  for (let i = 1; i < 4; i++) {
    const v = -HALF + (i * 2 * HALF) / 4;
    grid.push(line([iso(ox, oy, v, -HALF), iso(ox, oy, v, HALF)]));
    grid.push(line([iso(ox, oy, -HALF, v), iso(ox, oy, HALF, v)]));
  }
  return (
    <g>
      <Box f={box(ox, oy, -HALF, -HALF, 2 * HALF, 2 * HALF, SLAB, -SLAB)} pal={pal} slab />
      <path {...NS} d={grid.join("")} fill="none" stroke={pal.grid} strokeWidth={1} />
    </g>
  );
}

function GiaDung({ ox, oy, pal }: { ox: number; oy: number; pal: Pal }) {
  const P = (x: number, y: number, z: number) => iso(ox, oy, x, y, z);
  const burners: [number, number][] = [
    [18, -40],
    [30, -40],
  ];
  const rollers: string[] = [];
  for (let x = -44; x <= 44; x += 11) rollers.push(line([P(x, 2, 6), P(x, 16, 6)]));
  return (
    <g>
      {/* Trạm lắp ráp */}
      <Box f={box(ox, oy, -50, -50, 26, 22, 24)} pal={pal} />
      <Box f={box(ox, oy, -44, -46, 12, 12, 8, 24)} pal={pal} />
      <Detail d={line([P(-46, -28, 8), P(-28, -28, 8), P(-28, -28, 18), P(-46, -28, 18)]) + "Z"} pal={pal} />
      {/* Tủ */}
      <Box f={box(ox, oy, -16, -52, 16, 14, 36)} pal={pal} />
      <Detail d={line([P(-8, -38, 3), P(-8, -38, 33)])} pal={pal} />
      <Detail d={line([P(-11, -38, 16), P(-11, -38, 21)]) + line([P(-5, -38, 16), P(-5, -38, 21)])} pal={pal} opacity={0.8} />
      {/* Bếp */}
      <Box f={box(ox, oy, 8, -50, 30, 20, 12)} pal={pal} />
      {burners.map(([x, y]) => {
        const [cx, cy] = P(x, y, 12);
        return <ellipse key={x} {...NS} cx={cx} cy={cy} rx={4.9} ry={2.8} fill="none" stroke={pal.detail} strokeOpacity={0.8} strokeWidth={1} />;
      })}
      <Detail d={line([P(12, -30, 7), P(34, -30, 7)])} pal={pal} />
      {/* Băng chuyền */}
      <Box f={box(ox, oy, -52, 2, 104, 14, 6)} pal={pal} />
      <Detail d={rollers.join("")} pal={pal} opacity={0.4} />
      {/* Sản phẩm trên băng chuyền */}
      {[-40, -14, 12, 36].map((x) => (
        <Box key={x} f={box(ox, oy, x, 5, 9, 8, 8, 6)} pal={pal} />
      ))}
    </g>
  );
}

function DienLanh({ ox, oy, pal }: { ox: number; oy: number; pal: Pal }) {
  const P = (x: number, y: number, z: number) => iso(ox, oy, x, y, z);
  const fridges = [
    { x: -50, h: 40 },
    { x: -31, h: 32 },
    { x: -12, h: 37 },
  ];
  const fan = P(30, 9, 14);
  return (
    <g>
      {fridges.map(({ x, h }) => (
        <g key={x}>
          <Box f={box(ox, oy, x, -48, 16, 16, h)} pal={pal} />
          <Detail d={line([P(x + 1, -32, h * 0.62), P(x + 15, -32, h * 0.62)])} pal={pal} />
          <Detail
            d={line([P(x + 13, -32, h * 0.7), P(x + 13, -32, h * 0.86)]) + line([P(x + 13, -32, h * 0.32), P(x + 13, -32, h * 0.5)])}
            pal={pal}
            opacity={0.85}
          />
        </g>
      ))}
      {/* Dàn nóng */}
      <Box f={box(ox, oy, 14, -4, 32, 26, 14)} pal={pal} />
      <ellipse {...NS} cx={fan[0]} cy={fan[1]} rx={10.6} ry={6.1} fill="none" stroke={pal.detail} strokeOpacity={0.7} strokeWidth={1} />
      <ellipse {...NS} cx={fan[0]} cy={fan[1]} rx={2.6} ry={1.5} fill={pal.detail} fillOpacity={0.7} />
      {/* Ống */}
      <Pipe
        pts={[P(6, -40, 26), P(30, -40, 26), P(30, 2, 26), P(30, 2, 14)]}
        pal={pal}
      />
      <Pipe pts={[P(6, -34, 16), P(22, -34, 16), P(22, 0, 16), P(22, 0, 14)]} pal={pal} />
      <Pipe pts={[P(-30, 10, 8), P(-30, -32, 8)]} pal={pal} />
      {/* Bồn */}
      <Cyl c={cyl(ox, oy, -34, 18, 9, 24)} pal={pal} />
    </g>
  );
}

function Thep({ ox, oy, pal }: { ox: number; oy: number; pal: Pal }) {
  const P = (x: number, y: number, z: number) => iso(ox, oy, x, y, z);
  const coils: [number, number][] = [
    [16, 4],
    [38, 4],
    [27, 28],
  ];
  const ring = (c: CylFaces, k: number, o: number) => (
    <ellipse {...NS} cx={c.cx} cy={c.cy} rx={c.rx * k} ry={c.ry * k} fill="none" stroke={pal.detail} strokeOpacity={o} strokeWidth={1} />
  );
  const ch1 = cyl(ox, oy, -8, -46, 5, 74);
  const ch2 = cyl(ox, oy, 6, -46, 4, 58);
  return (
    <g>
      {/* Lò */}
      <Box f={box(ox, oy, -52, -52, 30, 30, 32)} pal={pal} />
      <Box f={box(ox, oy, -46, -46, 18, 18, 12, 32)} pal={pal} />
      <path {...NS} d={line([P(-44, -22, 4), P(-32, -22, 4), P(-32, -22, 16), P(-44, -22, 16)]) + "Z"} fill={pal.detail} fillOpacity={0.16} stroke={pal.detail} strokeOpacity={0.6} strokeWidth={1} />
      {/* Ống khói */}
      <Cyl c={ch1} pal={pal}>
        <Detail d={`M${ch1.cx - ch1.rx} ${ch1.cy + 14}A${ch1.rx} ${ch1.ry} 0 0 0 ${ch1.cx + ch1.rx} ${ch1.cy + 14}`} pal={pal} />
      </Cyl>
      <Cyl c={ch2} pal={pal} />
      {/* Ống thép xếp chồng */}
      <Box f={box(ox, oy, -50, 12, 40, 7, 6)} pal={pal} />
      <Box f={box(ox, oy, -50, 21, 40, 7, 6)} pal={pal} />
      <Box f={box(ox, oy, -50, 16, 40, 8, 6, 6)} pal={pal} />
      {/* Cuộn thép */}
      {coils.map(([x, y]) => {
        const c = cyl(ox, oy, x, y, 9, 11);
        return (
          <Cyl key={`${x}-${y}`} c={c} pal={pal}>
            {ring(c, 0.7, 0.45)}
            {ring(c, 0.36, 0.85)}
          </Cyl>
        );
      })}
    </g>
  );
}

export function IslandArt({ id, tone }: { id: IslandId; tone: Tone }) {
  const pal = paletteFor(id, tone);
  const { x, y } = ISLAND_POS[id];
  return (
    <g>
      <Platform ox={x} oy={y} pal={pal} />
      {id === "gia-dung" ? <GiaDung ox={x} oy={y} pal={pal} /> : id === "dien-lanh" ? <DienLanh ox={x} oy={y} pal={pal} /> : <Thep ox={x} oy={y} pal={pal} />}
    </g>
  );
}
