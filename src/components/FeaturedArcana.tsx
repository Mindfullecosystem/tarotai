import Reveal, { GoldRule } from "./Reveal";

const FEATURED = [
  {
    num: "0", name: "El Loco", img: "https://image.qwenlm.ai/generated-images/f88203dd-b155-4d44-a520-038eaf921543/_result.png",
    lore: "Abre el mazo y lo cierra. El Loco camina al borde del abismo no por descuido, sino porque sabe que caer también es una forma de volar.",
    word: "Fe",
  },
  {
    num: "I", name: "El Mago", img: "https://image.qwenlm.ai/generated-images/639cd8d8-4a3b-4e89-b9fe-e287610c704e/_result.png",
    lore: "«Como es arriba, es abajo.» Con una mano toma la chispa del cielo y con la otra la siembra en la tierra. Todo lo que necesitas ya está sobre su mesa.",
    word: "Voluntad",
  },
  {
    num: "II", name: "La Sacerdotisa", img: "https://image.qwenlm.ai/generated-images/f18a04f7-1741-4a43-8b29-0882141bcac6/_result.png",
    lore: "Entre las columnas de la dualidad, ella guarda el pergamino que no se lee con los ojos. Su silencio responde más preguntas que cualquier oráculo.",
    word: "Intuición",
  },
  {
    num: "XVII", name: "La Estrella", img: "https://image.qwenlm.ai/generated-images/788f49f7-6126-49a5-8ee6-ccc6d0f205d6/_result.png",
    lore: "Cuando la Torre ha caído y el polvo se asienta, ella vierte sus aguas sobre el mundo. Es la promesa silenciosa de que la luz siempre vuelve.",
    word: "Esperanza",
  },
];

export default function FeaturedArcana() {
  return (
    <section id="arcanos" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(111,95,146,0.16),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-400">Paso II · Las figuras</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-ivory md:text-6xl">Cuatro arcanos, cuatro fuerzas</h2>
          </div>
          <p className="max-w-sm text-lg italic leading-relaxed text-plum-300">
            Láminas del mazo ilustradas a mano en oro y medianoche. Cada una, un capítulo del viaje del alma.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((f, i) => (
            <Reveal key={f.num} delay={i * 130} as="figure" className={i % 2 === 1 ? "lg:translate-y-12" : ""}>
              <div className="group relative">
                <div className="relative overflow-hidden rounded-t-[999px] rounded-b-lg border border-gold-700/50 p-2 pb-0">
                  <div className="relative overflow-hidden rounded-t-[990px] rounded-b bg-night-800">
                    {/* fondo diseñado si la ilustración no carga */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(420px 300px at 50% 32%, rgba(217,179,108,0.22), transparent 62%), linear-gradient(170deg, #241a3a 0%, #171027 55%, #100a1c 100%)",
                      }}
                      aria-hidden="true"
                    />
                    <svg viewBox="0 0 24 24" className="absolute left-1/2 top-1/3 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gold-500/30" aria-hidden="true">
                      <path d="M12 1l2.8 8.2L23 12l-8.2 2.8L12 23l-2.8-8.2L1 12l8.2-2.8z" fill="currentColor" />
                    </svg>
                    <img
                      src={f.img}
                      alt={`Ilustración de ${f.name}`}
                      loading="lazy"
                      className="slow-zoom relative aspect-[2/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-2 rounded-t-[990px] rounded-b bg-gradient-to-t from-night-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.3em] text-gold-200 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    {f.word}
                  </span>
                </div>
                <figcaption className="relative z-10 -mt-1 rounded-b-lg border border-t-0 border-gold-700/50 bg-night-800/90 px-5 py-5 text-center backdrop-blur-sm">
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-500">Arcano {f.num}</p>
                  <p className="mt-1 font-display text-xl font-bold text-ivory">{f.name}</p>
                  <p className="mt-2 text-[15px] italic leading-relaxed text-parch">{f.lore}</p>
                </figcaption>
                <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold-400 drop-shadow-[0_0_8px_rgba(217,179,108,0.6)]" aria-hidden="true">
                    <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z" fill="currentColor" />
                  </svg>
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <GoldRule />
        </Reveal>
      </div>
    </section>
  );
}
