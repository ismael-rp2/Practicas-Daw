import PageLayout   from '@/components/PageLayout';
import HeroJD       from '@/components/HeroJD';
import AboutGallery from '@/components/AboutGallery';
import Footer       from '@/components/Footer';

export default function Home() {
  return (
    <PageLayout>
      <HeroJD />
      <AboutGallery />
      <Footer />
    </PageLayout>
  );
}
