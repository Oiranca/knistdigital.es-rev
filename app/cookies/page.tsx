'use client';

import { PageNav } from '@/lib/PageNav';
import { PageFooter } from '@/lib/PageFooter';
import { useTheme } from '@/lib/useTheme';

export default function CookiesPage() {
  const { isLight, light, mounted, toggle } = useTheme();

  const h1Cls = `m-0 font-display font-black tracking-[-0.025em]`
    + ` before:font-mono before:content-['#_'] before:mr-1`
    + (light ? ' text-[#1a1b1e] before:text-kd-pistacho-deep' : ' text-cs-fg before:text-kd-pistacho');
  const h2Cls = `m-0 mt-6 mb-3 font-display font-bold`
    + ` before:font-mono before:content-['##_'] before:mr-1`
    + (light ? ' text-[#1a1b1e] before:text-kd-pistacho-deep' : ' text-cs-fg before:text-kd-pistacho');
  const pCls = `m-0 text-[15px] leading-[1.65]`
    + (light ? ' text-[#6e6f75]' : ' text-cs-fg-soft');
  const liCls = `relative pl-5 text-[15px] leading-[1.65] list-none`
    + (light ? ' text-[#6e6f75]' : ' text-cs-fg-soft');

  return (
    <div
      className={`min-h-screen cs-grid-bg${light ? ' is-light' : ''}`}
      style={{
        backgroundColor: light ? '#f4f1ea' : '#0c0d10',
        color: light ? '#1a1b1e' : '#e4e5eb',
      }}
    >
      <PageNav isLight={isLight} mounted={mounted} toggle={toggle} />
      <main id="main" tabIndex={-1} className="px-8 py-16">
        <div className="mx-auto max-w-[760px]">
          {/* Doc header */}
          <div
            className="mb-8 rounded-t-lg border-b px-4 py-2 font-mono text-xs"
            style={{
              borderColor: light ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
              background: light ? '#ebe7dd' : 'var(--color-cs-bg-2)',
              color: light ? '#6e6f75' : 'var(--color-cs-fg-soft)',
            }}
          >
            README.md · /cookies
          </div>

          <article className="flex flex-col gap-4">
            <h1
              className="m-0 font-display font-black tracking-[-0.025em]"
              style={{ fontSize: 'clamp(32px, 5vw, 56px)', margin: '16px 0 12px', letterSpacing: '-0.025em' }}
            >
              <span className="font-mono" style={{ color: light ? '#a8ba53' : 'var(--color-kd-pistacho)', marginRight: 6 }}>#</span>
              Nuestras cookies <span aria-hidden="true">🍪✨</span>
            </h1>

            <h2 className="m-0 mt-6 mb-2 font-display font-bold text-2xl">
              <span className="font-mono text-base" style={{ color: light ? '#a8ba53' : 'var(--color-kd-pistacho)', marginRight: 6 }}>##</span>
              ¿CÓMO LAS USAMOS?
            </h2>
            <p className={pCls}>
              Las cookies son como filamentos que nos ayudan a tejer una experiencia web única para ti. Son &quot;fibras adhesivas digitales&quot; súper inteligentes con las que recordar información sobre tu visita, ¡haciendo que podamos tejer conexiones digitales!
            </p>

            <h2 className="m-0 mt-6 mb-2 font-display font-bold text-2xl">
              <span className="font-mono text-base" style={{ color: light ? '#a8ba53' : 'var(--color-kd-pistacho)', marginRight: 6 }}>##</span>
              NUESTRO SURTIDO
            </h2>
            <p className={pCls}>
              Todas o algunas de las cookies o tecnologías similares descritas a continuación pueden almacenarse en tu navegador, aplicación o dispositivo:
            </p>
            <ul className="m-0 flex flex-col gap-2 p-0" style={{ listStyle: 'none' }}>
              <li className={liCls}>
                <span className="absolute left-0 font-mono font-bold" style={{ color: light ? '#a8ba53' : 'var(--color-kd-pistacho)' }}>-</span>
                <strong>COOKIES ESENCIALES:</strong> Son la base de nuestro tejido digital. Sin ellas, nuestra web sería como un suéter sin mangas. ¡Brr!
              </li>
              <li className={liCls}>
                <span className="absolute left-0 font-mono font-bold" style={{ color: light ? '#a8ba53' : 'var(--color-kd-pistacho)' }}>-</span>
                <strong>COOKIES DE RENDIMIENTO:</strong> Nos cuentan cómo te mueves por nuestra web. Es como tener un amigo que nos dice qué partes de nuestra web te hacen sonreír más.
              </li>
              <li className={liCls}>
                <span className="absolute left-0 font-mono font-bold" style={{ color: light ? '#a8ba53' : 'var(--color-kd-pistacho)' }}>-</span>
                <strong>COOKIES DE FUNCIONALIDAD:</strong> Recuerdan tus preferencias. ¡Como un barista que sabe exactamente cómo te gusta tu café digital!
              </li>
            </ul>

            <h2 className="m-0 mt-6 mb-2 font-display font-bold text-2xl">
              <span className="font-mono text-base" style={{ color: light ? '#a8ba53' : 'var(--color-kd-pistacho)', marginRight: 6 }}>##</span>
              ¿QUIERES SABER MÁS?
            </h2>
            <p className={pCls}>
              Si tienes preguntas, estamos aquí para ti. Nuestra puerta siempre está abierta para una buena charla sobre cookies (¡o sobre cualquier cosa!). Contáctanos y conversamos.
            </p>
            <p className={pCls}>
              Recuerda, al usar nuestra web, aceptas nuestras cookies. Pero no te preocupes, puedes cambiar de opinión en cualquier momento.
            </p>
            <p className={pCls}>
              ¡Gracias por formar parte de la familia KnitsDigital! Estamos creando una web más acogedora con cada clic <span aria-hidden="true">🌟 🖥️ 🧶</span>
            </p>
          </article>
        </div>
      </main>
      <PageFooter isLight={light} />
    </div>
  );
}
