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

export const routes = {
  home: '/',
  servicios: '/servicios',
  equipo: '/equipo',
  precios: '/precios',
  contacto: '/contacto',
  privacidad: '/privacidad',
  cookies: '/cookies',
};

export const nav = [
  { label: 'Servicios', to: routes.servicios },
  { label: 'Equipo', to: routes.equipo },
  { label: 'Precios', to: routes.precios },
];

export const hero = {
  title: 'Knitsdigital',
  tagline: 'Donde la tecnología, la creatividad y las personas se entrelazan',
};

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

export const footerLegal = [
  { label: 'Uso de cookies', to: routes.cookies },
  { label: 'Política de privacidad', to: routes.privacidad },
];
