import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Política de Cookies — KnitsDigital',
  description: 'Política de cookies de KnitsDigital.',
};

export default function CookiesPage() {
  return (
    <Layout>
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Uso de Cookies</h1>
        <p>KnitsDigital utiliza cookies para mejorar tu experiencia en nuestro sitio web.</p>
      </section>
    </Layout>
  );
}
