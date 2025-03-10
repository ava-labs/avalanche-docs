import Image from "next/image";
import { HackathonHeader } from "@/types/hackathons";
import React from "react";
import { DynamicIcon } from "lucide-react/dynamic";

function Speakers({ hackathon }: { hackathon: HackathonHeader }) {
  return (
    <section className="px-4" id="speakers">
      <div className="bg-zinc-900 p-16 flex flex-col gap-4">
        <div className="flex items-center">
          <div className="w-[45%] pr-16">
            <h2 className="text-4xl font-bold mb-8 text-zinc-100" >
              Speakers & Judges
            </h2>
            <p className="text-zinc-100">
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
            className="w-[55%]"
          ></Image>
        </div>
        <div className="flex gap-4 flex-wrap">
          {hackathon.content.speakers.map((speaker, index) => (
            <div key={index} className="flex flex-col gap-4 mt-4">
              <div className="h-40 w-40 bg-zinc-200 rounded-lg"></div>
              <div>
                <h3 className="text-md font-bold text-zinc-100">{speaker.name}</h3>
                <div className="flex items-center gap-2">
                  <DynamicIcon name={speaker.icon as any} size={16} color="#F5F5F9"/>
                  <p className="text-sm font-light text-zinc-300">{speaker.category}</p>
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