import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Contacto — KnitsDigital',
  description: 'Contacta con KnitsDigital.',
};

export default function ContactoPage() {
  return (
    <Layout>
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Contacto</h1>
        <p>Próximamente...</p>
      </section>
    </Layout>
  );
}
