import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { DECK, SUIT_LABEL, type Suit, type TarotCardData } from "../data/tarot";
import CardFace from "./CardFace";
import Reveal, { GoldRule } from "./Reveal";

const FILTERS: Array<{ key: Suit | "all"; label: string }> = [
  { key: "all", label: "Todo el mazo" },
  { key: "major", label: "Arcanos Mayores" },
  { key: "copas", label: "Copas" },
  { key: "espadas", label: "Espadas" },
  { key: "bastos", label: "Bastos" },
  { key: "oros", label: "Oros" },
];

export default function Gallery() {
  const [filter, setFilter] = useState<Suit | "all">("all");
  const [selected, setSelected] = useState<TarotCardData | null>(null);

  const cards = useMemo(() => (filter === "all" ? DECK : DECK.filter((c) => c.suit === filter)), [filter]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <section id="mazo" className="relative border-y border-gold-700/20 bg-night-900/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-400">Paso III · El estudio</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl font-bold text-ivory md:text-6xl">El mazo completo</h2>
            <p className="max-w-md text-lg italic leading-relaxed text-plum-300">
              Las 78 láminas, dibujadas aquí en oro sobre medianoche. Toca cualquiera para leer su significado al derecho y al revés.
            </p>
          </div>
        </Reveal>

        {/* filtros */}
        <Reveal delay={120} className="mt-10 flex flex-wrap gap-2.5">
          {FILTERS.map((f) => {
            const count = f.key === "all" ? DECK.length : DECK.filter((c) => c.suit === f.key).length;
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 font-display text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                  active
                    ? "border-gold-400 bg-gold-500 text-night-950 shadow-[0_0_22px_rgba(217,179,108,0.35)]"
                    : "border-gold-700/50 text-plum-300 hover:border-gold-500/70 hover:text-gold-300"
                }`}
                aria-pressed={active}
              >
                {f.label}
                <span className={`rounded-full px-1.5 text-[11px] tabular-nums ${active ? "bg-night-950/15" : "bg-night-700 text-gold-400"}`}>{count}</span>
              </button>
            );
          })}
        </Reveal>

        {/* rejilla de cartas */}
        <div key={filter} className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-6 lg:grid-cols-8">
          {cards.map((card, i) => (
            <button
              key={card.id}
              onClick={() => setSelected(card)}
              className="deal-in group relative aspect-[2/3] cursor-pointer rotate-[var(--rot)] transition-all duration-300 hover:z-10 hover:-translate-y-2 hover:rotate-0"
              style={{ "--rot": `${((i % 5) - 2) * 0.6}deg`, "--di-delay": `${Math.min(i * 18, 500)}ms`, "--di-rot": `${(i % 5) - 2}deg` } as React.CSSProperties}
              aria-label={`Ver significado de ${card.name}`}
            >
              <CardFace card={card} className="h-full w-full rounded-lg drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] transition-all duration-300 group-hover:drop-shadow-[0_16px_28px_rgba(217,179,108,0.3)]" />
              <span className="pointer-events-none absolute inset-x-0 -bottom-7 text-center font-display text-[10px] font-semibold uppercase tracking-[0.15em] text-gold-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {card.name.length > 16 ? card.name.slice(0, 15) + "…" : card.name}
              </span>
            </button>
          ))}
        </div>

        <Reveal className="mt-16">
          <GoldRule />
        </Reveal>
      </div>

      {/* modal de detalle — portal a <body> para que el position:fixed nunca se rompa */}
      {selected && createPortal(
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Significado de ${selected.name}`}>
          <button className="backdrop-in absolute inset-0 bg-night-950/88 backdrop-blur-sm" onClick={() => setSelected(null)} aria-label="Cerrar" />
          <div className="modal-in relative grid max-h-[92vh] w-full max-w-3xl gap-0 overflow-y-auto overscroll-contain rounded-xl border border-gold-600/50 bg-night-800 shadow-[0_40px_90px_rgba(0,0,0,0.7)] md:grid-cols-[300px_1fr]">
            <button autoFocus onClick={() => setSelected(null)} className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gold-600/50 bg-night-800/70 text-gold-300 transition-colors hover:bg-gold-500 hover:text-night-950" aria-label="Cerrar detalle">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
            </button>

            <div className="flex items-start justify-center bg-night-900/60 p-6 md:p-8">
              <div className="w-48 md:w-56">
                <CardFace card={selected} className="pulse-glow w-full rounded-xl" />
              </div>
            </div>

            <div className="p-6 md:p-8">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-400">
                {selected.arcana === "major" ? `Arcanos Mayores · Arcano ${selected.numeral}` : `${SUIT_LABEL[selected.suit]} · Arcano menor`}
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold text-ivory">{selected.name}</h3>
              <p className="mt-4 text-lg italic leading-relaxed text-parch">{selected.description}</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400">Al derecho</p>
                  <p className="mt-2.5 flex flex-wrap gap-2">
                    {selected.upright.map((k) => (
                      <span key={k} className="rounded-full border border-gold-600/50 bg-gold-500/10 px-3 py-1 text-[15px] italic text-gold-300">{k}</span>
                    ))}
                  </p>
                </div>
                <div>
                  <p className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-rose-400">Invertida</p>
                  <p className="mt-2.5 flex flex-wrap gap-2">
                    {selected.reversed.map((k) => (
                      <span key={k} className="rounded-full border border-rose-400/40 bg-rose-400/10 px-3 py-1 text-[15px] italic text-rose-400">{k}</span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="mt-7 border-t border-gold-700/30 pt-5">
                <p className="text-base italic leading-relaxed text-plum-300">
                  {selected.element
                    ? `Pertenece al elemento ${selected.element}. Medita con ella un minuto al día y observa qué se mueve.`
                    : `Forma parte del viaje del héroe que recorre los 22 arcanos mayores. Su posición en tu tirada lo cambia todo.`}
                </p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
