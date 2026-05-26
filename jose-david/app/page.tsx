import PageLayout from '@/components/PageLayout';
import HeroJD     from '@/components/HeroJD';
import AboutJD    from '@/components/AboutJD';
import Cursos     from '@/components/Cursos';
import Podcasts   from '@/components/Podcasts';
import Contact    from '@/components/Contact';
import Footer     from '@/components/Footer';

export default function Home() {
  return (
    <PageLayout>

      {/* Hero — 3D models con modelos educativos */}
      <HeroJD />

      {/* About — ventanas OS draggables */}
      <AboutJD />

      {/* Cursos y formaciones — tarjetas glassmorphism */}
      <div className="cards-wrapper">
        <div className="section-card"><Cursos /></div>
      </div>

      {/* Podcasts — lista tipo serial-portfolio */}
      <Podcasts />

      {/* Contacto — con animación red neuronal GSAP */}
      <div className="cards-wrapper">
        <div className="section-card"><Contact /></div>
      </div>

      <Footer />

    </PageLayout>
  );
}
