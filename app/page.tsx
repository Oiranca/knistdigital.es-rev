'use client';

import { routes, services, manifesto, collaborators } from '@/lib/data';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Icon } from '@/lib/icons';
import { useReveal } from '@/lib/useReveal';
import { PageNav } from '@/lib/PageNav';
import { PageFooter } from '@/lib/PageFooter';
import { useTheme } from '@/lib/useTheme';

type CodePart = { type: 'keyword' | 'comment' | 'string' | 'bool' | 'text' | 'fn'; text: string };

const CODE_LINES: { i: string; parts: CodePart[] }[] = [
  { i: '01', parts: [{ type: 'keyword', text: 'function' }, { type: 'text', text: ' ' }, { type: 'fn', text: 'knitsdigital' }, { type: 'text', text: '() {' }] },
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
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) { setLineCount(CODE_LINES.length); return; }
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
      className="relative mx-auto max-w-[1320px] overflow-hidden px-8 pt-[80px] pb-[100px]"
      aria-labelledby="hero-title"
    >
      {/* Radial glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: isLight
              ? 'radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-kd-pistacho) 22%, transparent), transparent 60%)'
              : 'radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--color-kd-pistacho) 8%, transparent), transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: isLight
              ? 'radial-gradient(circle at 80% 80%, color-mix(in srgb, var(--color-kd-turquesa) 18%, transparent), transparent 60%)'
              : 'radial-gradient(circle at 80% 80%, color-mix(in srgb, var(--color-kd-turquesa) 8%, transparent), transparent 60%)',
          }}
        />
      </div>
      <div className="relative z-10 grid grid-cols-1 items-center gap-[64px] pt-10 lg:grid-cols-[1fr_1.1fr]">
        {/* Text column */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-[10px] self-start rounded-full border px-[14px] py-2 font-mono font-medium ${
              isLight
                ? 'border-black/[0.14] bg-white text-[#1a1a1a]'
                : 'border-white/[0.14] bg-cs-bg-card text-cs-fg-soft'
            }`}
            style={{ fontSize: '12px' }}
          >
            <span
              className={`inline-block h-2 w-2 rounded-full animate-cs-pulse ${
                isLight
                  ? 'bg-kd-turquesa-deep shadow-[0_0_12px_var(--color-kd-turquesa-deep)]'
                  : 'bg-kd-pistacho shadow-[0_0_12px_var(--color-kd-pistacho)]'
              }`}
              aria-hidden="true"
            />
            <span>~/knitsdigital</span>
            <span className={`text-[10px] ${isLight ? 'text-kd-lila-deep' : 'text-kd-lila'}`} aria-hidden="true">●</span>
          </div>

          {/* Heading */}
          <h1
            id="hero-title"
            className={`m-0 font-display font-black leading-[1] tracking-[-0.035em] ${
              isLight ? 'text-[#1a1a1a]' : 'text-cs-fg'
            }`}
            style={{ fontSize: 'clamp(48px, 7vw, 92px)', margin: '24px 0' }}
          >
            Tejemos código<br />
            <span className="gradient-text">accesible</span>.
          </h1>

          {/* Subheading */}
          <p
            className={`m-0 text-[18px] ${
              isLight ? 'text-[#555]' : 'text-cs-fg-soft'
            }`}
            style={{ maxWidth: '50ch', lineHeight: '1.55', margin: '0 0 32px' }}
          >
            Estudio digital especializado en producto accesible, inclusivo y sostenible. WCAG 2.2, no-code, IA aplicada y auditorías reales.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={routes.contact}
              className={`cs-btn inline-flex items-center gap-2 rounded-[10px] px-[22px] py-[14px] font-mono font-semibold text-[14px] no-underline ${
                isLight
                  ? 'bg-kd-lila-deep text-white'
                  : 'bg-kd-pistacho text-kd-black'
              }`}
              style={{ transition: 'transform .2s var(--kd-ease), background .2s, border-color .2s' }}
            >
              Contactar <span className="animate-cs-blink" aria-hidden="true">_</span>
            </Link>
            <Link
              href={routes.services}
              className={`cs-btn-ghost inline-flex items-center gap-2 rounded-[10px] border px-[22px] py-[14px] font-mono font-semibold text-[14px] no-underline ${
                isLight
                  ? 'border-black/[0.14] bg-white text-[#1a1a1a] hover:border-kd-nav-cta hover:text-kd-nav-cta'
                  : 'border-cs-line-strong bg-cs-bg-card text-cs-fg hover:border-kd-pistacho hover:text-kd-pistacho'
              }`}
              style={{ transition: 'transform .2s var(--kd-ease), background .2s, border-color .2s' }}
            >
              Ver servicios <span className="cs-arrow" aria-hidden="true" style={{ display: 'inline-block', transition: 'transform .2s' }}>→</span>
            </Link>
          </div>
        </div>

        {/* Editor column */}
        <div
          className={`overflow-hidden border font-mono text-sm ${
            isLight
              ? 'border-black/[0.12] bg-[#1a1c22]'
              : 'border-cs-line-strong bg-cs-bg-card'
          }`}
          style={{
            borderRadius: '14px',
            boxShadow: isLight ? '0 32px 80px rgba(0,0,0,.14)' : '0 32px 80px rgba(0,0,0,.5)',
          }}
          role="img"
          aria-label="Ejemplo de código que describe nuestros valores"
        >
          {/* Title bar */}
          <div
            className={`flex items-center gap-2 border-b ${
              isLight ? 'border-white/[0.06] bg-[#14151a]' : 'border-cs-line bg-cs-bg-2'
            }`}
            style={{ padding: '10px 14px' }}
          >
            <span className="h-3 w-3 rounded-full bg-mac-red" />
            <span className="h-3 w-3 rounded-full bg-mac-yellow" />
            <span className="h-3 w-3 rounded-full bg-mac-green" />
            <span
              className={`ml-3 rounded text-xs ${
                isLight ? 'bg-[#1a1c22] text-[rgba(228,229,235,0.55)]' : 'bg-cs-bg text-cs-fg-soft'
              }`}
              style={{ padding: '6px 14px' }}
            >
              knitsdigital.ts
            </span>
            <span className="flex-1" />
            <span className={`text-[11px] ${isLight ? 'text-[rgba(228,229,235,0.55)]' : 'text-cs-fg-soft'}`}>
              UTF-8 · LF · TypeScript
            </span>
          </div>
          {/* Body */}
          <pre
            className={`m-0 overflow-x-auto leading-7 ${
              isLight ? 'bg-[#1a1c22] text-[#e4e5eb]' : 'bg-cs-bg-card text-cs-fg'
            }`}
            style={{ padding: '20px 0' }}
            aria-hidden="true"
          >
            {CODE_LINES.slice(0, lineCount).map((l) => (
              <code key={l.i} className="flex" style={{ gap: '12px', padding: '0 16px' }}>
                <span className={`w-12 select-none text-right ${isLight ? 'text-[rgba(228,229,235,0.45)]' : 'text-cs-fg-soft'}`}>
                  {l.i}
                </span>
                <span className="whitespace-pre">
                  {l.parts.map((part, idx) => {
                    const colorClass =
                      part.type === 'keyword'
                        ? 'text-syn-keyword'
                        : part.type === 'comment'
                        ? 'text-syn-comment'
                        : part.type === 'string'
                        ? 'text-kd-pistacho'
                        : part.type === 'bool'
                        ? 'text-syn-bool'
                        : part.type === 'fn'
                        ? 'text-kd-turquesa'
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
              <span className={`inline-block animate-cs-blink ${isLight ? 'text-kd-lila-deep' : 'text-kd-pistacho'}`} aria-hidden="true">
                ▍
              </span>
            )}
          </pre>
        </div>
      </div>
    </section>
  );
}

// Snippet lines for the typing effect in the services panel
const SNIPPET_LINES = (tag: string) => [
  `export const ${tag} = () => {`,
  `  return { accesible: true, impacto: 'real' };`,
  `};`,
];

function Services({ isLight }: { isLight: boolean }) {
  const [active, setActive] = useState(0);
  const [typedLines, setTypedLines] = useState(0);
  const { ref: servicesRef, revealed: servicesRevealed } = useReveal<HTMLElement>(0.08);

  // Re-type snippet lines on each tab change
  useEffect(() => {
    setTypedLines(0);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) { setTypedLines(3); return; }
    let n = 0;
    const id = setInterval(() => {
      n++;
      setTypedLines(n);
      if (n >= 3) clearInterval(id);
    }, 220);
    return () => clearInterval(id);
  }, [active]);

  return (
    <section
      ref={servicesRef}
      className="px-8 pb-[60px]"
      style={{
        backgroundColor: isLight
          ? 'color-mix(in srgb, #f4f1ea 72%, transparent)'
          : 'color-mix(in srgb, var(--color-cs-bg-2) 72%, transparent)',
        backgroundImage: isLight
          ? 'radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--color-kd-lila) 20%, transparent), transparent 55%), radial-gradient(circle at 80% 80%, color-mix(in srgb, var(--color-kd-turquesa) 16%, transparent), transparent 55%), linear-gradient(rgba(0,0,0,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.06) 1px, transparent 1px)'
          : 'radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--color-kd-lila) 10%, transparent), transparent 55%), radial-gradient(circle at 80% 80%, color-mix(in srgb, var(--color-kd-turquesa) 10%, transparent), transparent 55%), linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)',
        backgroundSize: 'auto, auto, 32px 32px, 32px 32px',
      }}
      aria-labelledby="services-title"
    >
      <header className="mx-auto mb-10 flex max-w-[1320px] flex-col gap-2" style={{ padding: '100px 0 28px' }}>
        <span className={`font-mono text-[13px] ${isLight ? 'text-[#4a7d3e]' : 'text-syn-comment'}`}>
          {'/* servicios */'}
        </span>
        <h2
          id="services-title"
          className={`m-0 font-display font-black leading-none ${isLight ? 'text-[#1a1a1a]' : 'text-cs-fg'}`}
          style={{ fontSize: 'clamp(34px, 5vw, 64px)', letterSpacing: '-.025em' }}
        >
          Servicios
        </h2>
        <p className={`m-0 max-w-[56ch] ${isLight ? 'text-[#555]' : 'text-cs-fg-soft'}`}>
          Importamos lo que necesitas; exportamos producto digital que funciona.
        </p>
      </header>

      <div
        className={`mx-auto max-w-[1320px] overflow-hidden border lg:grid ${
          isLight ? 'border-black/[0.14]' : 'border-cs-line-strong'
        }`}
        style={{
          borderRadius: '16px',
          padding: '16px',
          gridTemplateColumns: '280px 1fr',
          gap: '24px',
          background: isLight
            ? 'color-mix(in srgb, #ebe7dd 80%, transparent)'
            : 'color-mix(in srgb, var(--color-cs-bg-2) 80%, transparent)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          opacity: servicesRevealed ? 1 : 0,
          transform: servicesRevealed ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity .7s var(--kd-ease), transform .7s var(--kd-ease)',
        }}
      >
        {/* Sidebar */}
        <aside
          className={`p-3 ${isLight ? 'bg-transparent' : 'bg-transparent'}`}
          aria-label="Lista de servicios"
        >
          <div
            className={`mb-2 px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-widest ${
              isLight ? 'text-[#555]' : 'text-cs-fg-soft'
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
                  className={`cs-tree-item-btn flex w-full items-center gap-2 rounded text-left font-mono text-[13px] ${
                    active === i
                      ? isLight ? 'text-kd-lila-deep' : 'text-kd-pistacho'
                      : isLight ? 'text-[#1a1a1a]' : 'text-cs-fg-soft'
                  }`}
                  style={{
                    padding: '8px 10px',
                    background: active === i
                      ? isLight
                        ? 'color-mix(in srgb, var(--color-kd-lila-deep) 12%, transparent)'
                        : 'color-mix(in srgb, var(--color-kd-pistacho) 14%, transparent)'
                      : undefined,
                    transition: 'background .15s, color .15s',
                  }}
                >
                  <span
                    className={`${isLight ? 'text-kd-lila-deep' : 'text-kd-pistacho'}`}
                    style={{
                      display: 'inline-block',
                      transition: 'transform .2s',
                      transform: active === i ? 'rotate(90deg)' : 'rotate(0deg)',
                    }}
                    aria-hidden="true"
                  >
                    ▸
                  </span>
                  <span className="flex-1">{s.tag}.module.ts</span>
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                      isLight ? 'bg-black/8 text-[#555]' : 'bg-white/8 text-cs-fg-soft'
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
              isLight ? 'border-black/10 text-[#555]' : 'border-dashed border-cs-line text-cs-fg-soft'
            }`}
            aria-hidden="true"
          >
            ⌘P · Buscar archivo…
          </div>
        </aside>

        {/* Panels */}
        <div
          className={`${isLight ? 'bg-[#1a1c22]' : 'bg-cs-bg-card'}`}
          style={{ padding: '32px', minHeight: '340px', borderRadius: '8px' }}
        >
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
                <span className={`font-mono text-[13px] ${isLight ? 'text-[#4a7d3e]' : 'text-syn-comment'}`}>{`// ${s.tag}.module`}</span>
                <h3
                  className={`m-0 font-display font-black ${
                    s.color === 'lila'
                      ? isLight ? 'text-kd-lila-deep' : 'text-kd-lila'
                      : s.color === 'turquesa'
                      ? isLight ? 'text-kd-turquesa-deep' : 'text-kd-turquesa'
                      : isLight ? 'text-kd-pistacho-deep' : 'text-kd-pistacho'
                  }`}
                  style={{ fontSize: '36px', letterSpacing: '-.02em', margin: 0 }}
                >
                  {s.title}
                </h3>
              </header>
              <p className={`m-0 leading-relaxed ${isLight ? 'text-[#e4e5eb]' : 'text-cs-fg-soft'}`}>
                {s.desc}
              </p>
              {active === i && (
                <pre
                  className="m-0 font-mono text-[13px] leading-7"
                  style={{
                    background: '#0c0d10',
                    color: '#e4e5eb',
                    borderRadius: '8px',
                    padding: '14px 16px',
                    border: '1px solid rgba(255,255,255,.08)',
                    minHeight: '100px',
                    whiteSpace: 'pre-wrap',
                  }}
                  aria-hidden="true"
                >
                  <code>
                    {SNIPPET_LINES(s.tag).slice(0, typedLines).map((line, li) => (
                      <span key={li} className="block">
                        <span className="inline-block w-7 select-none text-right text-cs-fg-soft" style={{ marginRight: '12px' }}>
                          {String(li + 1).padStart(2, '0')}
                        </span>
                        {li === 0 && (
                          <>
                            <span className="text-syn-keyword">export const </span>
                            <span className="text-kd-turquesa">{s.tag}</span>
                            <span className="text-cs-fg"> = () =&gt; {'{'}</span>
                          </>
                        )}
                        {li === 1 && (
                          <>
                            <span className="text-cs-fg">{'  return { accesible: '}</span>
                            <span className="text-syn-bool">true</span>
                            <span className="text-cs-fg">{', impacto: '}</span>
                            <span className="text-kd-pistacho">{'\'real\''}</span>
                            <span className="text-cs-fg">{' };'}</span>
                          </>
                        )}
                        {li === 2 && (
                          <span className="text-cs-fg">{'}'}</span>
                        )}
                      </span>
                    ))}
                    {typedLines < 3 && (
                      <span className="text-kd-pistacho animate-cs-blink" style={{ marginLeft: '2px' }}>▍</span>
                    )}
                  </code>
                </pre>
              )}
              <Link
                href={routes.services}
                className={`self-start border-b pb-0.5 font-mono font-semibold no-underline transition-colors ${
                  isLight
                    ? 'border-kd-lila-deep text-kd-lila-deep hover:text-kd-lila'
                    : 'border-kd-pistacho text-kd-pistacho hover:text-kd-pistacho'
                }`}
                style={{ fontSize: '13px' }}
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
  const { ref: manifestoRef, revealed: manifestoRevealed } = useReveal<HTMLElement>(0.08);

  return (
    <section
      ref={manifestoRef}
      className="relative"
      style={{
        padding: '20px 0 60px',
        background: isLight ? '#ebe7dd' : 'color-mix(in srgb, var(--color-cs-bg-2) 72%, transparent)',
      }}
      aria-labelledby="manifesto-title"
    >
      <header
        className="mx-auto mb-10 flex max-w-[1320px] flex-col gap-2 px-8"
        style={{ paddingTop: '80px' }}
      >
        <span className={`font-mono text-[13px] ${isLight ? 'text-[#4a7d3e]' : 'text-syn-comment'}`}>
          {'/* manifest */'}
        </span>
        <h2
          id="manifesto-title"
          className={`m-0 font-display font-black leading-none ${isLight ? 'text-[#1a1a1a]' : 'text-cs-fg'}`}
          style={{ fontSize: 'clamp(34px, 5vw, 64px)', letterSpacing: '-.025em' }}
        >
          Manifiesto
        </h2>
        <p className={`m-0 max-w-[56ch] ${isLight ? 'text-[#555]' : 'text-cs-fg-soft'}`}>
          Tus ideas, perfectamente &quot;knit&quot;eadas.
        </p>
      </header>

      <ol className="mx-auto flex max-w-[1320px] list-none flex-col gap-3 p-0 m-0 px-8">
        {manifesto.map((m, i) => (
          <li
            key={m.title}
            className={`cs-commit-hover border ${
              isLight ? 'border-black/10 bg-white' : 'border-cs-line bg-cs-bg-card'
            }`}
            style={{
              maxWidth: '920px',
              display: 'grid',
              gridTemplateColumns: '100px 1fr',
              gap: '16px',
              padding: '22px 24px',
              borderRadius: '10px',
              // stagger reveal via CSS custom prop
              ['--i' as string]: i,
              opacity: manifestoRevealed ? 1 : 0,
              transform: manifestoRevealed ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity .7s var(--kd-ease) calc(.12s * ${i}), transform .7s var(--kd-ease) calc(.12s * ${i}), border-color .25s`,
            }}
          >
            <div
              className={`shrink-0 select-none font-mono text-[13px] font-bold pt-1 ${
                isLight ? 'text-kd-lila-deep' : 'text-kd-pistacho'
              }`}
              aria-hidden="true"
            >
              {(m.title + i)
                .split('')
                .reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0)
                .toString(16)
                .slice(-7)}
            </div>
            <div className="flex flex-col" style={{ gap: '6px' }}>
              <span className={`font-mono text-[12px] ${isLight ? 'text-[#555]' : 'text-cs-fg-soft'}`}>
                knits &lt;hola@knitsdigital.es&gt;
              </span>
              <h3
                className={`m-0 font-display ${isLight ? 'text-[#1a1a1a]' : 'text-cs-fg'}`}
                style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-.015em' }}
              >
                {m.title}
              </h3>
              <p className={`m-0 ${isLight ? 'text-[#555]' : 'text-cs-fg'}`} style={{ lineHeight: '1.55' }}>
                {m.desc}
              </p>
              <div className={`flex gap-4 font-mono text-[12px] ${isLight ? 'text-[#555]' : 'text-cs-fg-soft'}`} style={{ marginTop: '8px' }}>
                <span className="inline-flex items-center gap-1">
                  <Icon name={m.icon as 'accessibility' | 'people' | 'growth'} width={14} height={14} aria-hidden="true" />
                  {m.icon}
                </span>
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
  const [prefersReduced, setPrefersReduced] = useState(false);
  const list = [...collaborators, ...collaborators];

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  return (
    <section
      className="overflow-hidden"
      style={{
        padding: '40px 32px 80px',
        backgroundColor: isLight
          ? 'color-mix(in srgb, #f4f1ea 72%, transparent)'
          : 'color-mix(in srgb, var(--color-cs-bg-2) 72%, transparent)',
        backgroundImage: isLight
          ? 'radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--color-kd-lila) 20%, transparent), transparent 55%), radial-gradient(circle at 80% 80%, color-mix(in srgb, var(--color-kd-turquesa) 16%, transparent), transparent 55%), linear-gradient(rgba(0,0,0,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.06) 1px, transparent 1px)'
          : 'radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--color-kd-lila) 10%, transparent), transparent 55%), radial-gradient(circle at 80% 80%, color-mix(in srgb, var(--color-kd-turquesa) 10%, transparent), transparent 55%), linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)',
        backgroundSize: 'auto, auto, 32px 32px, 32px 32px',
      }}
      aria-labelledby="collab-title"
    >
      <header className="mx-auto mb-10 flex max-w-[1320px] flex-col gap-2" style={{ paddingTop: '100px', paddingLeft: '0', paddingRight: '0' }}>
        <span className={`font-mono text-[13px] ${isLight ? 'text-[#4a7d3e]' : 'text-syn-comment'}`}>
          {'/* clientes */'}
        </span>
        <h2
          id="collab-title"
          className={`m-0 font-display font-black leading-none ${isLight ? 'text-[#1a1a1a]' : 'text-cs-fg'}`}
          style={{ fontSize: 'clamp(34px, 5vw, 64px)', letterSpacing: '-.025em' }}
        >
          Casos de éxito
        </h2>
        <p className={`m-0 max-w-[56ch] ${isLight ? 'text-[#555]' : 'text-cs-fg-soft'}`}>
          Empresas que confían en nuestro tejido.
        </p>
      </header>

      <div className="mx-auto max-w-[1320px]">
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: '16px',
            marginTop: '36px',
            maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          }}
        >
          <ul
            className="m-0 list-none p-0 flex items-center"
            style={{ gap: '24px', animation: 'cs-marquee 38s linear infinite', animationPlayState: (paused || prefersReduced) ? 'paused' : 'running', width: 'max-content' }}
            role="list"
            aria-label="Logos de clientes"
          >
            {list.map((c, i) => (
              <li key={i} className="shrink-0">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.alt}
                  tabIndex={i >= collaborators.length ? -1 : 0}
                  aria-hidden={i >= collaborators.length}
                  className="flex items-center justify-center"
                  style={{
                    width: '200px',
                    height: '110px',
                    padding: '16px',
                    borderRadius: '10px',
                    background: isLight ? '#f4f1ea' : 'rgba(255,255,255,.06)',
                    border: '1px solid rgba(255,255,255,.08)',
                    filter: 'grayscale(0.4)',
                    opacity: 0.9,
                    transition: 'filter .25s, opacity .25s, transform .3s var(--kd-ease), border-color .3s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.filter = 'none';
                    el.style.opacity = '1';
                    el.style.transform = 'scale(1.04)';
                    el.style.borderColor = 'var(--color-kd-pistacho)';
                    el.style.background = '#fff';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.filter = 'grayscale(0.4)';
                    el.style.opacity = '0.9';
                    el.style.transform = '';
                    el.style.borderColor = '';
                    el.style.background = isLight ? '#f4f1ea' : 'rgba(255,255,255,.06)';
                  }}
                >
                  <img
                    src={c.img}
                    alt={i < collaborators.length ? c.alt : ''}
                    loading="lazy"
                    className="w-auto max-w-full object-contain"
                    style={{ maxHeight: '70px' }}
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
              ? 'border-black/10 text-[#555] hover:border-black/20'
              : 'border-cs-line text-cs-fg-soft hover:border-white/20'
          }`}
        >
          <Icon name={paused ? 'play' : 'pause'} width={16} height={16} aria-hidden="true" />
          <span>{paused ? 'Play' : 'Pause'}</span>
        </button>
      </div>
    </section>
  );
}

function CTA({ isLight }: { isLight: boolean }) {
  return (
    <section
      className={`relative overflow-hidden ${isLight ? 'bg-[#f4f1ea]' : 'bg-cs-bg-2'}`}
      style={{ padding: '100px 32px' }}
      aria-labelledby="cta-title"
    >
      {/* Glow radial — dark: circle-bottom 16%; light: circle-bottom 35% */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: isLight
            ? 'radial-gradient(circle at 50% 100%, color-mix(in srgb, var(--color-kd-pistacho) 35%, transparent), transparent 50%)'
            : 'radial-gradient(circle at 50% 100%, color-mix(in srgb, var(--color-kd-pistacho) 16%, transparent), transparent 50%)',
        }}
      />
      <div
        className="relative mx-auto text-center flex flex-col items-center"
        style={{ maxWidth: '800px', gap: '16px' }}
      >
        <span className={`font-mono text-[13px] ${isLight ? 'text-[#4a7d3e]' : 'text-syn-comment'}`}>
          {'/* contacto */'}
        </span>
        <h2
          id="cta-title"
          className={`m-0 font-display font-black ${isLight ? 'text-[#1a1a1a]' : 'text-cs-fg'}`}
          style={{ fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1, letterSpacing: '-.03em' }}
        >
          ¿Empezamos a tejer<br />
          <span className="gradient-text">tu próximo proyecto?</span>
        </h2>
        <p className={`m-0 max-w-[50ch] ${isLight ? 'text-[#555]' : 'text-cs-fg'}`} style={{ opacity: 0.85 }}>
          Una conversación es el primer commit. Te respondemos en menos de 48h.
        </p>
        <Link
          href={routes.contact}
          className={`cs-btn inline-flex items-center gap-2 rounded-[10px] font-mono font-semibold no-underline ${
            isLight
              ? 'bg-kd-lila-deep text-white'
              : 'bg-kd-pistacho text-kd-black'
          }`}
          style={{
            padding: '18px 28px',
            fontSize: '16px',
            transition: 'transform .2s var(--kd-ease), background .2s, border-color .2s',
          }}
        >
          Contactar <span className="animate-cs-blink" aria-hidden="true">_</span>
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const { isLight, light, mounted, toggle } = useTheme();

  return (
    <div
      className={`min-h-screen cs-grid-bg${light ? ' is-light' : ''}`}
      style={{
        backgroundColor: light ? '#f4f1ea' : '#0c0d10',
        color: light ? '#1a1a1a' : '#e4e5eb',
      }}
    >
      <PageNav isLight={isLight} mounted={mounted} toggle={toggle} />

      <main id="main" tabIndex={-1}>
        <Hero isLight={light} />
        <Services isLight={light} />
        <Manifesto isLight={light} />
        <Collab isLight={light} />
        <CTA isLight={light} />
      </main>

      <PageFooter isLight={light} />
    </div>
  );
}
