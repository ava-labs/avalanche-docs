"use client";

import React from "react";
import {
  PlugIcon,
  ScanFace,
  Plus,
  Users,
  BadgeDollarSign,
  AudioLines,
  GitPullRequest
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const features = [
  {
    id: 1,
    label: "Wallet",
    title: "Install <strong>Core Wallet</strong>.",
    description:
      "The native Avalanche wallet. Sign up with Google to create a seedless wallet and start exploring.",
    icon: ScanFace,
    href: "https://core.app/en/"
  },
  {
    id: 2,
    label: "Development",
    title: "Build on <strong>Avalanche</strong>.",
    description:
      "Everything you need to start building, from beginner-friendly courses to advanced documentation.",
    icon: GitPullRequest,
    href: "#development"
  },
  {
    id: 3,
    label: "Ecosystem",
    title: "Grow the <strong>Ecosystem</strong>.",
    description:
      "Discover thriving dApps, join Team1 DAO, or explore purpose-built blockchains across the Avalanche ecosystem.",
    icon: AudioLines,
    href: "#ecosystem"
  },
  {
    id: 4,
    label: "Grants",
    title: "<strong>Fund</strong> Your Vision.",
    description:
      "Level up your project through bounty challenges, retroactive rewards, or our hands-on incubator program.",
    icon: BadgeDollarSign,
    href: "/grants"
  },
  {
    id: 5,
    label: "Inspire",
    title: "Share Your <strong>Journey</strong>.",
    description:
      "Build in public: share your learnings, showcase certificates, and connect with fellow Avalanche developers.",
    icon: Users,
    href: "/share"
  },
  {
    id: 6,
    label: "Connect",
    title: "Learn with <strong>DevRels</strong>.",
    description:
      "Get direct guidance from our Developer Relations team through live workshops, office hours, and hands-on tutorials.",
    icon: PlugIcon,
    href: "https://discord.com/channels/578992315641626624/1230847375120011264"
  },
];

export default function Features() {
  return (
    <div className="flex flex-col justify-center items-center px-4">
      <h2 className="font-display text-3xl tracking-tight sm:text-5xl text-center">
        Resources for Developers
      </h2>
      <p className="mt-4 text-lg tracking-tight text-zinc-400 text-center">
        Find all the resources you will need to build on Avalanche.
      </p>
      <div className="mt-10 mx-auto font-geist relative md:border-l-0 md:border-b-0 md:border-[1.2px] rounded-none -pr-2">
        <div className="w-full md:mx-0">
          <div className="grid grid-cols-1 relative md:grid-rows-2 md:grid-cols-3 border-b-[1.2px]">
            <div className="hidden md:grid top-1/2 left-0 -translate-y-1/2 w-full grid-cols-3 z-10 pointer-events-none select-none absolute">
              <Plus className="w-8 h-8 text-neutral-300 translate-x-[16.5px] translate-y-[.5px] ml-auto dark:text-neutral-600" />
              <Plus className="w-8 h-8 text-neutral-300 ml-auto translate-x-[16.5px] translate-y-[.5px] dark:text-neutral-600" />
            </div>
            {features.map((feature, index) => (
              <Link
                key={feature.id}
                href={feature.href}
                className={cn(
                  "group block border-l-[1.2px] md:min-h-[240px] border-t-[1.2px] md:border-t-0 transform-gpu hover:bg-[#dfe3e8] dark:hover:bg-[#1c1c1c]",
                  index >= 3 && "md:border-t-[1.2px]",
                  "transition-all duration-300 ease-in-out"
                )}
              >
                <div className="flex flex-col p-10 h-full">
                  <div className="flex items-center gap-2 my-1">
                    <feature.icon className="w-4 h-4 transition-transform group-hover:scale-110 group-hover:text-gray-800 dark:group-hover:text-zinc-300" />
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.label}
                    </p>
                  </div>
                  <div className="mt-2">
                    <div className="max-w-full">
                      <div className="flex gap-3">
                        <p
                          className="max-w-lg text-xl font-normal tracking-tighter md:text-2xl"
                          dangerouslySetInnerHTML={{
                            __html: feature.title,
                          }}
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-left text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                  <div className="text-gray-700 dark:text-zinc-300 group-hover:text-gray-900 dark:group-hover:text-white mt-4 inline-flex items-center transition-colors">
                    Learn more
                    <svg
                      className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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