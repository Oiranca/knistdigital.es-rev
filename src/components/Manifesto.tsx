'use client';

import { manifesto } from '@/lib/data';
import styles from './Manifesto.module.css';

const iconMap: { [key: string]: string } = {
  accessibility: '♿',
  people: '👥',
  growth: '📈',
};

export function Manifesto() {
  return (
    <section className={styles.manifesto} aria-labelledby="manifesto-title">
      <header className={styles.sectionHead}>
        <span className={styles.tag}>/* manifest */</span>
        <h2 id="manifesto-title">Manifiesto</h2>
        <p>Tus ideas, perfectamente "knit"eadas.</p>
      </header>

      <ol className={styles.commits}>
        {manifesto.map((m, i) => (
          <li key={m.title} className={styles.commit} style={{ '--i': i } as React.CSSProperties}>
            <div className={styles.commitHash} aria-hidden="true">
              {Math.random().toString(16).slice(2, 9)}
            </div>
            <div className={styles.commitBody}>
              <span className={styles.commitAuthor}>knits &lt;hola@knitsdigital.es&gt;</span>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
              <div className={styles.commitMeta}>
                <span>{iconMap[m.icon] || '•'} {m.icon}</span>
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
