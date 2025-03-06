"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { HackathonHeader } from "@/types/hackathons";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

function Sponsors({ hackathon }: { hackathon: HackathonHeader }) {
  return (
    <section>
      <h2 className="text-4xl font-bold mb-8" id="sponsors">
        Sponsors
      </h2>
      <Separator className="my-8 bg-zinc-300 dark:bg-zinc-800" />
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Our sponsors drive the future of blockchain innovation.
      </p>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {hackathon.content.partners.map((partner, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col items-center justify-center border border-gray-400 rounded-lg p-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-50 min-h-[120px] object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
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
