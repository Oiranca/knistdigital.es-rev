'use client';

import { nav, routes, services, manifesto, collaborators } from '@/lib/data';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const CODE_LINES = [
  { i: '01', t: 'function knitsdigital() {' },
  { i: '02', t: '  // Donde la tecnología, la creatividad' },
  { i: '03', t: '  // y las personas se entrelazan.' },
  { i: '04', t: '  return {' },
  { i: '05', t: "    accesibilidad: 'WCAG 2.2'," },
  { i: '06', t: "    inclusión: true," },
  { i: '07', t: "    talento: 'diverso · horizontal'" },
  { i: '08', t: '  };' },
  { i: '09', t: '}' },
];

function Hero() {
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setLineCount(i);
      if (i >= CODE_LINES.length) clearInterval(id);
    }, 280);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="cs-hero" aria-labelledby="cs-hero-title">
      <div className="cs-hero-grid">
        <div className="cs-hero-text">
          <div className="cs-badge">
            <span className="cs-led" aria-hidden="true" />
            <span>~/knitsdigital</span>
            <span className="cs-led-soft" aria-hidden="true">●</span>
          </div>
          <h1 id="cs-hero-title" className="cs-hero-title">
            Tejemos código<br />
            <span className="cs-hl">accesible</span>.
          </h1>
          <p className="cs-hero-sub">
            Estudio digital especializado en producto accesible, inclusivo y sostenible. WCAG 2.2, no-code, IA aplicada y auditorías reales.
          </p>
          <div className="cs-hero-ctas">
            <Link href={routes.contacto} className="cs-btn cs-btn-primary">
              Contactar <span className="cs-cursor">_</span>
            </Link>
            <Link href={routes.servicios} className="cs-btn cs-btn-ghost">
              Ver servicios <span className="cs-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="cs-editor" role="img" aria-label="Ejemplo de código que describe nuestros valores">
          <div className="cs-editor-bar">
            <span className="cs-tlight cs-tlight-r" />
            <span className="cs-tlight cs-tlight-y" />
            <span className="cs-tlight cs-tlight-g" />
            <span className="cs-tab">knitsdigital.ts</span>
            <span className="cs-bar-spacer" />
            <span className="cs-bar-meta">UTF-8 · LF · TypeScript</span>
          </div>
          <pre className="cs-editor-body" aria-hidden="true">
            {CODE_LINES.slice(0, lineCount).map((l) => (
              <code key={l.i} className="cs-code-line">
                <span className="cs-gutter">{l.i}</span>
                <span className="cs-code-text">{l.t}</span>
              </code>
            ))}
            {lineCount < CODE_LINES.length && (
              <span className="cs-typing-cursor" aria-hidden="true">▍</span>
            )}
          </pre>
        </div>
      </div>
      <div className="cs-hero-bg" aria-hidden="true" />
    </section>
  );
}

