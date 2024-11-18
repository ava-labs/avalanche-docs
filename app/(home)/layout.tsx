import { Layout, DocsLayout } from 'fumadocs-ui/layout';
import type { ReactNode } from 'react';
import { Footer } from '@/components/footer';
import { homebaseOptions } from '@/app/layout.config';

export default function HomeLayout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {

  return (
    <Layout {...homebaseOptions}>
    {children}
    <Footer />
    </Layout>
  )
}
