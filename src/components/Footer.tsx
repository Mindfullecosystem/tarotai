import MoonPhase, { moonPhase } from "./MoonPhase";

export default function Footer() {
  const { name } = moonPhase();
  return (
    <footer className="relative border-t border-gold-700/25 bg-night-950/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr] md:px-8">
        <div>
          <p className="flex items-center gap-2.5">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold-500" aria-hidden="true">
              <path d="M12 1l2.8 8.2L23 12l-8.2 2.8L12 23l-2.8-8.2L1 12l8.2-2.8z" fill="currentColor" />
            </svg>
            <span className="font-display text-lg font-bold tracking-[0.28em] text-ivory">ARCANA</span>
          </p>
          <p className="mt-4 max-w-sm text-lg italic leading-relaxed text-plum-300">
            Un oráculo interactivo con las 78 cartas del tarot, láminas ilustradas en oro y medianoche, y lecturas guiadas por humanos de carne y hueso.
          </p>
          <p className="mt-5 flex items-center gap-3 rounded-lg border border-gold-700/40 bg-night-800/60 px-4 py-3 text-[15px] italic text-parch">
            <MoonPhase size={26} />
            Esta noche nos acompaña la <strong className="not-italic text-gold-300">{name.toLowerCase()}</strong> — buen momento para preguntar.
          </p>
        </div>

        <nav aria-label="Mapa del sitio">
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400">El recorrido</p>
          <ul className="mt-4 space-y-2.5">
            {[
              ["#dia", "La carta del día"],
              ["#tirada", "La tirada de tres cartas"],
              ["#arcanos", "Arcanos destacados"],
              ["#mazo", "El mazo completo"],
              ["#reserva", "Reservar lectura"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="group inline-flex items-center gap-2 text-lg italic text-plum-300 transition-colors hover:text-gold-300">
                  <span className="h-px w-4 bg-gold-700 transition-all duration-300 group-hover:w-7 group-hover:bg-gold-400" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400">Palabra de oráculo</p>
          <p className="mt-4 text-lg italic leading-relaxed text-plum-300">
            El tarot es un espejo, no una sentencia: muestra lo que ya sabes en voz baja. Úsalo para reflexionar, nunca para decidir por ti.
          </p>
          <p className="mt-5 rounded-lg border border-gold-700/40 bg-night-800/60 px-4 py-3 text-[15px] text-parch">
            <span className="font-display text-[11px] font-bold uppercase tracking-[0.25em] text-gold-300">Pagos</span>
            <span className="mt-1 block italic">SumUp · Visa · Mastercard · Apple Pay · Google Pay</span>
          </p>
        </div>
      </div>

      <div className="border-t border-gold-700/20 py-5">
        <p className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 font-display text-[10px] uppercase tracking-[0.25em] text-plum-400 md:px-8">
          <span>© {new Date().getFullYear()} Arcana · Hecho a la luz de las velas</span>
          <span className="flex items-center gap-2">
            78 cartas <span className="text-gold-600">✳</span> 4 elementos <span className="text-gold-600">✳</span> 1 destino
          </span>
        </p>
      </div>
    </footer>
  );
}