function Services() {
  const [active, setActive] = useState(0);

  return (
    <section className="cs-services" aria-labelledby="cs-services-title">
      <header className="cs-section-head">
        <span className="cs-tag">/* servicios */</span>
        <h2 id="cs-services-title">Servicios</h2>
        <p>Importamos lo que necesitas; exportamos producto digital que funciona.</p>
      </header>
      <div className="cs-services-shell">
        <aside className="cs-tree" aria-label="Lista de servicios">
          <div className="cs-tree-head">EXPLORER</div>
          <ul role="tablist">
            {services.map((s, i) => (
              <li key={s.num}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-controls={`cs-panel-${i}`}
                  id={`cs-tab-${i}`}
                  onClick={() => setActive(i)}
                  className={`cs-tree-item ${active === i ? 'is-active' : ''}`}
                >
                  <span className="cs-tree-icon" aria-hidden="true">▸</span>
                  <span className="cs-tree-name">{s.tag}.module.ts</span>
                  <span className="cs-tree-badge">{s.num}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="cs-tree-foot" aria-hidden="true">
            <div className="cs-tree-search">⌘P · Buscar archivo…</div>
          </div>
        </aside>

        <div className="cs-tabs">
          {services.map((s, i) => (
            <article
              key={s.num}
              id={`cs-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`cs-tab-${i}`}
              hidden={active !== i}
              className={`cs-panel cs-panel-${s.color}`}
            >
              <header className="cs-panel-head">
                <span className="cs-comment">{`// ${s.tag}.module`}</span>
                <h3>{s.title}</h3>
              </header>
              <p className="cs-panel-desc">{s.desc}</p>
              {active === i && (
                <pre className="cs-snippet" aria-hidden="true">
                  <code>
                    <span className="cs-num">01</span>
                    <span>{`export const ${s.tag} = () => {`}</span>
                    {'\n'}
                    <span className="cs-num">02</span>
                    <span>{`  return { accesible: true, impacto: 'real' };`}</span>
                    {'\n'}
                    <span className="cs-num">03</span>
                    <span>{`};`}</span>
                  </code>
                </pre>
              )}
              <Link href={routes.servicios} className="cs-panel-link">
                Saber más <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="cs-manifesto is-in" aria-labelledby="cs-manifesto-title">
      <header className="cs-section-head">
        <span className="cs-tag">/* manifest */</span>
        <h2 id="cs-manifesto-title">Manifiesto</h2>
        <p>Tus ideas, perfectamente "knit"eadas.</p>
      </header>
      <ol className="cs-commits">
        {manifesto.map((m, i) => (
          <li key={m.title} className="cs-commit is-in" style={{ '--i': i } as any}>
            <div className="cs-commit-hash" aria-hidden="true">
              {(m.title + i).split('').reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0).toString(16).slice(-7)}
            </div>
            <div className="cs-commit-body">
              <span className="cs-commit-author">knits &lt;hola@knitsdigital.es&gt;</span>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
              <div className="cs-commit-meta">
                <span>♿ {m.icon}</span>
                <span>+{12 + i * 3} -0</span>
                <span>main</span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Collab() {
  const [paused, setPaused] = useState(false);
  const list = [...collaborators, ...collaborators];

  return (
    <section className="cs-collab" aria-labelledby="cs-collab-title">
      <header className="cs-section-head">
        <span className="cs-tag">/* clientes */</span>
        <h2 id="cs-collab-title">Casos de éxito</h2>
        <p>Empresas que confían en nuestro tejido.</p>
      </header>
      <div className="cs-collab-wrap">
        <div className={`cs-collab-marquee ${paused ? 'is-paused' : ''}`} aria-label="Logos de clientes" role="region">
          <ul className="cs-collab-track" role="list">
            {list.map((c, i) => (
              <li key={i}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={c.alt}
                  tabIndex={i >= collaborators.length ? -1 : 0}
                  aria-hidden={i >= collaborators.length}
                >
                  <img src={c.img} alt={i < collaborators.length ? c.alt : ''} loading="lazy" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="cs-collab-toggle"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Reanudar carrusel' : 'Pausar carrusel'}
          aria-pressed={paused}
        >
          {paused ? '▶' : '⏸'}
          <span>{paused ? 'Play' : 'Pause'}</span>
        </button>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="cs-cta" aria-labelledby="cs-cta-title">
      <div className="cs-cta-inner">
        <span className="cs-tag">/* contacto */</span>
        <h2 id="cs-cta-title">
          ¿Empezamos a tejer<br />
          <span className="cs-hl">tu próximo proyecto?</span>
        </h2>
        <p>Una conversación es el primer commit. Te respondemos en menos de 48h.</p>
        <Link href={routes.contacto} className="cs-btn cs-btn-primary cs-btn-xl">
          Contactar <span className="cs-cursor">_</span>
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
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

  const rootClass = `v3-root var-cs${mounted && isLight ? ' is-light' : ''}`;

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
            {nav.map((item) => (
              <Link key={item.to} href={item.to} className="v3-nav-link">
                <span className="v3-nav-spark" aria-hidden="true">✧</span>
                {item.label}
              </Link>
            ))}
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
        <Hero />
        <Services />
        <Manifesto />
        <Collab />
        <CTA />
      </main>

      <footer className="v3-footer" role="contentinfo">
        <div>KnitsDigital © {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
