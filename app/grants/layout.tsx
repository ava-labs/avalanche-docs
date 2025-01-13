import type { Metadata } from "next"
import { integrationPageOptions } from '@/app/layout.config';
import { Footer } from '@/components/footer';
import { Layout } from 'fumadocs-ui/layout';

export const metadata: Metadata = {
  title: "Avalanche Grants & Programs",
  description: "Empowering innovators to revolutionize blockchain technology",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout {...integrationPageOptions}>
    {children}
    <Footer />
    </Layout>
  )
}

