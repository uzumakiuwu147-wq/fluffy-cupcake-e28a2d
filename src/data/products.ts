export type Family = 'Floral' | 'Amaderado' | 'Cítrico' | 'Oriental' | 'Acuático'

export interface Size {
  ml: number
  price: number
}

export interface Product {
  id: number
  name: string
  tagline: string
  family: Family
  image: string
  description: string
  shortDescription: string
  notes: { salida: string[]; corazon: string[]; fondo: string[] }
  intensity: 1 | 2 | 3 | 4 | 5
  momento: string
  sizes: Size[]
  badge?: string
}

export const families: Family[] = [
  'Floral',
  'Amaderado',
  'Cítrico',
  'Oriental',
  'Acuático',
]

const products: Array<Product> = [
  {
    id: 1,
    name: 'Noche de Azahar',
    tagline: 'Un patio andaluz a medianoche',
    family: 'Floral',
    image: '/img/azahar.png',
    shortDescription:
      'Flor de azahar recién abierta, jazmín y un fondo de almizcle blanco que se queda en la piel.',
    description:
      'Nació de un paseo nocturno entre naranjos en flor. La salida es luminosa y jugosa; el corazón, blanco y envolvente; el fondo, un almizcle limpio que huele a piel recién bañada. Un floral sereno para quien prefiere que la recuerden, no que la anuncien.',
    notes: {
      salida: ['Neroli', 'Mandarina', 'Pimienta rosa'],
      corazon: ['Flor de azahar', 'Jazmín sambac', 'Tuberosa'],
      fondo: ['Almizcle blanco', 'Ámbar gris', 'Sándalo'],
    },
    intensity: 3,
    momento: 'Noche · Primavera',
    sizes: [
      { ml: 50, price: 89 },
      { ml: 100, price: 129 },
    ],
    badge: 'Más vendido',
  },
  {
    id: 2,
    name: 'Cedro Lunar',
    tagline: 'Bosque frío, cielo despejado',
    family: 'Amaderado',
    image: '/img/cedro.png',
    shortDescription:
      'Cedro del Atlas, vetiver ahumado y musgo de roble. Seco, elegante y profundamente calmado.',
    description:
      'Un amaderado de líneas limpias inspirado en las noches de alta montaña. El cedro aporta estructura, el vetiver un toque ahumado y el musgo un fondo verde y terroso. Para días de lluvia, libros largos y abrigos de lana.',
    notes: {
      salida: ['Bergamota', 'Cardamomo', 'Enebro'],
      corazon: ['Cedro del Atlas', 'Iris', 'Vetiver'],
      fondo: ['Musgo de roble', 'Cuero suave', 'Pachulí'],
    },
    intensity: 4,
    momento: 'Tarde · Otoño',
    sizes: [
      { ml: 50, price: 95 },
      { ml: 100, price: 139 },
    ],
  },
  {
    id: 3,
    name: 'Limón de Sevilla',
    tagline: 'Sol de mediodía en la piel',
    family: 'Cítrico',
    image: '/img/limon.png',
    shortDescription:
      'Limón amargo, hoja de higuera y albahaca. Una explosión fresca y chispeante para el día a día.',
    description:
      'Una cítrica vibrante que huele a cáscara recién rallada y a jardín regado. La hoja de higuera le da un verdor lechoso y la albahaca un giro aromático. Fresca sin ser efímera: el fondo de vetiver la mantiene viva durante horas.',
    notes: {
      salida: ['Limón amargo', 'Pomelo', 'Lima'],
      corazon: ['Hoja de higuera', 'Albahaca', 'Petitgrain'],
      fondo: ['Vetiver', 'Cedro blanco', 'Almizcle'],
    },
    intensity: 2,
    momento: 'Día · Verano',
    sizes: [
      { ml: 50, price: 79 },
      { ml: 100, price: 115 },
    ],
    badge: 'Novedad',
  },
  {
    id: 4,
    name: 'Ámbar Antiguo',
    tagline: 'Resinas, terciopelo y luz de vela',
    family: 'Oriental',
    image: '/img/ambar.png',
    shortDescription:
      'Ámbar dorado, vainilla de Madagascar y canela. Cálido, sensual y de larga estela.',
    description:
      'Nuestro perfume más profundo. Resinas de benjuí y láudano se funden con vainilla bourbon y un hilo de canela. Una fragancia que se abre lentamente y acompaña toda la noche, dejando una estela dorada a su paso.',
    notes: {
      salida: ['Canela', 'Clavo', 'Naranja amarga'],
      corazon: ['Ámbar', 'Benjuí', 'Rosa de Damasco'],
      fondo: ['Vainilla bourbon', 'Láudano', 'Haba tonka'],
    },
    intensity: 5,
    momento: 'Noche · Invierno',
    sizes: [
      { ml: 50, price: 105 },
      { ml: 100, price: 155 },
    ],
  },
  {
    id: 5,
    name: 'Rosa Salvaje',
    tagline: 'Pétalos y espinas',
    family: 'Floral',
    image: '/img/rosa.png',
    shortDescription:
      'Rosa silvestre, frambuesa y pachulí. Una rosa moderna, con carácter y un punto rebelde.',
    description:
      'Lejos de la rosa empolvada clásica, esta es una rosa de campo: jugosa, verde y con espinas. La frambuesa le da un brillo afrutado y el pachulí una sombra terrosa que la vuelve inolvidable.',
    notes: {
      salida: ['Frambuesa', 'Grosella negra', 'Pimienta'],
      corazon: ['Rosa silvestre', 'Geranio', 'Peonía'],
      fondo: ['Pachulí', 'Almizcle', 'Madera de cachemira'],
    },
    intensity: 3,
    momento: 'Día y noche · Todo el año',
    sizes: [
      { ml: 50, price: 92 },
      { ml: 100, price: 135 },
    ],
  },
  {
    id: 6,
    name: 'Sal de Mar',
    tagline: 'La primera brisa de la mañana',
    family: 'Acuático',
    image: '/img/mar.png',
    shortDescription:
      'Sal marina, salvia y madera flotante. Limpio, mineral y luminoso como una mañana en la costa.',
    description:
      'Captura ese instante en que el mar todavía está en calma. Notas minerales de sal y piedra húmeda, la frescura aromática de la salvia y un fondo de madera flotante blanqueada por el sol. Para respirar hondo.',
    notes: {
      salida: ['Sal marina', 'Bergamota', 'Algas'],
      corazon: ['Salvia', 'Romero', 'Lirio de mar'],
      fondo: ['Madera flotante', 'Ambroxan', 'Musgo blanco'],
    },
    intensity: 2,
    momento: 'Día · Verano',
    sizes: [
      { ml: 50, price: 85 },
      { ml: 100, price: 122 },
    ],
  },
]

export default products

export function formatPrice(value: number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}
