import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Política de Privacidad — KnitsDigital',
  description: 'Política de privacidad de KnitsDigital.',
};

export default function PrivacidadPage() {
  return (
    <Layout>
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Política de Privacidad</h1>
        <p>En KnitsDigital respetamos tu privacidad y nos comprometemos a proteger tus datos personales.</p>
      </section>
    </Layout>
  );
}
