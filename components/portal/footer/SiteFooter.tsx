"use client";
/**
 * Footer của trang gốc, chuyển từ celesnity-ldp (components/site-footer.tsx + site-footer-scene.tsx).
 * Ảnh nhà máy chuyển động theo bản đồ độ sâu, khung kính chứa link, hàng dưới cùng và chữ "Celesnity" lớn.
 * Link trỏ về celesnity.com vì các trang 1779 Lab, Industries, Blog, Policies chỉ có ở đó.
 */
import { useEffect, useRef, useState } from "react";
import { Libre_Caslon_Display } from "next/font/google";
import { DepthParallax } from "./DepthParallax";
import styles from "./SiteFooter.module.css";

const serif = Libre_Caslon_Display({ subsets: ["latin"], weight: "400", display: "swap" });

const SITE = "https://celesnity.com";
const EMAIL = "start@celesnity.com";

const NAV = [
  { label: "1779 Lab", href: `${SITE}/1779` },
  { label: "Industries", href: `${SITE}/industries` },
  { label: "Blog", href: `${SITE}/blog` },
];

const POLICIES = [
  { label: "Privacy Notice", slug: "privacy-notice" },
  { label: "Product Privacy Notice", slug: "product-privacy-notice" },
  { label: "Cookie Notice", slug: "cookie-notice" },
  { label: "Website Terms of Use", slug: "terms-of-use" },
  { label: "Security", slug: "security" },
  { label: "Modern Slavery Statement", slug: "modern-slavery-statement" },
];

const SOCIALS = [
  {
    name: "X",
    href: "https://x.com/celesnity",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/celesnity/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
];

/** Giờ London hiện chỉ sau khi mount, để server và trình duyệt không lệch nhau lúc hydrate */
const LONDON = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  timeZoneName: "short",
});

function LondonTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setNow(LONDON.format(new Date()));
    tick();
    const timer = window.setInterval(tick, 30_000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <p className={styles.place}>
      <span className={styles.placeDot} aria-hidden />
      <span>London, UK</span>
      {now ? <time className={styles.clock}>{now}</time> : null}
    </p>
  );
}

/** `lead`: màu nền của phần phía trên, footer mở ra từ màu đó nên không có đường nối */
export function SiteFooter({ lead = "var(--color-navy-950)" }: { lead?: string }) {
  const washRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const drive = useRef({ x: 0, y: 0, dolly: 0 });

  // Footer hiện ra như đường chân trời: cuộn tới đâu, nhà máy nhô lên theo vòng cung tới đó.
  // --reveal đi từ 0 (mép trên vừa vào màn hình) tới 1 (đã ổn định). Tắt chuyển động thì giữ giá trị nghỉ.
  useEffect(() => {
    const footer = washRef.current?.parentElement;
    if (!footer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let shown = "";
    const update = () => {
      frame = 0;
      const box = footer.getBoundingClientRect();
      const height = window.innerHeight;
      const travelled = Math.min(Math.max((height - box.top) / (height * 0.9), 0), 1);
      const reveal = travelled * travelled * (3 - 2 * travelled);
      const value = reveal.toFixed(3);
      if (value === shown) return;
      shown = value;
      const seen = Math.max(Math.min(height, box.bottom) - box.top, 0);
      const finish = reveal ** 3;
      footer.style.setProperty("--reveal", value);
      footer.style.setProperty("--edge", `${seen.toFixed(1)}px`);
      footer.style.setProperty("--arc-x", `${(box.width * 0.55 + seen * 0.8 + finish * box.width * 1.5).toFixed(1)}px`);
      footer.style.setProperty("--arc-y", `${(seen + finish * box.height * 1.6).toFixed(1)}px`);
      drive.current.y = (reveal - 1) * 0.05;
      drive.current.dolly = (reveal - 1) * 0.06;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <footer className={styles.footer} style={{ "--lead": lead } as React.CSSProperties}>
      <DepthParallax
        src="/footer/world-model.jpg"
        depth="/footer/world-model-depth.jpg"
        anchor={[0.46, 0.56]}
        focus={0.55}
        strength={0.06}
        dolly={0.08}
        riders={[{ ref: wordRef, depth: 0.7 }]}
        // Hai người đứng cạnh mô hình: giữ yên
        still={{ at: [0.175, 0.81], size: [0.1, 0.25] }}
        drive={drive}
      />
      <div ref={washRef} className={styles.wash} aria-hidden />
      <div className={styles.horizon} aria-hidden />

      <div className={`${styles.frame} ${styles.pane}`}>
        <div className={styles.glass}>
          <div>
            <a className={styles.brandLink} href={SITE} aria-label="Celesnity home">
              <span className={styles.lockup}>
                <span className={styles.mark} aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/orbit-ink.png" alt="" width={512} height={512} loading="lazy" />
                </span>
                <span className={styles.wordmark}>Celesnity</span>
              </span>
            </a>
            <p className={styles.tagline}>We&rsquo;re building the world model for industry.</p>
          </div>

          <nav aria-label="Footer navigation" className={styles.links}>
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <nav aria-label="Policies" className={styles.links}>
            {POLICIES.map((doc) => (
              <a key={doc.slug} href={`${SITE}/policies/${doc.slug}`}>
                {doc.label}
              </a>
            ))}
          </nav>

          <div className={styles.contact}>
            <a href={`mailto:${EMAIL}`} className={serif.className}>
              {EMAIL}
            </a>
          </div>
        </div>
      </div>

      <div className={`${styles.frame} ${styles.floor}`}>
        <div className={styles.base}>
          <p className={styles.legal}>
            <span>© 2026 Celesnity Ltd.</span> <span>All Rights Reserved.</span>
          </p>
          <LondonTime />
          <ul className={styles.social}>
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noreferrer" aria-label={`Celesnity on ${s.name}`}>
                  <svg viewBox="0 0 24 24" aria-hidden focusable="false">
                    <path d={s.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p ref={wordRef} className={styles.word} aria-hidden>
        Celesnity
      </p>
    </footer>
  );
}
