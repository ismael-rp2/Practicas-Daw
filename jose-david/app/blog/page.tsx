import PageLayout from '@/components/PageLayout';
import HeroPage  from '@/components/HeroPage';
import Footer     from '@/components/Footer';

export default function BlogPage() {
  return (
    <PageLayout>
      <HeroPage
        label="05 — Blog"
        line1Normal="Ideas sobre "
        line1Accent="educación"
        line2Normal="e Inteligencia "
        line2Accent="Artificial."
        sub="Artículos, reflexiones y recursos sobre educación, tecnología e IA. Próximamente."
        stamp="José David — Blog"
      />
      <section style={{ padding: '8rem calc(4vw + var(--nav-sw, 60px))', minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', color: 'var(--muted)', textAlign: 'center', fontWeight: 300, letterSpacing: '-0.01em' }}>
          Blog en construcción —{' '}
          <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>próximamente.</em>
        </p>
      </section>
      <Footer />
    </PageLayout>
  );
}
