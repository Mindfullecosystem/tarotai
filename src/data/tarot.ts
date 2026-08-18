/* ============================================================
   El mazo completo — 78 cartas
   22 Arcanos Mayores (autor) + 56 Arcanos Menores (compositor)
   ============================================================ */

export type Suit = "major" | "copas" | "espadas" | "bastos" | "oros";

export type GlyphId =
  | "spiral" | "infinity" | "moon" | "flower" | "crown" | "key" | "heart"
  | "wheel" | "flame" | "lantern" | "scale" | "ankh" | "scythe" | "chalice"
  | "chain" | "tower" | "star" | "sun" | "eye" | "world"
  | "sword" | "wand" | "pentacle";

export interface TarotCardData {
  id: string;
  name: string;
  numeral: string;
  suit: Suit;
  arcana: "major" | "minor";
  element?: string;
  upright: string[];
  reversed: string[];
  description: string;
  glyph: GlyphId;
}

/* ---------------- Arcanos Mayores ---------------- */

const MAJOR: Array<Omit<TarotCardData, "id" | "suit" | "arcana" | "numeral"> & { n: string }> = [
  { n: "0", name: "El Loco", glyph: "spiral", upright: ["Comienzos", "Espontaneidad", "Fe en el camino"], reversed: ["Imprudencia", "Riesgo ciego", "Ingenuidad"], description: "El viajero que salta al vacío con el corazón abierto. La confianza pura en lo desconocido y la libertad de no llevar más equipaje que el alma." },
  { n: "I", name: "El Mago", glyph: "infinity", upright: ["Voluntad", "Manifestación", "Poder personal"], reversed: ["Manipulación", "Talento sin usar", "Engaño"], description: "Sobre su mesa descansan los cuatro elementos: copa, espada, basto y oro. Lo que imaginas con claridad, puedes crearlo con las manos." },
  { n: "II", name: "La Sacerdotisa", glyph: "moon", upright: ["Intuición", "Misterio", "Sabiduría interior"], reversed: ["Secretos", "Ruido mental", "Desconexión"], description: "Guardiana del velo entre lo visible y lo invisible. No habla: susurra. Su saber no se estudia, se recuerda." },
  { n: "III", name: "La Emperatriz", glyph: "flower", upright: ["Abundancia", "Creatividad", "Nutrición"], reversed: ["Bloqueo creativo", "Sobreprotección", "Vacío"], description: "La tierra fértil en persona. Todo lo que toca florece: proyectos, vínculos, ideas. Crear es su forma de amar." },
  { n: "IV", name: "El Emperador", glyph: "crown", upright: ["Estructura", "Autoridad", "Estabilidad"], reversed: ["Rigidez", "Control excesivo", "Tiranía"], description: "El arquitecto del orden. Construye muros no para encerrar, sino para que dentro crezca un reino seguro." },
  { n: "V", name: "El Hierofante", glyph: "key", upright: ["Tradición", "Enseñanza", "Guía espiritual"], reversed: ["Dogma", "Rebeldía", "Conformismo"], description: "El puente entre la sabiduría antigua y quien está listo para recibirla. Entrega las llaves, pero la puerta la abres tú." },
  { n: "VI", name: "Los Enamorados", glyph: "heart", upright: ["Unión", "Elección del corazón", "Armonía"], reversed: ["Desequilibrio", "Duda", "Ruptura"], description: "Dos caminos, un solo corazón. Más que amor, habla de la elección que te define cuando eliges desde lo verdadero." },
  { n: "VII", name: "El Carro", glyph: "wheel", upright: ["Determinación", "Victoria", "Impulso"], reversed: ["Falta de rumbo", "Obstáculos", "Freno"], description: "Dos fuerzas opuestas tirando en perfecta armonía. El triunfo no llega por la fuerza, sino por la dirección." },
  { n: "VIII", name: "La Fuerza", glyph: "flame", upright: ["Coraje sereno", "Paciencia", "Compasión"], reversed: ["Inseguridad", "Miedo", "Dureza"], description: "No doma al león con cadenas, sino con la mirada. La fuerza verdadera es la ternura que no se rinde." },
  { n: "IX", name: "El Ermitaño", glyph: "lantern", upright: ["Introspección", "Búsqueda interior", "Soledad fértil"], reversed: ["Aislamiento", "Parálisis", "Rechazo"], description: "Sube a la montaña con una lámpara que ilumina tres pasos. No huye del mundo: baja a él con la respuesta." },
  { n: "X", name: "La Rueda de la Fortuna", glyph: "wheel", upright: ["Ciclos", "Destino", "Cambio de suerte"], reversed: ["Resistencia", "Racha adversa", "Repetición"], description: "Gira sin pedir permiso. Lo que sube, baja; lo que baja, sube. La única sabiduría es no aferrarse al radio." },
  { n: "XI", name: "La Justicia", glyph: "scale", upright: ["Equilibrio", "Verdad", "Causa y efecto"], reversed: ["Injusticia", "Evasión", "Juicio duro"], description: "La espada corta lo falso y la balanza pesa lo verdadero. Cada acto siembra exactamente lo que cosecha." },
  { n: "XII", name: "El Colgado", glyph: "ankh", upright: ["Pausa sagrada", "Nueva perspectiva", "Sacrificio"], reversed: ["Estancamiento", "Victimismo", "Espera vana"], description: "Suspendido entre el cielo y la tierra, ve el mundo al revés y por fin lo entiende. A veces rendirse es avanzar." },
  { n: "XIII", name: "La Muerte", glyph: "scythe", upright: ["Transformación", "Final necesario", "Renacimiento"], reversed: ["Resistencia al cambio", "Miedo", "Duelo estancado"], description: "No es un final: es una puerta. Siega lo que ya cumplió su ciclo para que la tierra quede libre para lo nuevo." },
  { n: "XIV", name: "La Templanza", glyph: "chalice", upright: ["Alquimia", "Moderación", "Paciencia"], reversed: ["Exceso", "Impaciencia", "Desarmonía"], description: "Vierte el agua de una copa a otra sin derramar una gota. Mezcla opuestos hasta convertirlos en oro líquido." },
  { n: "XV", name: "El Diablo", glyph: "chain", upright: ["Sombra", "Deseo", "Ataduras"], reversed: ["Liberación", "Desapego", "Verdad incómoda"], description: "Las cadenas que ata están flojas: podrías quitártelas cuando quisieras. Señala lo que te seduce y te encadena a la vez." },
  { n: "XVI", name: "La Torre", glyph: "tower", upright: ["Revelación", "Sacudida", "Caída de lo falso"], reversed: ["Desastre evitado", "Miedo al cambio", "Ruina lenta"], description: "El rayo solo derriba lo que ya no se sostenía en verdad. Duele un instante; libera para siempre." },
  { n: "XVII", name: "La Estrella", glyph: "star", upright: ["Esperanza", "Sanación", "Inspiración"], reversed: ["Desánimo", "Fe perdida", "Desconexión"], description: "Después de la tormenta, una luz serena vierte sus aguas sobre la tierra. Vuelve a creer: el cielo sigue de tu lado." },
  { n: "XVIII", name: "La Luna", glyph: "moon", upright: ["Ilusión", "Sueños", "Intuición profunda"], reversed: ["Confusión", "Engaño", "Ansiedad"], description: "Bajo su luz plateada nada es lo que parece. Camina despacio entre sombras: tu intuición es el único mapa fiable." },
  { n: "XIX", name: "El Sol", glyph: "sun", upright: ["Alegría", "Éxito", "Vitalidad"], reversed: ["Optimismo apagado", "Ego", "Verdad a medias"], description: "La carta más luminosa del mazo. Calienta, revela y celebra: lo que estaba oculto florece a plena luz." },
  { n: "XX", name: "El Juicio", glyph: "eye", upright: ["Despertar", "Llamada interior", "Renacer"], reversed: ["Culpa", "Autoexigencia", "Sordera interior"], description: "Suena la trompeta y los que dormían despiertan. No es un veredicto: es una invitación a vivir lo que viniste a vivir." },
  { n: "XXI", name: "El Mundo", glyph: "world", upright: ["Culminación", "Plenitud", "Viaje completado"], reversed: ["Cierre incompleto", "Estancamiento final", "Vértigo"], description: "La danzarina gira dentro de la corona de laurel. El ciclo se cierra perfecto, y al cerrar se abre otro mayor." },
];

