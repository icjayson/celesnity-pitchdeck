import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LockKeyhole, ArrowRight } from "lucide-react";
import { meta } from "@/content/content.vi";

export const metadata: Metadata = { title: `Truy cập · ${meta.title}`, robots: { index: false, follow: false } };

/** Trang nhập mã truy cập (chỉ dùng khi ACCESS_CODE được đặt). Form chạy cả khi tắt JavaScript. */
export default async function AccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const nextRaw = typeof sp.next === "string" ? sp.next : "/";
  const next = nextRaw.startsWith("/") && !nextRaw.startsWith("//") ? nextRaw : "/";
  if (!process.env.ACCESS_CODE?.trim()) redirect(next);
  const error = sp.error === "1";

  return (
    <main className="theme-dark grain relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-16">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[110px]"
      />
      <div className="relative w-full max-w-[420px] rounded-[var(--radius-card)] border border-navy-700 bg-navy-900/80 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur sm:p-10">
        <div className="mb-8 flex flex-col gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-700 bg-navy-800 text-blue-300">
            <LockKeyhole size={20} strokeWidth={1.5} aria-hidden />
          </span>
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-blue-300">{meta.tagline}</p>
          <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.02em]">Nhập mã truy cập</h1>
          <p className="muted text-[15px]">Tài liệu thảo luận dành riêng cho người nhận. Mã truy cập có trong thư mời.</p>
        </div>
        <form action="/api/access" method="post" className="flex flex-col gap-4">
          <input type="hidden" name="next" value={next} />
          <label htmlFor="code" className="text-[14px] font-medium">
            Mã truy cập
          </label>
          <input
            id="code"
            name="code"
            type="password"
            required
            autoFocus
            autoComplete="off"
            maxLength={200}
            aria-invalid={error || undefined}
            aria-describedby={error ? "code-error" : undefined}
            className={`h-12 rounded-[var(--radius-control)] border bg-navy-950 px-4 text-[16px] text-white placeholder:text-blue-300/50 focus:border-blue-400 focus:outline-none ${
              error ? "border-orange-500" : "border-navy-700"
            }`}
          />
          {error ? (
            <p id="code-error" role="alert" className="text-[14px] text-orange-500">
              Mã chưa đúng. Vui lòng thử lại.
            </p>
          ) : null}
          <button
            type="submit"
            className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-control)] bg-orange-500 px-6 text-[15px] font-semibold text-navy-900 transition-colors hover:bg-orange-600"
          >
            Vào trang
            <ArrowRight size={18} strokeWidth={1.5} aria-hidden />
          </button>
        </form>
        <p className="muted mt-8 text-[13px]">{meta.footer}</p>
      </div>
    </main>
  );
}
