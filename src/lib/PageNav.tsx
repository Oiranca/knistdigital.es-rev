'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Icon } from './icons';
import { nav, routes } from './data';

interface PageNavProps {
  isLight: boolean;
  mounted: boolean;
  toggle: () => void;
}

export function PageNav({ isLight, mounted, toggle }: PageNavProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const light = mounted && isLight;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        // 350ms transition matching original .v3-nav spec
        transition: 'background .35s var(--kd-ease), border-color .35s var(--kd-ease), backdrop-filter .35s var(--kd-ease)',
        background: scrolled
          ? light
            ? 'color-mix(in srgb, #f4f1ea 88%, transparent)'
            : 'color-mix(in srgb, #0c0d10 55%, transparent)'
          : light
            ? 'color-mix(in srgb, #f4f1ea 92%, transparent)'
            : 'transparent',
        borderBottom: scrolled
          ? light
            ? '1px solid color-mix(in srgb, #1a1a1a 18%, transparent)'
            : '1px solid color-mix(in srgb, #e4e5eb 12%, transparent)'
          : '1px solid transparent',
        // blur(28px) saturate(180%) when scrolled — no shadow
        backdropFilter: scrolled ? 'blur(28px) saturate(180%)' : undefined,
        WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(180%)' : undefined,
      }}
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

        {/* Desktop nav — no per-link spark, padding 10/16, 14px, letter-spacing .02em */}
        <nav aria-label="Navegación principal" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const isCurrent = pathname === item.to;
            return (
              <Link
                key={item.to}
                href={item.to}
                aria-current={isCurrent ? 'page' : undefined}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '10px 16px',
                  borderRadius: '999px',
                  border: '1px solid transparent',
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '.02em',
                  textDecoration: 'none',
                  // transition only border-color + color, 250ms
                  transition: 'border-color .25s, color .25s',
                  color: isCurrent
                    ? light ? 'var(--color-kd-lila-deep)' : 'var(--color-kd-pistacho)'
                    : light ? '#1a1b1e' : 'var(--color-cs-fg)',
                  borderColor: isCurrent
                    ? light ? 'color-mix(in srgb, var(--color-kd-lila-deep) 30%, transparent)' : 'color-mix(in srgb, var(--color-kd-pistacho) 30%, transparent)'
                    : 'transparent',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = light
                    ? 'var(--color-kd-lila-deep)'
                    : 'var(--color-kd-pistacho)';
                  (e.currentTarget as HTMLElement).style.color = light
                    ? 'var(--color-kd-lila-deep)'
                    : 'var(--color-kd-pistacho)';
                }}
                onMouseLeave={(e) => {
                  if (!isCurrent) {
                    (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = light ? '#1a1b1e' : 'var(--color-cs-fg)';
                  }
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme toggle — hover rotate(15deg) + bg transition .25s */}
          <button
            type="button"
            onClick={toggle}
            aria-label={isLight ? 'Activar modo oscuro' : 'Activar modo claro'}
            aria-pressed={isLight}
            style={{
              display: 'inline-flex',
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '999px',
              border: light ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.08)',
              background: 'transparent',
              color: light ? '#1a1b1e' : 'var(--color-cs-fg)',
              cursor: 'pointer',
              // transition background + transform both .25s
              transition: 'background .25s, transform .25s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = light
                ? 'rgba(0,0,0,0.08)'
                : 'rgba(255,255,255,0.08)';
              (e.currentTarget as HTMLElement).style.transform = 'rotate(15deg)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg)';
            }}
          >
            {mounted
              ? <Icon name={isLight ? 'sun' : 'moon'} width={18} height={18} aria-hidden="true" />
              : <Icon name="moon" width={18} height={18} aria-hidden="true" />
            }
          </button>

          {/* Desktop CTA — pill 999px, 12/22 padding, fw800, 15px, gap 10px, no lift */}
          <Link
            href={routes.contact}
            className="nav-cta hidden md:inline-flex items-center no-underline"
            style={{
              gap: 10,
              padding: '12px 22px',
              borderRadius: '999px',
              fontWeight: 800,
              fontSize: 15,
              letterSpacing: '-.005em',
              textDecoration: 'none',
              background: light ? '#2b2b2b' : 'var(--color-kd-pistacho)',
              color: light ? '#f4f1ea' : 'var(--color-kd-black)',
              // transition: gap/background/color only — NO translateY lift
              transition: 'gap .25s, background .25s, color .25s',
            }}
          >
            Contactar
            {/* Arrow with its own translateX transition, never the whole button */}
            <span aria-hidden="true" className="nav-cta-arrow">→</span>
          </Link>

          {/* Burger */}
          <button
            ref={burgerRef}
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
            className={`inline-flex md:hidden h-9 w-9 items-center justify-center rounded-full border bg-transparent transition-colors ${
              light
                ? 'border-black/15 text-[#1a1b1e] hover:bg-black/5'
                : 'border-white/10 text-cs-fg hover:bg-white/8'
            }`}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} width={20} height={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
          style={{ animation: 'v1-fadeup 0.2s ease forwards' }}
        />
      )}

      {/* Mobile drawer — side drawer kept; stagger fixed to .04s*i / .25s; no spark spans */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        aria-hidden={!menuOpen}
        className={`fixed top-0 right-0 bottom-0 z-50 flex flex-col gap-1 p-6 md:hidden ${
          light ? 'bg-[#f4f1ea]' : 'bg-cs-bg-2'
        }`}
        style={{
          width: 'min(80vw, 320px)',
          borderLeft: light ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.08)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.22,0.61,0.36,1)',
        }}
      >
        <button
          type="button"
          aria-label="Cerrar menú"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
          className={`self-end inline-flex h-9 w-9 items-center justify-center rounded-full border bg-transparent mb-4 transition-colors ${
            light
              ? 'border-black/15 text-[#1a1b1e] hover:bg-black/5'
              : 'border-white/10 text-cs-fg hover:bg-white/8'
          }`}
        >
          <Icon name="close" width={18} height={18} aria-hidden="true" />
        </button>
        {nav.map((item, i) => (
          <Link
            key={item.to}
            href={item.to}
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            aria-current={pathname === item.to ? 'page' : undefined}
            className={`flex items-center rounded-lg px-4 py-3 font-mono text-[15px] font-bold no-underline transition-colors ${
              light
                ? 'text-[#1a1b1e] hover:bg-black/5 hover:text-kd-pistacho-deep'
                : 'text-cs-fg hover:bg-white/5 hover:text-kd-pistacho'
            }`}
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateX(0)' : 'translateX(20px)',
              // stagger: .04s * i, duration .25s
              transition: `opacity .25s ease ${i * 0.04}s, transform .25s ease ${i * 0.04}s`,
            }}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={routes.contact}
          onClick={() => setMenuOpen(false)}
          tabIndex={menuOpen ? 0 : -1}
          className="nav-cta mt-4 flex items-center justify-center no-underline"
          style={{
            gap: 10,
            padding: '12px 22px',
            borderRadius: '999px',
            fontWeight: 800,
            fontSize: 15,
            background: light ? '#2b2b2b' : 'var(--color-kd-pistacho)',
            color: light ? '#f4f1ea' : 'var(--color-kd-black)',
            transition: `opacity .25s ease ${nav.length * 0.04}s, transform .25s ease ${nav.length * 0.04}s, background .25s, color .25s`,
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateX(0)' : 'translateX(20px)',
          }}
        >
          Contactar <span aria-hidden="true" className="nav-cta-arrow">→</span>
        </Link>
      </div>

      {/* CTA arrow hover: inject a minimal style rule so :hover can reach the arrow span */}
      <style>{`
        .nav-cta-arrow { transition: transform .3s var(--kd-ease, cubic-bezier(.22,.61,.36,1)); display: inline-block; }
        .nav-cta:hover .nav-cta-arrow { transform: translateX(4px); }
      `}</style>
    </header>
  );
}
