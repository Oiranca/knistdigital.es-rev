'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { services, routes } from '@/lib/data';

export default function ServiciosPage() {
  return (
    <div className="v3-root var-cs">
      <header className="v3-nav" role="banner">
        <a href="#main" className="v3-skip">Saltar al contenido</a>
        <div className="v3-nav-inner">
          <Link href="/" className="v3-nav-logo" aria-label="KnitsDigital — Inicio">
            <img src="/assets/isotype.png" alt="" width={32} height={32} />
            <span>knitsdigital</span>
          </Link>
          <nav aria-label="Navegación principal" className="v3-nav-menu">
            <Link href={routes.equipo} className="v3-nav-link">
              <span className="v3-nav-spark" aria-hidden="true">✧</span>
              Equipo
            </Link>
            <Link href={routes.precios} className="v3-nav-link">
              <span className="v3-nav-spark" aria-hidden="true">✧</span>
              Precios
            </Link>
          </nav>
          <div className="v3-nav-actions">
            <Link href={routes.contacto} className="v3-cta">
              Contactar <span className="v3-cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="cs-services" aria-labelledby="servicios-title">
          <header className="cs-section-head">
            <span className="cs-tag">/* servicios */</span>
            <h1 id="servicios-title">Servicios completos</h1>
            <p>Importamos lo que necesitas; exportamos producto digital que funciona.</p>
          </header>

          <div style={{ display: 'grid', gap: '3rem', marginTop: '4rem' }}>
            {services.map((service) => (
              <article key={service.num} className={`cs-panel cs-panel-${service.color}`} style={{ maxWidth: '100%', padding: '2rem' }}>
                <header className="cs-panel-head">
                  <span className="cs-comment">{`// ${service.tag}.module`}</span>
                  <h2>{service.title}</h2>
                </header>
                <p className="cs-panel-desc" style={{ marginTop: '1rem' }}>{service.desc}</p>
                <pre className="cs-snippet" style={{ marginTop: '1.5rem' }} aria-hidden="true">
                  <code>
                    <span className="cs-num">01</span>
                    <span>{`export const ${service.tag} = () => {`}</span>
                    {'\n'}
                    <span className="cs-num">02</span>
                    <span>{`  return { accesible: true, impacto: 'real' };`}</span>
                    {'\n'}
                    <span className="cs-num">03</span>
                    <span>{`};`}</span>
                  </code>
                </pre>
              </article>
            ))}
          </div>

          <section style={{ marginTop: '6rem', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '2rem' }}>¿Cuál es tu proyecto?</h2>
            <Link href={routes.contacto} className="cs-btn cs-btn-primary cs-btn-xl">
              Escribir propuesta <span className="cs-cursor">_</span>
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
