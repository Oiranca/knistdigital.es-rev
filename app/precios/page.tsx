import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Precios — KnitsDigital',
  description: 'Planes y precios de KnitsDigital.',
};

export default function PreciosPage() {
  return (
    <Layout>
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Precios</h1>
        <p>Planes adaptados a tu proyecto</p>
      </section>
    </Layout>
  );
}
