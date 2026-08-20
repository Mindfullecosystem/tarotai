import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";

export interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  includes: string[];
  tag?: string;
}

/* Enlace de pago SumUp del proyecto */
const SUMUP_LINK_ID = "QVDJ846Y";
const sumupUrl = (plan: Plan) =>
  `https://pay.sumup.com/b2c/${SUMUP_LINK_ID}?amount=${plan.price.toFixed(2)}&title=${encodeURIComponent(plan.name + " · Arcana")}&currency=EUR`;

type Step = "form" | "processing" | "done";

export default function CheckoutModal({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const [step, setStep] = useState<Step>("form");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      timers.current.forEach(clearTimeout);
    };
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) {
      setError("Escribe un correo válido: ahí llegará tu lectura.");
      return;
    }
    setError("");
    setStep("processing");
    timers.current.push(
      window.setTimeout(() => {
        window.open(sumupUrl(plan), "_blank", "noopener");
        setStep("done");
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          const gold = ["#d9b36c", "#f0d49a", "#b8934f", "#efe6d4"];
          confetti({ particleCount: 120, spread: 75, origin: { y: 0.6 }, colors: gold });
          timers.current.push(window.setTimeout(() => confetti({ particleCount: 70, spread: 100, origin: { y: 0.5 }, colors: gold }), 350));
        }
      }, 1100)
    );
  };

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Reservar ${plan.name}`}>
      <button className="backdrop-in absolute inset-0 bg-night-950/88 backdrop-blur-sm" onClick={onClose} aria-label="Cerrar" />

      <div className="modal-in relative max-h-[92vh] w-full max-w-md overflow-y-auto overscroll-contain rounded-xl border border-gold-600/50 bg-night-800 shadow-[0_40px_90px_rgba(0,0,0,0.75)]">
        <div className="h-1 w-full bg-gradient-to-r from-gold-700 via-gold-300 to-gold-700" />
        <button autoFocus onClick={onClose} className="absolute right-3 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gold-600/50 bg-night-800/70 text-gold-300 transition-colors hover:bg-gold-500 hover:text-night-950" aria-label="Cerrar reserva">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
        </button>

        {step !== "done" && (
          <form onSubmit={submit} className="p-7">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-400">Reserva tu lectura</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-ivory">{plan.name}</h3>

            <dl className="mt-5 space-y-2 rounded-lg border border-gold-700/40 bg-night-900/60 p-4 text-[15px]">
              <div className="flex justify-between gap-4"><dt className="italic text-plum-300">Duración</dt><dd className="text-ivory">{plan.duration}</dd></div>
              <div className="flex justify-between gap-4"><dt className="italic text-plum-300">Incluye</dt><dd className="max-w-[220px] text-right text-ivory">{plan.includes.join(" · ")}</dd></div>
              <div className="flex justify-between gap-4 border-t border-gold-700/40 pt-2"><dt className="font-display text-[12px] font-bold uppercase tracking-[0.2em] text-gold-300">Total</dt><dd className="font-display text-xl font-bold text-gold-300">{plan.price.toFixed(2).replace(".", ",")} €</dd></div>
            </dl>

            <label className="mt-5 block">
              <span className="font-display text-[11px] font-bold uppercase tracking-[0.25em] text-plum-300">Tu nombre</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="¿Cómo te llamamos en la sesión?" className="mt-1.5 w-full rounded-lg border border-gold-700/50 bg-night-900/80 px-4 py-2.5 text-ivory placeholder:italic placeholder:text-plum-400 focus:border-gold-400 focus:outline-none" />
            </label>
            <label className="mt-4 block">
              <span className="font-display text-[11px] font-bold uppercase tracking-[0.25em] text-plum-300">Correo electrónico *</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" className="mt-1.5 w-full rounded-lg border border-gold-700/50 bg-night-900/80 px-4 py-2.5 text-ivory placeholder:italic placeholder:text-plum-400 focus:border-gold-400 focus:outline-none" aria-required="true" />
            </label>
            {error && <p className="mt-2 text-sm italic text-rose-400" role="alert">{error}</p>}

            <button
              type="submit"
              disabled={step === "processing"}
              className="group relative mt-6 flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gold-500 py-3.5 font-display text-[13px] font-bold uppercase tracking-[0.2em] text-night-950 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
            >
              {step === "processing" ? (
                <>
                  <svg viewBox="0 0 24 24" className="h-5 w-5 animate-spin" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M12 3a9 9 0 1 1-9 9" strokeLinecap="round" /></svg>
                  Preparando el pago…
                </>
              ) : (
                <>
                  Pagar {plan.price.toFixed(2).replace(".", ",")} € con SumUp
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M4 12h15m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </>
              )}
            </button>
            <p className="mt-3.5 text-center text-sm italic text-plum-300">
              <svg viewBox="0 0 24 24" className="mr-1.5 inline h-4 w-4 -translate-y-px text-gold-500" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
              Pago seguro procesado por SumUp. Recibirás la confirmación por correo.
            </p>
          </form>
        )}

        {step === "done" && (
          <div className="p-8 text-center">
            <div className="deal-in mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold-400 bg-gold-500/10">
              <svg viewBox="0 0 24 24" className="h-10 w-10 text-gold-300" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M4.5 12.5l5 5 10-11" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3 className="mt-5 font-display text-3xl font-bold text-ivory">¡Gracias{name ? `, ${name.split(" ")[0]}` : ""}!</h3>
            <p className="mt-3 text-lg italic leading-relaxed text-parch">
              Tu <strong className="not-italic text-gold-300">{plan.name}</strong> está reservada. Termina el pago en la pestaña de SumUp que acabamos de abrir
              y recibirás en <span className="text-gold-300">{email}</span> la confirmación con los detalles de tu sesión.
            </p>
            <div className="mt-6 rounded-lg border border-gold-700/40 bg-night-900/60 p-4 text-left text-[15px] italic text-plum-300">
              <p><span className="text-gold-400">1.</span> Completa el pago en SumUp (tarjeta, Apple Pay o Google Pay).</p>
              <p className="mt-1.5"><span className="text-gold-400">2.</span> Te escribiremos para acordar día y hora.</p>
              <p className="mt-1.5"><span className="text-gold-400">3.</span> Prepara tu pregunta: el mazo ya te está esperando.</p>
            </div>
            <a
              href={sumupUrl(plan)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-full rounded-full bg-gold-500 py-3 text-center font-display text-[12px] font-bold uppercase tracking-[0.22em] text-night-950 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Abrir pago en SumUp ↗
            </a>
            <p className="mt-2 text-center text-xs italic text-plum-400">
              ¿No se abrió la pestaña? Pulsa el botón dorado.
            </p>
            <button onClick={onClose} className="mt-4 w-full rounded-full border border-gold-500/60 py-3 font-display text-[12px] font-semibold uppercase tracking-[0.22em] text-gold-300 transition-colors hover:bg-gold-500 hover:text-night-950">
              Volver al oráculo
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
