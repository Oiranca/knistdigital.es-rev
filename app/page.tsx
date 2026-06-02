import { Metadata } from 'next';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Manifesto } from '@/components/Manifesto';
import { Collaborators } from '@/components/Collaborators';
import { CTA } from '@/components/CTA';

export const metadata: Metadata = {
  title: 'KnitsDigital — Code Studio',
  description: 'Estudio digital especializado en producto accesible, inclusivo y sostenible. WCAG 2.2, no-code, IA aplicada y auditorías reales.',
};

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Services />
      <Manifesto />
      <Collaborators />
      <CTA />
    </Layout>
  );
}
