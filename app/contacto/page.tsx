'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { routes } from '@/lib/data';

export default function ContactoPage() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('knits-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeLight = saved ? saved === 'light' : !prefersDark;
    setIsLight(shouldBeLight);
    setMounted(true);
  }, []);

  const toggle = () => {
    const newVal = !isLight;
    setIsLight(newVal);
    localStorage.setItem('knits-theme', newVal ? 'light' : 'dark');
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
              { href: routes.precios, label: 'Precios' },
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
              {mounted ? (isLight ? '☀️' : '🌙') : '🌙'}
            </button>
            <a
              href="mailto:hola@knitsdigital.es"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display font-extrabold text-[14px] no-underline transition-all ${
                light ? 'bg-kd-black text-kd-white hover:bg-kd-black/80' : 'bg-kd-pistacho text-kd-black hover:bg-[#e5fc7a]'
              }`}
            >
              Email <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="px-8 py-20" aria-labelledby="contacto-title">
          <div className="mx-auto max-w-[1320px] text-center">
            <span className={`font-mono text-xs uppercase tracking-widest ${light ? 'text-kd-turquesa-deep' : 'text-kd-pistacho'}`}>
              {'/* contacto */'}
            </span>
            <h1
              id="contacto-title"
              className={`mb-4 mt-4 font-display font-black leading-tight tracking-tight ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
              style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
            >
              Empecemos a tejer juntas
            </h1>
            <p className={`mb-8 max-w-[48ch] mx-auto ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
              Una conversación es el primer commit. Te respondemos en menos de 48h.
            </p>

            <div
              className={`mx-auto max-w-[500px] rounded-xl border p-8 text-left ${
                light ? 'border-black/10 bg-white' : 'border-cs-line bg-cs-bg-card'
              }`}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className={`font-mono text-sm ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    className={`w-full rounded-md border px-3 py-2.5 font-body text-base outline-none transition-colors focus:border-kd-pistacho ${
                      light
                        ? 'border-black/10 bg-[#f5f5f7] text-[#1a1b1e] placeholder:text-[#6e6f75]'
                        : 'border-cs-line bg-cs-bg text-cs-fg placeholder:text-cs-fg-soft'
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className={`font-mono text-sm ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className={`w-full rounded-md border px-3 py-2.5 font-body text-base outline-none transition-colors focus:border-kd-pistacho ${
                      light
                        ? 'border-black/10 bg-[#f5f5f7] text-[#1a1b1e] placeholder:text-[#6e6f75]'
                        : 'border-cs-line bg-cs-bg text-cs-fg placeholder:text-cs-fg-soft'
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="project"
                    className={`font-mono text-sm ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}
                  >
                    ¿Cuál es tu proyecto?
                  </label>
                  <textarea
                    id="project"
                    placeholder="Cuéntanos sobre tu idea..."
                    rows={5}
                    className={`w-full resize-y rounded-md border px-3 py-2.5 font-body text-base leading-relaxed outline-none transition-colors focus:border-kd-pistacho ${
                      light
                        ? 'border-black/10 bg-[#f5f5f7] text-[#1a1b1e] placeholder:text-[#6e6f75]'
                        : 'border-cs-line bg-cs-bg text-cs-fg placeholder:text-cs-fg-soft'
                    }`}
                  />
                </div>

                <a
                  href="mailto:hola@knitsdigital.es?subject=Propuesta%20de%20proyecto&body=Nombre:%20%0A%0AProyecto:%20"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-kd-pistacho px-6 py-3 font-display font-extrabold text-[15px] text-kd-black no-underline transition-transform hover:-translate-y-0.5 hover:bg-[#e5fc7a]"
                >
                  Enviar propuesta <span aria-hidden="true">_</span>
                </a>
              </div>
            </div>

            <p className={`mt-8 text-sm ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
              O directo por email:{' '}
              <a
                href="mailto:hola@knitsdigital.es"
                className={`underline underline-offset-2 ${light ? 'text-kd-lila-deep' : 'text-kd-pistacho'}`}
              >
                hola@knitsdigital.es
              </a>
            </p>
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
