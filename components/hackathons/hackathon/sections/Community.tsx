import { HackathonHeader } from "@/types/hackathons";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Crown, User, Handshake } from "lucide-react";

const communityResources = [
  {
    title: "Discord / Telegram",
    icon: <Crown className="w-6 h-6 stroke-black dark:stroke-white" />,
    link: "https://discord.com/invite/avax",
  },
  {
    title: "Mentorship Program",
    icon: <User className="w-6 h-6 stroke-black dark:stroke-white" />,
    link: "https://www.avax.network/blog/avalanche-launches-ambassador-dao",
  },
  {
    title: "Networking Opportunities",
    icon: <Handshake className="w-6 h-6 stroke-black dark:stroke-white" />,
    link: "https://www.avax.network/",
  },
];

function Community({ hackathon }: { hackathon: HackathonHeader }) {
  return (
    <section className="text-black dark:text-white bg-white dark:bg-black py-12 px-6">
      <h2 className="text-4xl font-bold mb-6">Community</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 text-center">
        Connect with fellow hackers, mentors, and experts. Get real-time support, network with industry leaders, 
        and make the most of your hackathon experience.
      </p>
      <Separator className="mb-6 bg-gray-200 dark:bg-gray-700" />

      {/* Tarjetas con íconos y links */}
      <div className="flex flex-col md:flex-row justify-center gap-4">
        {communityResources.map((item, index) => (
          <a 
            key={index} 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-[350px] h-[80px]"
          >
            <Card
              className="border border-gray-300 dark:border-gray-800 hover:border-gray-500 dark:hover:border-gray-600 transition 
                         flex items-center justify-center gap-3 w-full h-full 
                         rounded-lg px-6 py-4 bg-gray-100 dark:bg-[#111] hover:bg-gray-200 dark:hover:bg-gray-900"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-[#FF394A] rounded-full">
                {item.icon}
              </div>
              <h3 className="text-black dark:text-white text-lg font-semibold">{item.title}</h3>
            </Card>
          </a>
        ))}
      </div>

      {/* Botón de acción */}
      <div className="mt-8 flex justify-center">
        <Button 
          asChild
          className="bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white text-lg px-6 py-3"
        >
          <a href="https://example.com/community" target="_blank" rel="noopener noreferrer">
            EXPLORE COMMUNITY & NETWORKING
          </a>
        </Button>
      </div>
    </section>
  );
}

export default Community;
