import Hero from '@/components/landing/hero';
import Features from '@/components/landing/features';
import Development from '@/components/landing/development';
import Ecosystem from '@/components/landing/ecosystem';
import Support from '@/components/landing/support';
import { PrivacyPolicyBox } from "@/components/privacy-policy"

export default function HomePage(): React.ReactElement {
  return (
    <>
      <Hero />
      <main className="container relative max-w-[1100px] px-2 py-4 lg:py-16">
          <Features />
          <Development />
          <Ecosystem />
          <Support />
          <div className="fixed bottom-0 right-0 sm:bottom-4 sm:right-4 p-4 sm:p-0">
            <PrivacyPolicyBox />
          </div>
      </main>
    </>
  );
}