"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { HackathonHeader } from "@/types/hackathons";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import React from "react";

function Sponsors({ hackathon }: { hackathon: HackathonHeader }) {
  const plugin = AutoScroll({
    speed: 1,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
    playOnInit: true,
  });

  return (
    <section>
      <h2 className="text-4xl font-bold mb-8" id="sponsors">
        Sponsors
      </h2>
      <Separator className="my-8 bg-zinc-300 dark:bg-zinc-800" />
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Our sponsors drive the future of blockchain innovation.
      </p>
      <div>
        <Carousel
          plugins={[plugin]}
          className="w-screen left-1/2 transform -translate-x-1/2 dark:bg-zinc-200 bg-zinc-700 py-4"
          opts={{
            loop: true,
            dragFree: false,
          }}
        >
          <CarouselContent>
            {hackathon.content.partners.map((partner, index) => (
              <CarouselItem
                key={index}
                className="basis-1/5 h-44 items-center justify-center flex"
              >
                <Image
                  src="/temp/ava_cloud_banner.svg"
                  alt={partner.name}
                  className="object-contain filter grayscale invert dark:invert-0"
                  height={120}
                  width={200}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex justify-center mt-8">
        <Button
          variant={"secondary"}
          className="w-1/3 bg-red-500 rounded-md text-zinc-100"
        >
          BECOME A SPONSOR
        </Button>
      </div>
    </section>
  );
}
export default Sponsors;
