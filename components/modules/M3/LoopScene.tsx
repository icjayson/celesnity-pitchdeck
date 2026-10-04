"use client";
/**
 * Khung cảnh M3 "loop": A · từng công cụ AI riêng lẻ, mỗi công cụ thấy một phần của nhà máy;
 * B · một mô hình nối mọi công đoạn, nên một cảnh báo lan thành truy vết, tác động và phương án phục hồi.
 * Chữ lấy từ deck (scenarios.m3.loop). Chuyển động: SMIL trong <LoopSvg>, CSS transition khi đổi con đường.
 */
import { useId } from "react";
import { LoopSvg } from "../shared/motion";
import { Stream } from "../shared/Stream";
import { useDeck } from "@/components/deck/DeckProvider";

const BLUE5 = "#2F7BF6";
const BLUE3 = "#8DB8FF";
const INK = "#5B6B85";
const ORANGE = "#FF7A1A";
const NAVY = "#0A1F44";
const T = "600ms cubic-bezier(0.22, 1, 0.36, 1)";

const TILE_W = 108;
const TILE_H = 54;
const TILES_X = [22, 146, 270];
const TILE_Y = 34;
const CORE = { x: 200, y: 182 };
const CHAIN_Y = 262;

export function LoopScene({ path, play, reduced }: { path: "A" | "B"; play: boolean; reduced: boolean }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const loop = useDeck().scenarios.m3.loop;
  if (!loop) return null;
  const isB = path === "B";
  const tileCenter = (i: number) => TILES_X[i] + TILE_W / 2;
  const toCore = (i: number) => `M${tileCenter(i)} ${TILE_Y + TILE_H} C ${tileCenter(i)} ${TILE_Y + TILE_H + 50}, ${CORE.x} ${CORE.y - 60}, ${CORE.x} ${CORE.y - 16}`;
  const lineY = 340;

  return (
    <LoopSvg play={play} reduced={reduced} staticAt={1.2} viewBox="0 0 400 400" className="h-full max-h-[560px] w-full">
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
        <marker id={`${uid}arrow`} viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 Z" fill={BLUE3} />
        </marker>
      </defs>
      <rect width={400} height={400} fill={`url(#${uid}grid)`} />

      {/* Đường nối công cụ → mô hình (chỉ ở B) */}
      <g style={{ opacity: isB ? 1 : 0, transition: `opacity ${T}` }}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path d={toCore(i)} fill="none" stroke={BLUE3} strokeOpacity={0.4} strokeWidth={1} strokeDasharray="2 4" />
            <Stream d={toCore(i)} n={2} dur={2.4} fill={BLUE3} r={2.2} offset={i * 0.35} />
          </g>
        ))}
      </g>

      {/* Ba công cụ */}
      {loop.tools.map((label, i) => {
        const x = TILES_X[i];
        const alert = i === 1;
        return (
          <g key={label}>
            <rect
              x={x}
              y={TILE_Y}
              width={TILE_W}
              height={TILE_H}
              rx={11}
              fill={isB ? "rgba(47,123,246,0.12)" : "rgba(10,31,68,0.6)"}
              stroke={isB ? BLUE3 : INK}
              strokeWidth={isB ? 1.5 : 1.25}
              strokeDasharray={isB ? undefined : "4 4"}
              style={{ transition: `stroke ${T}, fill ${T}` }}
            />
            <text x={x + 12} y={TILE_Y + 22} fontSize={11} fontWeight={600} fill="#fff">
              {label}
            </text>
            <text x={x + 12} y={TILE_Y + 39} fontSize={9.5} fill={BLUE3} style={{ opacity: isB ? 0 : 1, transition: `opacity ${T}` }}>
              {loop.toolNote}
            </text>
            <text x={x + 12} y={TILE_Y + 39} fontSize={9.5} fill={BLUE3} style={{ opacity: isB ? 1 : 0, transition: `opacity ${T}` }}>
              {loop.connectedNote}
            </text>
            {/* Đèn trạng thái nhấp nháy lệch nhịp: mỗi công cụ tự chạy */}
            <circle cx={x + TILE_W - 14} cy={TILE_Y + 14} r={3.2} fill={alert ? ORANGE : BLUE3}>
              <animate attributeName="opacity" values="1;0.25;1" dur={`${1.6 + i * 0.7}s`} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      {/* Cảnh báo ở công cụ giữa */}
      <g>
        <rect x={TILES_X[1] - 6} y={TILE_Y + TILE_H + 10} width={TILE_W + 12} height={24} rx={12} fill={NAVY} stroke={ORANGE} strokeOpacity={0.8} />
        <text x={TILES_X[1] + TILE_W / 2} y={TILE_Y + TILE_H + 26} textAnchor="middle" fontSize={10} fontWeight={600} fill={ORANGE}>
          {loop.alert}
        </text>
      </g>

      {/* A: cảnh báo dừng ở đó */}
      <text
        x={200}
        y={196}
        textAnchor="middle"
        fontSize={11}
        fill={BLUE3}
        style={{ opacity: isB ? 0 : 0.9, transition: `opacity ${T}` }}
      >
        {loop.isolatedNote}
      </text>

      {/* B: lõi mô hình */}
      <g style={{ opacity: isB ? 1 : 0, transition: `opacity ${T}` }}>
        <circle cx={CORE.x} cy={CORE.y} r={30} fill={`url(#${uid}halo)`}>
          <animate attributeName="r" values="26;32;26" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx={CORE.x} cy={CORE.y} r={12} fill={`url(#${uid}core)`} />
        <circle cx={CORE.x} cy={CORE.y} r={16} fill="none" stroke={BLUE3} strokeOpacity={0.5} strokeWidth={1} />
        <text x={CORE.x + 26} y={CORE.y + 4} fontSize={10} fontWeight={500} fill="#fff">
          {loop.modelLabel}
        </text>
      </g>

      {/* B: chuỗi lan truyền tác động */}
      {loop.chain.map((label, i) => {
        const x = TILES_X[i];
        const last = i === loop.chain.length - 1;
        const delay = isB ? 250 + i * 220 : 0;
        return (
          <g key={label} style={{ opacity: isB ? 1 : 0, transition: `opacity 450ms ease ${delay}ms` }}>
            {i === 0 ? (
              <path d={`M${CORE.x} ${CORE.y + 16} C ${CORE.x} ${CORE.y + 40}, ${tileCenter(0)} ${CHAIN_Y - 40}, ${tileCenter(0)} ${CHAIN_Y - 2}`} fill="none" stroke={BLUE3} strokeOpacity={0.6} strokeWidth={1.25} markerEnd={`url(#${uid}arrow)`} />
            ) : (
              <path d={`M${TILES_X[i - 1] + TILE_W + 2} ${CHAIN_Y + 22} L${x - 4} ${CHAIN_Y + 22}`} fill="none" stroke={BLUE3} strokeOpacity={0.6} strokeWidth={1.25} markerEnd={`url(#${uid}arrow)`} />
            )}
            <rect
              x={x}
              y={CHAIN_Y}
              width={TILE_W}
              height={44}
              rx={10}
              fill={last ? "rgba(255,122,26,0.14)" : NAVY}
              stroke={last ? ORANGE : BLUE3}
              strokeOpacity={last ? 1 : 0.6}
              strokeWidth={last ? 1.75 : 1.25}
            />
            <foreignObject x={x + 8} y={CHAIN_Y + 4} width={TILE_W - 16} height={36}>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  fontSize: 10,
                  lineHeight: 1.25,
                  fontWeight: last ? 700 : 500,
                  color: last ? ORANGE : "#fff",
                }}
              >
                {label}
              </div>
            </foreignObject>
          </g>
        );
      })}

      {/* Dây chuyền viên nang (cả hai con đường) */}
      <g>
        <rect x={22} y={lineY} width={356} height={22} rx={11} fill="rgba(10,31,68,0.7)" stroke={INK} strokeWidth={1} />
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={i} x1={40 + i * 23} x2={40 + i * 23} y1={lineY + 4} y2={lineY + 18} stroke={INK} strokeOpacity={0.5} strokeWidth={1} />
        ))}
        <Stream d={`M30 ${lineY + 11} L370 ${lineY + 11}`} n={6} dur={5} fill={BLUE3} r={3.2} />
        <text x={22} y={lineY + 40} fontSize={10} fill={BLUE3}>
          {loop.line}
        </text>
      </g>
    </LoopSvg>
  );
}
