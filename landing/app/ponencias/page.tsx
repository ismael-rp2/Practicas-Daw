import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';
import SectionEyebrow from '@/components/SectionEyebrow';
import LogoMarquee from '@/components/LogoMarquee';
import Reveal from '@/components/Reveal';
import HeroCanvas from '@/components/HeroCanvas';
import GlowCTAButton from '@/components/GlowCTAButton';
import { Mic, Target, Users, Zap } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// DATOS — formatos de ponencia (§5.8)
// ─────────────────────────────────────────────────────────────────────────────
const FORMATOS = [
  { icon: <Mic    className="w-7 h-7 text-purple-400" />, label: 'Keynote de apertura o cierre', time: '45 – 60 min',     desc: 'El discurso que marca el tono de todo el evento.' },
  { icon: <Target className="w-7 h-7 text-purple-400" />, label: 'Ponencia central',              time: '30 – 45 min',     desc: 'Profundidad y argumentación sobre un tema concreto.' },
  { icon: <Users  className="w-7 h-7 text-purple-400" />, label: 'Mesa redonda',                  time: null,              desc: 'Moderación o participación. Contraste de perspectivas con criterio.' },
  { icon: <Zap    className="w-7 h-7 text-purple-400" />, label: 'Charla TED-style',              time: '15 – 20 min',     desc: 'Impacto máximo, foco único, recuerdo garantizado.' },
];

// DATOS — temas tratados (§5.8)
const TEMAS = [
  { num: '01', title: 'IA y docencia: cómo salir de la parálisis', desc: 'Por qué el 78 % de los profes que prueban IA la abandonan en un mes y cómo evitarlo.' },
  { num: '02', title: 'El profe aumentado: herramientas sin perder la voz', desc: 'La IA como copiloto pedagógico, no como sustituto. Dónde está el límite y cómo encontrarlo.' },
  { num: '03', title: 'Evaluar en la era de ChatGPT', desc: 'Nuevos marcos de evaluación que tienen sentido cuando el alumno tiene acceso a IA generativa.' },
  { num: '04', title: 'Liderazgo educativo e inteligencia artificial', desc: 'Para equipos directivos: cómo llevar la IA al claustro sin imposición y con resultados.' },
  { num: '05', title: 'Familias, hijos y pantallas: la conversación pendiente', desc: 'Conferencia para AMPA y comunidades educativas sobre IA, adolescentes y uso crítico.' },
  { num: '06', title: 'El futuro del aprendizaje ya empezó', desc: 'Visión de largo plazo: qué habilidades sobreviven a la IA y cómo prepara la escuela para ellas.' },
];

// DATOS — eventos donde ha participado (para marquee)
const EVENTOS = [
  'SIMO Educación',
  'GEG Spain Summit',
  'Congreso Internacional EDUTEC',
  'Jornadas Andaluzas de Tecnología Educativa',
  'TEDx Sevilla',
  'Forum Europeo de Educación',
  'Congreso CNTE',
  'BilbaoEdTech',
];

// ─────────────────────────────────────────────────────────────────────────────
const sectionWrap: React.CSSProperties = {
  width        : '100%',
  maxWidth     : 1280,
  marginInline : 'auto',
  paddingInline: 'clamp(1.25rem, 5vw, 4rem)',
};

const divider: React.CSSProperties = {
  height      : 1,
  background  : 'var(--border-subtle)',
  marginBottom: 'clamp(3rem, 7vw, 5rem)',
};

const h2Style: React.CSSProperties = {
  fontFamily   : 'var(--sans)',
  fontSize     : 'clamp(1.75rem, 4vw, 3rem)',
  fontWeight   : 800,
  letterSpacing: '-0.03em',
  lineHeight   : 1.1,
  color        : '#fff',
  marginTop    : '1.25rem',
  maxWidth     : '28ch',
};

/**
 * Página de ponencias B2B para eventos y congresos educativos (§5.8).
 * CTA principal → /contacto (contratación directa sin e-commerce).
 */
