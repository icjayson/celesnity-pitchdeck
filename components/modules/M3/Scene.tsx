"use client";
import { useId } from "react";
import { Lock, Users } from "lucide-react";
import { LoopSvg } from "../shared/motion";
import { Stream } from "../shared/Stream";
import { VietnamMap, VN_POINTS } from "../shared/VietnamMap";

const BLUE5 = "#2F7BF6";
const BLUE3 = "#8DB8FF";
const INK = "#5B6B85";
const ORANGE = "#FF7A1A";
const T = "600ms cubic-bezier(0.22, 1, 0.36, 1)";

/** Khung cảnh M3: bản đồ Việt Nam, khối Hòa Phát, khối Nhà cung cấp và dòng dữ liệu theo con đường đã chọn. */
export function PathScene({ path, play, reduced }: { path: "A" | "B"; play: boolean; reduced: boolean }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const isB = path === "B";
  const [hx, hy] = VN_POINTS.hanoi;
  const [dx, dy] = VN_POINTS.dungQuat;
  const [sx, sy] = VN_POINTS.hcm;

  // Con đường A: dữ liệu từ các nhà máy bay ra khối Nhà cung cấp bên ngoài
  const outA = [
    `M${hx} ${hy} C 200 58, 282 110, 334 196`,
    `M${dx} ${dy} C 236 222, 280 214, 326 210`,
    `M${sx} ${sy} C 210 324, 290 270, 334 224`,
  ];
  // Con đường B: dữ liệu chảy về mô hình nằm trong khối Hòa Phát, không rời bản đồ
  const inB = [
    "M58 56 C 74 50, 94 54, 108 62",
    "M60 94 C 78 96, 94 86, 108 75",
    `M${dx} ${dy} C 168 172, 146 126, 128 92`,
  ];

  return (
    <LoopSvg play={play} reduced={reduced} staticAt={1.1} viewBox="0 0 400 400" className="h-auto w-full">
      <defs>
        <radialGradient id={`${uid}core`} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.35" stopColor={BLUE3} />
          <stop offset="1" stopColor={BLUE5} />
        </radialGradient>
        <radialGradient id={`${uid}halo`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={BLUE5} stopOpacity={0.55} />
          <stop offset="1" stopColor={BLUE5} stopOpacity={0} />
        </radialGradient>
        <pattern id={`${uid}grid`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0 H0 V20" fill="none" stroke="#16367A" strokeWidth={0.6} strokeOpacity={0.6} />
        </pattern>
      </defs>
      <rect width={400} height={400} fill={`url(#${uid}grid)`} />

      <VietnamMap fill="#0F2A5C" stroke="rgba(141,184,255,0.5)" islandFill="rgba(141,184,255,0.6)" labelFill="rgba(141,184,255,0.75)" />

      {/* điểm nhà máy */}
      {[VN_POINTS.dungQuat, VN_POINTS.hcm].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={6} fill={BLUE3} fillOpacity={0.15} />
          <circle cx={x} cy={y} r={2.6} fill={BLUE3} />
        </g>
      ))}

      {/* Khối Nhà cung cấp, bên ngoài */}
      <g style={{ opacity: isB ? 0.35 : 1, transition: `opacity ${T}` }}>
        <rect x={282} y={162} width={112} height={92} rx={12} fill="#0A1F44" stroke={INK} strokeWidth={1.5} strokeDasharray="4 4" />
        <text x={292} y={180} fontSize={11} fontWeight={600} fill={BLUE3} letterSpacing="0.02em">
          Nhà cung cấp
        </text>
      </g>

      {/* Dòng A */}
      <g style={{ opacity: isB ? 0 : 1, transition: `opacity ${T}` }}>
        {outA.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke={INK} strokeWidth={1} strokeDasharray="2 5" strokeOpacity={0.9} />
            <Stream d={d} n={3} dur={3} fill={BLUE3} offset={i * 0.4} />
          </g>
        ))}
      </g>

      {/* Môi trường Hòa Phát */}
      <g>
        <rect
          x={40}
          y={34}
          width={132}
          height={74}
          rx={12}
          fill={isB ? "rgba(255,122,26,0.08)" : "rgba(10,31,68,0.55)"}
          stroke={isB ? ORANGE : INK}
          strokeWidth={isB ? 2 : 1.25}
          strokeDasharray={isB ? undefined : "4 4"}
          style={{ transition: `stroke ${T}, fill ${T}` }}
        />
        <text x={52} y={51} fontSize={11} fontWeight={600} fill={isB ? ORANGE : BLUE3} style={{ transition: `fill ${T}` }}>
          Hòa Phát
        </text>
        <g style={{ opacity: isB ? 1 : 0, transition: `opacity ${T}` }}>
          <rect x={154} y={25} width={18} height={18} rx={5} fill={ORANGE} />
          <Lock x={157} y={28} width={12} height={12} color="#0A1F44" strokeWidth={2} aria-hidden />
        </g>
      </g>

      {/* Dòng B */}
      <g style={{ opacity: isB ? 1 : 0, transition: `opacity ${T}` }}>
        {inB.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke={BLUE3} strokeOpacity={0.35} strokeWidth={1} strokeDasharray="2 4" />
            <Stream d={d} n={i === 2 ? 3 : 2} dur={i === 2 ? 3 : 2} fill={BLUE3} r={2.3} offset={i * 0.3} />
          </g>
        ))}
        {/* Đội kỹ sư Hòa Phát */}
        <path d="M54 108 L54 132" stroke={ORANGE} strokeWidth={1.25} strokeDasharray="2 3" />
        <g transform="translate(8 132)">
          <rect width={92} height={40} rx={10} fill="#0A1F44" stroke={ORANGE} strokeWidth={1.25} />
          <Users x={10} y={12} width={16} height={16} color={ORANGE} strokeWidth={1.5} aria-hidden />
          <text x={32} y={18} fontSize={10} fontWeight={600} fill="#fff">
            Kỹ sư
          </text>
          <text x={32} y={31} fontSize={9.5} fill={BLUE3}>
            Hòa Phát
          </text>
        </g>
      </g>

      {/* Lõi mô hình: di chuyển giữa Nhà cung cấp (A) và Hòa Phát (B) */}
      <g style={{ transform: isB ? "translate(122px, 68px)" : "translate(338px, 210px)", transition: `transform ${T}` }}>
        <circle r={28} fill={`url(#${uid}halo)`}>
          <animate attributeName="r" values="24;30;24" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r={11} fill={`url(#${uid}core)`} />
        <circle r={15} fill="none" stroke={BLUE3} strokeOpacity={0.5} strokeWidth={1} />
      </g>
      <text
        x={isB ? 122 : 338}
        y={isB ? 98 : 238}
        textAnchor="middle"
        fontSize={9.5}
        fontWeight={500}
        fill="#fff"
        style={{ transition: `opacity ${T}` }}
      >
        {isB ? "Mô hình của Hòa Phát" : "Mô hình"}
      </text>
    </LoopSvg>
  );
}
