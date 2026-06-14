'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { routes, serviceCats } from '@/lib/data';
import { PageNav } from '@/lib/PageNav';
import { PageFooter } from '@/lib/PageFooter';
import { useTheme } from '@/lib/useTheme';

function useReveal() {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}

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
          <span className={`font-mono text-xs text-syn-comment`}>
            {'/* servicios */'}
          </span>
          <h1
            className={`m-0 font-display font-black leading-[1.02] tracking-[-0.04em] ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
            style={{ fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 0.96 }}
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
              href={routes.contact}
              className="inline-flex items-center gap-2 rounded-[0.625rem] bg-kd-pistacho px-6 py-3 font-mono font-semibold text-[15px] text-kd-black no-underline transition-transform hover:-translate-y-0.5 hover:bg-[#e5fc7a]"
            >
              Cuéntanos tu proyecto{' '}
              <span className="animate-cs-blink" aria-hidden="true">_</span>
            </Link>
          </div>
        </div>

        {/* Editor — always dark so bright accent tokens remain legible */}
        <div
          className="overflow-hidden rounded-lg border border-cs-line bg-cs-bg-card font-mono text-sm"
          role="img"
          aria-label="Tabla de servicios"
        >
          <div className="flex items-center gap-2 border-b border-cs-line bg-cs-bg-2 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-mac-red" />
            <span className="h-3 w-3 rounded-full bg-mac-yellow" />
            <span className="h-3 w-3 rounded-full bg-mac-green" />
            <span className="ml-3 rounded bg-cs-bg px-3 py-0.5 text-xs text-cs-fg-soft">
              servicios.ts
            </span>
            <span className="flex-1" />
            <span className="text-[11px] text-cs-fg-soft">5 categorías</span>
          </div>
          <pre
            className="m-0 overflow-x-auto bg-cs-bg-card p-4 leading-7 text-cs-fg"
            aria-hidden="true"
          >
            {serviceCats.slice(0, shown).map((c, i) => (
              <code key={c.num} className="flex gap-4">
                <span className="w-6 select-none text-right text-cs-fg-soft">
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

function ServiceCatCard({ cat, light }: { cat: typeof serviceCats[0]; light: boolean }) {
  const accentVars: Record<string, string> = {
    lila: 'var(--color-kd-lila)',
    turquesa: 'var(--color-kd-turquesa)',
    pistacho: 'var(--color-kd-pistacho)',
  };
  const accentClasses: Record<string, { num: string; h3: string }> = {
    lila: {
      num: light ? 'text-kd-lila-deep' : 'text-kd-lila',
      h3: light ? 'text-[#1a1a1a]' : 'text-kd-lila',
    },
    turquesa: {
      num: light ? 'text-kd-turquesa-deep' : 'text-kd-turquesa',
      h3: light ? 'text-[#1a1a1a]' : 'text-kd-turquesa',
    },
    pistacho: {
      num: light ? 'text-kd-olive' : 'text-kd-pistacho',
      h3: light ? 'text-[#1a1a1a]' : 'text-kd-pistacho',
    },
  };

  const ac = accentClasses[cat.accent];
  const accentColor = accentVars[cat.accent];
  const { ref, revealed } = useReveal();

  return (
    <article
      ref={ref}
      className={`group rounded-[14px] border p-8 transition-all duration-700 hover:-translate-y-0.5 hover:duration-[250ms] ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${light ? 'border-black/10 bg-white' : 'border-cs-line bg-cs-bg-card'}`}
      style={{
        ['--accent-color' as string]: accentColor,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = accentColor;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '';
      }}
    >
      <header className="mb-4 flex items-start gap-4">
        <span
          className={`shrink-0 rounded font-mono text-[13px] font-semibold ${ac.num}`}
          style={{ padding: '4px 10px', background: `color-mix(in srgb, ${accentColor} 15%, transparent)` }}
        >
          {cat.num}
        </span>
        <div>
          <h3 className={`m-0 font-display font-black text-[26px] tracking-tight ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>
            {cat.title}
          </h3>
          <p className={`m-0 mt-1 text-sm ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>{cat.sub}</p>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cat.cards.map((card) => (
          <div
            key={card.title}
            className={`rounded-lg border p-5 ${light ? 'border-black/8 bg-[#f4f1ea]' : 'border-cs-line bg-cs-bg'}`}
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
}

function ServiciosCats({ light }: { light: boolean }) {
  return (
    <section className="px-8 py-20" aria-labelledby="sv-cats-title">
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-12 flex flex-col gap-2">
          <span className={`font-mono text-xs text-syn-comment`}>
            {'/* qué tejemos */'}
          </span>
          <h2
            id="sv-cats-title"
            className={`m-0 font-display font-black leading-none tracking-tight ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            ¿Qué tejemos en KnitsDigital?
          </h2>
          <p className={`m-0 max-w-[56ch] ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
            Nos enfocamos en crear soluciones actuales y adaptadas a las necesidades de cada cliente.
          </p>
        </header>

        <div className="flex flex-col gap-8">
          {serviceCats.map((cat) => (
            <ServiceCatCard key={cat.num} cat={cat} light={light} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiciosCTA({ light }: { light: boolean }) {
  return (
    <section
      className={`px-8 py-20 ${light ? 'bg-[#ebe7dd]' : 'bg-cs-bg-2'}`}
      aria-labelledby="sv-cta-title"
    >
      <div className="mx-auto max-w-[900px] text-center">
        <span className={`font-mono text-xs text-syn-comment`}>
          {'/* siguiente paso */'}
        </span>
        <h2
          id="sv-cta-title"
          className={`mb-4 mt-4 font-display font-black leading-tight tracking-tight ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
          style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
        >
          Invierte en el futuro de tu negocio, con muy buen rollo
        </h2>
        <p className={`mx-auto mb-8 max-w-[52ch] ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
          El diseño y desarrollo centrado en las personas mejora la accesibilidad, expande el mercado y aumenta la satisfacción de tus clientes.
        </p>
        <Link
          href={routes.contact}
          className="inline-flex items-center gap-2 rounded-[0.625rem] bg-kd-pistacho px-8 py-4 font-mono font-semibold text-lg text-kd-black no-underline transition-transform hover:-translate-y-0.5 hover:bg-[#e5fc7a]"
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
        backgroundColor: light ? '#f4f1ea' : '#0c0d10',
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
