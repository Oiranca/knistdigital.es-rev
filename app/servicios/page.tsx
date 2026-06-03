'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { routes, serviceCats } from '@/lib/data';
import { PageNav } from '@/lib/PageNav';
import { PageFooter } from '@/lib/PageFooter';
import { useTheme } from '@/lib/useTheme';

function useTypingLines(total: number, ms = 220) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    setShown(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(i);
      if (i >= total) clearInterval(id);
    }, ms);
    return () => clearInterval(id);
  }, [total, ms]);
  return shown;
}

function ServiciosHero({ light }: { light: boolean }) {
  const shown = useTypingLines(serviceCats.length);

  return (
    <header className="relative px-8 py-16">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Text */}
        <div className="flex flex-col gap-6">
          <span className={`font-mono text-xs ${light ? 'text-syn-comment' : 'text-kd-pistacho'}`}>
            {'/* servicios */'}
          </span>
          <h1
            className={`m-0 font-display font-black leading-[1.02] tracking-[-0.04em] ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            Tejiendo el{' '}
            <em className="gradient-text not-italic">futuro</em>{' '}
            de tu empresa
          </h1>
          <p className={`m-0 max-w-[52ch] text-lg leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
            Cinco disciplinas que entrelazamos para construir producto digital accesible, escalable y con propósito.
          </p>
          <div>
            <Link
              href={routes.contacto}
              className="inline-flex items-center gap-2 rounded-full bg-kd-pistacho px-6 py-3 font-display font-extrabold text-[15px] text-kd-black no-underline transition-transform hover:-translate-y-0.5 hover:bg-[#e5fc7a]"
            >
              Cuéntanos tu proyecto{' '}
              <span className="animate-cs-blink" aria-hidden="true">_</span>
            </Link>
          </div>
        </div>

        {/* Editor */}
        <div
          className={`overflow-hidden rounded-lg border font-mono text-sm ${
            light ? 'border-black/10 bg-white shadow-lg' : 'border-cs-line bg-cs-bg-card'
          }`}
          role="img"
          aria-label="Tabla de servicios"
        >
          <div className={`flex items-center gap-2 border-b px-4 py-3 ${light ? 'border-black/8 bg-[#f0f0f2]' : 'border-cs-line bg-cs-bg-2'}`}>
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className={`ml-3 rounded px-3 py-0.5 text-xs ${light ? 'bg-white text-[#6e6f75]' : 'bg-cs-bg text-cs-fg-soft'}`}>
              servicios.ts
            </span>
            <span className="flex-1" />
            <span className={`text-[11px] ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>5 categorías</span>
          </div>
          <pre
            className={`m-0 overflow-x-auto p-4 leading-7 ${light ? 'bg-white text-[#1a1b1e]' : 'bg-cs-bg-card text-cs-fg'}`}
            aria-hidden="true"
          >
            {serviceCats.slice(0, shown).map((c, i) => (
              <code key={c.num} className="flex gap-4">
                <span className={`w-6 select-none text-right ${light ? 'text-[#6e6f75]/60' : 'text-cs-fg-soft'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="whitespace-pre">
                  <span className="text-syn-keyword">export</span>
                  {' '}
                  <span className={c.accent === 'lila' ? 'text-kd-lila' : c.accent === 'turquesa' ? 'text-kd-turquesa' : 'text-kd-pistacho'}>
                    {c.tag.replace('.ts', '')}
                  </span>
                  {' {'}
                  {' '}
                  <span className="text-syn-comment">{'// ' + c.title.toLowerCase()}</span>
                </span>
              </code>
            ))}
            {shown < serviceCats.length && (
              <span className="inline-block animate-cs-blink text-kd-pistacho" aria-hidden="true">▍</span>
            )}
          </pre>
        </div>
      </div>
    </header>
  );
}

