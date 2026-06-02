'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { routes, nav } from '@/lib/data';
import styles from './Header.module.css';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`} role="banner">
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
          <button
            className={styles.themeBtn}
            onClick={() => setIsDark(!isDark)}
            aria-pressed={isDark}
            aria-label={isDark ? 'Modo claro' : 'Modo oscuro'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <Link href={routes.contacto} className={styles.cta}>
            Contactar
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>
          <button
            className={styles.burger}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <div className={`${styles.mobile} ${isOpen ? styles.open : ''}`} role="dialog">
        <div className={styles.mobileInner}>
          {nav.map((item, i) => (
            <Link
              key={item.to}
              href={item.to}
              onClick={() => setIsOpen(false)}
              className={styles.mobileLink}
              style={{ '--i': i } as React.CSSProperties}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={routes.contacto}
            className={`${styles.cta} ${styles.mobileCta}`}
            onClick={() => setIsOpen(false)}
            style={{ '--i': nav.length } as React.CSSProperties}
          >
            Contactar <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
