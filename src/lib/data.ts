// ─── Brand tokens ────────────────────────────────────────────────────────────

export const tokens = {
  pistacho: '#d2e968',
  white: '#f8f8f8',
  lila: '#a99df1',
  turquesa: '#01c095',
  black: '#2b2b2b',
  red: '#962f58',
  hoverPrim: '#A6B83F',
  hoverSec: '#005643',
  lilaActiveLight: '#e4e1fb',
  lilaActiveDark: '#4c476c',
  lilaDeep: '#7569d6',
  turquesaDeep: '#018a6c',
};

// ─── Routes ──────────────────────────────────────────────────────────────────

export const routes = {
  home: '/',
  services: '/services',
  team: '/team',
  pricing: '/pricing',
  contact: '/contact',
  privacy: '/privacy',
  cookies: '/cookies',
  thankYou: '/thank-you',
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export const nav = [
  { label: 'Servicios', to: routes.services },
  { label: 'Equipo', to: routes.team },
  { label: 'Precios', to: routes.pricing },
];

export const footerLegal = [
  { label: 'Uso de cookies', to: routes.cookies },
  { label: 'Política de privacidad', to: routes.privacy },
];

// ─── Hero ────────────────────────────────────────────────────────────────────

export const hero = {
  title: 'Knitsdigital',
  tagline: 'Donde la tecnología, la creatividad y las personas se entrelazan',
};

// ─── Services (home tabbed widget — 3 items) ──────────────────────────────────

export const services = [
  {
    num: '01',
    title: 'Diseño UX/UI',
    desc: 'Creamos productos digitales accesibles, que priorizan a las personas y su experiencia, desde una perspectiva inclusiva.',
    color: 'lila',
    tag: 'design',
  },
  {
    num: '02',
    title: 'Desarrollo web',
    desc: 'Desde el SEO, implementación, Wordpress, no-code, hasta el mantenimiento y progreso del sitio, "tejemos" lo que necesites para tu web.',
    color: 'turquesa',
    tag: 'web',
  },
  {
    num: '03',
    title: 'Apps móviles',
    desc: 'Desarrollamos aplicaciones móviles accesibles centradas en todas las personas, mejorando su inclusión digital.',
    color: 'pistacho',
    tag: 'mobile',
  },
];

// ─── Service categories (full /servicios page — 5 items) ─────────────────────

export type ServiceCard = { title: string; desc: string };
export type ServiceCat = {
  num: string;
  tag: string;
  accent: 'lila' | 'turquesa' | 'pistacho';
  title: string;
  sub: string;
  cards: ServiceCard[];
};

export const serviceCats: ServiceCat[] = [
  {
    num: '01',
    tag: 'design.ts',
    accent: 'lila',
    title: 'Diseño de productos digitales',
    sub: 'De la idea a la propuesta. Un servicio personalizado',
    cards: [
      { title: 'Investigación', desc: 'Estudiamos las necesidades y comportamientos de las diferentes personas usuarias, promoviendo que el diseño sea inclusivo.' },
      { title: 'Prototipado', desc: 'Creamos prototipos interactivos inclusivos que permiten testear y obtener feedback antes de su implementación.' },
      { title: 'Accesibilidad', desc: 'Pruebas de usabilidad utilizando herramientas y metodologías que garantizan que los productos cumplan normativa como WCAG.' },
    ],
  },
  {
    num: '02',
    tag: 'web.ts',
    accent: 'turquesa',
    title: 'Desarrollo web',
    sub: 'Creamos sitios accesibles, optimizados y listos para crecer',
    cards: [
      { title: 'Desarrollo', desc: 'Desarrollamos sitios web desde cero, con Wordpress o no-code, asegurando que cada elemento sea accesible y fácil de usar.' },
      { title: 'SEO inclusivo', desc: 'Estrategias de SEO que mejoran la visibilidad y consideran la accesibilidad en la estructura del contenido.' },
      { title: 'Mantenimiento', desc: 'Garantizamos que el sitio web se mantenga accesible y actualizado con las últimas tecnologías y estándares.' },
    ],
  },
  {
    num: '03',
    tag: 'mobile.ts',
    accent: 'pistacho',
    title: 'Aplicaciones móviles',
    sub: 'Experiencias uniformes, integradas con la accesibilidad',
    cards: [
      { title: 'Multiplataforma', desc: 'Desarrollamos aplicaciones móviles tanto en iOS como Android, asegurando una experiencia uniforme y accesible.' },
      { title: 'Usabilidad', desc: 'Buscamos que cualquier persona, de forma universal, pueda usar la aplicación sin nudos o bloqueos en la navegación.' },
      { title: 'Funcionalidad', desc: 'Incorporamos y planificamos las partes que ves y no ves, además de lo que tocas en tu móvil, para que todo funcione.' },
    ],
  },
  {
    num: '04',
    tag: 'ai.ts',
    accent: 'lila',
    title: 'Inteligencia artificial',
    sub: 'IA para optimizar, anticipar y personalizar experiencias',
    cards: [
      { title: 'Automatización', desc: 'Implementamos soluciones de IA que automatizan tareas repetitivas y optimizan la gestión interna para ahorrar tiempo y costes.' },
      { title: 'Análisis', desc: 'Desarrollamos sistemas de IA que identifican y facilitan decisiones estratégicas para anticipar tendencias clave del negocio.' },
      { title: 'Personalización', desc: 'Creamos asistentes virtuales con IA que brindan atención y recomendaciones personalizadas, mejorando la experiencia.' },
    ],
  },
  {
    num: '05',
    tag: 'audit.ts',
    accent: 'turquesa',
    title: 'Auditoría de accesibilidad',
    sub: 'Detecta barreras y mejora la experiencia de todas las personas',
    cards: [
      { title: 'Diagnóstico rápido', desc: 'Analizamos una página clave de tu web para detectar las principales barreras de accesibilidad que afectan a tus clientes.' },
      { title: 'Informe accionable', desc: 'Te entregamos un informe claro con 3 aciertos, 3 problemas críticos y 3 recomendaciones priorizadas, en lenguaje no técnico.' },
      { title: 'Próximos pasos', desc: 'Revisamos el informe contigo en una breve sesión y proponemos un plan de acción para avanzar hacia una web más inclusiva.' },
    ],
  },
];

// ─── Manifesto ───────────────────────────────────────────────────────────────

export const manifesto = [
  {
    icon: 'accessibility',
    title: 'Incluyendo accesibilidad',
    desc: 'Priorizamos experiencias inclusivas para todas las personas.',
  },
  {
    icon: 'people',
    title: 'Humanizando la tecnología',
    desc: 'Aportamos valor tanto a tu negocio como a quienes lo hacen posible.',
  },
  {
    icon: 'growth',
    title: 'Integrando talento junior',
    desc: 'Creemos en dar oportunidades reales a personas con ganas de crecer.',
  },
];

// ─── Team ────────────────────────────────────────────────────────────────────

export type TeamMember = {
  name: string;
  role: string;
  img: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: 'Ale',
    role: '// design',
    img: '/assets/team/ale.webp',
    bio: 'Diseña entre lo analógico y lo digital. En la búsqueda de nuevos desafíos y mejorar la interacción de los usuarios. Trabajo en equipo como pilar fundamental. 💪',
  },
  {
    name: 'Arantxa',
    role: '// design',
    img: '/assets/team/arantxa.webp',
    bio: 'Me gusta trabajar en equipo y cuando surgen dificultades, no me preocupo. Veo cada problema como una oportunidad para mejorar. 💅🏼',
  },
  {
    name: 'Lau',
    role: '// dev',
    img: '/assets/team/lau.webp',
    bio: 'Código, inclusión y propósito: mis pilares. Disfruto creando soluciones tecnológicas con impacto, en colaboración con equipos diversos. 🚀',
  },
  {
    name: 'Oli',
    role: '// dev',
    img: '/assets/team/oli.webp',
    bio: 'Apasionada por construir experiencias digitales que funcionen para todas las personas. La accesibilidad no es un extra, es el punto de partida. 🌱',
  },
  {
    name: 'Paloma',
    role: '// design',
    img: '/assets/team/paloma.webp',
    bio: 'PaH!ciencia es mi lema; diseño centrado en el usuario, inclusivo, meditado, sencillo y natural, todo aderezado con una pizquina de actitud y flexibilidad. 🍉',
  },
  {
    name: 'Samu',
    role: '// dev',
    img: '/assets/team/samu.webp',
    bio: 'Arquitecto de soluciones accesibles y escalables. Creo en la tecnología como herramienta para reducir barreras y ampliar oportunidades. ♿',
  },
];

