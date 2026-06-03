import Link from 'next/link';
import { routes, footerLegal } from '@/lib/data';
import { Icon } from '@/lib/icons';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.top}>
        <Link href={routes.home} className={styles.brand} aria-label="KnitsDigital — Inicio">
          <img src="/assets/isotype.png" alt="" width={48} height={48} />
          <span className={styles.wordmark}>knitsdigital</span>
        </Link>
        <p className={styles.tag}>
          Donde la tecnología, la <em>creatividad</em> y las personas <em>se entrelazan</em>.
        </p>
      </div>

      <div className={styles.grid}>
        <nav aria-label="Pie" className={styles.nav}>
          <div>
            <h3>Navega</h3>
            <ul>
              <li><Link href={routes.servicios}>Servicios</Link></li>
              <li><Link href={routes.equipo}>Equipo</Link></li>
              <li><Link href={routes.precios}>Precios</Link></li>
              <li><Link href={routes.contacto}>Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3>Legal</h3>
            <ul>
              {footerLegal.map((item) => (
                <li key={item.to}>
                  <Link href={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Síguenos</h3>
            <ul className={styles.social}>
              <li>
                <a
                  href="https://www.instagram.com/knits_digital/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className={styles.socialLink}
                >
                  <Icon name="instagram" width={18} height={18} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/knits-digital/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className={styles.socialLink}
                >
                  <Icon name="linkedin" width={18} height={18} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <span>© KnitsDigital {year}</span>
        <span>Hecho con accesibilidad como hilo conductor.</span>
      </div>
    </footer>
  );
}
