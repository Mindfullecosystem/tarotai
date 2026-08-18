import { useEffect, useRef } from "react";

/* Cielo de estrellas titilantes — canvas fijo tras el contenido */

interface Star { x: number; y: number; r: number; base: number; amp: number; speed: number; phase: number; gold: boolean; }

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let raf = 0;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(140, Math.floor((window.innerWidth * window.innerHeight) / 11000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.3 + 0.3,
        base: Math.random() * 0.35 + 0.1,
        amp: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.9 + 0.25,
        phase: Math.random() * Math.PI * 2,
        gold: Math.random() < 0.3,
      }));
    };

    const paint = (t: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const s of stars) {
        const a = reduced ? s.base + s.amp * 0.5 : s.base + s.amp * (0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.gold ? `rgba(240, 212, 154, ${a})` : `rgba(214, 205, 235, ${a * 0.8})`;
        ctx.fill();
        if (s.r > 1.1) {
          ctx.strokeStyle = `rgba(240, 212, 154, ${a * 0.35})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - s.r * 3.2, s.y);
          ctx.lineTo(s.x + s.r * 3.2, s.y);
          ctx.moveTo(s.x, s.y - s.r * 3.2);
          ctx.lineTo(s.x, s.y + s.r * 3.2);
          ctx.stroke();
        }
      }
      if (!reduced) raf = requestAnimationFrame(paint);
    };

    seed();
    raf = requestAnimationFrame(paint);
    const onResize = () => { seed(); if (reduced) paint(0); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
}
