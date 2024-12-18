"use client";

import React from "react";
import { Plus, ArrowUpRight, GitPullRequest } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const development = [
  {
    id: 1,
    title: "Build <strong>Consumer Apps</strong>.",
    description:
      "Guides to build high-performance consumer dApps on Avalanche C-Chain: Fast, Affordable, User-Centric.",
    href: "/docs/dapps"
  },
  {
    id: 2,
    title: "Build <strong>Avalanche L1</strong>.",
    description:
      "Build your fast, interoperable Layer 1 blockchain with Avalanche's technology stack.",
    href: "/docs/avalanche-l1s"
  },
  {
    id: 3,
    title: "Avalanche <strong>Academy</strong>.",
    description:
      "Master the art of building on Avalanche with Academy. Comprehensive Courses from Basic to Advanced.",
    href: "/academy"
  },
  {
    id: 4,
    title: "Avalanche <strong>Starter Kit</strong>.",
    description:
      "Your all-in-one development launchpad. Ready-to-use boilerplates and examples for smart contracts, dApps, and more",
    href: "https://github.com/ava-labs/avalanche-starter-kit"
  },
  {
    id: 5,
    title: "<strong>Builder</strong>Kit.",
    description:
      "Pre-built React components and hooks to seamlessly build frontend for dApps on Avalanche and it's L1s.",
    href: "https://github.com/ava-labs/builderkit"
  },
  {
    id: 6,
    title: "Testnet <strong>Faucet</strong>.",
    description:
      "Instant access to testnet tokens for seamless development and testing across multiple Avalanche L1s.",
    href: "https://core.app/tools/testnet-faucet/"
  },
];

export default function Development() {
  return (
    <div className="flex flex-col justify-center items-center px-4 mb-16">
      <h2 className="font-display text-3xl tracking-tight sm:text-5xl text-center flex items-center gap-3">
        <GitPullRequest className="w-8 h-8 sm:w-10 sm:h-10" /> Development
      </h2>
      <div className="mt-10 mx-auto font-geist relative md:border-l-0 md:border-b-0 md:border-[1.2px] rounded-none -pr-2">
        <div className="w-full md:mx-0">
          <div className="grid grid-cols-1 relative md:grid-rows-2 md:grid-cols-3 border-b-[1.2px]">
            <div className="hidden md:grid top-1/2 left-0 -translate-y-1/2 w-full grid-cols-3 z-10 pointer-events-none select-none absolute">
              <Plus className="w-8 h-8 text-neutral-300 translate-x-[16.5px] translate-y-[.5px] ml-auto dark:text-neutral-600" />
              <Plus className="w-8 h-8 text-neutral-300 ml-auto translate-x-[16.5px] translate-y-[.5px] dark:text-neutral-600" />
            </div>
            {development.map((development, index) => (
              <Link
                key={development.id}
                href={development.href}
                className={cn(
                  "group block border-l-[1.2px] md:min-h-[200px] border-t-[1.2px] md:border-t-0 transform-gpu hover:bg-[#dfe3e8] dark:hover:bg-[#1c1c1c]",
                  index >= 3 && "md:border-t-[1.2px]",
                  "transition-all duration-300 ease-in-out relative overflow-hidden"
                )}
              >
                <div className="flex flex-col p-10 h-full">
                  <div className="mt-2">
                    <div className="max-w-full">
                      <div className="flex items-center gap-2">
                        <p
                          className="max-w-lg text-xl font-normal tracking-tighter md:text-2xl group-hover:text-gray-800 dark:group-hover:text-zinc-300 transition-colors duration-300"
                          dangerouslySetInnerHTML={{
                            __html: development.title,
                          }}
                        />
                        <ArrowUpRight 
                          className="w-6 h-6 text-gray-600 dark:text-gray-400
                          transform translate-x-0 translate-y-0
                          group-hover:-translate-y-1 group-hover:translate-x-1
                          transition-all duration-300 ease-out 
                          group-hover:text-gray-800 dark:group-hover:text-zinc-300"
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-left text-muted-foreground group-hover:text-gray-700 dark:group-hover:text-zinc-400 transition-colors duration-300">
                      {development.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}