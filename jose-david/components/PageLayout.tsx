'use client';

import { type ReactNode, useEffect } from 'react';
import TopBar              from '@/components/TopBar';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Nav, { type NavItem } from '@/components/Nav';
import CustomScrollbar     from '@/components/CustomScrollbar';

interface PageLayoutProps {
  children   : ReactNode;
  navConfig ?: NavItem[];
}

export default function PageLayout({ children, navConfig }: PageLayoutProps) {
  // Garantizar que al montar cada página el scroll empieza desde arriba.
  // El delay evita competir con PageLoader (que también hace reset a 0).
  useEffect(() => {
    const reset = () => {
      const sv = document.querySelector<HTMLElement>('.scroll-viewport');
      if (sv) sv.scrollTop = 0;
      window.scrollTo(0, 0);
    };
    reset();
    // Segundo reset diferido: por si el navegador intenta restaurar la posición
    const t = setTimeout(reset, 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <TopBar />
      <SmoothScrollProvider>
        <Nav navConfig={navConfig} />
        <div className="scroll-viewport">
          <div className="content-flow">
            {children}
          </div>
        </div>
      </SmoothScrollProvider>
      <CustomScrollbar />
    </>
  );
}