function ServiciosCats({ light }: { light: boolean }) {
  const accentClasses: Record<string, { border: string; num: string; h3: string }> = {
    lila: {
      border: light ? 'border-kd-lila/30' : 'border-kd-lila/20',
      num: 'text-kd-lila',
      h3: 'text-kd-lila',
    },
    turquesa: {
      border: light ? 'border-kd-turquesa/30' : 'border-kd-turquesa/20',
      num: 'text-kd-turquesa',
      h3: 'text-kd-turquesa',
    },
    pistacho: {
      border: light ? 'border-kd-pistacho/30' : 'border-kd-pistacho/20',
      num: 'text-kd-pistacho',
      h3: 'text-kd-pistacho',
    },
  };

  return (
    <section className="px-8 py-20" aria-labelledby="sv-cats-title">
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-12 flex flex-col gap-2">
          <span className={`font-mono text-xs ${light ? 'text-syn-comment' : 'text-kd-pistacho'}`}>
            {'/* qué tejemos */'}
          </span>
          <h2
            id="sv-cats-title"
            className={`m-0 font-display font-black leading-none tracking-tight ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            ¿Qué tejemos en KnitsDigital?
          </h2>
          <p className={`m-0 max-w-[56ch] ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
            Nos enfocamos en crear soluciones actuales y adaptadas a las necesidades de cada cliente.
          </p>
        </header>

        <div className="flex flex-col gap-8">
          {serviceCats.map((cat) => {
            const ac = accentClasses[cat.accent];
            return (
              <article
                key={cat.num}
                className={`rounded-xl border p-8 ${light ? 'border-black/10 bg-white' : 'border-cs-line bg-cs-bg-card'} ${ac.border}`}
              >
                <header className="mb-4 flex items-baseline gap-4">
                  <span className={`font-mono text-2xl font-black ${ac.num}`}>{cat.num}</span>
                  <div>
                    <h3 className={`m-0 font-display font-black text-xl tracking-tight ${ac.h3}`}>
                      {cat.title}
                    </h3>
                    <p className={`m-0 mt-1 text-sm ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>{cat.sub}</p>
                  </div>
                </header>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {cat.cards.map((card) => (
                    <div
                      key={card.title}
                      className={`rounded-lg border p-5 ${light ? 'border-black/8 bg-[#f5f5f7]' : 'border-cs-line bg-cs-bg'}`}
                    >
                      <h4 className={`m-0 mb-2 font-display font-bold text-base ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>
                        {card.title}
                      </h4>
                      <p className={`m-0 text-sm leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiciosCTA({ light }: { light: boolean }) {
  return (
    <section
      className={`px-8 py-20 ${light ? 'bg-[#ebebed]' : 'bg-cs-bg-2'}`}
      aria-labelledby="sv-cta-title"
    >
      <div className="mx-auto max-w-[900px] text-center">
        <span className={`font-mono text-xs ${light ? 'text-syn-comment' : 'text-kd-pistacho'}`}>
          {'/* siguiente paso */'}
        </span>
        <h2
          id="sv-cta-title"
          className={`mb-4 mt-4 font-display font-black leading-tight tracking-tight ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
          style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
        >
          Invierte en el futuro de tu negocio,{' '}
          <span className="gradient-text italic">con muy buen rollo</span>
        </h2>
        <p className={`mx-auto mb-8 max-w-[52ch] ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
          El diseño y desarrollo centrado en las personas mejora la accesibilidad, expande el mercado y aumenta la satisfacción de tus clientes.
        </p>
        <Link
          href={routes.contacto}
          className="inline-flex items-center gap-2 rounded-full bg-kd-pistacho px-8 py-4 font-display font-extrabold text-lg text-kd-black no-underline transition-transform hover:-translate-y-0.5 hover:bg-[#e5fc7a]"
        >
          Cuéntanos tu proyecto{' '}
          <span className="animate-cs-blink" aria-hidden="true">_</span>
        </Link>
      </div>
    </section>
  );
}

export default function ServiciosPage() {
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
        <ServiciosHero light={light} />
        <ServiciosCats light={light} />
        <ServiciosCTA light={light} />
      </main>
      <PageFooter isLight={light} />
    </div>
  );
}
