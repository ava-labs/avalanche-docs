"use client";

import { ArrowUpRight } from "lucide-react";
import { HoverPrefetchLink } from "@/components/landing-v2/HoverPrefetchLink";
import { track } from "@/components/landing-v2/track";
import { BODY, Chapter, FOCUS, Lead, MONO, Reveal, SUBHEAD, TextLink, Title } from "./kit";

/* Who already made the choice. Each entry says what is live, in the
   words of its source in the repo, and links to that source. Each cell
   carries the partner's mark on a round chip, the same fit rule as the
   hero tape (see builtOnChains.ts): the brand's own color is its mark. */

interface Case {
  category: string;
  name: string;
  line: string;
  href: string;
  /** a square mark; `chip` is the round tile behind it, `inset` pads a mark that runs to its edges */
  mark: { src: string; chip: string; inset?: boolean };
}

const CASES: Case[] = [
  {
    category: "Tokenized fund",
    name: "BlackRock BUIDL",
    line: "BlackRock's tokenized fund, issued through Securitize, runs on the C-Chain.",
    href: "/integrations/blackrock",
    mark: { src: "/logos/partners/tape/blackrock.svg", chip: "#000000" },
  },
  {
    category: "Tokenized credit",
    name: "Galaxy CLO 2025-1",
    line: "A tokenized collateralized loan obligation, issued natively on Avalanche.",
    href: "/integrations/galaxy",
    mark: { src: "/images/galaxy.svg", chip: "#ffffff", inset: true },
  },
  {
    category: "State stablecoin",
    name: "Wyoming FRNT",
    line: "Wyoming's state-issued stablecoin, spendable with Rain-issued Visa cards.",
    href: "/integrations/rain",
    mark: { src: "/logos/partners/tape/wyoming-frnt.png", chip: "#ffffff" },
  },
  {
    category: "Tokenized securities",
    name: "Dinari Financial Network",
    line: "An Avalanche L1 for tokenized U.S. public securities.",
    href: "/explorer/mainnet/dinari-financial-network",
    mark: { src: "/logos/partners/tape/dinari.png", chip: "#07846d" },
  },
  {
    category: "Structured finance",
    name: "Intain Market",
    line: "A debt capital markets platform on a permissioned Avalanche L1.",
    href: "/explorer/mainnet/intainmkt",
    mark: { src: "/logos/partners/tape/intain.png", chip: "#ffffff" },
  },
  {
    category: "Stablecoin",
    name: "Circle USDC",
    line: "Native USDC on the C-Chain. CCTP moves it to and from other supported chains with no wrapped token.",
    href: "/integrations/circlepay",
    mark: { src: "/logos/tokens/usdc.png", chip: "transparent" },
  },
];

function CaseCell({ c }: { c: Case }) {
  return (
    <HoverPrefetchLink
      href={c.href}
      onClick={() => track("home_cta_clicked", { section: "institutions", label: c.name, href: c.href })}
      // the ring sits inside the cell: the next cell in the hairline grid paints over anything outside it
      className={`group relative flex flex-col gap-10 bg-white p-6 transition-colors hover:bg-zinc-50 focus-visible:bg-zinc-50 md:p-8 dark:bg-zinc-950 dark:hover:bg-zinc-900 dark:focus-visible:bg-zinc-900 ${FOCUS} focus-visible:-outline-offset-2!`}
    >
      <span className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-3">
          {/* a hairline ring holds a white chip's edge on the light page and a dark chip's on the dark one */}
          <span
            className="h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-inset ring-zinc-950/10 dark:ring-white/15"
            style={{ background: c.mark.chip }}
          >
            <img
              src={c.mark.src}
              alt=""
              loading="lazy"
              decoding="async"
              className={`h-full w-full object-contain ${c.mark.inset ? "p-2.5" : ""}`}
            />
          </span>
          <span className={`text-zinc-500 dark:text-zinc-400 ${MONO}`}>{c.category}</span>
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-300 transition-colors group-hover:text-[#E6212F] group-focus-visible:text-[#E6212F] dark:text-zinc-600" />
      </span>
      <span className="flex flex-col gap-2">
        <span className={SUBHEAD}>{c.name}</span>
        <span className={`text-pretty ${BODY}`}>{c.line}</span>
      </span>
    </HoverPrefetchLink>
  );
}

export default function InstitutionsChapter() {
  return (
    <Chapter id="institutions">
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <Title lead="Already in production" className="lg:col-span-7" />
          <Lead className="lg:col-span-5">
            Funds, stablecoins, credit and securities run on the C-Chain and on Avalanche L1s today.
          </Lead>
        </div>
      </Reveal>
      <Reveal delay={0.1} className="mt-16 md:mt-20">
        {/* hairline grid: the 1 px gaps show the border color through */}
        <div className="grid gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-800">
          {CASES.map((c) => (
            <CaseCell key={c.name} c={c} />
          ))}
        </div>
        <div className="mt-12">
          <TextLink href="/solutions" section="institutions">
            Solutions for institutions
          </TextLink>
        </div>
      </Reveal>
    </Chapter>
  );
}
