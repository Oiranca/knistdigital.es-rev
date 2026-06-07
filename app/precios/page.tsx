'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { routes, freelancerPlan, landings, extras, maintenance } from '@/lib/data';
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

const PRICE_LINES = [
  { parts: [{ cls: 'text-syn-keyword', text: 'export' }, { cls: '', text: ' ' }, { cls: 'text-syn-keyword', text: 'const' }, { cls: 'text-kd-turquesa', text: ' pricing' }, { cls: '', text: ' = {' }] },
  { parts: [{ cls: '', text: '  ' }, { cls: 'text-kd-lila', text: '"freelancer"' }, { cls: '', text: ': ' }, { cls: 'text-kd-pistacho', text: '"79 €/mes"' }, { cls: '', text: ',' }] },
  { parts: [{ cls: '', text: '  ' }, { cls: 'text-kd-lila', text: '"landings"' }, { cls: '', text: ': [' }, { cls: 'text-kd-pistacho', text: '"600 €"' }, { cls: '', text: ', ' }, { cls: 'text-kd-pistacho', text: '"800 €"' }, { cls: '', text: '],' }] },
  { parts: [{ cls: '', text: '  ' }, { cls: 'text-kd-lila', text: '"mantenimiento"' }, { cls: '', text: ': [' }, { cls: 'text-kd-pistacho', text: '"50"' }, { cls: '', text: ', ' }, { cls: 'text-kd-pistacho', text: '"150"' }, { cls: '', text: ', ' }, { cls: 'text-kd-pistacho', text: '"220"' }, { cls: '', text: '],' }] },
  { parts: [{ cls: '', text: '};' }] },
];

