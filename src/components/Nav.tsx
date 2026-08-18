import MoonPhase, { moonPhase } from "./MoonPhase";

const LINKS = [
  { href: "#tirada", label: "La tirada" },
  { href: "#arcanos", label: "Arcanos" },
  { href: "#mazo", label: "El mazo" },
  { href: "#reserva", label: "Reserva" },
];

export default function Nav() {
  const { name } = moonPhase();
  const today = new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long" });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold-700/20 bg-night-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <a href="#inicio" className="group flex items-center gap-2.5">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold-500 transition-transform duration-500 group-hover:rotate-180" aria-hidden="true">
            <path d="M12 1l2.8 8.2L23 12l-8.2 2.8L12 23l-2.8-8.2L1 12l8.2-2.8z" fill="currentColor" />
          </svg>
          <span className="font-display text-lg font-bold tracking-[0.28em] text-ivory">ARCANA</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Secciones">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="group relative font-display text-[12px] font-semibold uppercase tracking-[0.22em] text-plum-300 transition-colors hover:text-gold-300">
              {l.label}
              <span className="absolute -bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-gold-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden text-right sm:block">
            <span className="block font-display text-[10px] uppercase tracking-[0.2em] text-gold-400">{name}</span>
            <span className="block text-sm italic text-plum-300">{today}</span>
          </span>
          <MoonPhase size={30} />
          <a href="#reserva" className="hidden rounded-full border border-gold-500/60 px-4 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300 transition-all hover:bg-gold-500 hover:text-night-950 md:inline-block">
            Reservar lectura
          </a>
        </div>
      </div>
    </header>
  );
}
