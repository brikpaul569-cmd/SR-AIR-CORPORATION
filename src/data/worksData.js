/**
 * WORKS_SECTIONS — Catálogo de videos para "Nuestros Trabajos".
 * Dos filas horizontales estilo Netflix. Cada video usa YouTube Shorts ID.
 *
 * Duraciones estimadas basadas en Shorts típicos (15s–60s).
 */
export const WORKS_SECTIONS = [
  {
    id: 'industrial-installs',
    title: 'Instalaciones Industriales',
    videos: [
      {
        id: 'inst-1',
        title: 'Instalación de bomba de calor comercial',
        videoId: 'sQRLA7IF-g4',
        category: 'Instalaciones / HVAC',
        duration: '0:32',
      },
      {
        id: 'inst-2',
        title: 'Sistema VRF para oficina corporativa',
        videoId: 'dg1Xjtzsfnw',
        category: 'Comercial / Climatización',
        duration: '0:45',
      },
      {
        id: 'inst-3',
        title: 'Instalación de ductos de ventilación industrial',
        videoId: 'YHWxP9y-0r0',
        category: 'Ductos / Ventilación',
        duration: '0:28',
      },
    ],
  },
  {
    id: 'maintenance-preventive',
    title: 'Mantenimiento Preventivo',
    videos: [
      {
        id: 'main-1',
        title: 'Servicio de mantenimiento VRF',
        videoId: 'FKWi8JQ7yCo',
        category: 'Mantenimiento / Sistemas VRF',
        duration: '0:38',
      },
      {
        id: 'main-2',
        title: 'Instalación split residencial',
        videoId: 'Nk2cy4-4bxY',
        category: 'Residencial / Split',
        duration: '0:41',
      },
      {
        id: 'main-3',
        title: 'Automatización de sistemas HVAC',
        videoId: '7H5Ts3hPp28',
        category: 'Proyectos / Automatización',
        duration: '0:52',
      },
    ],
  },
]
