import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';
import { Footer } from '@/components/navigation/footer';
import { integrationPageOptions } from '@/app/layout.config';

export default function Layout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return <HomeLayout {...integrationPageOptions}>
    {children}
    <Footer />
    </HomeLayout>;
}
