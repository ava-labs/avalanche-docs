import type { Metadata } from "next"
import { integrationPageOptions } from '@/app/layout.config';
import { Footer } from '@/components/footer';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

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
    <HomeLayout {...integrationPageOptions}>
    {children}
    <Footer />
    </HomeLayout>
  )
}

