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
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? light
            ? 'border-b border-black/10 bg-[#f5f5f7]/95 backdrop-blur-xl shadow-sm'
            : 'border-b border-white/8 bg-cs-bg/95 backdrop-blur-xl shadow-sm'
          : light
          ? 'border-b border-transparent bg-[#f5f5f7]/90 backdrop-blur-sm'
          : 'border-b border-transparent bg-transparent'
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

        {/* Desktop nav */}
        <nav aria-label="Navegación principal" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const isCurrent = pathname === item.to;
            return (
              <Link
                key={item.to}
                href={item.to}
                aria-current={isCurrent ? 'page' : undefined}
                className={`inline-flex items-center gap-1.5 rounded-full border border-transparent px-4 py-2 font-mono text-[13px] font-bold no-underline transition-colors hover:border-kd-pistacho hover:text-kd-pistacho ${
                  isCurrent
                    ? 'text-kd-pistacho border-kd-pistacho/30'
                    : light ? 'text-[#1a1b1e]' : 'text-cs-fg'
                }`}
              >
                <span className="text-[10px] text-kd-pistacho opacity-70" aria-hidden="true">✧</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={isLight ? 'Activar modo oscuro' : 'Activar modo claro'}
            aria-pressed={isLight}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border bg-transparent transition-colors ${
              light
                ? 'border-black/15 text-[#1a1b1e] hover:bg-black/5'
                : 'border-white/10 text-cs-fg hover:bg-white/8'
            }`}
          >
            {mounted
              ? <Icon name={isLight ? 'sun' : 'moon'} width={18} height={18} aria-hidden="true" />
              : <Icon name="moon" width={18} height={18} aria-hidden="true" />
            }
          </button>

          {/* Desktop CTA */}
          <Link
            href={routes.contacto}
            className="hidden md:inline-flex items-center gap-2 rounded-[0.625rem] px-5 py-2.5 font-mono font-semibold text-[14px] no-underline transition-all hover:-translate-y-0.5 bg-kd-pistacho text-kd-black hover:bg-[#e5fc7a]"
          >
            Contactar <span aria-hidden="true">→</span>
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

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        aria-hidden={!menuOpen}
        className={`fixed top-0 right-0 bottom-0 z-50 flex flex-col gap-1 p-6 md:hidden ${
          light ? 'bg-[#f5f5f7]' : 'bg-cs-bg-2'
        }`}
        style={{
          width: 'min(80vw, 320px)',
          borderLeft: light ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.08)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
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
            className={`flex items-center gap-2 rounded-lg px-4 py-3 font-mono text-[15px] font-bold no-underline transition-colors ${
              light
                ? 'text-[#1a1b1e] hover:bg-black/5 hover:text-kd-pistacho-deep'
                : 'text-cs-fg hover:bg-white/5 hover:text-kd-pistacho'
            }`}
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateX(0)' : 'translateX(20px)',
              transition: `opacity 0.32s ease ${0.08 + i * 0.06}s, transform 0.32s ease ${0.08 + i * 0.06}s`,
            }}
          >
            <span className="text-[10px] text-kd-pistacho opacity-70" aria-hidden="true">✧</span>
            {item.label}
          </Link>
        ))}
        <Link
          href={routes.contacto}
          onClick={() => setMenuOpen(false)}
          tabIndex={menuOpen ? 0 : -1}
          className="mt-4 flex items-center justify-center gap-2 rounded-[0.625rem] px-6 py-3 font-mono font-semibold text-[15px] no-underline transition-all hover:-translate-y-0.5 bg-kd-pistacho text-kd-black hover:bg-[#e5fc7a]"
          style={{
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateX(0)' : 'translateX(20px)',
            transition: `opacity 0.32s ease ${0.08 + nav.length * 0.06}s, transform 0.32s ease ${0.08 + nav.length * 0.06}s`,
          }}
        >
          Contactar <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}
