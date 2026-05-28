import PageLayout   from '@/components/PageLayout';
import PageLoader   from '@/components/PageLoader';
import HeroJD       from '@/components/HeroJD';
import AboutGallery from '@/components/AboutGallery';
import Footer       from '@/components/Footer';

export default function Home() {
  return (
    <>
      <PageLoader />
      <PageLayout>
        <HeroJD />
        <AboutGallery />
        <Footer />
      </PageLayout>
    </>
  );
}
