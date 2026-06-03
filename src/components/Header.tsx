'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { routes, nav } from '@/lib/data';
import { Icon } from '@/lib/icons';
import styles from './Header.module.css';

interface HeaderProps {
  isLight?: boolean;
  onToggleTheme?: () => void;
}

export function Header({ isLight = false, onToggleTheme }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  // Focus trap inside drawer
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;
    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    focusable[0].focus();

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleTabTrap);
    return () => document.removeEventListener('keydown', handleTabTrap);
  }, [isOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    burgerRef.current?.focus();
  }, []);

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isLight ? styles.light : ''}`}
      role="banner"
    >
      <a href="#main" className={styles.skip}>
        Saltar al contenido
      </a>
      <div className={styles.inner}>
        <Link href={routes.home} className={styles.logo} aria-label="KnitsDigital — Inicio">
          <img src="/assets/isotype.png" alt="" width={32} height={32} />
          <span>knitsdigital</span>
        </Link>

        <nav aria-label="Navegación principal" className={styles.menu}>
          {nav.map((item) => (
            <Link key={item.to} href={item.to} className={styles.link}>
              <span className={styles.spark} aria-hidden="true">✧</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {onToggleTheme && (
            <button
              type="button"
              className={styles.themeBtn}
              onClick={onToggleTheme}
              aria-pressed={isLight}
              aria-label={isLight ? 'Activar modo oscuro' : 'Activar modo claro'}
            >
              <Icon name={isLight ? 'sun' : 'moon'} width={18} height={18} aria-hidden="true" />
            </button>
          )}
          <Link href={routes.contacto} className={styles.cta}>
            Contactar
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>
          <button
            ref={burgerRef}
            type="button"
            className={styles.burger}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((v) => !v)}
          >
            <Icon name={isOpen ? 'close' : 'menu'} width={22} height={22} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ''}`}
        aria-hidden="true"
        onClick={closeMenu}
      />

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        ref={drawerRef}
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        aria-hidden={!isOpen}
      >
        <div className={styles.drawerInner}>
          <button
            type="button"
            className={styles.drawerClose}
            aria-label="Cerrar menú"
            onClick={closeMenu}
          >
            <Icon name="close" width={20} height={20} aria-hidden="true" />
          </button>
          {nav.map((item, i) => (
            <Link
              key={item.to}
              href={item.to}
              onClick={closeMenu}
              className={styles.drawerLink}
              style={{ '--link-i': i } as React.CSSProperties}
              tabIndex={isOpen ? 0 : -1}
            >
              <span className={styles.spark} aria-hidden="true">✧</span>
              {item.label}
            </Link>
          ))}
          <Link
            href={routes.contacto}
            className={`${styles.cta} ${styles.drawerCta}`}
            onClick={closeMenu}
            style={{ '--link-i': nav.length } as React.CSSProperties}
            tabIndex={isOpen ? 0 : -1}
          >
            Contactar <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
