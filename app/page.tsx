'use client';

import { nav, routes, services, manifesto, collaborators } from '@/lib/data';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type CodePart = { type: 'keyword' | 'comment' | 'string' | 'bool' | 'text'; text: string };

const CODE_LINES: { i: string; parts: CodePart[] }[] = [
  { i: '01', parts: [{ type: 'keyword', text: 'function' }, { type: 'text', text: ' knitsdigital() {' }] },
  { i: '02', parts: [{ type: 'text', text: '  ' }, { type: 'comment', text: '// Donde la tecnología, la creatividad' }] },
  { i: '03', parts: [{ type: 'text', text: '  ' }, { type: 'comment', text: '// y las personas se entrelazan.' }] },
  { i: '04', parts: [{ type: 'text', text: '  ' }, { type: 'keyword', text: 'return' }, { type: 'text', text: ' {' }] },
  { i: '05', parts: [{ type: 'text', text: "    accesibilidad: " }, { type: 'string', text: "'WCAG 2.2'," }] },
  { i: '06', parts: [{ type: 'text', text: '    inclusión: ' }, { type: 'bool', text: 'true' }, { type: 'text', text: ',' }] },
  { i: '07', parts: [{ type: 'text', text: "    talento: " }, { type: 'string', text: "'diverso · horizontal'" }] },
  { i: '08', parts: [{ type: 'text', text: '  };' }] },
  { i: '09', parts: [{ type: 'text', text: '}' }] },
];

