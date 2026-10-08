import { RichText } from "./RichText";

/** Bảng dữ liệu trong khung bo góc; cuộn ngang trên điện thoại. Cột đầu là nhãn hàng. */
export function DataTable({ head, rows, caption }: { head: string[]; rows: string[][]; caption?: string }) {
  const hasHead = head.some((h) => h.trim() !== "");
  const cols = Math.max(head.length, ...rows.map((r) => r.length));
  /** Cột đầu chỉ là số thứ tự (①, 1…): thu hẹp cột thay vì chiếm 28% bề ngang */
  const indexCol = rows.every((r) => (r[0] ?? "").replace(/\*/g, "").trim().length <= 3);
  return (
    <figure className="flex flex-col gap-3">
      {caption ? (
        <figcaption className="muted text-sm">
          <RichText text={caption} />
        </figcaption>
      ) : null}
      <div className="table-frame">
        <div className="overflow-x-auto">
          <table className={`data-table ${indexCol ? "data-table--index " : ""}${cols > 3 ? "min-w-[720px]" : "min-w-[560px]"}`}>
            {hasHead ? (
              <thead>
                <tr>
                  {head.map((h, i) => (
                    <th key={i} scope="col">
                      <RichText text={h} />
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) =>
                    j === 0 ? (
                      <th key={j} scope="row">
                        <RichText text={c} />
                      </th>
                    ) : (
                      <td key={j}>
                        <RichText text={c} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </figure>
  );
}
