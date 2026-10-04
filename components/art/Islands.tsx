/**
 * Ba đảo isometric của cảnh "Nhà máy sống" (SVG thuần, không trạng thái).
 * Gia dụng: dây chuyền lắp ráp, băng chuyền, bếp và tủ · Điện lạnh: tủ lạnh, ống, dàn nóng · Thép: lò, ống khói, cuộn thép.
 * Viên nang: máy chiết rót, băng tải viên nang, máy đóng hộp · Nhà máy cà phê: tháp sấy, silo · Mạng lưới: ba nhà máy nối về một điểm.
 * Chuyền cabin: ba cabin xe tải trên xe đẩy, một đồ gá bao quanh · Nhà máy xe tải: năm khoang BODY · PAINT · TRIM · CHASSIS · QC, kiện CKD
 * · Đại lý và hậu mãi: khoang dịch vụ có xe tải trên cầu nâng, đường ra hai đại lý.
 */
import type { ReactNode } from "react";
import type { IslandSpec } from "@/decks/types";
import { HALF, HEX, ISLAND_POS, SLAB, box, cyl, iso, line, mix, type BoxFaces, type CylFaces, type IslandId, type Pt } from "./geometry";

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

/** Dây chuyền viên nang: máy chiết rót có phễu, băng tải viên nang, máy đóng hộp và chồng hộp */
function CapsuleLine({ ox, oy, pal }: { ox: number; oy: number; pal: Pal }) {
  const P = (x: number, y: number, z: number) => iso(ox, oy, x, y, z);
  const rollers: string[] = [];
  for (let x = -44; x <= 44; x += 11) rollers.push(line([P(x, 4, 6), P(x, 18, 6)]));
  const hopper = cyl(ox, oy, -38, -40, 7, 12, 34);
  return (
    <g>
      {/* Máy chiết rót */}
      <Box f={box(ox, oy, -52, -52, 28, 24, 34)} pal={pal} />
      <Cyl c={hopper} pal={pal} />
      <Detail d={line([P(-50, -28, 10), P(-30, -28, 10), P(-30, -28, 26), P(-50, -28, 26)]) + "Z"} pal={pal} />
      {/* Bảng điều khiển */}
      <Box f={box(ox, oy, -18, -50, 6, 10, 22)} pal={pal} />
      {/* Máy đóng hộp */}
      <Box f={box(ox, oy, 8, -50, 32, 22, 20)} pal={pal} />
      <Detail d={line([P(12, -28, 6), P(36, -28, 6)])} pal={pal} />
      {/* Chồng hộp thành phẩm */}
      <Box f={box(ox, oy, 42, -46, 12, 12, 8)} pal={pal} />
      <Box f={box(ox, oy, 42, -46, 12, 12, 8, 8)} pal={pal} />
      {/* Băng tải và viên nang */}
      <Box f={box(ox, oy, -52, 4, 104, 14, 6)} pal={pal} />
      <Detail d={rollers.join("")} pal={pal} opacity={0.4} />
      {[-42, -30, -18, -6, 6, 18, 30, 42].map((x) => (
        <Cyl key={x} c={cyl(ox, oy, x, 11, 3.6, 4, 6)} pal={pal} />
      ))}
    </g>
  );
}

/** Nhà máy cà phê: tháp sấy phun, cyclone, khu chiết xuất và silo bột */
function CoffeePlant({ ox, oy, pal }: { ox: number; oy: number; pal: Pal }) {
  const P = (x: number, y: number, z: number) => iso(ox, oy, x, y, z);
  const tower = cyl(ox, oy, -28, -30, 13, 62);
  const cyclone = cyl(ox, oy, -4, -44, 5, 46);
  const silo1 = cyl(ox, oy, 22, -36, 9, 40);
  const silo2 = cyl(ox, oy, 40, -18, 9, 34);
  return (
    <g>
      {/* Khu chiết xuất */}
      <Box f={box(ox, oy, -52, 10, 46, 30, 18)} pal={pal} />
      <Detail d={line([P(-46, 40, 6), P(-12, 40, 6)]) + line([P(-46, 40, 12), P(-12, 40, 12)])} pal={pal} opacity={0.45} />
      {/* Tháp sấy phun */}
      <Cyl c={tower} pal={pal}>
        <Detail d={`M${tower.cx - tower.rx} ${tower.cy + 18}A${tower.rx} ${tower.ry} 0 0 0 ${tower.cx + tower.rx} ${tower.cy + 18}`} pal={pal} />
        <Detail d={`M${tower.cx - tower.rx} ${tower.cy + 40}A${tower.rx} ${tower.ry} 0 0 0 ${tower.cx + tower.rx} ${tower.cy + 40}`} pal={pal} opacity={0.35} />
      </Cyl>
      <Cyl c={cyclone} pal={pal} />
      {/* Silo bột */}
      <Cyl c={silo1} pal={pal} />
      <Cyl c={silo2} pal={pal} />
      {/* Ống dẫn bột */}
      <Pipe pts={[P(-16, -30, 56), P(-4, -40, 56), P(-4, -40, 46)]} pal={pal} />
      <Pipe pts={[P(-4, -40, 30), P(22, -36, 30), P(22, -36, 40)]} pal={pal} />
      <Pipe pts={[P(22, -28, 14), P(40, -18, 14)]} pal={pal} />
      {/* Băng tải ra dây chuyền */}
      <Box f={box(ox, oy, 6, 14, 46, 10, 5)} pal={pal} />
    </g>
  );
}

