import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Servicios — KnitsDigital',
  description: 'Servicios de desarrollo y diseño accesible de KnitsDigital.',
};

export default function ServiciosPage() {
  return (
    <Layout>
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Servicios</h1>
        <p>Próximamente...</p>
      </section>
    </Layout>
  );
}
