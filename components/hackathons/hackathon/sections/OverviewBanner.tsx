import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HackathonHeader } from "@/types/hackathons";
import { format } from "date-fns";
import { Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  hackathon: HackathonHeader;
};

export default function OverviewBanner({ hackathon, id }: Props) {
  return (
    <div className="z-10 h-full absolute flex flex-col justify-end bottom-20 left-[10%]  mb-[-30px]">
      <h1 className="text-6xl text-zinc-50 font-bold mb-2">
        {hackathon.title}
      </h1>
      <div className="w-[70%] max-w-80">
        <p className="text-base text-zinc-50">{hackathon.description}</p>
        <h2
          className="mt-6 mb-12 text-6xl font-bold text-red-500"
          style={{ textShadow: "0px 4px 6px #9F2428" }}
        >
          ${hackathon.total_prizes.toLocaleString("en-US")}
        </h2>
        <Button
          variant={"secondary"}
          className="w-full mb-20 bg-red-500 rounded-md text-zinc-100"
        >
          <Link href={`/hackathons/registration-form`}>JOIN NOW</Link>
        </Button>
        <div className="flex flex-col w-[90%]">
          <div className="flex flex-col gap-2 w-[80%]">
            <div className="flex justify-between gap-2 text-gray-400">
              <Calendar size={20} color="#F5F5F9" />
              <span className="text-sm text-zinc-50">
                {format(hackathon.start_date, "MMMM d")} -{" "}
                {format(hackathon.end_date, "d, yyyy")}
              </span>
            </div>
            <div className="flex justify-between gap-2 text-gray-400">
              <MapPin size={20} color="#F5F5F9" />
              <span className="text-sm text-zinc-300">
                {hackathon.location}
              </span>
            </div>
          </div>
          <div className="flex justify-around gap-2 mt-4">
            {hackathon.tags.map((tag, index) => (
              <Badge key={index} className="bg-zinc-800 text-zinc-50 px-3 py-1 text-sm rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between gap-4 mt-8">
            <div className="flex gap-2 text-gray-400">
              <Users size={20} color="#F5F5F9" />
              <span className="text-sm text-zinc-50">
                {hackathon.content.participants}
              </span>
            </div>
            <div className="flex items-center gap-2 text-yellow-500 font-semibold">
              <span className="w-3 h-3 rounded-full border-2 border-yellow-500"></span>
              <span className="text-sm text-zinc-50">{hackathon.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
