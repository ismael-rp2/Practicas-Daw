import type { SiteThemeConfig } from '@/lib/theme';

export default function SiteTheme({ config }: { config: SiteThemeConfig }) {
  const vars = (Object.entries(config) as [string, string | undefined][])
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `--${k}: ${v}`)
    .join('; ');

  if (!vars) return null;

  return (
    // eslint-disable-next-line react/no-danger
    <style suppressHydrationWarning>{`:root { ${vars} }`}</style>
  );
}
