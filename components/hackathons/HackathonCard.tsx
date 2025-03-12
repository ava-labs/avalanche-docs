import { Trophy, UserRound } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HackathonHeader } from "@/types/hackathons";
import { Button } from "../ui/button";
import HackathonStatus from "./hackathon/HackathonStatus";
import { Badge } from "../ui/badge";

export default function HackathonCard({
  hackathon,
}: {
  hackathon: HackathonHeader;
}) {
  return (
    <div
      key={hackathon.id}
      className="flex rounded-lg shadow-lg h-[280px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-transparent"
    >
      {/* Left Section: Background Image or Red Color */}
      <Image
        src="/temp/hackathon-mock.png"
        alt="Avalanche Logo"
        className="rounded-l-md w-[200px] hidden md:block"
        width={200}
        height={280}
      />

      {/* Right Section */}
      <div className="flex-1 justify-evenly bg-zinc-50 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 p-6 flex flex-col gap-1 rounded-md md:rounded-l-none">
        <h2 className="uppercase font-bold text-2xl">{hackathon.title}</h2>

        <div className="flex items-center gap-2 dark:text-zinc-300 text-zinc-600 text-sm mt-2">
          <CalendarIcon className="h-4 w-4 dark:stroke-zinc-50 stroke-zinc-900" />
          <span className="font-medium">
            {new Date(hackathon.start_date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-3 w-3 dark:stroke-zinc-50 stroke-zinc-900" />
          <p className="text-xs dark:text-zinc-300 text-zinc-800">
            {hackathon.location}
          </p>
        </div>
        {/* Tags Section */}
        {hackathon.tags && hackathon.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {hackathon.tags.map((tag: string) => (
              <Badge className="border-2 border-zinc-900 dark:border-zinc-50">
                <p className="text-sm">{tag}</p>
              </Badge>
            ))}
          </div>
        )}
        <div className="flex justify-around items-center text-gray-300 text-sm py-[10px]">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 dark:stroke-zinc-50 stroke-zinc-900" />
            <span className="font-medium dark:text-zinc-50 text-zinc-900">10k</span>
          </div>
          <div className="flex items-center gap-2">
            <UserRound className="h-4 w-4 dark:stroke-zinc-50 stroke-zinc-900" />
            <span className="font-medium dark:text-zinc-50 text-zinc-900">9000</span>
          </div>
          <div className="flex items-center gap-2">
            <HackathonStatus status={hackathon.status ?? 'UPCOMING'} enableLightMode={true} />
          </div>
        </div>
        <Button
          asChild
          variant="secondary"
          className="w-full bg-red-500 hover:bg-red-600 py-2 px-4"
        >
          <Link className="text-sm text-zinc-50" href={`/hackathons/${hackathon.id}`}>
            LEARN MORE
          </Link>
        </Button>
      </div>
    </div>
  );
}
