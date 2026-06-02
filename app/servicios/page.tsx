import { Metadata } from 'next';
import { Layout } from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Servicios — KnitsDigital',
  description: 'Servicios de KnitsDigital: diseño UX/UI, desarrollo web y apps móviles.',
};

export default function ServiciosPage() {
  return (
    <Layout>
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Servicios</h1>
        <p>Diseño UX/UI, Desarrollo Web, Apps Móviles</p>
      </section>
    </Layout>
  );
}
