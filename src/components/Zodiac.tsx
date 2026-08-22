import { useState } from "react";
import { ZODIAC, currentSign } from "../data/zodiac";
import { DECK } from "../data/tarot";
import CardFace from "./CardFace";
import Reveal, { GoldRule } from "./Reveal";

const R = 41; // radio (%) donde se colocan los signos

function polar(i: number, radius = R): [number, number] {
  const a = ((i * 30 - 90) * Math.PI) / 180;
  return [50 + radius * Math.cos(a), 50 + radius * Math.sin(a)];
}

/* Arco dorado que abraza el signo elegido */
function HighlightArc({ i }: { i: number }) {
  const a0 = ((i * 30 - 90 - 13) * Math.PI) / 180;
  const a1 = ((i * 30 - 90 + 13) * Math.PI) / 180;
  const r = R + 8.5;
  const x1 = 50 + r * Math.cos(a0), y1 = 50 + r * Math.sin(a0);
  const x2 = 50 + r * Math.cos(a1), y2 = 50 + r * Math.sin(a1);
  return (
    <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full">
      <path d={`M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`} fill="none" stroke="#f0d49a" strokeWidth="1.1" strokeLinecap="round" className="drop-shadow-[0_0_6px_rgba(240,212,154,0.8)]" />
    </svg>
  );
}

export default function Zodiac() {
  const today = currentSign();
  const [selIdx, setSelIdx] = useState(() => ZODIAC.findIndex((s) => s.id === today.id));
  const sel = ZODIAC[selIdx];
  const card = DECK.find((c) => c.name === sel.card);

  return (
    <section id="zodiaco" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,179,108,0.09),transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="text-center">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-400">Paso III · El cielo</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-ivory md:text-6xl">La rueda del zodíaco</h2>
          <p className="mx-auto mt-4 max-w-xl text-xl italic leading-relaxed text-parch">
            Gira con el cielo y toca tu signo. Cada uno tiene un arcano regente — y hoy,{" "}
            <strong className="not-italic text-gold-300">{today.name}</strong> rige el tuyo.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          {/* ——— la rueda ——— */}
          <Reveal className="flex justify-center">
            <div className="relative aspect-square w-[min(82vw,440px)]">
              {/* anillos decorativos giratorios */}
              <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full" style={{ animationDuration: "90s" }} aria-hidden="true">
                <circle cx="100" cy="100" r="97" fill="none" stroke="#8f6f3a" strokeWidth="1" opacity="0.7" />
                <circle cx="100" cy="100" r="90" fill="none" stroke="#d9b36c" strokeWidth="0.7" strokeDasharray="2 7" opacity="0.8" />
                <circle cx="100" cy="100" r="62" fill="none" stroke="#8f6f3a" strokeWidth="0.8" strokeDasharray="1 5" opacity="0.7" />
                {Array.from({ length: 72 }).map((_, i) => {
                  const a = (i * 5 * Math.PI) / 180;
                  const long = i % 6 === 0;
                  return (
                    <line
                      key={i}
                      x1={100 + 84 * Math.cos(a)} y1={100 + 84 * Math.sin(a)}
                      x2={100 + (long ? 78 : 81) * Math.cos(a)} y2={100 + (long ? 78 : 81) * Math.sin(a)}
                      stroke="#d9b36c" strokeWidth={long ? 1 : 0.5} opacity={long ? 0.8 : 0.45}
                    />
                  );
                })}
                {[[100, 3], [197, 100], [100, 197], [3, 100]].map(([x, y], i) => (
                  <path key={i} transform={`translate(${x} ${y})`} d="M0 -5L1.5 -1.5 5 0 1.5 1.5 0 5-1.5 1.5-5 0-1.5-1.5z" fill="#d9b36c" />
                ))}
              </svg>

              <HighlightArc i={selIdx} />

              {/* signos */}
              {ZODIAC.map((s, i) => {
                const [x, y] = polar(i);
                const active = i === selIdx;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelIdx(i)}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    className={`absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-lg transition-all duration-300 md:h-12 md:w-12 md:text-xl ${
                      active
                        ? "scale-110 border-gold-300 bg-gold-500 text-night-950 shadow-[0_0_26px_rgba(217,179,108,0.55)]"
                        : "border-gold-700/60 bg-night-900/85 text-gold-300 hover:scale-110 hover:border-gold-400 hover:text-gold-200"
                    }`}
                    aria-label={`${s.name}, ${s.dates}`}
                    aria-pressed={active}
                  >
                    {s.glyph}
                  </button>
                );
              })}

              {/* centro: el signo elegido */}
              <div key={sel.id} className="modal-in pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-5xl text-gold-300 drop-shadow-[0_0_18px_rgba(217,179,108,0.5)] md:text-6xl">{sel.glyph}</span>
                <span className="mt-1 font-display text-sm font-bold uppercase tracking-[0.3em] text-ivory">{sel.name}</span>
                <span className="mt-0.5 font-display text-[10px] uppercase tracking-[0.25em] text-plum-300">{sel.element}</span>
              </div>
            </div>
          </Reveal>

          {/* ——— el oráculo del signo ——— */}
          <Reveal delay={150}>
            <div key={sel.id} className="modal-in">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="font-display text-4xl font-bold text-ivory md:text-5xl">{sel.name}</h3>
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-400">{sel.dates}</p>
              </div>

              <p className="mt-4 flex flex-wrap gap-2">
                {sel.keywords.map((k) => (
                  <span key={k} className="rounded-full border border-gold-600/45 px-3.5 py-1 text-sm italic text-gold-300">{k}</span>
                ))}
                <span className="rounded-full border border-plum-400/40 px-3.5 py-1 text-sm italic text-plum-300">Elemento {sel.element}</span>
              </p>

              <div className="mt-6 border-l-2 border-gold-500/60 pl-5">
                <p className="text-xl italic leading-relaxed text-parch md:text-[22px]">«{sel.message}»</p>
              </div>

              {card && (
                <a href="#mazo" className="group mt-8 flex items-center gap-5 rounded-xl border border-gold-700/40 bg-night-800/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/70 hover:shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
                  <span className="w-20 shrink-0 transition-transform duration-500 group-hover:rotate-[4deg] group-hover:scale-105 md:w-24">
                    <CardFace card={card} className="w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.5)]" />
                  </span>
                  <span>
                    <span className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400">Tu arcano regente</span>
                    <span className="mt-1 block font-display text-2xl font-bold text-ivory">{card.name}</span>
                    <span className="mt-1 block text-[15px] italic text-plum-300">
                      Tócalo para verlo en el mazo <span className="text-gold-400 transition-transform duration-300 group-hover:translate-x-1 inline-block">→</span>
                    </span>
                  </span>
                </a>
              )}

              <GoldRule className="mt-8" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
