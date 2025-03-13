import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HackathonHeader } from "@/types/hackathons";
import { format } from "date-fns";
import { Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import HackathonStatus from "../HackathonStatus";

type Props = {
  id: string;
  hackathon: HackathonHeader;
};

export default function OverviewBanner({ hackathon, id }: Props) {
  const startDate = new Date(hackathon.start_date);
  const endDate = new Date(hackathon.end_date);

  const startMonth = format(startDate, "MMMM");
  const endMonth = format(endDate, "MMMM");

  const formattedDate =
    startMonth === endMonth
      ? `${format(startDate, "MMMM d")} - ${format(endDate, "d, yyyy")}`
      : `${format(startDate, "MMMM d")} - ${format(endDate, "MMMM d, yyyy")}`;
  return (
    <div className="z-10 h-full w-[46%] absolute flex flex-col justify-end bottom-20 left-[10%]  mb-[-30px]">
      <h1 className="text-6xl text-zinc-50 font-bold mb-2">
        {hackathon.title}
      </h1>
      <p className="text-base text-zinc-50">{hackathon.description}</p>
      <div className="max-w-80">
        <h2
          className="mt-6 mb-12 text-6xl font-bold text-red-500"
          style={{ textShadow: "0px 4px 6px #9F2428" }}
        >
          ${hackathon.total_prizes.toLocaleString("en-US")}
        </h2>
        <Button
          variant={"secondary"}
          className="w-full mb-20 bg-red-500 border-none text-zinc-100 rounded-md"
        >
          <Link href={`/hackathons/registration-form`}>JOIN NOW</Link>
        </Button>
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 max-w-[60%]">
            <div className="flex justify-between gap-8 text-gray-400">
              <Calendar size={20} color="#F5F5F9" />
              <span className="text-sm text-zinc-50">{formattedDate}</span>
            </div>
            <div className="flex justify-between gap-8 text-gray-400">
              <MapPin size={20} color="#F5F5F9" />
              <span className="text-sm text-zinc-300">
                {hackathon.location}
              </span>
            </div>
          </div>
          <div className="max-w-[90%] flex justify-center flex-wrap gap-x-4 gap-y-2 mt-4">
            {hackathon.tags.map((tag, index) => (
              <Badge
                key={index}
                className="bg-zinc-800 text-zinc-50 px-3 py-1 text-sm rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between gap-4 mt-4 max-w-[90%]">
            <div className="flex gap-2 text-gray-400">
              <Users size={20} color="#F5F5F9" />
              <span className="text-sm text-zinc-50">
                {hackathon.participants}
              </span>
            </div>
            <HackathonStatus status={hackathon.status} />
          </div>
        </div>
      </div>
    </div>
  );
}
