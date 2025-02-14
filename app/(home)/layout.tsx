"use client";

import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';
import { Footer } from '@/components/navigation/footer';
import { baseOptions } from '@/app/layout.config';
import { AnnouncementBanner } from '@/components/announcement-banner';

export default function Layout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <>
      <div className="pt-8">
        <HomeLayout {...baseOptions}>
        <AnnouncementBanner />
          {children}
          <Footer />
        </HomeLayout>
      </div>
    </>
  );
}
