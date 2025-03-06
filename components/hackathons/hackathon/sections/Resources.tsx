import React from "react";
import { HackathonHeader } from "@/types/hackathons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LinkIcon, CircleHelp, Folder, Pickaxe, AppWindow } from "lucide-react";

const resources = [
  {
    title: "Official Docs & API",
    description:
      "Explore Avalanche's official documentation and APIs to integrate blockchain functionalities into your project.",
    icon: <AppWindow className="w-5 h-5" stroke="rgb(156, 163, 175)" />,
  },
  {
    title: "FAQs",
    description:
      "Get answers to frequently asked questions about the hackathon, rules, and submission process.",
    icon: <CircleHelp className="w-5 h-5" stroke="rgb(156, 163, 175)" />,
  },
  {
    title: "Developer Tools",
    description:
      "Recommended tools for building on Avalanche, including SDKs, testnets, and debugging utilities.",
    icon: <Pickaxe className="w-5 h-5" stroke="rgb(156, 163, 175)" />,
  },
  {
    title: "Important Links",
    description:
      "Find key resources such as GitHub repos, starter guides, and demo project templates.",
    icon: <LinkIcon className="w-5 h-5" stroke="rgb(156, 163, 175)" />,
  },
];

function Resources({ hackathon }: { hackathon: HackathonHeader }) {
  return (
    <section className="text-black dark:text-white bg-white dark:bg-black py-12 px-6">
      <h2 className="text-4xl font-bold mb-6">Resources</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Unlock incredible rewards for your innovation and skills in{" "}
        {hackathon.title}
      </p>
      <Separator className="mb-6 bg-gray-200 dark:bg-gray-700" />

      <div className="grid gap-3">
        {resources.map((resource, index) => (
          <Card
            key={index}
            className="border border-gray-300 dark:border-gray-800 hover:border-gray-500 dark:hover:border-gray-600 transition 
                  h-[64px] min-h-[64px] max-h-[64px] rounded-lg 
                 px-4 py-3 flex items-center space-x-3 bg-gray-100 dark:bg-[#111]"
          >
            <div>{resource.icon}</div>
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

      <div className="mt-12 flex justify-center">
        <Button className="bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white text-lg px-6 py-3">
          EXPLORE FULL DOCUMENTATION & TOOLS
        </Button>
      </div>
    </section>
  );
}
export default Resources;
