'use client'

import React from "react";
import { HackathonHeader } from "@/types/hackathons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { DynamicIcon } from "lucide-react/dynamic";
import { useTheme } from "next-themes";

const resources = [
  {
    title: "Official Docs & API",
    description:
      "Explore Avalanche's official documentation and APIs to integrate blockchain functionalities into your project.",
    icon: "app-window",
  },
  {
    title: "FAQs",
    description:
      "Get answers to frequently asked questions about the hackathon, rules, and submission process.",
    icon: "circle-help",
  },
  {
    title: "Developer Tools",
    description:
      "Recommended tools for building on Avalanche, including SDKs, testnets, and debugging utilities.",
    icon: "pickaxe",
  },
  {
    title: "Important Links",
    description:
      "Find key resources such as GitHub repos, starter guides, and demo project templates.",
    icon: "link",
  },
];

function Resources({ hackathon }: { hackathon: HackathonHeader }) {
  const { resolvedTheme } = useTheme();
  const iconColor = resolvedTheme == "dark" ? "#F5F5F9" : "#161617";  
  return (
    <section className="text-black dark:text-white dark:bg-black py-12">
      <h2 className="text-4xl font-bold mb-6">Resources</h2>
      <Separator className="my-8 bg-zinc-300 dark:bg-zinc-800" />
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Unlock incredible rewards for your innovation and skills in{" "}
        {hackathon.title}
      </p>

      <div className="grid gap-3">
        {resources.map((resource, index) => (
          <Card
            key={index}
            className="border border-gray-300 dark:border-gray-800 hover:border-gray-500 dark:hover:border-gray-600 transition 
                  h-[64px] min-h-[64px] max-h-[64px] rounded-lg 
                 px-4 py-3 flex items-center space-x-3"
          >
            <div>
              <DynamicIcon name={resource.icon as any} size={16} color={iconColor} />
            </div>
            <div>
              <h3 className="text-[#FF394A] text-base font-semibold">
                {resource.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-tight">
                {resource.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-lg text-gray-600 dark:text-gray-300 mt-8">
        Need deeper insights? Access the full set of Avalanche documentation,
        tools, and developer guides.
      </p>

      <div className="flex justify-center mt-8">
        <Button
          variant={"secondary"}
          className="w-1/3 bg-red-500 rounded-md text-zinc-100"
        >
          Explore Full Documentation & Tools
        </Button>
      </div>
    </section>
  );
}
export default Resources;
