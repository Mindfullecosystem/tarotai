import { useState } from "react";
import Reveal, { GoldRule } from "./Reveal";

const QA = [
  {
    q: "¿Cómo recibo mi lectura?",
    a: "Tras completar el pago en SumUp, te escribimos al correo que indicaste para acordar día y hora. La sesión es por videollamada y, si eliges la Lectura Completa, recibes también la grabación y un PDF con tu tirada.",
  },
  {
    q: "¿Qué métodos de pago aceptáis?",
    a: "El pago se procesa de forma segura con SumUp: tarjeta (Visa, Mastercard), Apple Pay y Google Pay. No guardamos ningún dato bancario: todo ocurre en su entorno cifrado.",
  },
  {
    q: "¿Puedo pedir la devolución?",
    a: "Sí. Si nos avisas con al menos 48 horas de antelación a tu sesión, te devolvemos el importe íntegro. Pasado ese plazo podemos reprogramarla una vez sin coste.",
  },
  {
    q: "¿Necesito saber de tarot para la sesión?",
    a: "Para nada. Tú traes la pregunta; las cartas y quien las lee hacen el resto. Al terminar sabrás exactamente qué mostró cada carta y por qué.",
  },
  {
    q: "¿El mazo físico se envía fuera de España?",
    a: "Sí, enviamos a toda Europa y a la mayor parte del mundo. El envío está incluido en el precio y sale en 24–48 horas laborables, con número de seguimiento.",
  },
  {
    q: "¿La tirada gratuita del principio es «de verdad»?",
    a: "Es el mismo motor que usamos en las sesiones: barajado real de las 78 cartas e interpretación honesta. La diferencia es que en una lectura guiada hay una persona que escucha, pregunta y traduce contigo.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="dudas" className="relative border-t border-gold-700/20 bg-night-900/50 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-400">Paso VI · Las dudas</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-ivory md:text-5xl">Antes de barajar</h2>
          <p className="mt-5 max-w-md text-xl italic leading-relaxed text-parch">
            Todo lo que nos preguntan antes de su primera lectura. Si tu duda no está aquí, las cartas dicen que escribas — respondemos antes de lo que crees.
          </p>
          <div className="mt-8 rounded-xl border border-gold-700/40 bg-night-800/70 p-5">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400">¿Otra pregunta?</p>
            <p className="mt-2 text-lg italic text-parch">
              Escríbenos a <span className="text-gold-300">hola@arcana.es</span> — o simplemente reserva la Exprés y pregúntalo allí.
            </p>
          </div>
          <GoldRule className="mt-10 hidden lg:flex" />
        </Reveal>

        <div className="space-y-3.5">
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 70}>
                <div className={`overflow-hidden rounded-lg border transition-colors duration-300 ${isOpen ? "border-gold-500/70 bg-night-800" : "border-gold-700/40 bg-night-800/60 hover:border-gold-600/60"}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-display text-base font-bold tracking-wide transition-colors md:text-lg ${isOpen ? "text-gold-300" : "text-ivory"}`}>{item.q}</span>
                    <span className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ${isOpen ? "rotate-45 border-gold-400 text-gold-300" : "border-gold-700/60 text-gold-400"}`} aria-hidden="true">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-[17px] italic leading-relaxed text-parch">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