function PreciosHero({ light }: { light: boolean }) {
  const shown = useTypingLines(PRICE_LINES.length);

  return (
    <header className="relative px-8 py-16">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <span className={`font-mono text-xs ${light ? 'text-syn-comment' : 'text-kd-pistacho'}`}>
            {'/* precios */'}
          </span>
          <h1
            className={`m-0 font-display font-black leading-[1.02] tracking-[-0.04em] ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            Tecnología que <em className="gradient-text not-italic">suma</em>
          </h1>
          <p className={`m-0 max-w-[52ch] text-lg leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
            Desarrollo web, landings de conversión, mantenimiento y accesibilidad. Soluciones técnicas que impulsan tu negocio.
          </p>
        </div>

        <div
          className={`overflow-hidden rounded-lg border font-mono text-sm ${
            light ? 'border-black/10 bg-white shadow-lg' : 'border-cs-line bg-cs-bg-card'
          }`}
          role="img"
          aria-label="Lista de precios"
        >
          <div className={`flex items-center gap-2 border-b px-4 py-3 ${light ? 'border-black/8 bg-[#f0f0f2]' : 'border-cs-line bg-cs-bg-2'}`}>
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className={`ml-3 rounded px-3 py-0.5 text-xs ${light ? 'bg-white text-[#6e6f75]' : 'bg-cs-bg text-cs-fg-soft'}`}>
              pricing.json
            </span>
          </div>
          <pre
            className={`m-0 overflow-x-auto p-4 leading-7 ${light ? 'bg-white text-[#1a1b1e]' : 'bg-cs-bg-card text-cs-fg'}`}
            aria-hidden="true"
          >
            {PRICE_LINES.slice(0, shown).map((line, i) => (
              <code key={i} className="flex gap-4">
                <span className={`w-6 select-none text-right ${light ? 'text-[#6e6f75]/60' : 'text-cs-fg-soft'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="whitespace-pre">
                  {line.parts.map((p, j) => (
                    <span key={j} className={p.cls}>{p.text}</span>
                  ))}
                </span>
              </code>
            ))}
            {shown < PRICE_LINES.length && (
              <span className="inline-block animate-cs-blink text-kd-pistacho" aria-hidden="true">▍</span>
            )}
          </pre>
        </div>
      </div>
    </header>
  );
}

function FreelancerSection({ light }: { light: boolean }) {
  return (
    <section className="px-8 py-16" aria-labelledby="pr-free-title">
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-8 flex flex-col gap-2">
          <span className={`font-mono text-xs ${light ? 'text-syn-comment' : 'text-kd-pistacho'}`}>
            {'/* cuota mensual */'}
          </span>
          <h2
            id="pr-free-title"
            className={`m-0 font-display font-black leading-none tracking-tight ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
            style={{ fontSize: 'clamp(24px, 3.5vw, 44px)' }}
          >
            Tu web profesional desde 79 €/mes
          </h2>
          <p className={`m-0 max-w-[56ch] ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
            Diseño, desarrollo y mantenimiento en una cuota mensual pensada para personas emprendedoras y pequeñas empresas.
          </p>
        </header>

        <article className={`rounded-xl border p-8 ${light ? 'border-kd-lila/30 bg-white' : 'border-kd-lila/20 bg-cs-bg-card'}`}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline gap-3">
                <span className={`font-mono text-xs font-bold rounded px-2 py-0.5 ${light ? 'bg-kd-lila/20 text-kd-lila-deep' : 'bg-kd-lila/10 text-kd-lila'}`}>
                  {freelancerPlan.badge}
                </span>
                <h3 className={`m-0 font-display font-black text-xl ${light ? 'text-kd-lila-deep' : 'text-kd-lila'}`}>
                  {freelancerPlan.name}
                </h3>
              </div>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                {freelancerPlan.desc}
              </p>
              <div className={`font-display font-black text-3xl ${light ? 'text-kd-lila-deep' : 'text-kd-lila'}`}>
                {freelancerPlan.price}
              </div>
              <Link
                href={routes.contacto}
                className="self-start inline-flex items-center gap-2 rounded-[0.625rem] bg-kd-pistacho px-6 py-3 font-mono font-semibold text-[15px] text-kd-black no-underline transition-transform hover:-translate-y-0.5 hover:bg-[#e5fc7a]"
              >
                Solicitar presupuesto <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {freelancerPlan.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className={`mt-0.5 font-bold text-lg leading-none ${light ? 'text-kd-lila-deep' : 'text-kd-lila'}`} aria-hidden="true">✓</span>
                  <span className={`text-sm leading-relaxed ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`mt-6 rounded-lg border border-dashed p-5 ${light ? 'border-black/10 bg-[#f5f5f7]' : 'border-cs-line bg-cs-bg'}`}>
            <h4 className={`m-0 mb-2 font-display font-black text-base ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>¿Cómo funciona?</h4>
            <p className={`m-0 mb-2 text-sm leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
              Olvídate de pagar miles de euros de golpe. Con nuestro modelo mensual puedes lanzar tu web con todo lo que necesitas desde el primer día. Desarrollamos tu web desde cero y distribuimos el coste en cuotas mensuales.
            </p>
            <p className={`m-0 text-sm leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
              Incluye: diseño y desarrollo web, mantenimiento técnico, soporte y acompañamiento, y evolución continua de tu web.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

function LandingsSection({ light }: { light: boolean }) {
  const accentColors = {
    turquesa: { border: light ? 'border-kd-turquesa/30' : 'border-kd-turquesa/20', text: light ? 'text-kd-turquesa-deep' : 'text-kd-turquesa', bg: light ? 'bg-kd-turquesa/10' : 'bg-kd-turquesa/5' },
    lila: { border: light ? 'border-kd-lila/30' : 'border-kd-lila/20', text: light ? 'text-kd-lila-deep' : 'text-kd-lila', bg: light ? 'bg-kd-lila/10' : 'bg-kd-lila/5' },
  };

  return (
    <section className={`px-8 py-16 ${light ? 'bg-[#ebebed]' : 'bg-cs-bg-2'}`} aria-labelledby="pr-land-title">
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-8 flex flex-col gap-2">
          <span className={`font-mono text-xs ${light ? 'text-syn-comment' : 'text-kd-pistacho'}`}>
            {'/* landings */'}
          </span>
          <h2
            id="pr-land-title"
            className={`m-0 font-display font-black leading-none tracking-tight ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
            style={{ fontSize: 'clamp(24px, 3.5vw, 44px)' }}
          >
            Elige tu opción de landing
          </h2>
          <p className={`m-0 max-w-[56ch] ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
            Compara características, precios y plazos. Ambas opciones optimizadas para conversión.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {landings.map((p) => {
            const ac = accentColors[p.accent];
            return (
              <article
                key={p.name}
                className={`flex flex-col overflow-hidden rounded-xl border ${light ? 'bg-white' : 'bg-cs-bg-card'} ${ac.border}`}
              >
                <div className={`flex items-center gap-2 border-b px-4 py-3 ${light ? 'border-black/8 bg-[#f0f0f2]' : 'border-cs-line bg-cs-bg-2'}`}>
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  <span className={`ml-2 font-mono text-xs ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                    {p.name.toLowerCase()}.json
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className={`m-0 font-display font-black text-xl ${ac.text}`}>{p.name}</h3>
                    <span className={`font-mono text-xs ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>{p.plazo}</span>
                  </div>
                  <div className={`font-display font-black text-3xl ${ac.text}`}>{p.price}</div>
                  <p className={`m-0 text-sm italic ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>{p.idealFor}</p>
                  <ul className="m-0 flex flex-1 list-none flex-col gap-2 p-0">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className={`mt-0.5 text-sm font-bold ${ac.text}`} aria-hidden="true">✓</span>
                        <span className={`text-sm ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={routes.contacto}
                    className={`mt-2 self-start font-mono text-sm font-bold no-underline transition-colors hover:underline ${ac.text}`}
                  >
                    Solicitar presupuesto →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Extras */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {extras.map((e) => (
            <div
              key={e.title}
              className={`flex items-center justify-between rounded-lg border p-4 ${light ? 'border-black/10 bg-white' : 'border-cs-line bg-cs-bg-card'}`}
            >
              <span className={`text-sm font-bold ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>{e.title}</span>
              <span className={`font-mono text-sm font-bold ${light ? 'text-kd-turquesa-deep' : 'text-kd-turquesa'}`}>{e.price}</span>
            </div>
          ))}
        </div>
        <p className={`mt-4 text-center text-xs italic ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
          *Precios sin IVA. Validez 15 días. 50% al confirmar, 50% a entregar.
        </p>
      </div>
    </section>
  );
}

function MaintenanceSection({ light }: { light: boolean }) {
  const accentColors = {
    turquesa: light ? 'text-kd-turquesa-deep' : 'text-kd-turquesa',
    lila: light ? 'text-kd-lila-deep' : 'text-kd-lila',
    pistacho: light ? 'text-kd-pistacho-deep' : 'text-kd-pistacho',
  };
  const borderColors = {
    turquesa: light ? 'border-kd-turquesa/30' : 'border-kd-turquesa/20',
    lila: light ? 'border-kd-lila/30' : 'border-kd-lila/20',
    pistacho: light ? 'border-kd-pistacho/30' : 'border-kd-pistacho/20',
  };

  return (
    <section className="px-8 py-16" aria-labelledby="pr-maint-title">
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-8 flex flex-col gap-2">
          <span className={`font-mono text-xs ${light ? 'text-syn-comment' : 'text-kd-pistacho'}`}>
            {'/* mantenimiento */'}
          </span>
          <h2
            id="pr-maint-title"
            className={`m-0 font-display font-black leading-none tracking-tight ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
            style={{ fontSize: 'clamp(24px, 3.5vw, 44px)' }}
          >
            Planes de mantenimiento
          </h2>
          <p className={`m-0 max-w-[56ch] ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
            Mantén tu web segura, actualizada y funcionando al máximo rendimiento.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {maintenance.map((p) => {
            const ac = accentColors[p.accent];
            const bc = borderColors[p.accent];
            return (
              <article
                key={p.name}
                className={`flex flex-col rounded-xl border p-6 ${light ? 'bg-white' : 'bg-cs-bg-card'} ${bc}`}
              >
                <h3 className={`m-0 font-display font-black text-2xl ${ac}`}>{p.name}</h3>
                <div className={`mt-1 mb-2 font-display font-black text-3xl ${ac}`}>{p.price}</div>
                <p className={`m-0 mb-4 text-xs leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>{p.ideal}</p>
                <div className="flex flex-col gap-3">
                  {p.features.map(([label, value]) => (
                    <div
                      key={label}
                      className={`border-l-2 pl-3 ${p.accent === 'turquesa' ? 'border-kd-turquesa' : p.accent === 'lila' ? 'border-kd-lila' : 'border-kd-pistacho'}`}
                    >
                      <div className={`text-[10px] uppercase tracking-widest ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>{label}</div>
                      <div className={`text-sm font-medium ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>{value}</div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
        <p className={`mt-6 text-center text-xs italic ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
          Precios sin IVA. Horas no acumulables.
        </p>
      </div>
    </section>
  );
}

function PreciosCTA({ light }: { light: boolean }) {
  return (
    <section
      className={`px-8 py-20 ${light ? 'bg-[#ebebed]' : 'bg-cs-bg-2'}`}
      aria-labelledby="pr-cta-title"
    >
      <div className="mx-auto max-w-[900px] text-center">
        <span className={`font-mono text-xs ${light ? 'text-syn-comment' : 'text-kd-pistacho'}`}>
          {'/* presupuesto a medida */'}
        </span>
        <h2
          id="pr-cta-title"
          className={`mb-4 mt-4 font-display font-black leading-tight tracking-tight ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
          style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
        >
          ¿No encuentras lo que buscas?
        </h2>
        <p className={`mx-auto mb-8 max-w-[48ch] ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
          Cada proyecto es único. Pide presupuesto personalizado y adaptado a tus necesidades.
        </p>
        <Link
          href={routes.contacto}
          className="inline-flex items-center gap-2 rounded-[0.625rem] bg-kd-pistacho px-8 py-4 font-mono font-semibold text-lg text-kd-black no-underline transition-transform hover:-translate-y-0.5 hover:bg-[#e5fc7a]"
        >
          Solicitar presupuesto{' '}
          <span className="animate-cs-blink" aria-hidden="true">_</span>
        </Link>
      </div>
    </section>
  );
}

export default function PreciosPage() {
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
        <PreciosHero light={light} />
        <FreelancerSection light={light} />
        <LandingsSection light={light} />
        <MaintenanceSection light={light} />
        <PreciosCTA light={light} />
      </main>
      <PageFooter isLight={light} />
    </div>
  );
}
