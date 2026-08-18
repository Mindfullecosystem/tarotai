import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

/* Aparición al hacer scroll, con retardo escalonable */

export default function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: {
  children: ReactNode; delay?: number; className?: string; as?: "div" | "section" | "figure" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const style = { "--rv-delay": `${delay}ms` } as CSSProperties;
  return (
    <Tag ref={ref as never} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}

/* Separador dorado con destello que lo recorre */
export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <div className="gold-rule flex-1" style={{ containerType: "inline-size" }} />
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-gold-500">
        <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z" fill="currentColor" opacity="0.9" />
      </svg>
      <div className="gold-rule flex-1" style={{ containerType: "inline-size" }} />
    </div>
  );
}
