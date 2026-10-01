/** Dòng hạt chạy dọc một đường SVG (SMIL), dùng trong <LoopSvg>. */
export function Stream({
  d,
  n = 3,
  dur = 2.8,
  r = 2.6,
  fill,
  offset = 0,
  shape = "dot",
}: {
  d: string;
  n?: number;
  dur?: number;
  r?: number;
  fill: string;
  offset?: number;
  shape?: "dot" | "square";
}) {
  return (
    <>
      {Array.from({ length: n }).map((_, i) => {
        const begin = `${-(i * dur) / n - offset}s`;
        return (
          <g key={i} opacity={0}>
            {shape === "dot" ? (
              <circle r={r} fill={fill} />
            ) : (
              <rect x={-r} y={-r} width={r * 2} height={r * 2} rx={0.8} fill={fill} transform="rotate(45)" />
            )}
            <animateMotion path={d} dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.82;1" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
          </g>
        );
      })}
    </>
  );
}
