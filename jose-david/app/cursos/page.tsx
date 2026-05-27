import PageLayout from '@/components/PageLayout';
import HeroPage   from '@/components/HeroPage';
import Cursos     from '@/components/Cursos';
import Footer     from '@/components/Footer';

export default function CursosPage() {
  return (
    <PageLayout>
      <HeroPage
        label="02 — Cursos"
        line1Normal="Aprende a transformar "
        line1Accent="tu aula"
        line2Normal="con Inteligencia "
        line2Accent="Artificial."
        sub="Formación práctica y accionable para docentes. Cursos online, comunidad y herramientas reales para aplicar desde el primer día."
        stamp="José David — Cursos"
      />
      <div className="cards-wrapper">
        <div className="section-card"><Cursos /></div>
      </div>
      <Footer />
    </PageLayout>
  );
}
