import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Contacto — KnitsDigital',
  description: 'Contacta con KnitsDigital para tu próximo proyecto.',
};

export default function ContactoPage() {
  return (
    <Layout>
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Contacto</h1>
        <p>Una conversación es el primer commit. Te respondemos en menos de 48h.</p>
        <p style={{ marginTop: '24px' }}>Email: <a href="mailto:hola@knitsdigital.es">hola@knitsdigital.es</a></p>
      </section>
    </Layout>
  );
}
