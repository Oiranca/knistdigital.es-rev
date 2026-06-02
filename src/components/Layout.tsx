import { Header } from './Header';
import { Footer } from './Footer';
import styles from './Layout.module.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      <Header />
      <main id="main" className={styles.main} tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
