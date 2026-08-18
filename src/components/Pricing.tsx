import { useState } from "react";
import CheckoutModal, { type Plan } from "./CheckoutModal";
import Reveal, { GoldRule } from "./Reveal";

const PLANS: Plan[] = [
  {
    id: "express", name: "Lectura Exprés", price: 7.99, duration: "20 minutos",
    includes: ["1 pregunta concreta", "3 cartas", "guía escrita"],
  },
  {
    id: "completa", name: "Lectura Completa", price: 14.99, duration: "45 minutos", tag: "La más elegida",
    includes: ["Cruz celta (10 cartas)", "sesión en directo", "grabación + PDF"],
  },
  {
    id: "mazo", name: "Mazo + Lectura", price: 39.99, duration: "45 min + envío",
    includes: ["mazo físico ilustrado (78)", "Lectura Completa", "envío incluido"],
  },
];

const TILTS = ["md:-rotate-3 md:translate-y-6", "md:-translate-y-4", "md:rotate-3 md:translate-y-6"];

export default function Pricing() {
  const [active, setActive] = useState<Plan | null>(null);

  return (
    <section id="reserva" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,179,108,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="text-center">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-400">Paso IV · El encuentro</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-ivory md:text-6xl">Reserva tu lectura</h2>
          <p className="mx-auto mt-4 max-w-xl text-xl italic leading-relaxed text-parch">
            Las cartas hablan, pero una voz experta las traduce. Elige tu ritual: pago seguro con SumUp, sin suscripciones ni letra pequeña.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-5">
          {PLANS.map((plan, i) => {
            const featured = !!plan.tag;
            return (
              <Reveal key={plan.id} delay={i * 140}>
                <article
                  className={`group relative flex h-full flex-col rounded-xl border p-7 transition-all duration-500 hover:-translate-y-2 hover:rotate-0 ${TILTS[i]} ${
                    featured
                      ? "border-gold-400/80 bg-gradient-to-b from-night-700 to-night-800 shadow-[0_24px_60px_rgba(217,179,108,0.16)]"
                      : "border-gold-700/40 bg-night-800/80 hover:border-gold-500/60"
                  }`}
                >
                  {plan.tag && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold-500 px-4 py-1 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-night-950">
                      ✳ {plan.tag}
                    </span>
                  )}
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-400">{plan.duration}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-ivory">{plan.name}</h3>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className={`font-display font-black ${featured ? "text-5xl text-gold-300" : "text-4xl text-ivory"}`}>{plan.price.toFixed(2).replace(".", ",")}</span>
                    <span className="font-display text-lg text-plum-300">€</span>
                  </p>

                  <ul className="mt-6 flex-1 space-y-2.5 border-t border-gold-700/30 pt-5">
                    {plan.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-[17px] italic text-parch">
                        <svg viewBox="0 0 24 24" className="mt-1 h-3.5 w-3.5 shrink-0 text-gold-500" aria-hidden="true">
                          <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z" fill="currentColor" />
                        </svg>
                        {inc}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setActive(plan)}
                    className={`mt-7 w-full rounded-full py-3.5 font-display text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.97] ${
                      featured
                        ? "bg-gold-500 text-night-950 hover:shadow-[0_0_30px_rgba(217,179,108,0.45)]"
                        : "border border-gold-500/60 text-gold-300 hover:bg-gold-500 hover:text-night-950"
                    }`}
                  >
                    Reservar y pagar
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 text-center">
          <GoldRule className="mx-auto max-w-lg" />
          <p className="mt-5 text-base italic text-plum-300">
            El pago se procesa fuera de esta página, en el entorno cifrado de <strong className="not-italic text-gold-400">SumUp</strong>.
            Si algo se tuerce, escríbenos y lo resolvemos: el oráculo no cobra por errores.
          </p>
        </Reveal>
      </div>

      {active && <CheckoutModal plan={active} onClose={() => setActive(null)} />}
    </section>
  );
}
