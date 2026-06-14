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
        backgroundColor: light ? '#f4f1ea' : '#0c0d10',
        color: light ? '#1a1b1e' : '#e4e5eb',
      }}
    >
      <PageNav isLight={isLight} mounted={mounted} toggle={toggle} />
      <main id="main" tabIndex={-1}>
        <div
          className="mx-auto flex max-w-[760px] flex-col items-center gap-5 px-8 py-[60px] text-center"
          aria-labelledby="ty-title"
        >
          {/* Status code glyph */}
          <p
            className="m-0 font-display font-black leading-none"
            style={{
              fontSize: 'clamp(80px, 14vw, 160px)',
              letterSpacing: '-0.04em',
              background: light
                ? 'linear-gradient(135deg, var(--color-kd-lila-deep), var(--color-kd-turquesa-deep) 50%, var(--color-kd-olive))'
                : 'linear-gradient(135deg, var(--color-kd-pistacho), var(--color-kd-turquesa) 50%, var(--color-kd-lila))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
            aria-hidden="true"
          >
            200
          </p>

          <h1
            id="ty-title"
            className={`m-0 font-display font-black leading-none tracking-[-0.025em] ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            ¡Enviado!
          </h1>

          {/* Terminal panel */}
          <div
            className="w-full rounded-[14px] border p-8 text-left font-mono text-sm"
            style={{
              background: light ? '#fff' : 'var(--color-cs-bg-card)',
              borderColor: light ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.14)',
              boxShadow: light ? '0 8px 24px rgba(0,0,0,.08)' : '0 16px 40px rgba(0,0,0,.3)',
            }}
            aria-hidden="true"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className={light ? 'text-[#555]' : 'text-cs-fg-soft'}>$</span>
                <span className={light ? 'text-[#1a1b1e]' : 'text-cs-fg'}>POST /contact</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-kd-pistacho">✓</span>
                <span className="text-kd-pistacho">200 OK — Message sent</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={light ? 'text-[#555]' : 'text-cs-fg-soft'}>→</span>
                <span className={light ? 'text-[#555]' : 'text-cs-fg-soft'}>Response: Te responderemos en menos de 48h</span>
              </div>
            </div>
          </div>

          <p className={`m-0 max-w-[50ch] text-[15px] leading-relaxed ${light ? 'text-[#555]' : 'text-cs-fg-soft'}`}>
            Muchas gracias por contactar. Nos aseguraremos de responderte lo antes posible.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-[10px] bg-kd-pistacho px-[22px] py-[14px] font-mono text-[13px] font-semibold text-kd-black no-underline transition-all duration-[250ms] hover:-translate-y-0.5 hover:bg-[#e5fc7a]"
            >
              Volver al inicio <span aria-hidden="true">_</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-[10px] px-[22px] py-[14px] font-mono text-[13px] font-semibold no-underline transition-all duration-[250ms] hover:-translate-y-0.5"
              style={{
                background: light ? '#fff' : 'var(--color-cs-bg-card)',
                border: '1px solid',
                borderColor: light ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.14)',
                color: light ? '#1a1b1e' : 'var(--color-cs-fg)',
              }}
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </main>
      <PageFooter isLight={light} />
    </div>
  );
}
