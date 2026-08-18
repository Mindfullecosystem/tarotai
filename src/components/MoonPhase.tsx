/* Fase lunar real calculada a partir del ciclo sinódico */

const SYNODIC = 29.53058867;
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

export function moonPhase(date = new Date()): { fraction: number; name: string } {
  const days = (date.getTime() - KNOWN_NEW_MOON) / 86400000;
  const fraction = (((days % SYNODIC) + SYNODIC) % SYNODIC) / SYNODIC;
  const names = ["Luna nueva", "Creciente iluminante", "Cuarto creciente", "Gibosa creciente", "Luna llena", "Gibosa menguante", "Cuarto menguante", "Menguante balsámica"];
  const name = names[Math.round(fraction * 8) % 8];
  return { fraction, name };
}

export default function MoonPhase({ size = 22 }: { size?: number }) {
  const { fraction, name } = moonPhase();
  const waxing = fraction <= 0.5;
  const illum = (1 - Math.cos(2 * Math.PI * fraction)) / 2;
  const rx = Math.max(0.01, Math.abs(Math.cos(2 * Math.PI * fraction)) * 8.4);
  const bulgeRight = (waxing && illum < 0.5) || (!waxing && illum > 0.5);

  const half = `M10 1.6 A8.4 8.4 0 0 ${waxing ? 1 : 0} 10 18.4`;
  const terminator = `A${rx.toFixed(2)} 8.4 0 0 ${bulgeRight ? 0 : 1} 10 1.6`;
  const d = `${half} ${terminator} Z`;

  return (
    <svg viewBox="0 0 20 20" width={size} height={size} role="img" aria-label={`Fase lunar de hoy: ${name}`} className="shrink-0">
      <circle cx="10" cy="10" r="8.4" fill="#241a3a" stroke="#8f6f3a" strokeWidth="1" />
      {illum > 0.02 && <path d={d} fill="#f0d49a" opacity="0.92" />}
      <title>{name}</title>
    </svg>
  );
}
