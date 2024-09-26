import { Layout } from 'fumadocs-ui/layout';
import type { ReactNode } from 'react';
import { Footer } from '@/components/footer';
import { baseOptions } from '@/app/layout.config';

export default function HomeLayout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {

  return (
    <Layout {...baseOptions}>
    {children}
    <Footer />
    </Layout>
  )
}
