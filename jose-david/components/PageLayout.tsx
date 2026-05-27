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
  // Garantizar que al montar cada página el scroll empieza desde arriba
  useEffect(() => {
    const sv = document.querySelector<HTMLElement>('.scroll-viewport');
    if (sv) sv.scrollTop = 0;
    window.scrollTo(0, 0);
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
