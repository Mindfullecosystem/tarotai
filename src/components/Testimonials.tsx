import Reveal from "./Reveal";

interface Voice {
  q: string;
  name: string;
  plan: string;
  when: string;
  stars: number;
  cls: string;   // posición en la rejilla
  rot: string;   // inclinación de postal
}

const VOICES: Voice[] = [
  {
    q: "Llegué con un nudo en el estómago por el trabajo y salí con un mapa. La Cruz Celta me mostró exactamente dónde estaba frenándome. Volveré cada luna llena.",
    name: "Marta G.", plan: "Lectura Completa", when: "hace 2 semanas", stars: 5,
    cls: "md:col-span-4", rot: "md:-rotate-2",
  },
  {
    q: "Pagué con Apple Pay desde el móvil en un minuto. La sesión fue por videollamada y me mandaron la grabación esa misma noche. Todo impecable.",
    name: "Andrés P.", plan: "Mazo + Lectura", when: "hace 1 mes", stars: 5,
    cls: "md:col-span-4 md:translate-y-8", rot: "md:rotate-1",
  },
  {
    q: "Pregunté por una decisión concreta y las tres cartas fueron tan precisas que me dieron escalofríos. La guía escrita que envían es oro puro.",
    name: "Lucía R.", plan: "Lectura Exprés", when: "hace 3 semanas", stars: 5,
    cls: "md:col-span-4", rot: "md:rotate-2",
  },
  {
    q: "El mazo físico es precioso: se nota el cariño en cada lámina. Y la lectura que viene con él me ayudó a cerrar una etapa que arrastraba hace años.",
    name: "Carmen V.", plan: "Mazo + Lectura", when: "hace 2 meses", stars: 5,
    cls: "md:col-span-5 md:col-start-2", rot: "md:-rotate-1",
  },
  {
    q: "Era escéptico total. No me convenció ninguna carta suelta: me convenció cómo encajaban las tres juntas. Reservé la Completa al día siguiente.",
    name: "Jorge M.", plan: "Lectura Exprés", when: "hace 1 semana", stars: 4,
    cls: "md:col-span-5", rot: "md:rotate-[1.5deg]",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-1" aria-label={`${n} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={`h-4 w-4 ${i < n ? "text-gold-400" : "text-gold-700/40"}`} aria-hidden="true">
          <path d="M12 2l2.8 6.6L22 10l-5.4 4.7L18.4 22 12 18.1 5.6 22l1.8-7.3L2 10l7.2-1.4z" fill="currentColor" />
        </svg>
      ))}
    </span>
  );
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32" aria-label="Voces de quienes consultaron">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(111,95,146,0.14),transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-400">Paso V · Las voces</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-ivory md:text-6xl">Lo que cuentan al volver</h2>
          </div>
          <p className="max-w-sm text-lg italic leading-relaxed text-plum-300">
            Postales de quienes barajaron antes que tú. Sin guion y sin filtro — solo lo que las cartas dijeron y lo que pasó después.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-7 md:grid-cols-12 md:gap-6">
          {VOICES.map((v, i) => (
            <Reveal key={v.name} delay={i * 120} as="figure" className={v.cls}>
              <blockquote
                className={`group relative h-full rounded-lg border border-gold-700/40 bg-night-800/85 p-6 pt-8 shadow-[0_16px_34px_rgba(0,0,0,0.4)] transition-all duration-500 hover:z-10 hover:-translate-y-2 hover:rotate-0 hover:border-gold-500/60 hover:shadow-[0_26px_50px_rgba(0,0,0,0.55)] ${v.rot}`}
              >
                {/* sello de postal */}
                <span className="absolute -top-3 right-5 flex h-9 w-9 rotate-6 items-center justify-center border border-dashed border-gold-500/70 bg-night-900 text-gold-400 transition-transform duration-500 group-hover:rotate-0" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-4 w-4"><path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z" fill="currentColor" /></svg>
                </span>
                <span aria-hidden="true" className="pointer-events-none absolute -top-1 left-4 font-display text-6xl leading-none text-gold-500/30">“</span>

                <Stars n={v.stars} />
                <p className="mt-3 text-lg italic leading-relaxed text-parch">{v.q}</p>
                <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-gold-700/30 pt-4">
                  <span>
                    <span className="block font-display text-sm font-bold uppercase tracking-[0.18em] text-ivory">{v.name}</span>
                    <span className="block text-sm italic text-plum-300">{v.plan} · {v.when}</span>
                  </span>
                  <span className="font-display text-[10px] uppercase tracking-[0.25em] text-gold-500">Arcana ✓</span>
                </figcaption>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