/** Mạng lưới nhà máy: ba nhà máy nhỏ nối về một điểm chung */
function Network({ ox, oy, pal }: { ox: number; oy: number; pal: Pal }) {
  const P = (x: number, y: number, z: number) => iso(ox, oy, x, y, z);
  const hub = cyl(ox, oy, 4, 4, 7, 8);
  const tank = cyl(ox, oy, 36, -40, 7, 22);
  const links = [
    line([P(-34, -34, 1), P(4, 4, 1)]),
    line([P(28, -30, 1), P(4, 4, 1)]),
    line([P(-30, 36, 1), P(4, 4, 1)]),
  ];
  return (
    <g>
      <path {...NS} d={links.join("")} fill="none" stroke={pal.detail} strokeOpacity={0.55} strokeWidth={1} strokeDasharray="3 4" />
      {/* Nhà máy 1: xưởng và ống khói */}
      <Box f={box(ox, oy, -50, -50, 26, 26, 22)} pal={pal} />
      <Cyl c={cyl(ox, oy, -30, -46, 4, 40)} pal={pal} />
      {/* Nhà máy 2: xưởng và bồn */}
      <Box f={box(ox, oy, 12, -46, 22, 22, 16)} pal={pal} />
      <Cyl c={tank} pal={pal} />
      {/* Nhà máy 3: xưởng dài */}
      <Box f={box(ox, oy, -50, 26, 38, 20, 14)} pal={pal} />
      <Detail d={line([P(-46, 46, 5), P(-16, 46, 5)])} pal={pal} opacity={0.45} />
      {/* Điểm chung */}
      <Cyl c={hub} pal={pal}>
        <ellipse {...NS} cx={hub.cx} cy={hub.cy} rx={hub.rx * 0.45} ry={hub.ry * 0.45} fill={pal.detail} fillOpacity={0.7} />
      </Cyl>
    </g>
  );
}

/** Glass panel (kính lái, cửa kính): nền nhạt, viền mảnh */
function Glass({ d, pal }: { d: string; pal: Pal }) {
  return <path {...NS} d={d} fill={pal.detail} fillOpacity={0.16} stroke={pal.detail} strokeOpacity={0.6} strokeWidth={1} />;
}

/** Cabin xe tải đầu bằng (kiểu N/Q-Series): đầu xe quay về +x, kính lái ở mặt phải, cửa và kính cửa ở mặt trái */
function Cab({ ox, oy, pal, x, y, z0 = 0, s = 1 }: { ox: number; oy: number; pal: Pal; x: number; y: number; z0?: number; s?: number }) {
  const P = (px: number, py: number, pz: number) => iso(ox, oy, px, py, pz);
  const w = 12 * s;
  const d = 14 * s;
  const h = 16 * s;
  const x1 = x + w;
  const y1 = y + d;
  return (
    <g>
      <Box f={box(ox, oy, x, y, w, d, h, z0)} pal={pal} />
      <Glass d={line([P(x1, y + 1.5 * s, z0 + h * 0.55), P(x1, y1 - 1.5 * s, z0 + h * 0.55), P(x1, y1 - 1.5 * s, z0 + h - 1.5 * s), P(x1, y + 1.5 * s, z0 + h - 1.5 * s)]) + "Z"} pal={pal} />
      <Detail d={line([P(x1, y + 3 * s, z0 + h * 0.25), P(x1, y1 - 3 * s, z0 + h * 0.25)])} pal={pal} opacity={0.7} />
      <Glass d={line([P(x + w * 0.4, y1, z0 + h * 0.55), P(x1 - 1.5 * s, y1, z0 + h * 0.55), P(x1 - 1.5 * s, y1, z0 + h - 2 * s), P(x + w * 0.4, y1, z0 + h - 2 * s)]) + "Z"} pal={pal} />
      <Detail d={line([P(x + w * 0.4, y1, z0 + 2 * s), P(x + w * 0.4, y1, z0 + h - 2 * s)])} pal={pal} opacity={0.45} />
    </g>
  );
}

