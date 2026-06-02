'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { routes } from '@/lib/data';

export default function PreciosPage() {
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

  const plans = [
    {
      name: 'Auditoría',
      price: 'Desde €500',
      desc: 'Revisión completa de accesibilidad y UX de tu proyecto actual.',
      features: ['Análisis WCAG 2.2', 'Reporte detallado', 'Recomendaciones'],
    },
    {
      name: 'Proyecto web',
      price: 'Desde €3000',
      desc: 'Sitio web accesible, optimizado y mantenible.',
      features: ['Diseño custom', 'Desarrollo web', 'Testing', 'Deployment'],
    },
    {
      name: 'App móvil',
      price: 'Presupuesto personalizado',
      desc: 'Aplicación accesible, escalable y centrada en personas.',
      features: ['Prototipo', 'Desarrollo', 'Testing', 'Mantenimiento'],
    },
  ];

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

      <main id="main" tabIndex={-1}>
        <section className="cs-services" aria-labelledby="precios-title">
          <header className="cs-section-head">
            <span className="cs-tag">/* precios */</span>
            <h1 id="precios-title">Planes y precios</h1>
            <p>Cada proyecto es único. Nuestros precios son flexibles y adaptados a tu necesidad.</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '4rem', maxWidth: '1200px', margin: '4rem auto' }}>
            {plans.map((plan) => (
              <article key={plan.name} className="cs-panel cs-panel-lila" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{plan.name}</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--cs-fg)' }}>{plan.price}</div>
                <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>{plan.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                  {plan.features.map((feature) => (
                    <li key={feature} style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <section style={{ marginTop: '6rem', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '2rem' }}>¿Necesitas un presupuesto?</h2>
            <Link href={routes.contacto} className="cs-btn cs-btn-primary cs-btn-xl">
              Solicitar propuesta <span className="cs-cursor">_</span>
            </Link>
          </section>
        </section>
      </main>

      <footer className="v3-footer" role="contentinfo">
        <div>KnitsDigital © {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
