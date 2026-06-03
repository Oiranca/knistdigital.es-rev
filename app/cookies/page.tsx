'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { routes } from '@/lib/data';
import { Icon } from '@/lib/icons';
import { resolveInitialTheme, saveTheme } from '@/lib/theme';

export default function CookiesPage() {
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
            <Link
              href={routes.servicios}
              className={`inline-flex items-center gap-1.5 rounded-full border border-transparent px-4 py-2 font-mono text-[13px] font-bold no-underline transition-colors hover:border-kd-pistacho hover:text-kd-pistacho ${
                light ? 'text-[#1a1b1e]' : 'text-cs-fg'
              }`}
            >
              <span className="text-[10px] text-kd-pistacho opacity-70" aria-hidden="true">✧</span>
              Servicios
            </Link>
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

      <main id="main" tabIndex={-1} className="mx-auto max-w-[1000px] px-8 py-16">
        <article className={`flex flex-col gap-6 ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>
          <h1 className="m-0 font-display font-black text-4xl tracking-tight">
            Política de Cookies
          </h1>
          <p className={`m-0 text-sm ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
            Última actualización:{' '}
            {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="flex flex-col gap-2">
            <h2 className="m-0 font-display font-bold text-xl">¿Qué son las cookies?</h2>
            <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo para mejorar tu experiencia de navegación.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="m-0 font-display font-bold text-xl">Cookies que utilizamos</h2>
            <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
              KnitsDigital utiliza:
            </p>
            <ul className={`m-0 flex list-disc flex-col gap-1 pl-6 ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
              <li>
                <strong className={light ? 'text-[#1a1b1e]' : 'text-cs-fg'}>Cookies técnicas:</strong>{' '}
                Necesarias para el funcionamiento del sitio
              </li>
              <li>
                <strong className={light ? 'text-[#1a1b1e]' : 'text-cs-fg'}>Cookies de preferencia:</strong>{' '}
                Recuerdan tus preferencias (tema claro/oscuro)
              </li>
              <li>
                <strong className={light ? 'text-[#1a1b1e]' : 'text-cs-fg'}>Cookies analíticas:</strong>{' '}
                Ayudan a entender cómo se usa nuestro sitio
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="m-0 font-display font-bold text-xl">Gestión de cookies</h2>
            <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
              Puedes controlar o eliminar cookies a través de la configuración de tu navegador. Algunos servicios pueden no funcionar correctamente si deshabilitas las cookies técnicas.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="m-0 font-display font-bold text-xl">Más información</h2>
            <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
              Para preguntas sobre nuestro uso de cookies, contacta:{' '}
              <a
                href="mailto:hola@knitsdigital.es"
                className={`underline underline-offset-2 ${light ? 'text-kd-lila-deep' : 'text-kd-pistacho'}`}
              >
                hola@knitsdigital.es
              </a>
            </p>
          </section>
        </article>
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