/** Xe tải hoàn chỉnh: khung gầm thấp, thùng hàng phía sau, cabin phía trước (+x) */
function Truck({ ox, oy, pal, x, y, z0 = 0, s = 1 }: { ox: number; oy: number; pal: Pal; x: number; y: number; z0?: number; s?: number }) {
  const bed = 20 * s;
  return (
    <g>
      <Box f={box(ox, oy, x, y + 2 * s, bed + 13 * s, 10 * s, 3 * s, z0)} pal={pal} />
      <Box f={box(ox, oy, x, y, bed, 14 * s, 15 * s, z0 + 3 * s)} pal={pal} />
      <Cab ox={ox} oy={oy} pal={pal} x={x + bed + 1 * s} y={y} z0={z0 + 3 * s} s={s} />
    </g>
  );
}

/** Chuyền hàn cabin: giá tấm vỏ, robot hàn, tủ điều khiển, ray và ba cabin trên xe đẩy, đồ gá bao quanh cabin giữa */
function TruckLine({ ox, oy, pal }: { ox: number; oy: number; pal: Pal }) {
  const P = (x: number, y: number, z: number) => iso(ox, oy, x, y, z);
  const panels: string[] = [];
  for (let x = -46; x <= -26; x += 5) panels.push(line([P(x, -38, 3), P(x, -38, 19)]));
  const robot = cyl(ox, oy, 4, -40, 6, 8);
  const cabs = [-46, -10, 26];
  const JZ = 30;
  const post = (x: number, y: number) => <Box key={`${x}${y}`} f={box(ox, oy, x, y, 2, 2, JZ)} pal={pal} />;
  return (
    <g>
      {/* Giá tấm vỏ cabin */}
      <Box f={box(ox, oy, -50, -52, 28, 14, 22)} pal={pal} />
      <Detail d={panels.join("")} pal={pal} opacity={0.45} />
      {/* Robot hàn: đế và cánh tay vươn về đồ gá */}
      <Cyl c={robot} pal={pal} />
      <Pipe pts={[P(4, -40, 8), P(4, -40, 26), P(-2, -16, 34), P(-2, -10, 28)]} pal={pal} />
      {/* Tủ điều khiển */}
      <Box f={box(ox, oy, 30, -52, 14, 10, 26)} pal={pal} />
      <Detail d={line([P(33, -42, 18), P(41, -42, 18)]) + line([P(33, -42, 12), P(41, -42, 12)])} pal={pal} opacity={0.7} />
      {/* Ray dây chuyền */}
      <Box f={box(ox, oy, -54, -6, 108, 20, 3)} pal={pal} />
      <Detail d={line([P(-52, -1, 3), P(52, -1, 3)]) + line([P(-52, 9, 3), P(52, 9, 3)])} pal={pal} opacity={0.5} />
      {/* Đồ gá: cột và dầm phía sau */}
      {post(-15, -8)}
      {post(7, -8)}
      {post(-15, 12)}
      <Box f={box(ox, oy, -15, -8, 24, 2, 2, JZ)} pal={pal} />
      <Box f={box(ox, oy, -15, -6, 2, 18, 2, JZ)} pal={pal} />
      {/* Ba cabin trên xe đẩy */}
      {cabs.map((x) => (
        <g key={x}>
          <Box f={box(ox, oy, x - 2, -4, 16, 16, 4, 3)} pal={pal} />
          <Cab ox={ox} oy={oy} pal={pal} x={x} y={-3} z0={7} />
        </g>
      ))}
      {/* Đồ gá: cột và dầm phía trước */}
      <Box f={box(ox, oy, 7, -6, 2, 18, 2, JZ)} pal={pal} />
      <Box f={box(ox, oy, -13, 12, 22, 2, 2, JZ)} pal={pal} />
      {post(7, 12)}
      {/* Xe đẩy linh kiện */}
      <Box f={box(ox, oy, -44, 26, 18, 12, 8)} pal={pal} />
      <Box f={box(ox, oy, -42, 28, 14, 8, 5, 8)} pal={pal} />
    </g>
  );
}

