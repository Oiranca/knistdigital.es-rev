import { Metadata } from 'next';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';

export const metadata: Metadata = {
  title: 'KnitsDigital — Code Studio',
  description: 'Estudio digital especializado en producto accesible, inclusivo y sostenible. WCAG 2.2, no-code, IA aplicada y auditorías reales.',
};

export default function Home() {
  return (
    <Layout>
      <Hero />
    </Layout>
  );
}
