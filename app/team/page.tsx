'use client';

import { useState, useEffect } from 'react';
import { team, whyValues } from '@/lib/data';
import { PageNav } from '@/lib/PageNav';
import { PageFooter } from '@/lib/PageFooter';
import { useTheme } from '@/lib/useTheme';

function useTypingLines(total: number, ms = 220) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    setShown(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(i);
      if (i >= total) clearInterval(id);
    }, ms);
    return () => clearInterval(id);
  }, [total, ms]);
  return shown;
}

function EquipoHero({ light }: { light: boolean }) {
  const total = team.length + 2; // opening brace + members + closing brace
  const shown = useTypingLines(total);

  return (
    <header className="relative px-8 py-16">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <span className={`font-mono text-xs ${light ? 'text-syn-comment' : 'text-kd-pistacho'}`}>
            {'/* equipo */'}
          </span>
          <h1
            className={`m-0 font-display font-black leading-[1.02] tracking-[-0.04em] ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            El <em className="gradient-text not-italic">hilo</em> que nos une
          </h1>
          <p className={`m-0 max-w-[52ch] text-lg leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
            Somos un equipo diverso, unido por fibras de profesionales que tejen soluciones tecnológicas accesibles, inclusivas y sostenibles.
          </p>
        </div>

        <div
          className={`overflow-hidden rounded-lg border font-mono text-sm ${
            light ? 'border-black/10 bg-white shadow-lg' : 'border-cs-line bg-cs-bg-card'
          }`}
          role="img"
          aria-label="Lista del equipo"
        >
          <div className={`flex items-center gap-2 border-b px-4 py-3 ${light ? 'border-black/8 bg-[#f0f0f2]' : 'border-cs-line bg-cs-bg-2'}`}>
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className={`ml-3 rounded px-3 py-0.5 text-xs ${light ? 'bg-white text-[#6e6f75]' : 'bg-cs-bg text-cs-fg-soft'}`}>
              team.json
            </span>
            <span className="flex-1" />
            <span className={`text-[11px] ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>{team.length} members</span>
          </div>
          <pre
            className={`m-0 overflow-x-auto p-4 leading-7 ${light ? 'bg-white text-[#1a1b1e]' : 'bg-cs-bg-card text-cs-fg'}`}
            aria-hidden="true"
          >
            {shown >= 1 && (
              <code className="flex gap-4">
                <span className={`w-6 select-none text-right ${light ? 'text-[#6e6f75]/60' : 'text-cs-fg-soft'}`}>01</span>
                <span>{'{'}</span>
              </code>
            )}
            {team.slice(0, Math.max(0, shown - 1)).map((m, i) => (
              <code key={m.name} className="flex gap-4">
                <span className={`w-6 select-none text-right ${light ? 'text-[#6e6f75]/60' : 'text-cs-fg-soft'}`}>
                  {String(i + 2).padStart(2, '0')}
                </span>
                <span className="whitespace-pre">
                  {'  '}
                  <span className="text-kd-lila">{`"${m.name.toLowerCase()}"`}</span>
                  {': '}
                  <span className="text-syn-comment">{m.role}</span>
                  {','}
                </span>
              </code>
            ))}
            {shown >= total && (
              <code className="flex gap-4">
                <span className={`w-6 select-none text-right ${light ? 'text-[#6e6f75]/60' : 'text-cs-fg-soft'}`}>
                  {String(team.length + 2).padStart(2, '0')}
                </span>
                <span>{'}'}</span>
              </code>
            )}
            {shown < total && (
              <span className="inline-block animate-cs-blink text-kd-pistacho" aria-hidden="true">▍</span>
            )}
          </pre>
        </div>
      </div>
    </header>
  );
}

function TeamGrid({ light }: { light: boolean }) {
  return (
    <section className="px-8 py-16" aria-labelledby="eq-team-title">
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-10 flex flex-col gap-2">
          <span className={`font-mono text-xs ${light ? 'text-syn-comment' : 'text-kd-pistacho'}`}>
            {'/* quienes formamos */'}
          </span>
          <h2
            id="eq-team-title"
            className={`m-0 font-display font-black leading-none tracking-tight ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            El ovillo
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <article
              key={member.name}
              className={`overflow-hidden rounded-xl border ${light ? 'border-black/10 bg-white' : 'border-cs-line bg-cs-bg-card'}`}
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={member.img}
                  alt={`Retrato de ${member.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span
                  className={`absolute bottom-2 right-2 rounded px-2 py-0.5 font-mono text-xs font-bold ${
                    light ? 'bg-white/90 text-[#1a1b1e]' : 'bg-cs-bg/90 text-cs-fg-soft'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              {/* Body */}
              <div className="flex flex-col gap-2 p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className={`m-0 font-display font-black text-xl ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>
                    {member.name}
                  </h3>
                  <span className={`font-mono text-xs ${light ? 'text-syn-comment' : 'text-kd-pistacho'}`}>
                    {member.role}
                  </span>
                </div>
                <p className={`m-0 text-sm leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection({ light }: { light: boolean }) {
  return (
    <section
      className={`px-8 py-16 ${light ? 'bg-[#ebebed]' : 'bg-cs-bg-2'}`}
      aria-labelledby="eq-why-title"
    >
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-10 flex flex-col gap-2">
          <span className={`font-mono text-xs ${light ? 'text-syn-comment' : 'text-kd-pistacho'}`}>
            {'/* por qué */'}
          </span>
          <h2
            id="eq-why-title"
            className={`m-0 font-display font-black leading-none tracking-tight ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            ¿Por qué KnitsDigital?
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {whyValues.map((w, i) => (
            <article
              key={w.title}
              className={`rounded-xl border p-6 ${light ? 'border-black/10 bg-white' : 'border-cs-line bg-cs-bg-card'}`}
            >
              <div className="mb-3 flex items-baseline gap-3">
                <span className={`font-mono font-black text-2xl ${light ? 'text-kd-lila-deep' : 'text-kd-lila'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={`m-0 font-display font-black text-lg ${light ? 'text-[#1a1b1e]' : 'text-cs-fg'}`}>
                  {w.title}
                </h3>
              </div>
              <p className={`m-0 leading-relaxed ${light ? 'text-[#6e6f75]' : 'text-cs-fg-soft'}`}>
                {w.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function EquipoPage() {
  const { isLight, light, mounted, toggle } = useTheme();

  return (
    <div
      className={`min-h-screen cs-grid-bg${light ? ' is-light' : ''}`}
      style={{
        backgroundColor: light ? '#f5f5f7' : '#0c0d10',
        color: light ? '#1a1b1e' : '#e4e5eb',
      }}
    >
      <PageNav isLight={isLight} mounted={mounted} toggle={toggle} />
      <main id="main" tabIndex={-1}>
        <EquipoHero light={light} />
        <TeamGrid light={light} />
        <WhySection light={light} />
      </main>
      <PageFooter isLight={light} />
    </div>
  );
}
