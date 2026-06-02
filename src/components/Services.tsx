'use client';

import { useState } from 'react';
import { services } from '@/lib/data';
import Link from 'next/link';
import styles from './Services.module.css';

export function Services() {
  const [active, setActive] = useState(0);
  const activeService = services[active];

  return (
    <section className={styles.services} aria-labelledby="services-title">
      <header className={styles.sectionHead}>
        <span className={styles.tag}>/* servicios */</span>
        <h2 id="services-title">Servicios</h2>
        <p>Importamos lo que necesitas; exportamos producto digital que funciona.</p>
      </header>

      <div className={styles.shell}>
        {/* Explorer sidebar */}
        <aside className={styles.tree} aria-label="Lista de servicios">
          <div className={styles.treeHead}>EXPLORER</div>
          <ul role="tablist">
            {services.map((s, i) => (
              <li key={s.num}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-controls={`panel-${i}`}
                  id={`tab-${i}`}
                  onClick={() => setActive(i)}
                  className={`${styles.treeItem} ${active === i ? styles.active : ''}`}
                >
                  <span className={styles.treeIcon} aria-hidden="true">▸</span>
                  <span className={styles.treeName}>{s.tag}.module.ts</span>
                  <span className={styles.treeBadge}>{s.num}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.treeFoot} aria-hidden="true">
            <div className={styles.treeSearch}>⌘P · Buscar archivo…</div>
          </div>
        </aside>

        {/* Content tabs */}
        <div className={styles.tabs}>
          {services.map((s, i) => (
            <article
              key={s.num}
              id={`panel-${i}`}
              role="tabpanel"
              aria-labelledby={`tab-${i}`}
              hidden={active !== i}
              className={`${styles.panel} ${styles[`panel${s.color}`]}`}
            >
              <header className={styles.panelHead}>
                <span className={styles.comment}>{`// ${s.tag}.module`}</span>
                <h3>{s.title}</h3>
              </header>
              <p className={styles.panelDesc}>{s.desc}</p>
              {active === i && (
                <pre className={styles.snippet} aria-hidden="true">
                  <code>
                    <span className={styles.num}>01</span>
                    <span>{`export const ${s.tag} = () => {`}</span>
                    {'\n'}
                    <span className={styles.num}>02</span>
                    <span>{`  return { accesible: true, impacto: 'real' };`}</span>
                    {'\n'}
                    <span className={styles.num}>03</span>
                    <span>{`};`}</span>
                  </code>
                </pre>
              )}
              <Link href="#" className={styles.panelLink}>
                Saber más <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
