'use client';

import Link from 'next/link';
import { routes } from '@/lib/data';
import styles from './CTA.module.css';

export function CTA() {
  return (
    <section className={styles.cta} aria-labelledby="cta-title">
      <div className={styles.ctaInner}>
        <span className={styles.tag}>/* contacto */</span>
        <h2 id="cta-title">
          ¿Empezamos a tejer<br />
          <span className={styles.highlight}>tu próximo proyecto?</span>
        </h2>
        <p>Una conversación es el primer commit. Te respondemos en menos de 48h.</p>
        <Link href={routes.contacto} className={`${styles.btn} ${styles.btnPrimary}`}>
          Contactar <span className={styles.cursor}>_</span>
        </Link>
      </div>
    </section>
  );
}
