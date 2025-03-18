import Image from "next/image";
import { HackathonHeader } from "@/types/hackathons";
import React from "react";
import { DynamicIcon } from "lucide-react/dynamic";

function MentorsJudges({ hackathon }: { hackathon: HackathonHeader }) {
  return (
    <section id="speakers">
      <div className="bg-zinc-900 p-4 sm:p-16 flex flex-col gap-4">
        <div className="flex items-center">
          <div className="lg:w-[45%] pr-16">
            <h2 className="text-4xl font-bold mb-8 text-zinc-100">
              Mentors & Judges
            </h2>
            <p className="text-zinc-100">
              {hackathon.content.speakers_text}
            </p>
          </div>
          <Image
            src={hackathon.content.speakers_banner}
            alt="Speakers and judges collage"
            width={300}
            height={300}
            className="w-[55%] hidden lg:block"
          ></Image>
        </div>
        <div className="flex gap-4 justify-center sm:justify-start flex-wrap">
          {hackathon.content.speakers.map((speaker, index) => (
            <div key={index} className="flex flex-col gap-4 mt-4">
              <Image
                src={speaker.picture}
                alt="speaker picture"
                width={160}
                height={160}
                className="rounded-md w-32 md:w-40 h-32 md:h-40"
              />
              <div>
                <h3 className="text-md font-bold text-zinc-100">
                  {speaker.name}
                </h3>
                <div className="flex items-center gap-2">
                  <DynamicIcon
                    name={speaker.icon as any}
                    size={16}
                    color="#F5F5F9"
                  />
                  <p className="text-sm font-light text-zinc-300">
                    {speaker.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default MentorsJudges;