export const whyValues = [
  {
    title: 'Conexiones genuinas',
    desc: 'Trabajamos de forma colaborativa, hilando diversas perspectivas, para crear productos accesibles y funcionales.',
  },
  {
    title: 'Jerarquía horizontal',
    desc: 'Fomentamos un tejido transparente, en colaboración constante y con toma de decisiones compartida.',
  },
  {
    title: 'Sentirse a gusto',
    desc: 'Creemos en el respeto, la creatividad y la confianza. Todo el equipo aporta su visión sin miedo a equivocarse.',
  },
];

// ─── Collaborators ───────────────────────────────────────────────────────────

export const collaborators = [
  { url: 'https://adayra.org/', img: '/assets/collab/adayra.webp', alt: 'Logo de la ONG Adayra' },
  { url: 'https://sirviendocodigo.com/', img: '/assets/collab/sirviendocodigo.png', alt: 'Logo de Sirviendo Código' },
  { url: 'https://techwomen4boards.com/', img: '/assets/collab/t4b.png', alt: 'Logo de TechWomen4Boards' },
  { url: 'https://suerteliquidaeventos.es/', img: '/assets/collab/suerteliquida.webp', alt: 'Logo de SuerteLíquida Eventos' },
  { url: 'https://bugautomadridsur.com/', img: '/assets/collab/bugauto.webp', alt: 'Logo de Bugauto Madrid Sur' },
  { url: 'https://horsesbypaulabarco.com/', img: '/assets/collab/paulabarco.webp', alt: 'Logo de Horses by Paula Barco' },
  { url: 'https://arteshoy.com/', img: '/assets/collab/arteshoy.webp', alt: 'Logo de la revista Arteshoy' },
  { url: 'https://jpmascota.com/', img: '/assets/collab/jpmascotas.webp', alt: 'Logo de JP Mascotas' },
];

