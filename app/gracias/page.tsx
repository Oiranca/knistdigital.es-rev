'use client';

import Link from 'next/link';
import { PageNav } from '@/lib/PageNav';
import { PageFooter } from '@/lib/PageFooter';
import { useTheme } from '@/lib/useTheme';

export default function GraciasPage() {
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
              <linearGradient id="thanksGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#d2e968" />
                <stop offset="1" stopColor="#01c095" />
              </linearGradient>
            </defs>
            <path
              d="M-50 480 C 280 200, 540 540, 800 360 S 1200 200, 1500 320"
              stroke="url(#thanksGrad)"
              strokeWidth="80"
              fill="none"
              opacity=".25"
              strokeLinecap="round"
            />
            <path
              d="M-50 280 C 280 480, 540 140, 800 320 S 1200 480, 1500 200"
              stroke="url(#thanksGrad)"
              strokeWidth="14"
              fill="none"
              opacity=".55"
              strokeLinecap="round"
            />
          </svg>

          {/* Inner content */}
          <div className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
            {/* Illustration */}
            <p
              className="m-0 font-display font-black leading-none tracking-[-0.05em]"
              style={{
                fontSize: 'clamp(80px, 16vw, 200px)',
                background: 'linear-gradient(135deg, #d2e968, #01c095 50%, #a99df1)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
              aria-hidden="true"
            >
              ✓
            </p>

            <h1
              id="nf-title"
              className={`m-0 font-display font-black leading-none tracking-[-0.025em] ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
              style={{ fontSize: 'clamp(34px, 5vw, 56px)' }}
            >
              ¡Enviado!
            </h1>

            <h2
              className="m-0 font-display font-extrabold text-[22px] text-kd-pistacho"
            >
              Muchas gracias por contactar
            </h2>

            <p className={`m-0 max-w-[50ch] text-[17px] leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
              Nos aseguraremos de responderte lo antes posible.
            </p>

            <div className="mt-2 inline-flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-[0.625rem] bg-kd-pistacho px-6 py-3 font-mono font-semibold text-[15px] text-kd-black no-underline transition-transform hover:-translate-y-0.5 hover:bg-[#e5fc7a]"
              >
                Volver al inicio <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PageFooter isLight={light} />
    </div>
  );
}
