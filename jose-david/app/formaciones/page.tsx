import PageLayout  from '@/components/PageLayout';
import HeroPage    from '@/components/HeroPage';
import Formaciones from '@/components/Formaciones';
import Footer      from '@/components/Footer';

export default function FormacionesPage() {
  return (
    <PageLayout>
      <HeroPage
        label="03 — Formaciones"
        line1Normal="Formaciones a "
        line1Accent="medida"
        line2Normal="para centros y "
        line2Accent="congresos."
        sub="Ponente nacional e internacional. Capacitaciones para centros educativos, congresos e instituciones."
        stamp="José David — Formaciones"
      />
      <Formaciones />
      <Footer />
    </PageLayout>
  );
}
