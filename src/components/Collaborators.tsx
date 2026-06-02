'use client';

import { useState } from 'react';
import { collaborators } from '@/lib/data';
import Image from 'next/image';
import styles from './Collaborators.module.css';

export function Collaborators() {
  const [paused, setPaused] = useState(false);
  const list = [...collaborators, ...collaborators];

  return (
    <section className={styles.collab} aria-labelledby="collab-title">
      <header className={styles.sectionHead}>
        <span className={styles.tag}>/* clientes */</span>
        <h2 id="collab-title">Casos de éxito</h2>
        <p>Empresas que confían en nuestro tejido.</p>
      </header>

      <div className={styles.collabWrap}>
        <div
          className={`${styles.collabMarquee} ${paused ? styles.paused : ''}`}
          aria-label="Logos de clientes"
          role="region"
        >
          <ul className={styles.collabTrack} role="list">
            {list.map((c, i) => (
              <li key={i}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={c.alt}
                  tabIndex={i >= collaborators.length ? -1 : 0}
                  aria-hidden={i >= collaborators.length}
                >
                  <img
                    src={c.img}
                    alt={i < collaborators.length ? c.alt : ''}
                    aria-hidden={i >= collaborators.length}
                    loading="lazy"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className={styles.collabToggle}
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Reanudar carrusel' : 'Pausar carrusel'}
          aria-pressed={paused}
        >
          {paused ? '▶' : '⏸'}
          <span>{paused ? 'Play' : 'Pause'}</span>
        </button>
      </div>
    </section>
  );
}
