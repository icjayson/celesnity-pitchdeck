"use client";
/**
 * Logo hai bên ở hero: Hòa Phát × Celesnity.
 * Logo Hòa Phát đặt tại public/brand/hoa-phat-logo-white.png (bản trắng cho nền tối). Khi chưa có file, hiện chữ thay thế.
 */
import { useEffect, useRef, useState } from "react";

export function BrandLockup({ label }: { label: string }) {
  const [hpMissing, setHpMissing] = useState(false);
  const hpRef = useRef<HTMLImageElement>(null);
  // Ảnh có thể lỗi trước khi React gắn onError (lúc hydrate), nên kiểm tra lại khi mount
  useEffect(() => {
    const img = hpRef.current;
    if (img && img.complete && img.naturalWidth === 0) setHpMissing(true);
  }, []);
  return (
    <div className="flex items-center gap-4" role="img" aria-label={label}>
      {hpMissing ? (
        <span className="text-[17px] font-semibold tracking-[0.08em] text-white">HÒA PHÁT</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img ref={hpRef} src="/brand/hoa-phat-logo-white.png" alt="" className="h-7 w-auto" onError={() => setHpMissing(true)} />
      )}
      <span aria-hidden className="text-[18px] font-light text-blue-300">
        ×
      </span>
      <span className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/celesnity-mark.png" alt="" className="h-8 w-8" />
        <span className="text-[18px] font-semibold tracking-[-0.01em] text-white">Celesnity</span>
      </span>
    </div>
  );
}
