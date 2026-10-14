"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useInView, useScroll, useTransform } from "framer-motion";
import { BrandButton } from "@/components/landing-v2/BrandButton";
import { track } from "@/components/landing-v2/track";
import { BODY, Chapter, Figure, Lead, MONO, Reveal, TextLink, Title } from "./kit";
import { SceneFrame } from "./three/SceneFrame";
import type { StackLayer } from "./three/StackScene";

const StackScene = dynamic(() => import("./three/StackScene"), { ssr: false });

/* The chain is yours. The drawing names the layers a team sets, from
   the validator set on the P-Chain plate up to the virtual machine. Then
   what a chain of your own costs to run, and the way in. */

// bottom to top in the drawing; the text list reads top to bottom
const LAYERS: StackLayer[] = [
  { key: "validators", label: "Validator set", line: "Proof of authority, proof of stake or your own rules." },
  { key: "access", label: "Access", line: "Choose who may deploy contracts and who may transact." },
  { key: "gas", label: "Gas token", line: "Allocate it at genesis, mint more, burn fees or route them." },
  { key: "vm", label: "Virtual machine", line: "The EVM by default, or a VM in any language with gRPC." },
];

const STILL = { light: "/home/story/stack-light.webp", dark: "/home/story/stack-dark.webp" };
const STILL_NARROW = { light: "/home/story/stack-narrow-light.webp", dark: "/home/story/stack-narrow-dark.webp" };

const BUILD_HREF = "/console/create-l1";

export default function OwnChapter() {
  const drawingRef = useRef<HTMLDivElement>(null);
  // the layer the reader points at; at rest the validator set (index 0) holds the red
  const [active, setActive] = useState<number | null>(null);
  // the stack opens as the drawing scrolls in, and is open before it reaches the middle of the screen
  const { scrollYProgress } = useScroll({ target: drawingRef, offset: ["start end", "center center"] });
  const open = useTransform(scrollYProgress, [0.1, 0.65], [0, 1], { clamp: true });
  // the drop waits for the drawing's reveal (the Reveal's own trigger), so the reader sees it
  const shown = useInView(drawingRef, { once: true, amount: 0.3 });

  return (
    <Chapter id="own">
      {/* every width reads the claim, the drawing, the cost, then the way in.
          From lg the claim holds the left five columns, the drawing the right seven */}
      <div className="grid gap-y-12 lg:grid-cols-12 lg:items-center lg:gap-x-8">
        <Reveal className="lg:col-span-5">
          <Title lead="Own the chain." rest="Set the rules" />
          <Lead className="mt-8">
            An Avalanche L1 is a blockchain you configure: its virtual machine, gas token, fee market, validators and who
            may use it.
          </Lead>
          <p className={`mt-8 max-w-xl border-l-2 border-[#E6212F] pl-5 ${BODY}`}>
            An L1 can require its validators to be in a given country, pass KYC/AML checks or hold a license.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="-mx-5 md:mx-0 lg:col-span-7">
          <div ref={drawingRef}>
            <SceneFrame
              Scene={StackScene}
              sceneProps={{ layers: LAYERS, active: active ?? 0, spread: open, onPoint: setActive, play: shown }}
              still={STILL}
              stillNarrow={STILL_NARROW}
              alt="An Avalanche L1 drawn as four layers over the P-Chain: validator set, access, gas token and virtual machine."
              aspect={1.12}
            />
          </div>
        </Reveal>
      </div>

      {/* phones: the layers as text, right after the drawing; from 768 px the drawing labels them */}
      <Reveal delay={0.1} className="mt-12 md:sr-only">
        <ol className="divide-y divide-zinc-200 border-t border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {[...LAYERS].reverse().map((layer) => (
            <li key={layer.key} className="flex flex-col gap-1 py-4">
              <span className={`${MONO} text-zinc-900 dark:text-zinc-100`}>{layer.label}</span>
              <span className={BODY}>{layer.line}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal delay={0.15} className="mt-20 md:mt-28">
        <div className="grid gap-12 border-t border-zinc-200 pt-12 md:grid-cols-3 md:gap-8 dark:border-zinc-800">
          <Figure
            value={
              <>
                <span aria-hidden>~</span>
                <span className="sr-only">about </span>1.33
              </>
            }
            unit="AVAX"
            caption="a month in P-Chain fees per L1 validator."
          />
          <Figure
            value={
              <>
                <span aria-hidden>&gt;</span>
                <span className="sr-only">more than </span>99.9%
              </>
            }
            caption="less upfront cost to launch a chain since the Etna upgrade."
          />
          <Figure
            value="2"
            unit="cores"
            caption="with 4 GB of RAM and 100 GB of storage run an L1 validator under 10 TPS."
          />
        </div>
        <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-6">
          <BrandButton
            href={BUILD_HREF}
            prefetchOnIntent
            onClick={() => track("home_cta_clicked", { section: "own", label: "Build an L1", href: BUILD_HREF })}
            className="w-full sm:w-auto"
          >
            Build an L1
          </BrandButton>
          <TextLink href="/docs/avalanche-l1s" section="own">
            Read the architecture
          </TextLink>
          <TextLink href="/docs/nodes/system-requirements" section="own">
            Validator requirements
          </TextLink>
        </div>
      </Reveal>
    </Chapter>
  );
}
