"use client";
import { useId } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { LoopSvg } from "../shared/motion";
import { Stream } from "../shared/Stream";
import { VietnamMap, VN_POINTS } from "../shared/VietnamMap";
import { useDeck } from "@/components/deck/DeckProvider";

const BLUE5 = "#2F7BF6";
const BLUE3 = "#8DB8FF";
const BLUE1 = "#E6F0FF";
const INK = "#5B6B85";
const ORANGE = "#FF7A1A";
const NAVY9 = "#0A1F44";
const T = "600ms cubic-bezier(0.22, 1, 0.36, 1)";

export type Level = 1 | 2 | 3;

/** Khung cảnh M13: chỉ đúng thứ được phép rời môi trường của khách hàng ở mỗi mức mới chuyển động ra ngoài. */
export function SovereigntyScene({ level, play, reduced }: { level: Level; play: boolean; reduced: boolean }) {
  const { party } = useDeck();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const showUpdate = level >= 2;
  const showSet = level >= 3;
  const fade = (on: boolean) => ({ opacity: on ? 1 : 0, transition: `opacity ${T}` });

  const updD = "M193 66 C 236 56, 282 104, 324 178";
  const setD = "M192 80 C 228 104, 262 160, 312 202";
  // Dữ liệu thô vòng quanh bên trong khối, không bao giờ ra ngoài
  const rawLoop = "M66 74 C 66 58, 154 58, 154 74 C 154 90, 66 90, 66 74 Z";
  const [dx, dy] = VN_POINTS.dungQuat;
  const [sx, sy] = VN_POINTS.hcm;

  return (
    <LoopSvg play={play} reduced={reduced} staticAt={1.3} viewBox="0 0 400 400" className="h-auto w-full">
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
      <rect width={400} height={400} fill={`url(#${uid}grid)`} />

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
        <text x={290} y={174} fontSize={11} fontWeight={600} fill={BLUE3}>
          Mô hình nền
        </text>
        <circle cx={336} cy={210} r={24} fill={`url(#${uid}halo)`} />
        <circle cx={336} cy={210} r={10} fill={`url(#${uid}core)`} />
        <circle cx={336} cy={210} r={14} fill="none" stroke={BLUE3} strokeOpacity={0.5} />
      </g>

      {/* Mức 2+: bản cập nhật mô hình */}
      <g style={fade(showUpdate)}>
        <path d={updD} fill="none" stroke={BLUE3} strokeOpacity={0.4} strokeWidth={1.2} strokeDasharray="2 5" />
        <Stream d={updD} n={4} dur={3.2} fill={BLUE3} r={2.8} />
        <g transform="translate(206 38)">
          <rect width={84} height={20} rx={10} fill={NAVY9} stroke={BLUE3} strokeOpacity={0.6} />
          <ShieldCheck x={7} y={4} width={12} height={12} color={BLUE3} strokeWidth={1.75} aria-hidden />
          <text x={23} y={13.5} fontSize={9.5} fontWeight={500} fill="#fff">
            Đã kiểm thử
          </text>
        </g>
      </g>

      {/* Mức 3: tập kiểm chứng đã khử nhận diện */}
      <g style={fade(showSet)}>
        <path d={setD} fill="none" stroke={BLUE1} strokeOpacity={0.35} strokeWidth={1.2} strokeDasharray="2 5" />
        <Stream d={setD} n={3} dur={3.6} fill={BLUE1} r={2.6} shape="square" offset={0.6} />
        <g transform="translate(146 154)">
          <rect width={100} height={20} rx={10} fill={NAVY9} stroke={BLUE1} strokeOpacity={0.5} />
          <text x={50} y={13.5} textAnchor="middle" fontSize={9.5} fontWeight={500} fill="#fff">
            Đã khử nhận diện
          </text>
        </g>
      </g>

      {/* Môi trường của khách hàng */}
      <rect x={36} y={34} width={148} height={76} rx={12} fill="rgba(255,122,26,0.08)" stroke={ORANGE} strokeWidth={2} />
      <text x={47} y={51} fontSize={10.5} fontWeight={600} fill={ORANGE}>
        {party.environment}
      </text>
      <path d={rawLoop} fill="none" stroke={ORANGE} strokeOpacity={0.25} strokeDasharray="2 4" />
      <Stream d={rawLoop} n={5} dur={6} fill="#FFD2B0" r={2} />
      <text x={110} y={102} textAnchor="middle" fontSize={9} fill="#FFD2B0">
        Dữ liệu thô ở lại
      </text>
      {/* khóa trên khối */}
      <g transform="translate(166 25)">
        <rect width={18} height={18} rx={5} fill={ORANGE} />
        <Lock x={3} y={3} width={12} height={12} color={NAVY9} strokeWidth={2} aria-hidden />
      </g>
      {/* cổng ra: đóng ở Mức 1 */}
      <g transform="translate(184 74)">
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
        <text x={290} y={290} fontSize={10.5} fill={INK} textAnchor="start">
          Không có gì
        </text>
        <text x={290} y={304} fontSize={10.5} fill={INK}>
          đi ra ngoài
        </text>
      </g>
    </LoopSvg>
  );
}