function Hero({ isLight }: { isLight: boolean }) {
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
    <section
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-8 py-16 pb-24"
      aria-labelledby="hero-title"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-[1320px] grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Text column */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-3 self-start rounded-full border px-4 py-2 font-mono text-sm font-medium ${
              isLight
                ? 'border-black/10 bg-white text-[#1a1b1e]'
                : 'border-white/10 bg-white/5 text-cs-fg'
            }`}
          >
            <span
              className="inline-block h-2 w-2 rounded-full bg-kd-turquesa shadow-[0_0_8px_#01c095] animate-[cs-pulse_1.6s_ease-in-out_infinite]"
              aria-hidden="true"
            />
            <span>~/knitsdigital</span>
            <span className="text-[10px] text-kd-lila" aria-hidden="true">●</span>
          </div>

          {/* Heading */}
          <h1
            id="hero-title"
            className={`m-0 font-display font-black leading-[1.02] tracking-[-0.04em] ${
              isLight ? 'text-[#1a1b1e]' : 'text-cs-fg'
            }`}
            style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}
          >
            Tejemos código<br />
            <span className="gradient-text italic">accesible</span>.
          </h1>

          {/* Subheading */}
          <p
            className={`m-0 max-w-[52ch] text-lg leading-relaxed ${
              isLight ? 'text-[#6e6f75]' : 'text-cs-fg-soft'
            }`}
          >
            Estudio digital especializado en producto accesible, inclusivo y sostenible. WCAG 2.2, no-code, IA aplicada y auditorías reales.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={routes.contacto}
              className="inline-flex items-center gap-2 rounded-full bg-kd-pistacho px-6 py-3 font-display font-extrabold text-[15px] text-kd-black no-underline transition-transform hover:-translate-y-0.5 hover:bg-[#e5fc7a]"
            >
              Contactar <span className="animate-[cs-blink_1s_steps(1)_infinite]" aria-hidden="true">_</span>
            </Link>
            <Link
              href={routes.servicios}
              className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 font-display font-extrabold text-[15px] no-underline transition-all hover:-translate-y-0.5 ${
                isLight
                  ? 'border-black/20 text-[#1a1b1e] hover:border-kd-pistacho-deep hover:text-kd-pistacho-deep'
                  : 'border-white/20 text-cs-fg hover:border-kd-pistacho hover:text-kd-pistacho'
              }`}
            >
              Ver servicios <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Editor column */}
        <div
          className={`overflow-hidden rounded-lg border font-mono text-sm ${
            isLight
              ? 'border-black/10 bg-white shadow-lg'
              : 'border-cs-line bg-cs-bg-card'
          }`}
          role="img"
          aria-label="Ejemplo de código que describe nuestros valores"
        >
          {/* Title bar */}
          <div
            className={`flex items-center gap-2 border-b px-4 py-3 ${
              isLight ? 'border-black/8 bg-[#f0f0f2]' : 'border-cs-line bg-cs-bg-2'
            }`}
          >
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span
              className={`ml-3 rounded px-3 py-0.5 text-xs ${
                isLight ? 'bg-white text-[#6e6f75]' : 'bg-cs-bg text-cs-fg-soft'
              }`}
            >
              knitsdigital.ts
            </span>
            <span className="flex-1" />
            <span className={`text-[11px] ${isLight ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
              UTF-8 · LF · TypeScript
            </span>
          </div>
          {/* Body */}
          <pre
            className={`m-0 overflow-x-auto p-4 leading-7 ${
              isLight ? 'bg-white text-[#1a1b1e]' : 'bg-cs-bg-card text-cs-fg'
            }`}
            aria-hidden="true"
          >
            {CODE_LINES.slice(0, lineCount).map((l) => (
              <code key={l.i} className="flex gap-4">
                <span className={`w-6 select-none text-right ${isLight ? 'text-[#6e6f75]/60' : 'text-cs-fg-soft'}`}>
                  {l.i}
                </span>
                <span className="whitespace-pre">
                  {l.parts.map((part, idx) => {
                    const colorClass =
                      part.type === 'keyword'
                        ? 'text-[#c586c0]'
                        : part.type === 'comment'
                        ? 'text-[#6a9955]'
                        : part.type === 'string'
                        ? 'text-[#01c095]'
                        : part.type === 'bool'
                        ? 'text-[#569cd6]'
                        : '';
                    return (
                      <span key={idx} className={colorClass}>
                        {part.text}
                      </span>
                    );
                  })}
                </span>
              </code>
            ))}
            {lineCount < CODE_LINES.length && (
              <span className="inline-block animate-[cs-blink_1s_steps(1)_infinite] text-kd-pistacho" aria-hidden="true">
                ▍
              </span>
            )}
          </pre>
        </div>
      </div>
    </section>
  );
}

function Services({ isLight }: { isLight: boolean }) {
  const [active, setActive] = useState(0);

  return (
    <section
      className={`px-8 py-20 ${isLight ? 'bg-[#f5f5f7]' : 'bg-cs-bg'}`}
      aria-labelledby="services-title"
    >
      <header className="mx-auto mb-10 flex max-w-[1320px] flex-col gap-2">
        <span className={`font-mono text-xs uppercase tracking-widest ${isLight ? 'text-kd-turquesa-deep' : 'text-kd-pistacho'}`}>
          {'/* servicios */'}
        </span>
        <h2
          id="services-title"
          className={`m-0 font-display font-black leading-none tracking-tight ${isLight ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
          style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
        >
          Servicios
        </h2>
        <p className={`m-0 max-w-[56ch] ${isLight ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
          Importamos lo que necesitas; exportamos producto digital que funciona.
        </p>
      </header>

      <div
        className={`mx-auto max-w-[1320px] overflow-hidden rounded-lg border lg:grid lg:grid-cols-[240px_1fr] ${
          isLight ? 'border-black/10' : 'border-cs-line'
        }`}
      >
        {/* Sidebar */}
        <aside
          className={`border-b p-3 lg:border-b-0 lg:border-r ${
            isLight ? 'border-black/10 bg-[#ebebed]' : 'border-cs-line bg-cs-bg-2'
          }`}
          aria-label="Lista de servicios"
        >
          <div
            className={`mb-2 px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-widest ${
              isLight ? 'text-[#6e6f75]' : 'text-cs-fg-soft'
            }`}
          >
            EXPLORER
          </div>
          <ul role="tablist" className="m-0 flex list-none flex-col gap-0.5 p-0">
            {services.map((s, i) => (
              <li key={s.num}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-controls={`panel-${i}`}
                  id={`tab-${i}`}
                  onClick={() => setActive(i)}
                  className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left font-mono text-sm transition-colors ${
                    active === i
                      ? isLight
                        ? 'bg-kd-lila-soft text-kd-lila-deep'
                        : 'bg-white/10 text-kd-pistacho'
                      : isLight
                      ? 'text-[#1a1b1e] hover:bg-black/5'
                      : 'text-cs-fg-soft hover:bg-white/5'
                  }`}
                >
                  <span
                    className={`transition-transform ${active === i ? 'rotate-90' : ''} ${
                      isLight ? 'text-kd-lila-deep' : 'text-kd-pistacho'
                    }`}
                    aria-hidden="true"
                  >
                    ▸
                  </span>
                  <span className="flex-1">{s.tag}.module.ts</span>
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                      isLight ? 'bg-black/8 text-[#6e6f75]' : 'bg-white/8 text-cs-fg-soft'
                    }`}
                  >
                    {s.num}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div
            className={`mt-3 border-t pt-3 px-2 font-mono text-[11px] ${
              isLight ? 'border-black/10 text-[#6e6f75]' : 'border-dashed border-cs-line text-cs-fg-soft'
            }`}
            aria-hidden="true"
          >
            ⌘P · Buscar archivo…
          </div>
        </aside>

        {/* Panels */}
        <div className={`p-6 ${isLight ? 'bg-white' : 'bg-cs-bg-card'}`}>
          {services.map((s, i) => (
            <article
              key={s.num}
              id={`panel-${i}`}
              role="tabpanel"
              aria-labelledby={`tab-${i}`}
              hidden={active !== i}
              className="flex flex-col gap-4"
            >
              <header className="flex flex-col gap-1">
                <span className="font-mono text-sm text-[#6a9955]">{`// ${s.tag}.module`}</span>
                <h3
                  className={`m-0 font-display font-black text-2xl tracking-tight ${
                    isLight ? 'text-[#1a1b1e]' : 'text-cs-fg'
                  }`}
                >
                  {s.title}
                </h3>
              </header>
              <p className={`m-0 leading-relaxed ${isLight ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                {s.desc}
              </p>
              {active === i && (
                <pre
                  className={`m-0 rounded p-4 font-mono text-sm leading-7 ${
                    isLight ? 'bg-[#f5f5f7] text-[#1a1b1e]' : 'bg-cs-bg text-cs-fg'
                  }`}
                  aria-hidden="true"
                >
                  <code>
                    <span className={isLight ? 'text-[#6e6f75]/60' : 'text-cs-fg-soft'}>01</span>
                    {' '}
                    <span className="text-[#c586c0]">export const</span>
                    <span>{` ${s.tag} `}</span>
                    <span className="text-[#c586c0]">=</span>
                    <span>{` () `}</span>
                    <span className="text-[#c586c0]">{'=>'}</span>
                    <span>{` {`}</span>
                    {'\n'}
                    <span className={isLight ? 'text-[#6e6f75]/60' : 'text-cs-fg-soft'}>02</span>
                    {' '}
                    <span className="text-[#c586c0]">return</span>
                    <span>{` { accesible: `}</span>
                    <span className="text-[#569cd6]">true</span>
                    <span>{`, impacto: `}</span>
                    <span className="text-[#01c095]">'real'</span>
                    <span>{` };`}</span>
                    {'\n'}
                    <span className={isLight ? 'text-[#6e6f75]/60' : 'text-cs-fg-soft'}>03</span>
                    {' '}
                    <span>{`};`}</span>
                  </code>
                </pre>
              )}
              <Link
                href={routes.servicios}
                className={`self-start border-b pb-0.5 font-mono text-sm font-bold no-underline transition-colors ${
                  isLight
                    ? 'border-kd-lila-deep text-kd-lila-deep hover:text-kd-lila'
                    : 'border-kd-pistacho text-kd-pistacho hover:text-kd-pistacho/80'
                }`}
              >
                Saber más <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto({ isLight }: { isLight: boolean }) {
  return (
    <section
      className={`px-8 py-20 ${isLight ? 'bg-[#ebebed]' : 'bg-cs-bg-2'}`}
      aria-labelledby="manifesto-title"
    >
      <header className="mx-auto mb-10 flex max-w-[1320px] flex-col gap-2">
        <span className={`font-mono text-xs uppercase tracking-widest ${isLight ? 'text-kd-turquesa-deep' : 'text-kd-pistacho'}`}>
          {'/* manifest */'}
        </span>
        <h2
          id="manifesto-title"
          className={`m-0 font-display font-black leading-none tracking-tight ${isLight ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
          style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
        >
          Manifiesto
        </h2>
        <p className={`m-0 max-w-[56ch] ${isLight ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
          Tus ideas, perfectamente &quot;knit&quot;eadas.
        </p>
      </header>

      <ol className="mx-auto flex max-w-[1320px] list-none flex-col gap-4 p-0 m-0">
        {manifesto.map((m, i) => (
          <li
            key={m.title}
            className={`flex gap-4 rounded-lg border p-5 ${
              isLight ? 'border-black/10 bg-white' : 'border-cs-line bg-cs-bg-card'
            }`}
          >
            <div
              className={`shrink-0 select-none font-mono text-sm font-bold ${
                isLight ? 'text-kd-turquesa-deep' : 'text-cs-fg-soft'
              }`}
              aria-hidden="true"
            >
              {(m.title + i)
                .split('')
                .reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0)
                .toString(16)
                .slice(-7)}
            </div>
            <div className="flex flex-col gap-1">
              <span className={`font-mono text-xs ${isLight ? 'text-kd-turquesa-deep' : 'text-kd-pistacho/70'}`}>
                knits &lt;hola@knitsdigital.es&gt;
              </span>
              <h3 className={`m-0 font-display font-bold text-lg ${isLight ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>
                {m.title}
              </h3>
              <p className={`m-0 text-base ${isLight ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                {m.desc}
              </p>
              <div className={`mt-2 flex gap-4 font-mono text-xs ${isLight ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
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

function Collab({ isLight }: { isLight: boolean }) {
  const [paused, setPaused] = useState(false);
  const list = [...collaborators, ...collaborators];

  return (
    <section
      className={`px-8 py-20 ${isLight ? 'bg-[#f5f5f7]' : 'bg-cs-bg'}`}
      aria-labelledby="collab-title"
    >
      <header className="mx-auto mb-10 flex max-w-[1320px] flex-col gap-2">
        <span className={`font-mono text-xs uppercase tracking-widest ${isLight ? 'text-kd-turquesa-deep' : 'text-kd-pistacho'}`}>
          {'/* clientes */'}
        </span>
        <h2
          id="collab-title"
          className={`m-0 font-display font-black leading-none tracking-tight ${isLight ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
          style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
        >
          Casos de éxito
        </h2>
        <p className={`m-0 max-w-[56ch] ${isLight ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
          Empresas que confían en nuestro tejido.
        </p>
      </header>

      <div className="mx-auto max-w-[1320px]">
        <div
          className={`relative overflow-hidden rounded-lg border ${
            isLight ? 'border-black/10' : 'border-cs-line'
          }`}
        >
          <ul
            className={`marquee-track ${paused ? 'is-paused' : ''} m-0 list-none items-center p-4`}
            role="list"
            aria-label="Logos de clientes"
          >
            {list.map((c, i) => (
              <li key={i} className="shrink-0">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={c.alt}
                  tabIndex={i >= collaborators.length ? -1 : 0}
                  aria-hidden={i >= collaborators.length}
                  className="flex h-16 w-32 items-center justify-center rounded opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                >
                  <img
                    src={c.img}
                    alt={i < collaborators.length ? c.alt : ''}
                    loading="lazy"
                    className="max-h-10 w-auto max-w-full object-contain"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Reanudar carrusel' : 'Pausar carrusel'}
          aria-pressed={paused}
          className={`mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-sm transition-colors ${
            isLight
              ? 'border-black/10 text-[#6e6f75] hover:border-black/20'
              : 'border-cs-line text-cs-fg-soft hover:border-white/20'
          }`}
        >
          {paused ? '▶' : '⏸'}
          <span>{paused ? 'Play' : 'Pause'}</span>
        </button>
      </div>
    </section>
  );
}

function CTA({ isLight }: { isLight: boolean }) {
  return (
    <section
      className={`px-8 py-20 ${isLight ? 'bg-[#ebebed]' : 'bg-cs-bg-2'}`}
      aria-labelledby="cta-title"
    >
      <div
        className={`mx-auto max-w-[900px] rounded-xl border p-12 text-center ${
          isLight ? 'border-black/10 bg-white' : 'border-cs-line bg-cs-bg-card'
        }`}
      >
        <span className={`font-mono text-xs uppercase tracking-widest ${isLight ? 'text-kd-turquesa-deep' : 'text-kd-pistacho'}`}>
          {'/* contacto */'}
        </span>
        <h2
          id="cta-title"
          className={`mb-4 mt-4 font-display font-black leading-tight tracking-tight ${isLight ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
          style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
        >
          ¿Empezamos a tejer<br />
          <span className="gradient-text italic">tu próximo proyecto?</span>
        </h2>
        <p className={`mx-auto mb-8 max-w-[48ch] ${isLight ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
          Una conversación es el primer commit. Te respondemos en menos de 48h.
        </p>
        <Link
          href={routes.contacto}
          className="inline-flex items-center gap-2 rounded-full bg-kd-pistacho px-8 py-4 font-display font-extrabold text-lg text-kd-black no-underline transition-transform hover:-translate-y-0.5 hover:bg-[#e5fc7a]"
        >
          Contactar <span className="animate-[cs-blink_1s_steps(1)_infinite]" aria-hidden="true">_</span>
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

  const light = mounted && isLight;

  return (
    <div
      className={`min-h-screen cs-grid-bg${light ? ' is-light' : ''}`}
      style={{
        backgroundColor: light ? '#f5f5f7' : '#0c0d10',
        color: light ? '#1a1b1e' : '#e4e5eb',
      }}
    >
      {/* NAV */}
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
          <Link
            href="/"
            className="inline-flex items-center gap-3 no-underline"
            aria-label="KnitsDigital — Inicio"
          >
            <img src="/assets/isotype.png" alt="" width={32} height={32} />
            <span className={`font-mono text-lg font-bold tracking-tight ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>
              knitsdigital
            </span>
          </Link>

          <nav aria-label="Navegación principal" className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                href={item.to}
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
                light
                  ? 'border-black/15 text-[#1a1b1e] hover:bg-black/5'
                  : 'border-white/10 text-cs-fg hover:bg-white/8'
              }`}
            >
              {mounted ? (isLight ? '☀️' : '🌙') : '🌙'}
            </button>
            <Link
              href={routes.contacto}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display font-extrabold text-[14px] no-underline transition-all ${
                light
                  ? 'bg-kd-black text-kd-white hover:bg-kd-black/80'
                  : 'bg-kd-pistacho text-kd-black hover:bg-[#e5fc7a]'
              }`}
            >
              Contactar <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <Hero isLight={light} />
        <Services isLight={light} />
        <Manifesto isLight={light} />
        <Collab isLight={light} />
        <CTA isLight={light} />
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
