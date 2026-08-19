import type { GlyphId } from "../data/tarot";

/* Glifos de línea — grabado esotérico en dorado */

const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function G({ children, className, strokeWidth }: { children: React.ReactNode; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g {...STROKE} strokeWidth={strokeWidth ?? 4}>{children}</g>
    </svg>
  );
}

export default function Glyph({ id, className, strokeWidth }: { id: GlyphId; className?: string; strokeWidth?: number }) {
  switch (id) {
    case "spiral":
      return <G className={className} strokeWidth={strokeWidth}><path d="M50 50c0-5 8-5 8 0 0 9-15 9-15 0 0-13 22-13 22 0 0 17-29 17-29 0 0-21 36-21 36 0" /></G>;
    case "infinity":
      return <G className={className} strokeWidth={strokeWidth}><path d="M50 50c-8-13-29-13-29 0s21 13 29 0c8-13 29-13 29 0s-21 13-29 0z" /></G>;
    case "moon":
      return <G className={className} strokeWidth={strokeWidth}><path d="M60 16a36 36 0 1 0 0 68 28 28 0 1 1 0-68z" /><circle cx="66" cy="30" r="2.5" fill="currentColor" stroke="none" /><circle cx="76" cy="44" r="1.8" fill="currentColor" stroke="none" /></G>;
    case "flower":
      return <G className={className} strokeWidth={strokeWidth}>{[0, 60, 120, 180, 240, 300].map((r) => (<path key={r} transform={`rotate(${r} 50 50)`} d="M50 22c9 11 9 22 0 28-9-6-9-17 0-28z" />))}<circle cx="50" cy="50" r="5" /></G>;
    case "crown":
      return <G className={className} strokeWidth={strokeWidth}><path d="M24 70l6-32 13 16 7-24 7 24 13-16 6 32z" /><path d="M28 78h44" /><circle cx="50" cy="62" r="3" /></G>;
    case "key":
      return <G className={className} strokeWidth={strokeWidth}><circle cx="50" cy="28" r="14" /><path d="M50 42v38M50 66h12M50 78h9" /></G>;
    case "heart":
      return <G className={className} strokeWidth={strokeWidth}><path d="M50 78C28 62 20 44 30 34c8-8 18-2 20 6 2-8 12-14 20-6 10 10 2 28-20 44z" /></G>;
    case "wheel":
      return <G className={className} strokeWidth={strokeWidth}><circle cx="50" cy="50" r="30" /><circle cx="50" cy="50" r="8" />{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (<line key={a} transform={`rotate(${a} 50 50)`} x1="50" y1="20" x2="50" y2="42" />))}</G>;
    case "flame":
      return <G className={className} strokeWidth={strokeWidth}><path d="M50 16c3 14 21 21 21 40a21 21 0 1 1-42 0c0-13 9-17 11-27 2 9 10 11 10-13z" /><path d="M50 76c-5-6-4-13 0-18 4 5 5 12 0 18z" /></G>;
    case "lantern":
      return <G className={className} strokeWidth={strokeWidth}><path d="M50 12v10" /><rect x="36" y="22" width="28" height="44" rx="7" /><path d="M50 58c-6-7-5-15 0-21 5 6 6 14 0 21z" /><path d="M42 66v12M58 66v12M38 84h24" /></G>;
    case "scale":
      return <G className={className} strokeWidth={strokeWidth}><path d="M50 16v60M32 76h36M22 32h56" /><path d="M22 32l-8 18M22 32l8 18M12 50a10 10 0 0 0 20 0" /><path d="M78 32l-8 18M78 32l8 18M68 50a10 10 0 0 0 20 0" /><circle cx="50" cy="24" r="4" /></G>;
    case "ankh":
      return <G className={className} strokeWidth={strokeWidth}><circle cx="50" cy="30" r="13" /><path d="M50 43v41M32 58h36" /></G>;
    case "scythe":
      return <G className={className} strokeWidth={strokeWidth}><path d="M68 18a46 46 0 0 0-45 44l11 1a35 35 0 0 1 34-34z" /><path d="M30 60l36 26" /></G>;
    case "chalice":
      return <G className={className} strokeWidth={strokeWidth}><path d="M28 22h44c0 21-9 33-22 33S28 43 28 22z" /><path d="M50 55v17M34 78c4-4 10-6 16-6s12 2 16 6" /><circle cx="50" cy="13" r="3" fill="currentColor" stroke="none" /></G>;
    case "chain":
      return <G className={className} strokeWidth={strokeWidth}><ellipse cx="41" cy="40" rx="15" ry="21" transform="rotate(-24 41 40)" /><ellipse cx="59" cy="60" rx="15" ry="21" transform="rotate(-24 59 60)" /></G>;
    case "tower":
      return <G className={className} strokeWidth={strokeWidth}><path d="M40 82l5-50h10l5 50z" /><path d="M36 32h28M42 24v8M50 22v10M58 24v8" /><path d="M66 8l-10 18h8L52 48" /><path d="M48 62h4" /></G>;
    case "star":
      return <G className={className} strokeWidth={strokeWidth}><path d="M50 12l7 27 27 11-27 11-7 27-7-27-27-11 27-11z" /><circle cx="50" cy="50" r="4" fill="currentColor" stroke="none" /></G>;
    case "sun":
      return <G className={className} strokeWidth={strokeWidth}><circle cx="50" cy="50" r="17" />{Array.from({ length: 12 }).map((_, i) => { const a = (i * 30 * Math.PI) / 180; const r1 = 24; const r2 = i % 2 === 0 ? 36 : 30; return <line key={i} x1={50 + r1 * Math.cos(a)} y1={50 + r1 * Math.sin(a)} x2={50 + r2 * Math.cos(a)} y2={50 + r2 * Math.sin(a)} />; })}</G>;
    case "eye":
      return <G className={className} strokeWidth={strokeWidth}><path d="M12 50c13-19 63-19 76 0-13 19-63 19-76 0z" /><circle cx="50" cy="50" r="11" /><circle cx="50" cy="50" r="4" fill="currentColor" stroke="none" /><path d="M50 24v-7M32 28l-4-6M68 28l4-6" /></G>;
    case "world":
      return <G className={className} strokeWidth={strokeWidth}><ellipse cx="50" cy="50" rx="25" ry="34" /><circle cx="50" cy="40" r="6" /><path d="M50 46c-6 8-8 16-4 24M50 46c6 8 8 16 4 24" /><path d="M16 16l3 6 6 3-6 3-3 6-3-6-6-3 6-3zM84 16l3 6 6 3-6 3-3 6-3-6-6-3 6-3zM16 84l3-6 6-3-6-3-3-6-3 6-6 3 6 3zM84 84l3-6 6-3-6-3-3-6-3 6-6 3 6 3z" strokeWidth="2.5" /></G>;
    case "sword":
      return <G className={className} strokeWidth={strokeWidth}><path d="M50 10l7 11v33l-7 9-7-9V21z" /><path d="M33 55h34M50 55v18" /><circle cx="50" cy="78" r="4.5" /></G>;
    case "wand":
      return <G className={className} strokeWidth={strokeWidth}><path d="M28 82L64 26" /><path d="M64 26c1-9 9-13 15-10-7 3-9 8-9 13" /><path d="M52 44c0-6 5-9 10-8-4 3-5 6-5 10" /><circle cx="36" cy="70" r="3" /></G>;
    case "pentacle":
      return <G className={className} strokeWidth={strokeWidth}><circle cx="50" cy="50" r="28" /><path d="M50 27l13.5 41.6-35.4-25.7h43.8L36.5 68.6z" /></G>;
  }
}