/** Nhà máy xe tải: xưởng dài năm khoang BODY · PAINT · TRIM · CHASSIS · QC, kiện CKD và xe thành phẩm */
function TruckPlant({ ox, oy, pal }: { ox: number; oy: number; pal: Pal }) {
  const P = (x: number, y: number, z: number) => iso(ox, oy, x, y, z);
  const bx = [-52, -30, -8, 14, 36];
  const windows: string[] = [];
  for (let x = -50; x <= 48; x += 8) windows.push(line([P(x, -48, 13), P(x + 5, -48, 13)]));
  const bays: string[] = [];
  for (let i = 1; i < 5; i++) bays.push(line([P(bx[i] - 2, -46, 2), P(bx[i] - 2, -16, 2)]));
  const vents: string[] = [];
  for (let z = 8; z <= 22; z += 5) vents.push(line([P(-12, -40, z), P(-12, -20, z)]));
  return (
    <g>
      {/* Tường sau có cửa sổ mái */}
      <Box f={box(ox, oy, -54, -52, 108, 4, 18)} pal={pal} />
      <Detail d={windows.join("")} pal={pal} opacity={0.6} />
      {/* Sàn xưởng chia khoang */}
      <Box f={box(ox, oy, -54, -48, 108, 32, 2)} pal={pal} />
      <Detail d={bays.join("")} pal={pal} opacity={0.4} />
      {/* BODY: cabin trong đồ gá */}
      <Box f={box(ox, oy, bx[0], -38, 2, 2, 24, 2)} pal={pal} />
      <Cab ox={ox} oy={oy} pal={pal} x={bx[0] + 3} y={-38} z0={2} s={0.85} />
      <Box f={box(ox, oy, bx[0], -38, 18, 2, 2, 26)} pal={pal} />
      <Box f={box(ox, oy, bx[0] + 16, -38, 2, 2, 24, 2)} pal={pal} />
      {/* PAINT: buồng sơn kín có khe hút */}
      <Box f={box(ox, oy, bx[1], -44, 18, 24, 26, 2)} pal={pal} />
      <Detail d={vents.join("")} pal={pal} opacity={0.5} />
      <Detail d={line([P(bx[1] + 4, -20, 2), P(bx[1] + 4, -20, 20), P(bx[1] + 14, -20, 20), P(bx[1] + 14, -20, 2)])} pal={pal} />
      {/* TRIM: cabin trên xe đẩy, giá linh kiện */}
      <Box f={box(ox, oy, bx[2], -44, 18, 5, 12, 2)} pal={pal} />
      <Box f={box(ox, oy, bx[2] + 1, -34, 14, 14, 3, 2)} pal={pal} />
      <Cab ox={ox} oy={oy} pal={pal} x={bx[2] + 2} y={-33} z0={5} s={0.85} />
      {/* CHASSIS: khung gầm hình thang trên giá đỡ */}
      <Box f={box(ox, oy, bx[3] + 1, -42, 16, 2, 6, 2)} pal={pal} />
      <Box f={box(ox, oy, bx[3] + 1, -24, 16, 2, 6, 2)} pal={pal} />
      <Box f={box(ox, oy, bx[3] + 3, -45, 2, 28, 2.5, 8)} pal={pal} />
      {[-40, -32, -24].map((y) => (
        <Box key={y} f={box(ox, oy, bx[3] + 5, y, 8, 1.5, 1.5, 8.5)} pal={pal} />
      ))}
      <Box f={box(ox, oy, bx[3] + 13, -45, 2, 28, 2.5, 8)} pal={pal} />
      {/* QC: làn kiểm tra có cổng */}
      <Box f={box(ox, oy, bx[4], -44, 2, 2, 24, 2)} pal={pal} />
      <Detail d={line([P(bx[4] + 4, -40, 2), P(bx[4] + 4, -20, 2)]) + line([P(bx[4] + 14, -40, 2), P(bx[4] + 14, -20, 2)])} pal={pal} opacity={0.7} />
      <Box f={box(ox, oy, bx[4], -44, 18, 2, 2, 26)} pal={pal} />
      <Box f={box(ox, oy, bx[4] + 16, -44, 2, 2, 24, 2)} pal={pal} />
      <Box f={box(ox, oy, bx[4] + 6, -30, 6, 6, 1.5, 2)} pal={pal} />
      {/* Kiện CKD xếp chồng */}
      <Box f={box(ox, oy, -50, 6, 14, 12, 10)} pal={pal} />
      <Box f={box(ox, oy, -34, 6, 14, 12, 10)} pal={pal} />
      <Box f={box(ox, oy, -50, 20, 14, 12, 10)} pal={pal} />
      <Box f={box(ox, oy, -46, 8, 14, 12, 8, 10)} pal={pal} />
      <Detail d={line([P(-50, 32, 5), P(-36, 32, 5)]) + line([P(-43, 32, 0), P(-43, 32, 10)])} pal={pal} opacity={0.5} />
      {/* Xe tải thành phẩm rời làn QC */}
      <Truck ox={ox} oy={oy} pal={pal} x={8} y={14} s={0.95} />
    </g>
  );
}

