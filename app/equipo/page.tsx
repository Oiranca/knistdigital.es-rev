'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { routes } from '@/lib/data';

export default function EquipoPage() {
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

  const team = [
    {
      name: 'Samuel Romero Arbelo',
      role: 'Founder & Full Stack Dev',
      bio: 'Especializado en accesibilidad web y arquitectura escalable.',
    },
    {
      name: 'Diseñador/a UX',
      role: 'UX/UI Designer',
      bio: 'Creando experiencias inclusivas y hermosas.',
    },
    {
      name: 'Developer/a Junior',
      role: 'Junior Developer',
      bio: 'Aprendiendo y creciendo con talento diverso.',
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
            <Link href={routes.contacto} className="v3-cta">
              Contactar <span className="v3-cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="cs-manifesto is-in" aria-labelledby="equipo-title">
          <header className="cs-section-head">
            <span className="cs-tag">/* equipo */</span>
            <h1 id="equipo-title">Nuestro equipo</h1>
            <p>Gente talentosa y diversa tejiendo juntas.</p>
          </header>

          <div style={{ display: 'grid', gap: '2rem', marginTop: '3rem', maxWidth: '1000px', margin: '3rem auto' }}>
            {team.map((member, i) => (
              <article key={member.name} className="cs-commit is-in" style={{ '--i': i } as any}>
                <div className="cs-commit-body">
                  <h3 style={{ marginBottom: '0.5rem' }}>{member.name}</h3>
                  <p style={{ opacity: 0.7, marginBottom: '0.5rem' }}>{member.role}</p>
                  <p style={{ marginBottom: '1rem' }}>{member.bio}</p>
                  <div className="cs-commit-meta">
                    <span>💡 Expertise diversa</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section style={{ marginTop: '6rem', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '2rem' }}>¿Quieres unirte?</h2>
            <Link href={routes.contacto} className="cs-btn cs-btn-primary">
              Contactar <span className="cs-cursor">_</span>
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