/* ---------------- Arcanos Menores ---------------- */

interface SuitDef { suit: Suit; sing: string; plur: string; element: string; glyph: GlyphId; ground: string; }

const SUITS: SuitDef[] = [
  { suit: "copas", sing: "Copas", plur: "de Copas", element: "Agua", glyph: "chalice", ground: "las emociones, el amor y los vínculos" },
  { suit: "espadas", sing: "Espadas", plur: "de Espadas", element: "Aire", glyph: "sword", ground: "la mente, la palabra y la verdad" },
  { suit: "bastos", sing: "Bastos", plur: "de Bastos", element: "Fuego", glyph: "wand", ground: "la pasión, la creatividad y la acción" },
  { suit: "oros", sing: "Oros", plur: "de Oros", element: "Tierra", glyph: "pentacle", ground: "el trabajo, el cuerpo y la prosperidad" },
];

interface RankDef {
  num: string; letter: string; name: string;
  up: [string, string]; rev: [string, string];
  idea: string;
}

const RANKS: RankDef[] = [
  { num: "A", letter: "A", name: "As", up: ["Regalo puro", "Comienzo"], rev: ["Potencial bloqueado", "Oferta que se escapa"], idea: "una semilla perfecta: el inicio absoluto" },
  { num: "II", letter: "II", name: "Dos", up: ["Equilibrio", "Primer intercambio"], rev: ["Duda", "Desunión"], idea: "el primer encuentro entre dos fuerzas que se miden" },
  { num: "III", letter: "III", name: "Tres", up: ["Crecimiento", "Celebración"], rev: ["Exceso", "Tercero en discordia"], idea: "la chispa que ya es fuego y se comparte" },
  { num: "IV", letter: "IV", name: "Cuatro", up: ["Estabilidad", "Refugio"], rev: ["Estancamiento", "Apego rígido"], idea: "cuatro muros firmes donde descansar y ordenar" },
  { num: "V", letter: "V", name: "Cinco", up: ["Crisis", "Lección"], rev: ["Pérdida superada", "Reconciliación"], idea: "el conflicto que rompe para enseñar" },
  { num: "VI", letter: "VI", name: "Seis", up: ["Armonía", "Dar y recibir"], rev: ["Desequilibrio", "Deuda pendiente"], idea: "la balanza que vuelve a su centro" },
  { num: "VII", letter: "VII", name: "Siete", up: ["Desafío", "Trabajo interior"], rev: ["Autoengaño", "Rendirse pronto"], idea: "la prueba que separa a quien desea de quien se compromete" },
  { num: "VIII", letter: "VIII", name: "Ocho", up: ["Maestría", "Movimiento"], rev: ["Bloqueo", "Repetición vacía"], idea: "el oficio dominado que avanza con ritmo propio" },
  { num: "IX", letter: "IX", name: "Nueve", up: ["Culminación", "Abundancia cercana"], rev: ["Casi y no", "Soledad en la cima"], idea: "la cima a un solo paso, con todo lo aprendido a la espalda" },
  { num: "X", letter: "X", name: "Diez", up: ["Plenitud", "Ciclo completo"], rev: ["Exceso de carga", "Final pesado"], idea: "el ciclo lleno hasta el borde, listo para soltarse" },
  { num: "S", letter: "S", name: "Sota", up: ["Mensaje", "Aprendiz"], rev: ["Noticias confusas", "Inmadurez"], idea: "la noticia que llega y el aprendiz que escucha" },
  { num: "C", letter: "C", name: "Caballo", up: ["Movimiento", "Búsqueda"], rev: ["Prisa", "Dirección errante"], idea: "el jinete que parte con el viento a favor" },
  { num: "Q", letter: "Q", name: "Reina", up: ["Receptividad", "Dominio interior"], rev: ["Absorción emocional", "Coraza"], idea: "el trono sereno de quien gobierna desde dentro" },
  { num: "K", letter: "K", name: "Rey", up: ["Liderazgo", "Dominio exterior"], rev: ["Autoritarismo", "Peso del trono"], idea: "la corona madura de quien ya sabe mandar y servir" },
];