export default function PonenciasPage() {
  return (
    <>
      <Header />

      <main>

        {/* ════════════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)', paddingBlock: 'clamp(5rem, 14svh, 10rem)' }}>
          <HeroCanvas />
          <div style={{ ...sectionWrap, position: 'relative', zIndex: 1 }}>
            <Reveal>
              <SectionEyebrow text="Ponencias" />
            </Reveal>
            <Reveal delay={0.07}>
              <h1 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(2.4rem, 6.5vw, 5rem)',
                fontWeight   : 900,
                letterSpacing: '-0.04em',
                lineHeight   : 1.05,
                color        : '#fff',
                marginTop    : '1rem',
                marginBottom : 'clamp(1.25rem, 3vw, 2rem)',
                maxWidth     : '20ch',
              }}>
                Llevo conversaciones sobre IA y educación a tu evento.
              </h1>
            </Reveal>
            <Reveal delay={0.13}>
              <p style={{
                fontSize    : 'clamp(1rem, 2vw, 1.2rem)',
                lineHeight  : 1.7,
                color       : 'var(--text-secondary)',
                maxWidth    : '58ch',
                marginBottom: 'clamp(1.75rem, 4vw, 2.75rem)',
              }}>
                Inspirar, agitar, ordenar el ruido. Eso es lo que hago en el escenario. Sin hype, sin tecnicismos vacíos: una charla que el público recordará cuando llegue al aula el lunes siguiente.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <CTAButton href="/contacto" variant="primary">
                CONTRATAR PONENCIA →
              </CTAButton>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            FORMATOS
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-deep)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="01" text="Formatos" />
              <h2 style={h2Style}>Me adapto a tu programa y a tu audiencia.</h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 rounded-3xl overflow-hidden border border-white/10 mt-10">
              {FORMATOS.map(({ icon, label, time, desc }) => (
                <div
                  key={label}
                  className="bg-zinc-950 p-10 hover:bg-zinc-900/80 transition-colors duration-500 flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center mb-6">
                    {icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{label}</h3>
                  {time && (
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-mono text-purple-300 bg-purple-500/10 rounded-full border border-purple-500/20">
                      {time}
                    </span>
                  )}
                  <p className="text-zinc-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            TEMAS QUE HE TRATADO
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="02" text="Temas que he tratado" />
              <h2 style={h2Style}>Seis conversaciones que cambian el enfoque.</h2>
            </Reveal>

            <div className="flex flex-col w-full mt-16">
              {TEMAS.map(({ num, title, desc }, i) => (
                <Reveal key={num} delay={i * 0.06}>
                  <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-b border-white/10 first:border-t items-center transition-all duration-500 hover:scale-[1.02] hover:bg-white/[0.03] hover:shadow-[0_0_40px_-8px_rgba(147,51,234,0.45)] hover:border-purple-500/20 rounded-xl px-4">
                    <div className="md:col-span-2 flex items-start">
                      <span className="text-6xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-purple-900/30 select-none leading-none">
                        {num}
                      </span>
                    </div>
                    <div className="md:col-span-5">
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-100 transition-colors pr-4">
                        {title}
                      </h3>
                    </div>
                    <div className="md:col-span-5 flex flex-col justify-start">
                      <p className="text-zinc-400 leading-relaxed text-lg">
                        {desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            DÓNDE HE ESTADO — logo marquee
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          background  : 'var(--bg-deep)',
          paddingBlock: 'clamp(3rem, 7vw, 5rem)',
          borderTop   : '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <div style={{ ...sectionWrap, marginBottom: '2rem' }}>
            <Reveal>
              <SectionEyebrow number="03" text="Dónde he estado" />
            </Reveal>
          </div>
          <LogoMarquee logos={EVENTOS} direction="right" duration={45} />
        </section>

        {/* ════════════════════════════════════════════════════════════════
            PROCESO DE CONTRATACIÓN
        ════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--bg-primary)', paddingBlock: 'clamp(4rem, 10vw, 7rem)' }}>
          <div style={sectionWrap}>
            <div style={divider} />
            <Reveal>
              <SectionEyebrow number="04" text="Cómo funciona" />
              <h2 style={h2Style}>Sin formularios kilométricos. Sin esperas.</h2>
            </Reveal>

            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mt-16">
              {[
                { paso: '01', titulo: 'Cuéntame tu evento',     texto: 'Escríbeme con el contexto: fecha, audiencia, duración esperada y lo que quieres transmitir.' },
                { paso: '02', titulo: 'Te propongo el tema',    texto: 'En menos de 48 horas te sugiero el enfoque más potente para tu público específico.' },
                { paso: '03', titulo: 'Acordamos los detalles', texto: 'Cerramos formato, duración, materiales y logística. Sin idas y venidas innecesarias.' },
                { paso: '04', titulo: 'Me subo al escenario',   texto: 'Llego preparado, puntual y con un discurso afinado para tu evento concreto.' },
              ].map(({ paso, titulo, texto }, i) => (
                <Reveal key={paso} delay={i * 0.07}>
                  <div className="relative flex flex-col">
                    <div className="mb-6 relative">
                      <span className="text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-zinc-900/20 select-none">
                        {paso}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{titulo}</h3>
                    <p className="text-zinc-400 leading-relaxed">{texto}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            CIERRE CTA
        ════════════════════════════════════════════════════════════════ */}
        <section style={{
          background  : 'var(--bg-deep)',
          paddingBlock: 'clamp(5rem, 14svh, 9rem)',
          textAlign   : 'center',
        }}>
          <div style={{
            ...sectionWrap,
            display      : 'flex',
            flexDirection: 'column',
            alignItems   : 'center',
            gap          : 'clamp(1.25rem, 3vw, 2rem)',
          }}>
            <div style={{ height: 1, width: '100%', background: 'var(--border-subtle)', marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }} />
            <Reveal>
              <p style={{
                fontFamily   : 'var(--mono)',
                fontSize     : '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color        : 'rgba(255,255,255,0.45)',
                marginBottom : '0.5rem',
              }}>
                Agenda disponible para el segundo semestre de 2026
              </p>
              <h2 style={{
                fontFamily   : 'var(--sans)',
                fontSize     : 'clamp(1.75rem, 4.5vw, 3.25rem)',
                fontWeight   : 800,
                letterSpacing: '-0.03em',
                lineHeight   : 1.1,
                color        : '#fff',
                maxWidth     : '26ch',
                marginInline : 'auto',
              }}>
                Dale a tu evento la charla que tu audiencia merece.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <GlowCTAButton
                href="/contacto"
                subtitle="Te respondo personalmente en menos de 48 horas · Sin intermediarios"
              >
                CONTRATAR PONENCIA
              </GlowCTAButton>
            </Reveal>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
