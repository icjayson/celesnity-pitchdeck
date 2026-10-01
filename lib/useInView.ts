"use client";
import { useEffect, useRef, useState } from "react";

/** Theo dõi phần tử có đang trong khung nhìn không (để chỉ chạy hoạt ảnh khi cần) */
export function useInView<T extends Element>(rootMargin = "0px"): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, inView];
}
