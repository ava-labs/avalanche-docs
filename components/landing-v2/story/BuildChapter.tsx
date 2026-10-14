"use client";

import { ArrowRight } from "lucide-react";
import { BrandButton } from "@/components/landing-v2/BrandButton";
import { HoverPrefetchLink } from "@/components/landing-v2/HoverPrefetchLink";
import { track } from "@/components/landing-v2/track";
import { BODY, Chapter, FOCUS, Reveal, SUBHEAD } from "./kit";

/* The close. The hero's display voice returns as a bookend, then the
   two ways in, then the help a builder gets on either path. */

interface Path {
  title: string;
  line: string;
  cta: { label: string; href: string };
  primary: boolean;
}

// the CTA labels match the hero buttons on purpose, as a bookend
const PATHS: Path[] = [
  {
    title: "Build on the C-Chain",
    line: "An EVM chain with Geth's API. Deploy Solidity contracts and verify them from Foundry or Hardhat.",
    cta: { label: "Build on C-Chain", href: "/docs/primary-network#c-chain-contract-chain" },
    primary: false,
  },
  {
    title: "Launch your own L1",
    line: "Basic setup deploys it in one click on the Fuji testnet: genesis, a managed validator node and the Validator Manager.",
    cta: { label: "Build an L1", href: "/console/create-l1" },
    primary: true,
  },
];

function Resource({ href, label, line }: { href: string; label: string; line: string }) {
  return (
    <HoverPrefetchLink
      href={href}
      onClick={() => track("home_cta_clicked", { section: "build", label, href })}
      className={`group flex items-start justify-between gap-6 py-6 transition-colors md:px-6 md:first:pl-0 md:last:pr-0 ${FOCUS}`}
    >
      <span className="flex flex-col gap-1.5">
        {/* the lead's 18 px step: a label, quieter than the path titles above */}
        <span className="v2-heading text-lg text-zinc-900 dark:text-zinc-50">{label}</span>
        <span className={`text-pretty ${BODY}`}>{line}</span>
      </span>
      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-zinc-300 transition-all group-hover:translate-x-0.5 group-hover:text-[#E6212F] group-focus-visible:translate-x-0.5 group-focus-visible:text-[#E6212F] dark:text-zinc-600" />
    </HoverPrefetchLink>
  );
}

export default function BuildChapter({ academyLine }: { academyLine: string | null }) {
  return (
    <Chapter id="build">
      <Reveal>
        {/* the period holds still: a loop with no pause control fails WCAG 2.2.2 */}
        <h2 className="v2-display text-[3rem] text-zinc-900 md:text-[4.5rem] xl:text-[5.5rem] dark:text-zinc-50">
          Build yours<span className="text-[#E6212F]">.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-16 md:mt-20">
        <div className="grid gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-800">
          {PATHS.map((p) => (
            <div key={p.title} className="flex flex-col gap-10 bg-white p-6 md:p-10 dark:bg-zinc-950">
              <div className="flex flex-col gap-4">
                <h3 className={SUBHEAD}>{p.title}</h3>
                <p className={`max-w-md ${BODY}`}>{p.line}</p>
              </div>
              <BrandButton
                href={p.cta.href}
                variant={p.primary ? "primary" : "secondary"}
                prefetchOnIntent
                onClick={() => track("home_cta_clicked", { section: "build", label: p.cta.label, href: p.cta.href })}
                className="mt-auto w-full sm:w-auto sm:self-start"
              >
                {p.cta.label}
              </BrandButton>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-12">
        <div className="grid divide-y divide-zinc-200 border-y border-zinc-200 md:grid-cols-4 md:divide-x md:divide-y-0 dark:divide-zinc-800 dark:border-zinc-800">
          <Resource href="/academy" label="Academy" line={academyLine ?? "Courses with certificates"} />
          <Resource href="/console/primary-network/faucet" label="Testnet faucet" line="Free test tokens for Fuji" />
          <Resource href="/grants" label="Grants" line="Team1 Builder Grants and the Blizzard Fund" />
          <Resource href="/audits" label="Audits" line="Quotes from vetted firms, subsidized up to 75%" />
        </div>
      </Reveal>
    </Chapter>
  );
}
