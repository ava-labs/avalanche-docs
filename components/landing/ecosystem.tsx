"use client";

import React from "react";
import { AudioLines, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ecosystem = [
  {
    id: 1,
    title: "Join <strong>Team1 DAO</strong>.",
    description:
      "Contribute to the Avalanche community initiatives, and get rewarded with exclusive paid bounties.",
    href: "https://www.avax.network/ambassador"
  },
  {
    id: 2,
    title: "Organize <strong>Events</strong>.",
    description:
      "Organize technical workshops and community meetups with support from Team1 DAO and our DevRel team.",
    href: "/docs/avalanche-l1s"
  },
  {
    id: 3,
    title: "Try <strong>Avalanche</strong>.",
    description:
      "Discover and try out different applications and L1s in the Avalanche ecosystem.",
    href: "https://core.app/discover/"
  }
];

export default function Ecosystem() {
  return (
    <div className="flex flex-col justify-center items-center px-4 mb-16">
      <h2 className="font-display text-3xl tracking-tight sm:text-5xl text-center flex items-center gap-3">
        <AudioLines className="w-8 h-8 sm:w-10 sm:h-10" /> Ecosystem
      </h2>
      <div className="mt-10 mx-auto font-geist relative md:border-l-0 md:border-b-0 md:border-[1.2px] rounded-none -pr-2">
        <div className="w-full md:mx-0">
          <div className="grid grid-cols-1 relative md:grid-cols-3 border-b-[1.2px]">
            {ecosystem.map((ecosystem) => (
              <Link
                key={ecosystem.id}
                href={ecosystem.href}
                className={cn(
                  "group block border-l-[1.2px] md:min-h-[200px] border-t-[1.2px] md:border-t-0 transform-gpu hover:bg-[#dfe3e8] dark:hover:bg-[#1c1c1c]",
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
                            __html: ecosystem.title,
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
                      {ecosystem.description}
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