function buildMinor(): TarotCardData[] {
  const out: TarotCardData[] = [];
  for (const s of SUITS) {
    for (const r of RANKS) {
      out.push({
        id: `${s.suit}-${r.num}`,
        name: `${r.name} ${s.plur}`,
        numeral: r.letter,
        suit: s.suit,
        arcana: "minor",
        element: s.element,
        upright: [...r.up],
        reversed: [...r.rev],
        description: `En el terreno de ${s.ground}, el ${r.name} anuncia ${r.idea}.`,
        glyph: s.glyph,
      });
    }
  }
  return out;
}

export const DECK: TarotCardData[] = [
  ...MAJOR.map((m) => ({
    id: `major-${m.n}`,
    name: m.name,
    numeral: m.n,
    suit: "major" as Suit,
    arcana: "major" as const,
    upright: m.upright,
    reversed: m.reversed,
    description: m.description,
    glyph: m.glyph,
  })),
  ...buildMinor(),
];

export const SUIT_LABEL: Record<Suit, string> = {
  major: "Arcanos Mayores",
  copas: "Copas · Agua",
  espadas: "Espadas · Aire",
  bastos: "Bastos · Fuego",
  oros: "Oros · Tierra",
};

/* ---------------- Utilidades del oráculo ---------------- */

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Carta del día: determinista por fecha */
export function cardOfTheDay(date = new Date()): TarotCardData {
  const key = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  return DECK[key % DECK.length];
}

