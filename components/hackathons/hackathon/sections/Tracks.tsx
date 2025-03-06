"use client";

import { useTheme } from "next-themes";
import { DynamicIcon } from "lucide-react/dynamic";
import { Divider } from "@/components/ui/divider";
import { HackathonHeader } from "@/types/hackathons";
import { Crown } from "lucide-react";
import React from "react";
import { Card } from "fumadocs-ui/components/card";
import { CardTitle } from "@/components/ui/card";
import TrackDialogContent from "../TrackModal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

async function Tracks({ hackathon }: { hackathon: HackathonHeader }) {
  const { resolvedTheme } = useTheme();
  const iconColor = resolvedTheme === "dark" ? "#A7A7B0" : "#6F6F77";
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
      <div className="relative py-32 grid grid-cols-4 content-center gap-8 mt-24">
        <div className="absolute -z-10 w-screen h-full left-1/2 transform -translate-x-1/2 bg-zinc-200"></div>
        <div className="w-[356px] absolute top-[-5.5rem] left-1/2 transform -translate-x-1/2 p-8 flex flex-col content-center items-center bg-red-300 rounded-xl border-2 border-red-500">
          <div className="p-2 rounded-full bg-white mb-4">
            <Crown color="#FF394A" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900">
            ${hackathon.total_prizes.toLocaleString("en-US")}
          </h2>
          <p className="text-sm text-zinc-900">Total price pool</p>
        </div>
        {hackathon.content.tracks.map((track, index) => (
          <Dialog key={index}>
            <DialogClose />
            <DialogTrigger asChild>
              <Card key={index} title="" className="h-44 w-full">
                <CardTitle>
                  <div className="flex justify-between items-center gap-2">
                    <h2 className="text-xl text-zinc-900 dark:text-zinc-50 font-bold">
                      {track.name}
                    </h2>
                    <DynamicIcon
                      name={track.icon as any}
                      color={iconColor}
                      size={16}
                    />
                  </div>
                </CardTitle>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {track.short_description}
                </p>
              </Card>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900">
              <TrackDialogContent track={track} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}

export default Tracks;
