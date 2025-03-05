import Image from "next/image";
import { HackathonHeader } from "@/types/hackathons";
import React from "react";

function Speakers({ hackathon }: { hackathon: HackathonHeader }) {
  return (
    <section className="px-4">
      <div className="bg-zinc-900 p-16 flex flex-col gap-4">
        <div className="flex items-center">
          <div className="flex-1 pr-16">
            <h2 className="text-4xl font-bold mb-8" id="speakers">
              Speakers & Judges
            </h2>
            <p>
              Connect with top industry leaders, judges, and mentors. Learn from
              the best, pitch your ideas, and get expert feedback to refine your
              project!
            </p>
          </div>
          <Image
            src="/speakers-judges-collage.png"
            alt="Speakers and judges collage"
            width={300}
            height={300}
            className="flex-1"
          ></Image>
        </div>
        <div className="flex gap-4">
          {hackathon.content.speakers.map((speaker) => (
            <div key={speaker.name} className="flex flex-col gap-4 mt-4">
              {/* <Image
              src={speaker.icon}
              alt={speaker.name}
              width={40}
              height={40}
              className="rounded-full"
            /> */}
              <div className="h-40 w-40 bg-zinc-200 rounded-lg"></div>
              <div>
                <h3 className="text-md font-bold">{speaker.name}</h3>
                <div className="flex gap-2">
                  {/* <Image
              src={speaker.picture}
              alt={speaker.name}
              width={40}
              height={40}
              className="rounded-full"
            /> */}
                  <p className="text-sm font-light">{speaker.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Speakers;
