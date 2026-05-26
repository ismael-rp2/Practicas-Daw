'use client';

import type { ReactNode } from 'react';
import TopBar              from '@/components/TopBar';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Nav, { type NavItem } from '@/components/Nav';
import CustomScrollbar     from '@/components/CustomScrollbar';

interface PageLayoutProps {
  children   : ReactNode;
  navConfig ?: NavItem[];
}

export default function PageLayout({ children, navConfig }: PageLayoutProps) {
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
