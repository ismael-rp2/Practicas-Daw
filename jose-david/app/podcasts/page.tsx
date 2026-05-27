import PageLayout from '@/components/PageLayout';
import HeroPage  from '@/components/HeroPage';
import Podcasts   from '@/components/Podcasts';
import Footer     from '@/components/Footer';

export default function PodcastsPage() {
  return (
    <PageLayout>
      <HeroPage
        label="06 — Podcasts"
        line1Normal="Mi voz "
        line1Accent="digital"
        line2Normal="para docentes "
        line2Accent="innovadores."
        sub="Seis proyectos de audio sobre educación, tecnología e IA. Escúchalos donde quieras, cuando quieras."
        stamp="José David — Podcasts"
        soundWave
      />
      <Podcasts />
      <Footer />
    </PageLayout>
  );
}
