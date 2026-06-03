'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { routes } from '@/lib/data';
import { Icon } from '@/lib/icons';
import { resolveInitialTheme, saveTheme } from '@/lib/theme';

const plans = [
  {
    name: 'Auditoría',
    price: 'Desde €500',
    desc: 'Revisión completa de accesibilidad y UX de tu proyecto actual.',
    features: ['Análisis WCAG 2.2', 'Reporte detallado', 'Recomendaciones'],
    color: 'lila',
  },
  {
    name: 'Proyecto web',
    price: 'Desde €3000',
    desc: 'Sitio web accesible, optimizado y mantenible.',
    features: ['Diseño custom', 'Desarrollo web', 'Testing', 'Deployment'],
    color: 'turquesa',
  },
  {
    name: 'App móvil',
    price: 'Presupuesto personalizado',
    desc: 'Aplicación accesible, escalable y centrada en personas.',
    features: ['Prototipo', 'Desarrollo', 'Testing', 'Mantenimiento'],
    color: 'pistacho',
  },
];

export default function PreciosPage() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsLight(resolveInitialTheme());
    setMounted(true);
  }, []);

  const toggle = () => {
    const newVal = !isLight;
    setIsLight(newVal);
    saveTheme(newVal);
  };

  const light = mounted && isLight;

  return (
    <div
      className={`min-h-screen cs-grid-bg${light ? ' is-light' : ''}`}
      style={{
        backgroundColor: light ? '#f5f5f7' : '#0c0d10',
        color: light ? '#1a1b1e' : '#e4e5eb',
      }}
    >
      <header
        className={`sticky top-0 z-50 border-b ${
          light
            ? 'border-black/10 bg-[#f5f5f7]/90 backdrop-blur-xl'
            : 'border-white/8 bg-cs-bg/90 backdrop-blur-xl'
        }`}
        role="banner"
      >
        <a href="#main" className="skip-link">Saltar al contenido</a>
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-8 px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-3 no-underline" aria-label="KnitsDigital — Inicio">
            <img src="/assets/isotype.png" alt="" width={32} height={32} />
            <span className={`font-mono text-lg font-bold tracking-tight ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>
              knitsdigital
            </span>
          </Link>
          <nav aria-label="Navegación principal" className="hidden items-center gap-1 md:flex">
            {[
              { href: routes.servicios, label: 'Servicios' },
              { href: routes.equipo, label: 'Equipo' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-1.5 rounded-full border border-transparent px-4 py-2 font-mono text-[13px] font-bold no-underline transition-colors hover:border-kd-pistacho hover:text-kd-pistacho ${
                  light ? 'text-[#1a1b1e]' : 'text-cs-fg'
                }`}
              >
                <span className="text-[10px] text-kd-pistacho opacity-70" aria-hidden="true">✧</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggle}
              aria-label={isLight ? 'Modo oscuro' : 'Modo claro'}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border bg-transparent transition-colors ${
                light ? 'border-black/15 text-[#1a1b1e] hover:bg-black/5' : 'border-white/10 text-cs-fg hover:bg-white/8'
              }`}
            >
              {mounted
                ? <Icon name={isLight ? 'sun' : 'moon'} width={18} height={18} aria-hidden="true" />
                : <Icon name="moon" width={18} height={18} aria-hidden="true" />
              }
            </button>
            <Link
              href={routes.contacto}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display font-extrabold text-[14px] no-underline transition-all ${
                light ? 'bg-kd-black text-kd-white hover:bg-kd-black/80' : 'bg-kd-pistacho text-kd-black hover:bg-[#e5fc7a]'
              }`}
            >
              Contactar <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="px-8 py-20" aria-labelledby="precios-title">
          <div className="mx-auto max-w-[1320px]">
            <header className="mb-12 flex flex-col gap-2">
              <span className={`font-mono text-xs uppercase tracking-widest ${light ? 'text-kd-turquesa-deep' : 'text-kd-pistacho'}`}>
                {'/* precios */'}
              </span>
              <h1
                id="precios-title"
                className={`m-0 font-display font-black leading-none tracking-tight ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
                style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
              >
                Planes y precios
              </h1>
              <p className={`m-0 max-w-[56ch] ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                Cada proyecto es único. Nuestros precios son flexibles y adaptados a tu necesidad.
              </p>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`flex flex-col gap-4 rounded-xl border p-8 ${
                    light ? 'border-black/10 bg-white' : 'border-cs-line bg-cs-bg-card'
                  }`}
                >
                  <h3 className={`m-0 font-display font-black text-xl ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>
                    {plan.name}
                  </h3>
                  <div
                    className={`font-display font-black text-2xl ${
                      plan.color === 'lila'
                        ? light ? 'text-kd-lila-deep' : 'text-kd-lila'
                        : plan.color === 'turquesa'
                        ? light ? 'text-kd-turquesa-deep' : 'text-kd-turquesa'
                        : light ? 'text-kd-pistacho-deep' : 'text-kd-pistacho'
                    }`}
                  >
                    {plan.price}
                  </div>
                  <p className={`m-0 flex-1 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                    {plan.desc}
                  </p>
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span
                          className={
                            plan.color === 'lila'
                              ? light ? 'text-kd-lila-deep' : 'text-kd-lila'
                              : plan.color === 'turquesa'
                              ? light ? 'text-kd-turquesa-deep' : 'text-kd-turquesa'
                              : light ? 'text-kd-pistacho-deep' : 'text-kd-pistacho'
                          }
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        <span className={light ? 'text-[#1a1b1e]' : 'text-cs-fg'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="mt-20 text-center">
              <h2 className={`mb-8 font-display font-black text-2xl ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>
                ¿Necesitas un presupuesto?
              </h2>
              <Link
                href={routes.contacto}
                className="inline-flex items-center gap-2 rounded-full bg-kd-pistacho px-8 py-4 font-display font-extrabold text-lg text-kd-black no-underline transition-transform hover:-translate-y-0.5 hover:bg-[#e5fc7a]"
              >
                Solicitar propuesta <span className="animate-[cs-blink_1s_steps(1)_infinite]" aria-hidden="true">_</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer
        className={`border-t px-8 py-6 text-center font-mono text-sm ${
          light ? 'border-black/10 text-[#6e6f75]' : 'border-cs-line text-cs-fg-soft'
        }`}
        role="contentinfo"
      >
        KnitsDigital © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
