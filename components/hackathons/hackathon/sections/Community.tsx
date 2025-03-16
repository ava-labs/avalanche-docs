import { HackathonHeader } from "@/types/hackathons";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DynamicIcon } from "lucide-react/dynamic";

const communityResources = [
  {
    title: "Discord / Telegram",
    icon: "crown",
    link: "https://discord.com/invite/avax",
  },
  {
    title: "Mentorship Program",
    icon: "circle-user",
    link: "https://www.avax.network/blog/avalanche-launches-ambassador-dao",
  },
  {
    title: "Networking Opportunities",
    icon: "handshake",
    link: "https://www.avax.network/",
  },
];

function Community({ hackathon }: { hackathon: HackathonHeader }) {
  return (
    <section className="text-black dark:text-white py-12">
      <h2 className="text-4xl font-bold mb-6">Community</h2>
      <Separator className="my-8 bg-zinc-300 dark:bg-zinc-800" />
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        Connect with fellow hackers, mentors, and experts. Get real-time
        support, network with industry leaders, and make the most of your
        hackathon experience.
      </p>

      <div className="flex flex-col items-center md:flex-row justify-center gap-4">
        {communityResources.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[250px] sm:w-[350px] h-[80px]"
          >
            <Card
              className="border border-gray-300 dark:border-gray-800 hover:border-gray-500 dark:hover:border-gray-600 transition 
                         flex items-center justify-between gap-3 w-full h-full 
                         rounded-lg px-6 py-4 "
            >
              <div className="p-3 flex items-center justify-center bg-[#FF394A] rounded-full text-zinc-50">
                <DynamicIcon
                  name={item.icon as any}
                  color="#F5F5F9"
                  className="w-5 sm:w-7 h-5 sm:h-7"
                />
              </div>
              <h3 className="text-black dark:text-white sm:text-lg font-semibold">
                {item.title}
              </h3>
            </Card>
          </a>
        ))}
      </div>

      {/* Botón de acción */}
      <div className="mt-8 flex justify-center">
        <Button
          asChild
          variant={"secondary"}
          className="sm:w-1/2 lg:w-1/3 bg-red-500 rounded-md text-zinc-100"
        >
          <a
            href="https://example.com/community"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-xs lg:text-base">EXPLORE COMMUNITY & NETWORKING</p>
          </a>
        </Button>
      </div>
    </section>
  );
}

export default Community;
