import PageLayout from '@/components/PageLayout';
import HeroPage   from '@/components/HeroPage';
import Contact    from '@/components/Contact';
import Footer     from '@/components/Footer';

export default function ContactoPage() {
  return (
    <PageLayout>
      <HeroPage
        label="04 — Contacto"
        line1Normal="Hablemos de tu "
        line1Accent="proyecto"
        line2Normal="educativo y de "
        line2Accent="IA."
        sub="Contrataciones, conferencias, formaciones para centros o dudas sobre mis cursos. Estoy aquí para ayudarte."
        stamp="José David — Contacto"
      />
      <div className="cards-wrapper">
        <div className="section-card"><Contact /></div>
      </div>
      <Footer />
    </PageLayout>
  );
}
