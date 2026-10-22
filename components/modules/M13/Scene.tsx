"use client";
import { useId } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { LoopSvg } from "../shared/motion";
import { Stream } from "../shared/Stream";
import { VietnamMap, VN_POINTS } from "../shared/VietnamMap";
import { useDeck, useUi } from "@/components/deck/DeckProvider";

const BLUE5 = "#2F7BF6";
const BLUE3 = "#8DB8FF";
const BLUE1 = "#E6F0FF";
const INK = "#5B6B85";
const ORANGE = "#FF7A1A";
const NAVY9 = "#0A1F44";
const T = "600ms cubic-bezier(0.22, 1, 0.36, 1)";

/** Lãnh thổ nước thứ hai ở phía tây (cách điệu), cùng hệ toạ độ với bản đồ Việt Nam: x = (kinh độ − 102) × 26, y = (23,4 − vĩ độ) × 26 */
const WEST_LONLAT: [number, number][] = [
  [100.1, 20.4], [100.6, 20.1], [101.2, 19.6], [101.0, 18.6], [101.4, 18.0], [102.1, 18.2], [103.0, 18.4], [104.0, 17.9],
  [104.8, 17.4], [105.6, 16.0], [105.5, 15.0], [105.2, 14.3], [103.6, 14.4], [102.5, 13.6], [102.3, 12.2], [102.0, 12.0],
  [101.3, 12.7], [100.9, 13.4], [100.5, 13.5], [100.0, 13.2], [99.95, 12.2], [99.5, 11.0], [99.2, 10.0], [99.4, 9.2],
  [100.3, 8.4], [100.6, 7.2], [101.3, 6.9], [102.0, 6.2], [101.5, 5.8], [100.4, 6.4], [99.8, 6.8], [99.0, 7.9],
  [98.3, 8.2], [98.4, 9.5], [98.6, 10.5], [99.1, 11.6], [99.2, 12.4], [98.9, 13.2], [99.1, 14.1], [98.5, 15.1],
  [98.6, 16.2], [97.8, 17.6], [97.4, 18.4], [98.0, 19.3], [98.5, 19.8], [99.3, 20.1],
];
/** Bản đồ hai nước: lùi Việt Nam sang phải SHIFT đơn vị để nước phía tây nằm bên trái */
const SHIFT = 160;
const toXY = ([lon, lat]: [number, number]) => [(lon - 102) * 26 + SHIFT, (23.4 - lat) * 26] as const;
const WEST_PATH = "M" + WEST_LONLAT.map((p) => toXY(p).map((v) => v.toFixed(1)).join(" ")).join("L") + "Z";
/** Nhà máy ở nước phía tây (kinh độ, vĩ độ) */
const WEST_SITE = toXY([99.5, 18.3]);

export type Level = 1 | 2 | 3;

/**
 * Khung cảnh M13: chỉ đúng thứ được phép rời môi trường của khách hàng ở mỗi mức mới chuyển động ra ngoài.
 * `returnFlow` (#hai-ben): thêm dòng phiên bản mô hình nền mới quay về môi trường của khách hàng.
 */
