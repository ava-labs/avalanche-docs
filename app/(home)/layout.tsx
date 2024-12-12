import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';
import { Footer } from '@/components/footer';
import { homebaseOptions } from '@/app/layout.config';

export default function Layout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {

  return (
    <HomeLayout {...homebaseOptions}>
    {children}
    <Footer />
    </HomeLayout>
  )
}
