import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold-700/20 bg-night-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5 md:px-8">
        <a href="#inicio" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
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
          <span className="hidden text-right xl:block">
            <span className="block font-display text-[10px] uppercase tracking-[0.2em] text-gold-400">{name}</span>
            <span className="block text-sm italic text-plum-300">{today}</span>
          </span>
          <MoonPhase size={28} />
          <a href="#reserva" className="hidden rounded-full border border-gold-500/60 px-4 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300 transition-all hover:bg-gold-500 hover:text-night-950 lg:inline-block">
            Reservar lectura
          </a>

          {/* hamburguesa (móvil) */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-600/50 text-gold-300 transition-colors hover:bg-gold-500 hover:text-night-950 lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
            </svg>
          </button>
        </div>
      </div>

      {/* panel móvil */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-400 ease-out ${open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-1 border-t border-gold-700/25 bg-night-900/95 px-4 pb-5 pt-3" aria-label="Menú móvil">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`group flex items-center justify-between rounded-lg px-4 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-night-700 hover:text-gold-300 ${open ? "deal-in" : ""}`}
              style={{ "--di-delay": `${i * 60}ms`, "--di-rot": "0deg" } as React.CSSProperties}
            >
              {l.label}
              <span className="text-gold-500 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          ))}
          <a
            href="#reserva"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-gold-500 px-4 py-3.5 text-center font-display text-sm font-bold uppercase tracking-[0.2em] text-night-950"
          >
            Reservar lectura
          </a>
          <p className="mt-3 flex items-center justify-center gap-2 font-display text-[10px] uppercase tracking-[0.22em] text-plum-300">
            <MoonPhase size={18} /> {name} · {today}
          </p>
        </nav>
      </div>
    </header>
  );
}
