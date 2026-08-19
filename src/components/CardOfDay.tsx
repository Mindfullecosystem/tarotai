import { useState } from "react";
import { cardOfTheDay } from "../data/tarot";
import CardBack from "./CardBack";
import CardFace from "./CardFace";
import Reveal, { GoldRule } from "./Reveal";

export default function CardOfDay() {
  const [flipped, setFlipped] = useState(false);
  const card = cardOfTheDay();
  const today = new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <section id="dia" className="relative border-y border-gold-700/20 bg-night-900/60 py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.2fr_1fr] md:px-8">
        <Reveal>
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-400">El augurio diario</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-ivory md:text-5xl">La carta del día</h2>
          <p className="mt-3 font-body text-base italic capitalize text-plum-300">{today}</p>
          <p className="mt-5 max-w-lg text-xl italic leading-relaxed text-parch">
            Cada amanecer, el mazo elige una carta para ti — la misma para todos los que consultan hoy, y distinta a la de ayer.
            Tócala para voltearla y lleva su consejo contigo.
          </p>

          {flipped ? (
            <div className="deal-in mt-7 border-l-2 border-gold-500/60 pl-5">
              <p className="font-display text-2xl font-bold text-gold-300">{card.name}</p>
              <p className="mt-2 max-w-lg text-lg italic leading-relaxed text-parch">{card.description}</p>
              <p className="mt-4 flex flex-wrap gap-2">
                {card.upright.map((k) => (
                  <span key={k} className="rounded-full border border-gold-600/40 px-3 py-1 text-sm italic text-gold-300">{k}</span>
                ))}
              </p>
            </div>
          ) : (
            <p className="mt-7 font-display text-[12px] uppercase tracking-[0.3em] text-plum-300">↖ Voltea la carta para revelarla</p>
          )}
        </Reveal>

        <Reveal delay={150} className="flex justify-center">
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={() => setFlipped((f) => !f)}
              className={`card3d aspect-[2/3] w-56 cursor-pointer md:w-64 ${flipped ? "flipped" : ""}`}
              aria-label={flipped ? `Carta del día: ${card.name}. Pulsa para ocultar` : "Voltear la carta del día"}
            >
              <div className="card3d-inner">
                <div className="card3d-face floaty" style={{ "--fl-delay": "0.4s" } as React.CSSProperties}>
                  <CardBack className="h-full w-full rounded-[14px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]" />
                </div>
                <div className="card3d-face card3d-front">
                  <CardFace card={card} className="pulse-glow h-full w-full rounded-[14px]" />
                </div>
              </div>
            </button>
            <GoldRule className="w-40" />
            <p className="text-center font-display text-[11px] uppercase tracking-[0.3em] text-plum-300">
              {flipped ? card.name : "un secreto por revelar"}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
