import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Equipo — KnitsDigital',
  description: 'Conoce al equipo de KnitsDigital.',
};

export default function EquipoPage() {
  return (
    <Layout>
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Equipo</h1>
        <p>Talento diverso y horizontal</p>
      </section>
    </Layout>
  );
}