export function SovereigntyScene({
  level,
  play,
  reduced,
  returnFlow = false,
}: {
  level: Level;
  play: boolean;
  reduced: boolean;
  returnFlow?: boolean;
}) {
  const { party, scenarios } = useDeck();
  const ui = useUi();
  const envs = scenarios.m13?.environments;
  const two = !!envs;
  const W = two ? 400 + SHIFT : 400;
  const H = two ? 470 : 400;
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const showUpdate = level >= 2;
  const showSet = level >= 3;
  const fade = (on: boolean) => ({ opacity: on ? 1 : 0, transition: `opacity ${T}` });
  /** Bản đồ hai nước rộng hơn nên bị thu nhỏ khi hiển thị: phóng chữ và nhãn lên cho dễ đọc */
  const fs = two ? 1.3 : 1;
  const pill = (x: number, y: number) => `translate(${x} ${y})${two ? ` scale(${fs})` : ""}`;
  /** Khối môi trường: một nước thì ở (36, 34) rộng 148; hai nước thì cao hơn để tên chia hai dòng */
  const env = two ? { x: 26, y: 20, w: 170, h: 100 } : { x: 36, y: 34, w: 148, h: 76 };

  const updD = two ? "M205 64 C 246 56, 288 104, 324 178" : "M193 66 C 236 56, 282 104, 324 178";
  const setD = two ? "M200 84 C 232 108, 262 160, 312 202" : "M192 80 C 228 104, 262 160, 312 202";
  // Phiên bản mô hình nền mới: từ mô hình nền quay về đáy khối môi trường của khách hàng
  const retD = two ? "M300 250 C 250 300, 150 250, 118 124" : "M300 250 C 250 300, 150 240, 128 114";
  const [dx, dy] = VN_POINTS.dungQuat;
  const [sx, sy] = VN_POINTS.hcm;

  return (
    <LoopSvg play={play} reduced={reduced} staticAt={1.3} viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
      <defs>
        <pattern id={`${uid}grid`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0 H0 V20" fill="none" stroke="#16367A" strokeWidth={0.6} strokeOpacity={0.55} />
        </pattern>
        <radialGradient id={`${uid}core`} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.35" stopColor={BLUE3} />
          <stop offset="1" stopColor={BLUE5} />
        </radialGradient>
        <radialGradient id={`${uid}halo`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={BLUE5} stopOpacity={0.5} />
          <stop offset="1" stopColor={BLUE5} stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${uid}grid)`} />

      {/* Nước thứ hai (phía tây): lãnh thổ, nhà máy, môi trường riêng; bản cập nhật đi ra, phiên bản mới quay về */}
      {two ? (
        <g>
          <path d={WEST_PATH} fill="#0F2A5C" stroke="rgba(141,184,255,0.5)" strokeWidth={1.5} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <circle cx={WEST_SITE[0]} cy={WEST_SITE[1]} r={6} fill={ORANGE} fillOpacity={0.15} />
          <circle cx={WEST_SITE[0]} cy={WEST_SITE[1]} r={2.6} fill={ORANGE} />
          <g style={fade(showUpdate)}>
            <path d="M140 120 C 210 220, 330 250, 436 226" fill="none" stroke={BLUE3} strokeOpacity={0.4} strokeWidth={1.2} strokeDasharray="2 5" />
            <Stream d="M140 120 C 210 220, 330 250, 436 226" n={4} dur={3.4} fill={BLUE3} r={2.8} offset={0.8} />
          </g>
          {returnFlow ? (
            <g>
              <path d="M440 248 C 330 340, 140 300, 70 122" fill="none" stroke="#fff" strokeOpacity={0.35} strokeWidth={1.2} strokeDasharray="2 5" />
              <Stream d="M440 248 C 330 340, 140 300, 70 122" n={4} dur={3.8} fill="#fff" r={3} offset={2.2} />
            </g>
          ) : null}
          <EnvBox x={6} y={20} w={170} h={100} label={envs[1]} raw={ui.rawDataKept} two />
        </g>
      ) : null}

      <g transform={two ? `translate(${SHIFT} 0)` : undefined}>
      <VietnamMap fill="#0F2A5C" stroke="rgba(141,184,255,0.5)" islandFill="rgba(141,184,255,0.6)" labelFill="rgba(141,184,255,0.75)" />

      {/* Các nhà máy gửi dữ liệu về môi trường của khách hàng, vẫn trong Việt Nam */}
      {[
        [dx, dy],
        [sx, sy],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={6} fill={ORANGE} fillOpacity={0.15} />
          <circle cx={x} cy={y} r={2.6} fill={ORANGE} />
        </g>
      ))}

      {/* Mô hình nền, bên ngoài */}
      <g style={{ opacity: showUpdate ? 1 : 0.4, transition: `opacity ${T}` }}>
        <rect x={278} y={156} width={116} height={96} rx={12} fill={NAVY9} stroke={BLUE3} strokeOpacity={0.45} strokeWidth={1.25} />
        <circle cx={336} cy={194} r={24} fill={`url(#${uid}halo)`} />
        <circle cx={336} cy={194} r={10} fill={`url(#${uid}core)`} />
        <circle cx={336} cy={194} r={14} fill="none" stroke={BLUE3} strokeOpacity={0.5} />
        <text x={336} y={two ? 229 : 232} textAnchor="middle" fontSize={10.5 * fs} fontWeight={600} fill={BLUE3}>
          <tspan x={336}>{ui.sceneModelLine1}</tspan>
          <tspan x={336} dy={13 * fs}>
            {ui.sceneModelLine2}
          </tspan>
        </text>
      </g>

      {/* Mức 2+: bản cập nhật mô hình */}
      <g style={fade(showUpdate)}>
        <path d={updD} fill="none" stroke={BLUE3} strokeOpacity={0.4} strokeWidth={1.2} strokeDasharray="2 5" />
        <Stream d={updD} n={4} dur={3.2} fill={BLUE3} r={2.8} />
        <g transform={pill(two ? 214 : 206, two ? 26 : 38)}>
          <rect width={two ? 92 : 84} height={20} rx={10} fill={NAVY9} stroke={BLUE3} strokeOpacity={0.6} />
          <ShieldCheck x={7} y={4} width={12} height={12} color={BLUE3} strokeWidth={1.75} aria-hidden />
          <text x={23} y={13.5} fontSize={9.5} fontWeight={500} fill="#fff">
            {ui.tested}
          </text>
        </g>
      </g>

      {/* Mức 3: tập kiểm chứng đã khử nhận diện */}
      <g style={fade(showSet)}>
        <path d={setD} fill="none" stroke={BLUE1} strokeOpacity={0.35} strokeWidth={1.2} strokeDasharray="2 5" />
        <Stream d={setD} n={3} dur={3.6} fill={BLUE1} r={2.6} shape="square" offset={0.6} />
        <g transform={pill(two ? 130 : 146, 154)}>
          <rect width={100} height={20} rx={10} fill={NAVY9} stroke={BLUE1} strokeOpacity={0.5} />
          <text x={50} y={13.5} textAnchor="middle" fontSize={9.5} fontWeight={500} fill="#fff">
            {ui.deidentified}
          </text>
        </g>
      </g>

      {/* Vòng quay về: phiên bản mô hình nền mới */}
      {returnFlow ? (
        <g>
          <path d={retD} fill="none" stroke="#fff" strokeOpacity={0.35} strokeWidth={1.2} strokeDasharray="2 5" />
          <Stream d={retD} n={4} dur={3.6} fill="#fff" r={3} offset={1.6} />
          <g transform={pill(two ? 130 : 150, 262)}>
            <rect width={92} height={20} rx={10} fill={NAVY9} stroke="#fff" strokeOpacity={0.55} />
            <text x={46} y={13.5} textAnchor="middle" fontSize={9.5} fontWeight={500} fill="#fff">
              {ui.newVersion}
            </text>
          </g>
        </g>
      ) : null}

      {/* Môi trường của khách hàng */}
      <EnvBox {...env} label={envs?.[0] ?? party.environment} raw={ui.rawDataKept} two={two} />
      {/* cổng ra: đóng ở Mức 1 */}
      <g transform={`translate(${env.x + env.w} ${two ? 68 : 74})`}>
        <circle r={9} fill={NAVY9} stroke={showUpdate ? BLUE3 : ORANGE} strokeWidth={1.5} style={{ transition: `stroke ${T}` }} />
        <g style={fade(!showUpdate)}>
          <Lock x={-5} y={-5} width={10} height={10} color={ORANGE} strokeWidth={2} aria-hidden />
        </g>
        <g style={fade(showUpdate)}>
          <ShieldCheck x={-5} y={-5} width={10} height={10} color={BLUE3} strokeWidth={2} aria-hidden />
        </g>
      </g>

      {/* Mức 1: chú thích trên bản đồ */}
      <g style={fade(!showUpdate)}>
        <text x={two ? 270 : 290} y={290} fontSize={10.5 * fs} fill={INK} textAnchor="start">
          {ui.nothingLine1}
        </text>
        <text x={two ? 270 : 290} y={290 + 14 * fs} fontSize={10.5 * fs} fill={INK}>
          {ui.nothingLine2}
        </text>
      </g>
      </g>
    </LoopSvg>
  );
}

/** Khối môi trường của khách hàng: dữ liệu thô chạy vòng bên trong, không bao giờ ra ngoài; khoá ở góc trên.
 *  Hai nước: nhãn "Tên · Nước" tách hai dòng, chữ lớn hơn để vẫn đọc được khi sơ đồ bị thu nhỏ. */
function EnvBox({ x, y, w, h, label, raw, two }: { x: number; y: number; w: number; h: number; label: string; raw: string; two?: boolean }) {
  const [name, country] = two ? label.split(" · ") : [label];
  const cx = x + w / 2;
  const ly = two ? y + 62 : y + 40;
  const rx = w / 2 - 30;
  const loop = `M${cx - rx} ${ly} C ${cx - rx} ${ly - 16}, ${cx + rx} ${ly - 16}, ${cx + rx} ${ly} C ${cx + rx} ${ly + 16}, ${cx - rx} ${ly + 16}, ${cx - rx} ${ly} Z`;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="rgba(255,122,26,0.08)" stroke={ORANGE} strokeWidth={2} />
      {two ? (
        <text x={x + 12} y={y + 20} fontWeight={600} fill={ORANGE}>
          <tspan x={x + 12} fontSize={12.5}>
            {name}
          </tspan>
          <tspan x={x + 12} dy={16} fontSize={14} fontWeight={700} fill="#FFD2B0">
            {country}
          </tspan>
        </text>
      ) : (
        <text x={x + 11} y={y + 17} fontSize={10.5} fontWeight={600} fill={ORANGE}>
          {label}
        </text>
      )}
      <path d={loop} fill="none" stroke={ORANGE} strokeOpacity={0.25} strokeDasharray="2 4" />
      <Stream d={loop} n={5} dur={6} fill="#FFD2B0" r={2} />
      <text x={cx} y={y + h - (two ? 10 : 8)} textAnchor="middle" fontSize={two ? 11.5 : 9} fill="#FFD2B0">
        {raw}
      </text>
      <g transform={`translate(${x + w - 18} ${y - 9})`}>
        <rect width={18} height={18} rx={5} fill={ORANGE} />
        <Lock x={3} y={3} width={12} height={12} color={NAVY9} strokeWidth={2} aria-hidden />
      </g>
    </g>
  );
}
