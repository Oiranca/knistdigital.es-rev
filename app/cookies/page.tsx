import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Uso de cookies — KnitsDigital',
  description: 'Política de uso de cookies de KnitsDigital.',
};

export default function CookiesPage() {
  return (
    <Layout>
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Uso de cookies</h1>
        <p>Próximamente...</p>
      </section>
    </Layout>
  );
}
