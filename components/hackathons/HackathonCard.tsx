import { Trophy, UserRound, Circle } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HackathonLite } from "@/types/hackathons";

export default function HackathonCard({ hackathon }: { hackathon: HackathonLite }) {
    const statusColors: Record<string, string> = {
      Ongoing: "stroke-green-500",
      Upcoming: "stroke-yellow-500",
      Ended: "stroke-red-500",
    };
  
    return (
      <div key={hackathon.id} className="w-[512px] flex rounded-lg overflow-hidden shadow-lg">
        {/* Left Section: Background Image or Red Color */}
        <div
          className="h-[280px] bg-zinc-800 flex items-center justify-start"
        >
          <Image
            src="/logo-black.png"
            alt="Avalanche Logo"
            width={200}
            height={50}
            className="dark:hidden"
          />
          <Image
            src="/logo-white.png"
            alt="Avalanche Logo"
            width={200}
            height={50}
            className="hidden dark:block"
          />
        </div>
  
        {/* Right Section */}
        <div className="flex-[3] bg-zinc-900 text-white p-4 flex flex-col justify-between">
          <h2 className="uppercase font-bold text-[30px]">{hackathon.title}</h2>
  
          <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
            <CalendarIcon className="h-5 w-5 stroke-white" />
            <span className="font-medium">
              {new Date(hackathon.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mt-2">
            <MapPinIcon className="h-5 w-5 stroke-white" />
            <p className="text-sm font-normal">{hackathon.location}</p>
          </div>
          {/* Tags Section */}
          {hackathon.tags && hackathon.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {hackathon.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-block rounded-full border uppercase border-white px-2 py-1 text-xs font-medium text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex justify-around items-center text-gray-300 text-sm mt-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 stroke-white" />
              <span className="font-medium">10K</span>
            </div>
            <div className="flex items-center gap-2">
              <UserRound className="h-5 w-5 stroke-white" />
              <span className="font-medium">9000</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className={`h-5 w-5 ${statusColors[hackathon.status]}`} />
              <span className="font-medium uppercase">{hackathon.status}</span>
            </div>
          </div>
          <div className="mx-auto">
            <Link href={`/hackathons/${hackathon.id}`}>
              <button className="w-[257px] h-[40px] min-h-[40px] max-h-[40px] bg-red-500 text-white font-medium uppercase rounded-md py-2 px-4 mt-4 flex items-center justify-center gap-2 hover:bg-red-600 transition">
                JOIN NOW
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  