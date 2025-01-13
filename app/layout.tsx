import './global.css';
import 'katex/dist/katex.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { PHProvider } from './providers'
import type { Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import type { ReactNode } from 'react';
import { baseUrl, createMetadata } from '@/utils/metadata';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Chatbot from "@/components/chatbot"

export const metadata = createMetadata({
  title: {
    template: '%s | Avalanche Docs',
    default: 'Avalanche Docs',
  },
  description: 'Developer documentation for everything related to the Avalanche ecosystem.',
  metadataBase: baseUrl,
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#fff' },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <PHProvider>
        <body className="flex min-h-screen flex-col">
          <RootProvider>{children}</RootProvider>
          <Analytics />
          <SpeedInsights />
          <Chatbot />
        </body>
      </PHProvider>
    </html>
  );
}
