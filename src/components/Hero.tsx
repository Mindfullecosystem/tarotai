import CardBack from "./CardBack";

const TABLE_IMG = "https://image.qwenlm.ai/generated-images/6f5d0a77-9eac-48b9-8573-ee5f89586e66/_result.png";

const FAN = Array.from({ length: 9 }, (_, i) => i - 4); // -4..4

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen flex-col overflow-hidden">
      {/* fondo: la mesa ritual (con fondo diseñado por si la imagen no carga) */}
      <div className="absolute inset-0 bg-night-900">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1100px 620px at 78% 30%, rgba(217,179,108,0.16), transparent 60%), radial-gradient(900px 700px at 15% 85%, rgba(111,95,146,0.30), transparent 62%), radial-gradient(600px 420px at 85% 88%, rgba(201,138,150,0.12), transparent 60%), linear-gradient(160deg, #171027 0%, #100a1c 55%, #0b0713 100%)",
          }}
        />
        <svg viewBox="0 0 24 24" className="absolute right-[6%] top-[16%] h-40 w-40 text-gold-500/14 md:h-64 md:w-64" aria-hidden="true">
          <path d="M12 1l2.8 8.2L23 12l-8.2 2.8L12 23l-2.8-8.2L1 12l8.2-2.8z" fill="currentColor" />
        </svg>
        <img
          src={TABLE_IMG}
          alt=""
          className="slow-zoom h-full w-full object-cover"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/78 to-night-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-transparent to-night-950/70" />
      </div>

      {/* chispas doradas */}
      {[
        [8, 24], [16, 60], [30, 18], [42, 40], [55, 14], [64, 55], [75, 26], [86, 48], [92, 20], [22, 78],
      ].map(([x, y], i) => (
        <svg key={i} viewBox="0 0 24 24" className="twinkle pointer-events-none absolute h-2.5 w-2.5 text-gold-300" style={{ left: `${x}%`, top: `${y}%`, "--tw-dur": `${2.4 + (i % 4)}s`, "--tw-delay": `${i * 0.5}s` } as React.CSSProperties} aria-hidden="true">
          <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="currentColor" />
        </svg>
      ))}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pt-28 md:px-8 lg:justify-center">
        <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          {/* bloque editorial */}
          <div className="pb-4 lg:pb-0">
            <p className="mask-line mb-5 flex items-center gap-3">
              <span style={{ "--ml-delay": "150ms" } as React.CSSProperties}>
                <span className="inline-flex items-center gap-3 font-display text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-400">
                  <span className="h-px w-10 bg-gold-500" /> El oráculo interactivo
                </span>
              </span>
            </p>

            <h1 className="font-display font-black leading-[0.95] text-ivory">
              <span className="mask-line text-[clamp(3.2rem,9vw,7.5rem)] tracking-[0.04em]">
                <span style={{ "--ml-delay": "300ms" } as React.CSSProperties}>ARCANA</span>
              </span>
              <span className="mask-line mt-2 text-[clamp(1.4rem,3.2vw,2.6rem)] font-medium tracking-[0.12em] text-gold-300">
                <span style={{ "--ml-delay": "480ms" } as React.CSSProperties}>el lenguaje de las estrellas</span>
              </span>
            </h1>

            <p className="mt-6 max-w-md text-xl italic leading-relaxed text-parch md:text-2xl">
              Setenta y ocho cartas, un espejo del alma. Baraja, pregunta y deja que el mazo responda — o reserva una lectura guiada.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#tirada" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold-500 px-7 py-3.5 font-display text-[12px] font-bold uppercase tracking-[0.22em] text-night-950 transition-transform duration-300 hover:scale-[1.03] active:scale-95">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Comenzar la tirada
                <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M12 3l2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4z" /></svg>
              </a>
              <a href="#mazo" className="inline-flex items-center gap-2 rounded-full border border-gold-600/50 px-6 py-3.5 font-display text-[12px] font-semibold uppercase tracking-[0.22em] text-gold-300 transition-colors hover:border-gold-400 hover:text-gold-200">
                Explorar las 78
              </a>
            </div>

            <p className="mt-7 font-display text-[11px] uppercase tracking-[0.3em] text-plum-300">
              22 arcanos mayores <span className="mx-2 text-gold-500">✳</span> 56 arcanos menores <span className="mx-2 text-gold-500">✳</span> 4 elementos
            </p>

            {/* mini-abanico en móvil */}
            <div className="mt-10 flex justify-center lg:hidden">
              {[-12, -6, 0, 6, 12].map((rot, i) => (
                <div
                  key={i}
                  className="deal-in -mx-6 w-20 first:ml-0 last:mr-0"
                  style={{ zIndex: 10 + i, "--di-delay": `${450 + i * 80}ms`, "--di-rot": `${rot}deg` } as React.CSSProperties}
                >
                  <div className="rotate-[var(--rot)]" style={{ "--rot": `${rot}deg` } as React.CSSProperties}>
                    <CardBack className="w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.5)]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* abanico de dorsos */}
          <div className="relative hidden h-[380px] select-none items-end justify-center pb-4 lg:flex">
            {FAN.map((offset, i) => {
              const rot = offset * 9;
              const drop = Math.abs(offset) * Math.abs(offset) * 7;
              return (
                <div
                  key={i}
                  className="deal-in absolute bottom-6 w-[150px]"
                  style={{ zIndex: 10 + i, "--di-delay": `${500 + i * 90}ms`, "--di-rot": `${rot}deg` } as React.CSSProperties}
                >
                  <div
                    className="group cursor-pointer rotate-[var(--rot)] translate-y-[var(--drop)] transition-all duration-500 ease-out hover:z-30 hover:rotate-0 hover:-translate-y-10"
                    style={{ "--rot": `${rot}deg`, "--drop": `${drop}px`, transformOrigin: "50% 130%" } as React.CSSProperties}
                    title="Una carta espera"
                  >
                    <CardBack className="w-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)] transition-all duration-500 group-hover:drop-shadow-[0_24px_40px_rgba(217,179,108,0.28)]" />
                  </div>
                </div>
              );
            })}
            <p className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[10px] uppercase tracking-[0.35em] text-plum-300">
              el mazo te siente — pasa el cursor
            </p>
          </div>
        </div>
      </div>

      {/* indicación de descenso */}
      <a href="#dia" className="group absolute bottom-6 left-6 z-10 hidden items-center gap-3 md:flex" aria-label="Bajar a la carta del día">
        <span className="relative block h-14 w-px overflow-hidden bg-gold-700/50">
          <span className="absolute left-0 top-0 h-4 w-px bg-gold-300" style={{ animation: "cueDrop 2.2s ease-in-out infinite" }} />
        </span>
        <span className="font-display text-[10px] uppercase tracking-[0.3em] text-plum-300 transition-colors group-hover:text-gold-300" style={{ writingMode: "vertical-rl" }}>
          desciende
        </span>
        <style>{`@keyframes cueDrop { 0% { transform: translateY(-16px); opacity: 0 } 30% { opacity: 1 } 100% { transform: translateY(56px); opacity: 0 } }`}</style>
      </a>
    </section>
  );
}
