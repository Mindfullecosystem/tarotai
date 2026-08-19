import { useId } from "react";

/* Dorso de la carta — retícula de estrellas sobre ciruela profunda */

export default function CardBack({ className }: { className?: string }) {
  const uid = useId().replace(/[:]/g, "");
  return (
    <svg viewBox="0 0 240 360" className={className} role="img" aria-label="Dorso de carta de tarot">
      <defs>
        <linearGradient id={`bgb-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#221838" />
          <stop offset="100%" stopColor="#140e22" />
        </linearGradient>
        <pattern id={`stars-${uid}`} width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M15 6l2 5.5L22.5 15 17 17l-2 5.5L13 17l-5.5-2L13 13.5z" fill="none" stroke="#8f6f3a" strokeWidth="0.8" opacity="0.55" transform="scale(0.72) translate(6 6)" />
          <circle cx="3" cy="24" r="0.9" fill="#b8934f" opacity="0.5" />
        </pattern>
      </defs>

      <rect x="2" y="2" width="236" height="356" rx="14" fill={`url(#bgb-${uid})`} />
      <rect x="2" y="2" width="236" height="356" rx="14" fill={`url(#stars-${uid})`} />
      <rect x="2" y="2" width="236" height="356" rx="14" fill="none" stroke="#b8934f" strokeWidth="2.5" />
      <rect x="12" y="12" width="216" height="336" rx="9" fill="none" stroke="#d9b36c" strokeWidth="1" opacity="0.6" />
      <rect x="20" y="20" width="200" height="320" rx="6" fill="none" stroke="#8f6f3a" strokeWidth="0.8" strokeDasharray="1 5" opacity="0.9" />

      {/* medallón central: luna y estrella */}
      <circle cx="120" cy="180" r="66" fill="none" stroke="#d9b36c" strokeWidth="1.2" opacity="0.7" />
      <circle cx="120" cy="180" r="58" fill="none" stroke="#8f6f3a" strokeWidth="0.8" strokeDasharray="3 5" />
      <path d="M132 148a36 36 0 1 0 0 64 29 29 0 1 1 0-64z" fill="none" stroke="#f0d49a" strokeWidth="3" strokeLinejoin="round" />
      <path d="M146 160l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#d9b36c" />
      <circle cx="98" cy="160" r="1.6" fill="#d9b36c" />
      <circle cx="104" cy="206" r="1.3" fill="#d9b36c" />

      {/* esquinas */}
      {[[26, 26], [214, 26], [26, 334], [214, 334]].map(([x, y], i) => (
        <path key={i} transform={`translate(${x} ${y})`} d="M0 -8L2 -2 8 0 2 2 0 8-2 2-8 0-2-2z" fill="none" stroke="#b8934f" strokeWidth="1.2" />
      ))}
    </svg>
  );
}