/** Đại lý và hậu mãi: xưởng dịch vụ, xe tải trên cầu nâng, đường ra hai đại lý */
function DealerNetwork({ ox, oy, pal }: { ox: number; oy: number; pal: Pal }) {
  const P = (x: number, y: number, z: number) => iso(ox, oy, x, y, z);
  const centre = line([P(-20, 0, 1), P(54, 0, 1)]) + line([P(23, 6, 1), P(23, 54, 1)]);
  const sign = cyl(ox, oy, 24, -30, 1.6, 30);
  return (
    <g>
      {/* Đường: ra từ xưởng dịch vụ, rẽ về đại lý phía trước */}
      <Box f={box(ox, oy, -24, -6, 78, 12, 1)} pal={pal} />
      <Box f={box(ox, oy, 17, 6, 12, 48, 1)} pal={pal} />
      <path {...NS} d={centre} fill="none" stroke={pal.detail} strokeOpacity={0.55} strokeWidth={1} strokeDasharray="3 4" />
      {/* Xưởng dịch vụ */}
      <Box f={box(ox, oy, -52, -52, 34, 20, 26)} pal={pal} />
      <Detail d={line([P(-46, -32, 0), P(-46, -32, 18), P(-26, -32, 18), P(-26, -32, 0)])} pal={pal} />
      <Detail d={line([P(-46, -32, 9), P(-26, -32, 9)])} pal={pal} opacity={0.35} />
      {/* Cầu nâng hai trụ, xe tải được nâng */}
      <Box f={box(ox, oy, -42, -28, 3, 3, 24)} pal={pal} />
      <Box f={box(ox, oy, -48, -24, 34, 14, 1.5, 9)} pal={pal} />
      <Truck ox={ox} oy={oy} pal={pal} x={-50} y={-24} z0={10.5} s={0.85} />
      <Box f={box(ox, oy, -42, -9, 3, 3, 24)} pal={pal} />
      {/* Đại lý 1: phòng trưng bày phía sau và cột biển hiệu */}
      <Box f={box(ox, oy, 30, -52, 22, 18, 16)} pal={pal} />
      <Glass d={line([P(33, -34, 2), P(49, -34, 2), P(49, -34, 11), P(33, -34, 11)]) + "Z"} pal={pal} />
      <Cyl c={sign} pal={pal} />
      <Box f={box(ox, oy, 22, -32, 4, 2, 6, 30)} pal={pal} />
      {/* Đại lý 2: phía trước bên phải */}
      <Box f={box(ox, oy, 34, 16, 20, 18, 14)} pal={pal} />
      <Glass d={line([P(37, 34, 2), P(51, 34, 2), P(51, 34, 9), P(37, 34, 9)]) + "Z"} pal={pal} />
      <Glass d={line([P(54, 19, 2), P(54, 31, 2), P(54, 31, 9), P(54, 19, 9)]) + "Z"} pal={pal} />
    </g>
  );
}

type ArtKind = IslandSpec["art"];
const ART: Record<ArtKind, (p: { ox: number; oy: number; pal: Pal }) => ReactNode> = {
  "gia-dung": GiaDung,
  "dien-lanh": DienLanh,
  thep: Thep,
  "capsule-line": CapsuleLine,
  "coffee-plant": CoffeePlant,
  network: Network,
  "truck-line": TruckLine,
  "truck-plant": TruckPlant,
  "dealer-network": DealerNetwork,
};

/** Vẽ một đảo: `id` là vị trí (trái · giữa · phải, quyết định bảng màu), `art` là kiểu hình vẽ của deck */
export function IslandArt({ id, art, tone }: { id: IslandId; art?: ArtKind; tone: Tone }) {
  const pal = paletteFor(id, tone);
  const { x, y } = ISLAND_POS[id];
  const Art = ART[art ?? id];
  return (
    <g>
      <Platform ox={x} oy={y} pal={pal} />
      <Art ox={x} oy={y} pal={pal} />
    </g>
  );
}
