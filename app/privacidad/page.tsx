'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { routes } from '@/lib/data';

export default function PrivacidadPage() {
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
          <h1>Política de Privacidad</h1>
          <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section style={{ marginBottom: '2rem' }}>
            <h2>1. Responsable del tratamiento</h2>
            <p>KnitsDigital, especialista en producto digital accesible, es responsable del tratamiento de tus datos personales.</p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2>2. Datos que recopilamos</h2>
            <p>Recopilamos información que nos proporcionas voluntariamente a través de formularios de contacto, incluyendo:</p>
            <ul style={{ marginLeft: '1.5rem' }}>
              <li>Nombre</li>
              <li>Correo electrónico</li>
              <li>Información sobre tu proyecto</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2>3. Uso de los datos</h2>
            <p>Utilizamos tus datos únicamente para:</p>
            <ul style={{ marginLeft: '1.5rem' }}>
              <li>Responder a tu solicitud o propuesta</li>
              <li>Comunicación sobre proyectos</li>
              <li>Mejora de nuestros servicios</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2>4. Tus derechos</h2>
            <p>Tienes derecho a acceder, rectificar o eliminar tus datos. Contáctanos en hola@knitsdigital.es</p>
          </section>

          <section>
            <h2>5. Contacto</h2>
            <p>Para preguntas sobre privacidad: <a href="mailto:hola@knitsdigital.es">hola@knitsdigital.es</a></p>
          </section>
        </article>
      </main>

      <footer className="v3-footer" role="contentinfo">
        <div>KnitsDigital © {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