// ─── Pricing ─────────────────────────────────────────────────────────────────

export const freelancerPlan = {
  badge: 'Recomendado',
  name: 'Tu web profesional',
  price: 'Desde 79 €/mes',
  desc: 'Diseño, desarrollo y mantenimiento en una cuota mensual pensada para personas emprendedoras y pequeñas empresas.',
  features: [
    'Diseño cuidado, optimizado y centrado en las personas',
    'Web rápida, segura y siempre actualizada',
    'Accesibilidad desde el diseño y el desarrollo',
    'Web pensada para ser usable por todas las personas, sin barreras',
    'Mantenimiento técnico y evolución continua',
    'Soporte cercano con personas reales',
    'Posibilidad de escalar según crezca tu proyecto',
  ],
};

export type Landing = {
  name: string;
  price: string;
  plazo: string;
  accent: 'turquesa' | 'lila';
  idealFor: string;
  features: string[];
};

export const landings: Landing[] = [
  {
    name: 'Next-Gen',
    price: 'Desde 600 €',
    plazo: '1–2 semanas',
    accent: 'turquesa',
    idealFor: 'Proyectos que buscan máxima velocidad y accesibilidad',
    features: [
      'Desarrollo en código asistido por IA',
      'Accesibilidad WCAG AAA',
      'Alto rendimiento (carga rápida)',
      '1 revisión incluida',
      'Responsive optimizado',
      'Integraciones API/Calendly/CRM',
    ],
  },
  {
    name: 'WordPress',
    price: 'Desde 800 €',
    plazo: '2–3 semanas',
    accent: 'lila',
    idealFor: 'Proyectos que priorizan autogestión de contenidos',
    features: [
      'Panel autogestionable',
      'Accesibilidad WCAG AA',
      'Formación básica (30 min)',
      '1 revisión incluida',
      'SEO básico',
      'Escalable a web completa',
    ],
  },
];

export const extras = [
  { title: 'Copywriting conversión', price: '150 €' },
  { title: 'Diseño UI en Figma', price: '+200 €' },
  { title: 'Integraciones avanzadas', price: '100 €' },
];

export type MaintenancePlan = {
  name: string;
  price: string;
  accent: 'turquesa' | 'lila' | 'pistacho';
  ideal: string;
  features: [string, string][];
};

export const maintenance: MaintenancePlan[] = [
  {
    name: 'Basic',
    price: '50 €/mes',
    accent: 'turquesa',
    ideal: 'Control técnico básico y detección de incidencias.',
    features: [
      ['Soporte', '30 min/mes'],
      ['Cambios', 'Errores leves'],
      ['Backups', 'Mensuales'],
      ['Monitorización', 'Básica (uptime)'],
      ['WordPress', 'Actualización plugins/core'],
      ['Código', 'Revisión despliegue'],
      ['SEO', 'Indexación y metadatos'],
      ['Accesibilidad', 'Contrastes y estructura'],
    ],
  },
  {
    name: 'Pro',
    price: '150 €/mes',
    accent: 'lila',
    ideal: 'Estabilidad real y soporte continuo.',
    features: [
      ['Soporte', '2 h/mes'],
      ['Cambios', '5 menores/mes'],
      ['Backups', 'Quincenales'],
      ['Monitorización', 'Avanzada'],
      ['WordPress', 'Optimización + seguridad'],
      ['Código', 'Ajustes + optimización'],
      ['SEO', 'Revisión + ajustes'],
      ['Accesibilidad', 'AA + 1 mejora UX/UI'],
    ],
  },
  {
    name: 'Premium',
    price: '220 €/mes',
    accent: 'pistacho',
    ideal: 'Evolución continua de web estratégica.',
    features: [
      ['Soporte', '8 h/mes prioritario'],
      ['Cambios', '15 + gestión flexible'],
      ['Backups', 'Semanales'],
      ['Monitorización', 'Tiempo real'],
      ['WordPress', 'Hardening + arquitectura'],
      ['Código', 'Refactor + integraciones'],
      ['SEO', 'Optimización continua'],
      ['Accesibilidad', 'AAA periódico'],
    ],
  },
];
