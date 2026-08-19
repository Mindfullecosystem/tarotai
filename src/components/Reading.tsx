import { useEffect, useMemo, useRef, useState } from "react";
import { DECK, POSITIONS, weaveReading, shuffle, type DrawnCard } from "../data/tarot";
import CardBack from "./CardBack";
import CardFace from "./CardFace";
import Reveal, { GoldRule } from "./Reveal";

type Phase = "idle" | "shuffling" | "picking" | "revealing" | "done";

interface SpreadCard { card: (typeof DECK)[number]; rot: number; }

export default function Reading() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [spread, setSpread] = useState<SpreadCard[]>([]);
  const [pickedIdx, setPickedIdx] = useState<number[]>([]);
  const [drawn, setDrawn] = useState<DrawnCard[]>([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

  const startShuffle = () => {
    setPickedIdx([]);
    setDrawn([]);
    setFlippedCount(0);
    setPhase("shuffling");
    later(() => {
      setSpread(
        shuffle(DECK).slice(0, 12).map((card) => ({ card, rot: Math.random() * 10 - 5 }))
      );
      later(() => setPhase("picking"), 650);
    }, 250);
  };

  const pickCard = (idx: number) => {
    if (phase !== "picking" || pickedIdx.includes(idx)) return;
    const nextPicked = [...pickedIdx, idx];
    setPickedIdx(nextPicked);
    const reversed = Math.random() < 0.32;
    const nextDrawn = [...drawn, { card: spread[idx].card, reversed } as DrawnCard];
    setDrawn(nextDrawn);

    if (nextPicked.length === 3) {
      later(() => {
        setPhase("revealing");
        [0, 1, 2].forEach((i) => later(() => setFlippedCount(i + 1), 350 + i * 750));
        later(() => setPhase("done"), 350 + 3 * 750 + 500);
      }, 500);
    }
  };

  const interpretation = useMemo(() => (phase === "done" ? weaveReading(drawn) : ""), [phase, drawn]);

  return (
    <section id="tirada" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,179,108,0.07),transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-400">Paso I · La pregunta</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-ivory md:text-6xl">La tirada de las tres cartas</h2>
          <p className="mt-4 max-w-2xl text-xl italic leading-relaxed text-parch">
            Respira hondo y formula tu pregunta en silencio. Después baraja, y elige tres cartas con la mano — no con la cabeza.
            Ellas hablarán de tu <strong className="not-italic text-gold-300">pasado</strong>, tu <strong className="not-italic text-gold-300">presente</strong> y tu <strong className="not-italic text-gold-300">futuro</strong>.
          </p>
        </Reveal>

        {/* mesa de posiciones */}
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {POSITIONS.map((pos, i) => {
            const d = drawn[i];
            const isFlipped = flippedCount > i;
            return (
              <Reveal key={pos} delay={i * 120}>
                <div className="flex flex-col items-center">
                  <div className={`card3d aspect-[2/3] w-full max-w-[190px] ${isFlipped && d ? "flipped" : ""}`}>
                    <div className="card3d-inner">
                      <div className="card3d-face rounded-[14px] border border-dashed border-gold-700/60 bg-night-800/50">
                        <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
                          <svg viewBox="0 0 24 24" className="h-8 w-8 text-gold-700" aria-hidden="true">
                            <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z" fill="none" stroke="currentColor" strokeWidth="1.4" />
                          </svg>
                          <span className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-plum-300">{pos}</span>
                          <span className="text-sm italic text-plum-400">{d ? (d.reversed ? "invertida" : "al derecho") : "esperando…"}</span>
                        </div>
                      </div>
                      {d && (
                        <div className="card3d-face card3d-front">
                          <div className={`h-full w-full ${d.reversed ? "rotate-180" : ""}`}>
                            <CardFace card={d.card} className="h-full w-full rounded-[14px] drop-shadow-[0_16px_30px_rgba(0,0,0,0.5)]" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 min-h-[3.2rem] text-center">
                    {isFlipped && d ? (
                      <div className="deal-in">
                        <p className="font-display text-base font-bold tracking-wide text-gold-300">{d.card.name}</p>
                        <p className="mt-1 flex flex-wrap justify-center gap-1.5">
                          {(d.reversed ? d.card.reversed : d.card.upright).map((k) => (
                            <span key={k} className={`rounded-full border px-2.5 py-0.5 text-[13px] italic ${d.reversed ? "border-rose-400/40 text-rose-400" : "border-gold-600/40 text-parch"}`}>{k}</span>
                          ))}
                        </p>
                      </div>
                    ) : (
                      <p className="font-display text-[11px] uppercase tracking-[0.3em] text-plum-400">{pos}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* zona de acción / abanico de elección */}
        <div className="mt-12">
          {phase === "idle" && (
            <Reveal className="flex flex-col items-center gap-5 text-center">
              <GoldRule className="w-full max-w-xl" />
              <button onClick={startShuffle} className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold-500 px-8 py-4 font-display text-[13px] font-bold uppercase tracking-[0.22em] text-night-950 transition-transform duration-300 hover:scale-[1.04] active:scale-95">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 7h4l10 10h4M3 17h4l2.5-2.5M13.5 9.5L17 7h4M17 3l4 4-4 4M17 13l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Barajar el mazo
              </button>
              <p className="max-w-md text-base italic text-plum-300">El azar no existe para quien sabe mirar: cada carta ya llevaba tu nombre.</p>
            </Reveal>
          )}

          {phase === "shuffling" && (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative h-24 w-40">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="shuffle-jitter absolute inset-0" style={{ "--ji-x": `${i % 2 ? 14 : -14}px`, "--ji-dur": "0.42s", "--ji-delay": `${i * 0.06}s`, zIndex: i, opacity: 0.5 + i * 0.14 } as React.CSSProperties}>
                    <CardBack className="h-full w-auto rounded-lg" />
                  </div>
                ))}
              </div>
              <p className="font-display text-sm uppercase tracking-[0.35em] text-gold-300">las cartas se mezclan…</p>
            </div>
          )}

          {phase === "picking" && (
            <div>
              <p className="mb-6 text-center font-display text-sm font-semibold uppercase tracking-[0.3em] text-gold-300">
                Elige {3 - pickedIdx.length} carta{3 - pickedIdx.length === 1 ? "" : "s"} más
              </p>
              <div className="mx-auto grid max-w-3xl grid-cols-4 gap-3 sm:grid-cols-6 sm:gap-4">
                {spread.map((sc, idx) => {
                  const taken = pickedIdx.includes(idx);
                  return (
                    <button
                      key={sc.card.id}
                      onClick={() => pickCard(idx)}
                      disabled={taken}
                      className={`deal-in group relative aspect-[2/3] rotate-[var(--rot)] transition-all duration-300 ${taken ? "scale-90 opacity-25" : "cursor-pointer hover:-translate-y-2 hover:rotate-0"}`}
                      style={{ "--rot": `${sc.rot}deg`, "--di-delay": `${idx * 45}ms`, "--di-rot": `${sc.rot}deg` } as React.CSSProperties}
                      aria-label={taken ? "Carta elegida" : `Elegir carta ${idx + 1}`}
                    >
                      <CardBack className="h-full w-full rounded-lg drop-shadow-[0_10px_18px_rgba(0,0,0,0.5)] transition-shadow duration-300 group-hover:drop-shadow-[0_14px_26px_rgba(217,179,108,0.3)]" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {(phase === "revealing" || phase === "done") && (
            <div className="mx-auto max-w-3xl space-y-6">
              <div className={`rounded-xl border border-gold-700/40 bg-night-800/70 p-7 transition-all duration-700 md:p-9 ${phase === "done" ? "opacity-100" : "opacity-60"}`}>
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-400">El mensaje del mazo</p>
                {phase === "revealing" ? (
                  <p className="mt-4 animate-pulse text-lg italic text-plum-300">Las cartas se muestran una a una…</p>
                ) : (
                  <div className="deal-in">
                    <p className="mt-4 text-xl leading-relaxed text-ivory md:text-[22px]">{interpretation}</p>
                    <div className="mt-6 space-y-4 border-t border-gold-700/30 pt-6">
                      {drawn.map((d, i) => (
                        <p key={d.card.id} className="leading-relaxed text-parch">
                          <span className="font-display text-[12px] font-bold uppercase tracking-[0.25em] text-gold-400">{POSITIONS[i]} — {d.card.name}{d.reversed ? " (invertida)" : ""}: </span>
                          <span className="italic">{d.card.description}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {phase === "done" && (
                <div className="deal-in flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                  <button onClick={startShuffle} className="inline-flex items-center gap-2 rounded-full border border-gold-500/60 px-6 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-300 transition-colors hover:bg-gold-500 hover:text-night-950">
                    ↺ Nueva tirada
                  </button>
                  <a href="#reserva" className="group inline-flex items-center gap-2 text-lg italic text-gold-300 transition-colors hover:text-gold-200">
                    ¿Quieres profundizar? Reserva una lectura guiada
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
