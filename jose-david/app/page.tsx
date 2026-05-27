import PageLayout from '@/components/PageLayout';
import HeroJD     from '@/components/HeroJD';
import AboutJD    from '@/components/AboutJD';
import Footer     from '@/components/Footer';

export default function Home() {
  return (
    <PageLayout>
      <HeroJD />
      <AboutJD />
      <Footer />
    </PageLayout>
  );
}
