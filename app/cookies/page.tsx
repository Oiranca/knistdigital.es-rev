'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { routes } from '@/lib/data';

export default function CookiesPage() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("knits-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeLight = saved ? saved === "light" : !prefersDark;
    setIsLight(shouldBeLight);
    setMounted(true);
  }, []);

  const toggle = () => {
    const newVal = !isLight;
    setIsLight(newVal);
    localStorage.setItem("knits-theme", newVal ? "light" : "dark");
  };

  const rootClass = `v3-root var-cs${mounted && isLight ? " is-light" : ""}`;

  return (
    <div className={rootClass}>
      <header className="v3-nav" role="banner">
        <a href="#main" className="v3-skip">Saltar al contenido</a>
        <div className="v3-nav-inner">
          <Link href="/" className="v3-nav-logo" aria-label="KnitsDigital — Inicio">
            <img src="/assets/isotype.png" alt="" width={32} height={32} />
            <span>knitsdigital</span>
          </Link>
          <nav aria-label="Navegación principal" className="v3-nav-menu">
            <Link href={routes.servicios} className="v3-nav-link">
              <span className="v3-nav-spark" aria-hidden="true">✧</span>
              Servicios
            </Link>
          </nav>
          <div className="v3-nav-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              type="button"
              onClick={toggle}
              className="v3-nav-link"
              aria-label={isLight ? 'Modo oscuro' : 'Modo claro'}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center', color: 'inherit' }}
            >
              {mounted ? (isLight ? '☀️' : '🌙') : '🌙'}
            </button>
            <Link href={routes.contacto} className="v3-cta">
              Contactar <span className="v3-cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1} style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
        <article>
          <h1>Política de Cookies</h1>
          <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section style={{ marginBottom: '2rem' }}>
            <h2>¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo para mejorar tu experiencia de navegación.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2>Cookies que utilizamos</h2>
            <p>KnitsDigital utiliza:</p>
            <ul style={{ marginLeft: '1.5rem' }}>
              <li><strong>Cookies técnicas:</strong> Necesarias para el funcionamiento del sitio</li>
              <li><strong>Cookies de preferencia:</strong> Recuerdan tus preferencias (tema claro/oscuro)</li>
              <li><strong>Cookies analíticas:</strong> Ayudan a entender cómo se usa nuestro sitio</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2>Gestión de cookies</h2>
            <p>Puedes controlar o eliminar cookies a través de la configuración de tu navegador. Algunos servicios pueden no funcionar correctamente si deshabilitas las cookies técnicas.</p>
          </section>

          <section>
            <h2>Más información</h2>
            <p>Para preguntas sobre nuestro uso de cookies, contacta: <a href="mailto:hola@knitsdigital.es">hola@knitsdigital.es</a></p>
          </section>
        </article>
      </main>

      <footer className="v3-footer" role="contentinfo">
        <div>KnitsDigital © {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
