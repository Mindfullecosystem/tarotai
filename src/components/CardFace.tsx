import { useId } from "react";
import type { TarotCardData } from "../data/tarot";
import Glyph from "./Glyph";

/* Frente procedural de la carta — estilo grabado dorado sobre ciruela nocturna */

const ROMAN_TO_N: Record<string, number> = { A: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };

const PIPS: Record<number, Array<[number, number]>> = {
  1: [[0.5, 0.5]],
  2: [[0.5, 0.18], [0.5, 0.82]],
  3: [[0.5, 0.15], [0.5, 0.5], [0.5, 0.85]],
  4: [[0.28, 0.22], [0.72, 0.22], [0.28, 0.78], [0.72, 0.78]],
  5: [[0.28, 0.22], [0.72, 0.22], [0.5, 0.5], [0.28, 0.78], [0.72, 0.78]],
  6: [[0.28, 0.16], [0.72, 0.16], [0.28, 0.5], [0.72, 0.5], [0.28, 0.84], [0.72, 0.84]],
  7: [[0.28, 0.16], [0.72, 0.16], [0.5, 0.33], [0.28, 0.5], [0.72, 0.5], [0.28, 0.84], [0.72, 0.84]],
  8: [[0.28, 0.12], [0.72, 0.12], [0.28, 0.37], [0.72, 0.37], [0.28, 0.63], [0.72, 0.63], [0.28, 0.88], [0.72, 0.88]],
  9: [[0.25, 0.14], [0.5, 0.14], [0.75, 0.14], [0.25, 0.5], [0.5, 0.5], [0.75, 0.5], [0.25, 0.86], [0.5, 0.86], [0.75, 0.86]],
  10: [[0.28, 0.12], [0.72, 0.12], [0.5, 0.25], [0.28, 0.38], [0.72, 0.38], [0.28, 0.62], [0.72, 0.62], [0.5, 0.75], [0.28, 0.88], [0.72, 0.88]],
};

function CornerFleuron({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) rotate(${r})`}
      d="M0 -9 L2.4 -2.4 L9 0 L2.4 2.4 L0 9 L-2.4 2.4 L-9 0 L-2.4 -2.4 Z"
      fill="none" stroke="#b8934f" strokeWidth="1.4" opacity="0.9"
    />
  );
}

export default function CardFace({ card, className }: { card: TarotCardData; className?: string }) {
  const uid = useId().replace(/[:]/g, "");
  const isMinor = card.arcana === "minor";
  const pipCount = ROMAN_TO_N[card.numeral];
  const isCourt = isMinor && !pipCount;
  const nameSize = card.name.length > 14 ? 12.5 : 15;

  return (
    <svg viewBox="0 0 240 360" className={className} role="img" aria-label={card.name}>
      <defs>
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#241a3a" />
          <stop offset="55%" stopColor="#191128" />
          <stop offset="100%" stopColor="#120c1e" />
        </linearGradient>
        <radialGradient id={`halo-${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#d9b36c" stopOpacity="0.22" />
          <stop offset="70%" stopColor="#d9b36c" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#d9b36c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* fondo + marcos */}
      <rect x="2" y="2" width="236" height="356" rx="14" fill={`url(#bg-${uid})`} />
      <rect x="2" y="2" width="236" height="356" rx="14" fill="none" stroke="#8f6f3a" strokeWidth="2.5" />
      <rect x="11" y="11" width="218" height="338" rx="9" fill="none" stroke="#d9b36c" strokeWidth="1" opacity="0.55" />

      {/* esquinas */}
      <CornerFleuron x={26} y={26} r={0} />
      <CornerFleuron x={214} y={26} r={0} />
      <CornerFleuron x={26} y={334} r={0} />
      <CornerFleuron x={214} y={334} r={0} />

      {/* numeración */}
      <text x="120" y="52" textAnchor="middle" fontFamily="Cinzel, serif" fontWeight="700" fontSize="25" fill="#f0d49a" letterSpacing="2">
        {card.numeral}
      </text>
      <path d="M84 64h72" stroke="#b8934f" strokeWidth="1" opacity="0.7" />
      <circle cx="120" cy="64" r="2.4" fill="#d9b36c" />

      {/* medallón central */}
      <circle cx="120" cy="180" r="82" fill={`url(#halo-${uid})`} />
      <circle cx="120" cy="180" r="72" fill="none" stroke="#d9b36c" strokeWidth="1.2" opacity="0.65" />
      <circle cx="120" cy="180" r="79" fill="none" stroke="#8f6f3a" strokeWidth="0.8" strokeDasharray="2 6" opacity="0.8" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * 22.5 * Math.PI) / 180;
        return <line key={i} x1={120 + 72 * Math.cos(a)} y1={180 + 72 * Math.sin(a)} x2={120 + 66 * Math.cos(a)} y2={180 + 66 * Math.sin(a)} stroke="#d9b36c" strokeWidth="1" opacity="0.5" />;
      })}

      {/* contenido central (svg anidado — máxima compatibilidad) */}
      {!isMinor && (
        <svg x="63" y="123" width="114" height="114">
          <Glyph id={card.glyph} className="h-full w-full text-gold-500" strokeWidth={3.4} />
        </svg>
      )}

      {isMinor && pipCount && (
        <>
          {PIPS[pipCount].map(([fx, fy], i) => {
            const s = pipCount <= 1 ? 92 : pipCount <= 3 ? 60 : pipCount <= 6 ? 46 : 34;
            return (
              <svg key={i} x={62 + fx * 116 - s / 2} y={110 + fy * 140 - s / 2} width={s} height={s}>
                <Glyph id={card.glyph} className="h-full w-full text-gold-500" strokeWidth={5.2} />
              </svg>
            );
          })}
        </>
      )}

      {isCourt && (
        <>
          <text x="120" y="140" textAnchor="middle" fontFamily="Cinzel, serif" fontWeight="700" fontSize="30" fill="#f0d49a">{card.numeral}</text>
          <svg x="75" y="148" width="90" height="90">
            <Glyph id={card.glyph} className="h-full w-full text-gold-500" strokeWidth={4.2} />
          </svg>
          <path d="M88 246h64" stroke="#b8934f" strokeWidth="1" opacity="0.7" />
        </>
      )}

      {/* nombre */}
      <text x="120" y="306" textAnchor="middle" fontFamily="Cinzel, serif" fontWeight="600" fontSize={nameSize} fill="#efe6d4" letterSpacing="1.5">
        {card.name.toUpperCase()}
      </text>
      <text x="120" y="324" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="11" fill="#9d8fb5" letterSpacing="2">
        {card.arcana === "major" ? "· arcano mayor ·" : `· ${card.element} ·`}
      </text>
      <path d="M96 336l4-4 4 4-4 4z" fill="#d9b36c" transform="translate(16 0)" />
      <path d="M96 336l4-4 4 4-4 4z" fill="none" stroke="#b8934f" transform="translate(-16 0)" />
    </svg>
  );
}
