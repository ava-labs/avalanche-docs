import { Divider } from "@/components/ui/divider";
import { HackathonHeader } from "@/types/hackathons";
import { Crown } from "lucide-react";
import React from "react";

function Tracks({ hackathon }: { hackathon: HackathonHeader }) {
  return (
    <section>
      <h2 className="text-4xl font-bold mb-8" id="tracks">
        Prizes & Tracks
      </h2>
      <Divider />
      <div className="pt-5 pb-5">
        <p>
          Unlock incredible rewards for your innovation and skills in AvaHack
          2025!
        </p>
      </div>
      <div className="absolute left-0 mt-24">
        <div className="relative left-0 w-full py-32 px-20 grid grid-cols-4 items-center content-center gap-8 bg-zinc-200 opacity-15">
          <div className="w-1/5 absolute top-[-5.5rem] left-1/2 transform -translate-x-1/2 h-44 p-8 flex flex-col content-center items-center bg-red-300 rounded-xl">
            <div className="p-2 rounded-full bg-white">
              <Crown color="#FF394A" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">
              ${hackathon.total_prizes.toLocaleString("en-US")}
            </h2>
            <p className="text-sm text-zinc-900">Total price pool</p>
          </div>
          {hackathon.content.tracks.map((track, index) => (
            <div
              key={index}
              className="relative w-full h-44 p-8 bg-zinc-900 rounded-xl border-zinc-800 border-2"
            >
              <h2 className="text-xl font-bold">{track.name}</h2>
              <p className="text-sm text-zinc-400">{track.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tracks;
