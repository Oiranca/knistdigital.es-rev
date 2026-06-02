'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { routes } from '@/lib/data';
import styles from './Hero.module.css';

const CODE_LINES = [
  'function knitsdigital() {',
  '  // Donde la tecnología, la creatividad',
  '  // y las personas se entrelazan.',
  '  return {',
  "    accesibilidad: 'WCAG 2.2',",
  '    inclusión: true,',
  "    talento: 'diverso · horizontal'",
  '  };',
  '}',
];

export function Hero() {
  const [lineCount, setLineCount] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) {
      setLineCount(CODE_LINES.length);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setLineCount(i);
      if (i >= CODE_LINES.length) clearInterval(interval);
    }, 280);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.grid}>
        <div className={styles.text}>
          <div className={styles.badge}>
            <span className={styles.led} aria-hidden="true" />
            <span>~/knitsdigital</span>
            <span className={styles.ledSoft} aria-hidden="true">●</span>
          </div>
          <h1 id="hero-title" className={styles.title}>
            Tejemos código<br />
            <span className={styles.highlight}>accesible</span>.
          </h1>
          <p className={styles.subtitle}>
            Estudio digital especializado en producto accesible, inclusivo y sostenible. WCAG 2.2, no-code, IA aplicada y auditorías reales.
          </p>
          <div className={styles.ctas}>
            <Link href={routes.contacto} className={`${styles.btn} ${styles.primary}`}>
              Contactar <span className={styles.cursor}>_</span>
            </Link>
            <Link href={routes.servicios} className={`${styles.btn} ${styles.ghost}`}>
              Ver servicios <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className={styles.editor} role="img" aria-label="Ejemplo de código que describe nuestros valores">
          <div className={styles.editorBar}>
            <span className={`${styles.light} ${styles.lightR}`} />
            <span className={`${styles.light} ${styles.lightY}`} />
            <span className={`${styles.light} ${styles.lightG}`} />
            <span className={styles.tab}>knitsdigital.ts</span>
            <span className={styles.barSpacer} />
            <span className={styles.barMeta}>UTF-8 · LF · TypeScript</span>
          </div>
          <pre className={styles.editorBody} aria-hidden="true">
            {CODE_LINES.slice(0, lineCount).map((line, i) => (
              <code key={i} className={styles.codeLine}>
                <span className={styles.gutter}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.codeText}>{line}</span>
              </code>
            ))}
            {lineCount < CODE_LINES.length && (
              <span className={styles.typingCursor} aria-hidden="true">▍</span>
            )}
          </pre>
        </div>
      </div>

      <div className={styles.heroBg} aria-hidden="true" />
    </section>
  );
}
