// ─────────────────────────────────────────────────────────────────────────────
// SectionEyebrow — "01 — INICIO" (Geist Mono, lavanda acento). §2.2 / §4 v1.2
// ─────────────────────────────────────────────────────────────────────────────
export default function SectionEyebrow({
  number,
  text,
  as: Tag = 'p',
}: {
  number?: string;
  text: string;
  as?: 'p' | 'h2';
}) {
  return (
    <Tag className="eyebrow" style={{ marginBottom: '1.25rem' }}>
      {number ? `${number} — ` : ''}{text}
    </Tag>
  );
}
