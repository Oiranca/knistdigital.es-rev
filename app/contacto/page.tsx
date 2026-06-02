'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { routes } from '@/lib/data';

export default function ContactoPage() {
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
            <Link href={routes.equipo} className="v3-nav-link">
              <span className="v3-nav-spark" aria-hidden="true">✧</span>
              Equipo
            </Link>
            <Link href={routes.precios} className="v3-nav-link">
              <span className="v3-nav-spark" aria-hidden="true">✧</span>
              Precios
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
            <a href="mailto:hola@knitsdigital.es" className="v3-cta">
              Email <span className="v3-cta-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="cs-cta" aria-labelledby="contacto-title" style={{ marginTop: '4rem' }}>
          <div className="cs-cta-inner">
            <span className="cs-tag">/* contacto */</span>
            <h1 id="contacto-title">Empecemos a tejer juntas</h1>
            <p style={{ marginBottom: '2rem' }}>Una conversación es el primer commit. Te respondemos en menos de 48h.</p>

            <div style={{ display: 'grid', gap: '2rem', maxWidth: '500px', margin: '0 auto', padding: '2rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 'var(--cs-radius, 8px)' }}>
              <div>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.7 }}>Nombre</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', color: 'inherit', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.7 }}>Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', color: 'inherit', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label htmlFor="project" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.7 }}>¿Cuál es tu proyecto?</label>
                <textarea
                  id="project"
                  placeholder="Cuéntanos sobre tu idea..."
                  rows={5}
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', color: 'inherit', fontFamily: 'inherit', resize: 'vertical' }}
                />
              </div>

              <a
                href="mailto:hola@knitsdigital.es?subject=Propuesta%20de%20proyecto&body=Nombre:%20%0A%0AProyecto:%20"
                className="cs-btn cs-btn-primary"
                style={{ textAlign: 'center' }}
              >
                Enviar propuesta <span className="cs-cursor">_</span>
              </a>
            </div>

            <p style={{ marginTop: '2rem', textAlign: 'center', opacity: 0.7 }}>O directo por email: <a href="mailto:hola@knitsdigital.es" style={{ color: 'inherit', textDecoration: 'underline' }}>hola@knitsdigital.es</a></p>
          </div>
        </section>
      </main>

      <footer className="v3-footer" role="contentinfo">
        <div>KnitsDigital © {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
