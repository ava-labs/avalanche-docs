import Hero from '@/components/landing/hero';
import Features from '@/components/landing/features';
import Development from '@/components/landing/development';
import Ecosystem from '@/components/landing/ecosystem';
import Support from '@/components/landing/support';
import { Banner } from "fumadocs-ui/components/banner";
import Link from "next/link";

export default function HomePage(): React.ReactElement {
  return (
    <>
      <div className="relative top-[64px] w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-30">
        <Banner className="border-t border-b border-border/40">
          <div className="flex items-center justify-between px-4 py-2 max-w-screen-2xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="bg-red-500/10 text-red-500 text-xs font-medium px-2 py-1 rounded-full">NEW</span>
              <p className="text-sm">
                Applications for Avalanche Innovation House are now open! &nbsp;
              </p>
            </div>
            <Link 
              href="https://innovationhouse.avax.network/"
              className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply now
              <span className="ml-1">→</span>
            </Link>
          </div>
        </Banner>
      </div>
      <Hero />
      <main className="container relative max-w-[1100px] px-2 py-4 lg:py-16">
          <Features />
          <Development />
          <Ecosystem />
          <Support />
      </main>
    </>
  );
}