export interface DrawnCard {
  card: TarotCardData;
  reversed: boolean;
}

export function drawThree(): DrawnCard[] {
  const picked = shuffle(DECK).slice(0, 3);
  return picked.map((card) => ({ card, reversed: Math.random() < 0.32 }));
}

export const POSITIONS = ["Pasado", "Presente", "Futuro"] as const;

const OPENERS = [
  (n: string) => `En tu pasado, ${n} recuerda una raíz que aún te alimenta`,
  (n: string) => `Tu pasado habla a través de ${n}`,
  (n: string) => `Detrás de ti, ${n} marca lo que ya fue integrado`,
];
const MIDDLES = [
  (n: string) => `en el presente, ${n} te pide habitar este instante con plena conciencia`,
  (n: string) => `hoy, ${n} ilumina el centro exacto de tu pregunta`,
  (n: string) => `ahora mismo, ${n} sostiene el eje de lo que vives`,
];
const CLOSERS = [
  (n: string) => `y hacia el futuro, ${n} abre una puerta que solo se cruza caminando`,
  (n: string) => `mientras tanto, ${n} dibuja el horizonte hacia el que te inclinas`,
  (n: string) => `y delante, ${n} espera con la paciencia de lo inevitable`,
];

export function weaveReading(drawn: DrawnCard[]): string {
  const names = drawn.map((d) => d.card.name);
  const a = OPENERS[drawn[0].card.id.length % OPENERS.length](names[0]);
  const b = MIDDLES[drawn[1].card.id.length % MIDDLES.length](names[1]);
  const c = CLOSERS[drawn[2].card.id.length % CLOSERS.length](names[2]);
  const tone = drawn.some((d) => d.reversed)
    ? "Una carta invertida no es un mal augurio: es una energía que pide ser mirada desde otro ángulo."
    : "Las tres miran al derecho: el camino está despejado para quien se atreva a recorrerlo.";
  return `${a}; ${b}; ${c}. ${tone}`;
}
