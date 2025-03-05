import { Carousel } from "@/components/ui/carousel";
import { HackathonHeader } from "@/types/hackathons";
import Autoplay from 'embla-carousel-autoplay'
import React from "react";

function Sponsors({ hackathon }: { hackathon: HackathonHeader }) {
  return (
    <section>
      <h2 className="text-4xl font-bold mb-8" id="sponsors">
        Sponsors
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          {hackathon.content.partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center border border-gray-400 rounded-lg p-4"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-50 min-h-[120px] object-contain"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
export default Sponsors;
