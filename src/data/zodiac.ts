/* La rueda del zodíaco — 12 signos con su arcano regente */

export interface ZodiacSign {
  id: string;
  name: string;
  glyph: string;
  dates: string;
  element: "Fuego" | "Tierra" | "Aire" | "Agua";
  keywords: [string, string, string];
  message: string;
  card: string; // arcano mayor regente (correspondencia tradicional)
}

export const ZODIAC: ZodiacSign[] = [
  { id: "aries", name: "Aries", glyph: "♈", dates: "21 mar – 19 abr", element: "Fuego", keywords: ["Coraje", "Impulso", "Inicio"], card: "El Emperador", message: "Las cartas te piden iniciar eso que llevas postergando: tu fuego no es para esperar, es para abrir camino." },
  { id: "tauro", name: "Tauro", glyph: "♉", dates: "20 abr – 20 may", element: "Tierra", keywords: ["Raíz", "Paciencia", "Abundancia"], card: "El Hierofante", message: "Lo que cultivas en silencio está echando raíz. Las cartas dicen que no apures la cosecha: lo tuyo llega maduro." },
  { id: "geminis", name: "Géminis", glyph: "♊", dates: "21 may – 20 jun", element: "Aire", keywords: ["Palabra", "Curiosidad", "Intercambio"], card: "Los Enamorados", message: "Dos caminos no te dividen: te enseñan. Elige con el corazón y deja que la mente tome notas." },
  { id: "cancer", name: "Cáncer", glyph: "♋", dates: "21 jun – 22 jul", element: "Agua", keywords: ["Hogar", "Memoria", "Cuidado"], card: "El Carro", message: "El hogar no es un lugar, es lo que proteges. Las cartas ven una conversación pendiente que sana." },
  { id: "leo", name: "Leo", glyph: "♌", dates: "23 jul – 22 ago", element: "Fuego", keywords: ["Brillo", "Creatividad", "Corazón"], card: "La Fuerza", message: "Tu brillo no necesita permiso. Las cartas ven un escenario que estás evitando por modestia." },
  { id: "virgo", name: "Virgo", glyph: "♍", dates: "23 ago – 22 sep", element: "Tierra", keywords: ["Orden", "Servicio", "Detalle"], card: "El Ermitaño", message: "La perfección es buena sirvienta y mala ama. Las cartas te piden dejar algo imperfecto a propósito." },
  { id: "libra", name: "Libra", glyph: "♎", dates: "23 sep – 22 oct", element: "Aire", keywords: ["Equilibrio", "Belleza", "Justicia"], card: "La Justicia", message: "En tu balanza estaba pesando demasiado el plato de otro. Toca recalibrar a tu favor." },
  { id: "escorpio", name: "Escorpio", glyph: "♏", dates: "23 oct – 21 nov", element: "Agua", keywords: ["Profundidad", "Transformación", "Verdad"], card: "La Muerte", message: "Lo que transformas a solas termina transformándolo todo. Las cartas ven un renacimiento en marcha." },
  { id: "sagitario", name: "Sagitario", glyph: "♐", dates: "22 nov – 21 dic", element: "Fuego", keywords: ["Horizonte", "Fe", "Aventura"], card: "La Templanza", message: "La flecha solo vuela si sueltas la cuerda. Las cartas señalan un viaje — real o interior — que ya no espera." },
  { id: "capricornio", name: "Capricornio", glyph: "♑", dates: "22 dic – 19 ene", element: "Tierra", keywords: ["Cumbre", "Disciplina", "Tiempo"], card: "El Diablo", message: "La montaña no bajó: tú te hiciste más fuerte. Las cartas celebran un esfuerzo que nadie ve." },
  { id: "acuario", name: "Acuario", glyph: "♒", dates: "20 ene – 18 feb", element: "Aire", keywords: ["Visión", "Libertad", "Futuro"], card: "La Estrella", message: "Tu idea «demasiado rara» solo está adelantada. Las cartas dicen que el futuro juega de tu lado." },
  { id: "piscis", name: "Piscis", glyph: "♓", dates: "19 feb – 20 mar", element: "Agua", keywords: ["Sueño", "Compasión", "Mar"], card: "La Luna", message: "No te ahogas en la emoción: nadas en ella. Las cartas te piden confiar en la brújula, no en la tormenta." },
];

/* Umbral de inicio de cada signo en orden de calendario */
const THRESHOLDS: Array<[number, number, number]> = [
  [1, 20, 10], // Acuario
  [2, 19, 11], // Piscis
  [3, 21, 0],  // Aries
  [4, 20, 1],  // Tauro
  [5, 21, 2],  // Géminis
  [6, 21, 3],  // Cáncer
  [7, 23, 4],  // Leo
  [8, 23, 5],  // Virgo
  [9, 23, 6],  // Libra
  [10, 23, 7], // Escorpio
  [11, 22, 8], // Sagitario
  [12, 22, 9], // Capricornio
];

export function currentSign(date = new Date()): ZodiacSign {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  let idx = 9; // Capricornio (antes del 20 de enero)
  for (const [tm, td, i] of THRESHOLDS) {
    if (m > tm || (m === tm && d >= td)) idx = i;
  }
  return ZODIAC[idx];
}
