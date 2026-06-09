'use client';

import { PageNav } from '@/lib/PageNav';
import { PageFooter } from '@/lib/PageFooter';
import { useTheme } from '@/lib/useTheme';

export default function NotFound() {
  const { isLight, light, mounted, toggle } = useTheme();

  return (
    <div
      className={`min-h-screen cs-grid-bg${light ? ' is-light' : ''}`}
      style={{
        backgroundColor: light ? '#f5f5f7' : '#0c0d10',
        color: light ? '#1a1b1e' : '#e4e5eb',
      }}
    >
      <PageNav isLight={isLight} mounted={mounted} toggle={toggle} />
      <main id="main" tabIndex={-1}>
        <section
          className="relative flex min-h-[70vh] items-center overflow-hidden px-8 py-[100px]"
          aria-labelledby="nf-title"
          style={{ background: light ? '#f5f5f7' : '#0c0d10' }}
        >
          {/* Background SVG thread */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1440 700"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="nfGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="var(--color-kd-lila)" />
                <stop offset="1" stopColor="var(--color-kd-turquesa)" />
              </linearGradient>
            </defs>
            <path
              d="M-50 380 C 240 100, 480 540, 760 280 S 1180 480, 1500 320"
              stroke="url(#nfGrad)"
              strokeWidth="80"
              fill="none"
              opacity=".3"
              strokeLinecap="round"
            />
            <path
              d="M-50 220 C 280 460, 520 100, 800 320 S 1240 200, 1500 460"
              stroke="url(#nfGrad)"
              strokeWidth="14"
              fill="none"
              opacity=".7"
              strokeLinecap="round"
              strokeDasharray="2 8"
            />
          </svg>

          {/* Inner content */}
          <div className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
            {/* Illustration */}
            <p
              className="m-0 font-display font-black leading-none tracking-[-0.05em]"
              style={{
                fontSize: 'clamp(80px, 16vw, 200px)',
                background: 'linear-gradient(135deg, var(--color-kd-pistacho), var(--color-kd-turquesa) 50%, var(--color-kd-lila))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
              aria-hidden="true"
            >
              404
            </p>

            <h1
              id="nf-title"
              className={`m-0 font-display font-black leading-none tracking-[-0.025em] ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
              style={{ fontSize: 'clamp(34px, 5vw, 56px)' }}
            >
              404 Not found
            </h1>

            <h2
              className="m-0 font-display font-extrabold text-[22px] text-kd-pistacho"
            >
              ¡Uy! ¡Tenemos un hilo suelto!
            </h2>

            <p className={`m-0 max-w-[50ch] text-[17px] leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
              Estamos tejiendo el resto de nuestra web con mucho cariño, así que pronto tendremos esta página lista.
            </p>
            <p className={`m-0 max-w-[50ch] text-[17px] leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
              Si tienes alguna sugerencia, ¡nos encantaría escucharla! Puedes hacerlo desde el botón de contacto de arriba.
            </p>
          </div>
        </section>
      </main>
      <PageFooter isLight={light} />
    </div>
  );
}
