import React from "react";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HackathonLite } from "@/types/hackathons";
import { redirect } from "next/navigation";
import {
  getFilteredHackathons,
  getHackathon,
} from "@/server/services/hackathons";
import { Divider } from "@/components/ui/divider";
import { TimeZoneSelect } from "@/components/ui/timezone-select";
import { DeadlineTimer } from "@/components/ui/deadline-timer";
import { SearchEventInput } from "@/components/ui/search-event-input";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const hackathons = await getFilteredHackathons({});
  return hackathons.hackathons.map((hackathon: HackathonLite) => ({
    id: hackathon.id,
  }));
}

export default async function HackathonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hackathon = await getHackathon(id);
  const menuItems = ["Overview", "Schedule", "Info", "Partners", "Tracks"];

  if (!hackathon) redirect("/hackathons");

  return (
    <main className="container relative max-w-[1100px] px-2 py-4 lg:py-16">
      {/* Outer Wrapper with Rounded Top Corners */}
      <div className="border border-gray-700 rounded-t-lg overflow-hidden shadow-lg">
        {/* Menu Section */}
        <div className="p-4 border-b border-gray-700">
          <nav className="text-sm">
            <ul className="flex space-x-4 px-4 py-2 text-sm">
              {menuItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Jumbotron Section */}
        <div className="bg-zinc-800 p-8 min-h-[500px]">
          <h1 className="text-3xl font-bold text-white">{hackathon.title}</h1>
          <p className="text-gray-400 mt-2">{hackathon.description}</p>
        </div>

        <div className="p-6 space-y-8">
          {/* Schedule Section */}
          <section>
            <h2 className="text-4xl font-bold mb-8">Schedule</h2>
            <Divider />
            <p>{getDateRange(hackathon.agenda)}</p>
            <div className="flex justify-between gap-10 mt-4 min-w-full">
              <div className="flex items-center justify-center gap-10">
                <SearchEventInput />
                <TimeZoneSelect />
              </div>
              <DeadlineTimer events={hackathon.agenda} />
            </div>
            <Divider />
            {/* Schedule content will go here */}
          </section>
          {/* Info Section */}
          <section>
            <h2 className="text-4xl font-bold mb-8">Info</h2>
            <Divider />
            {/* Info content will go here */}
          </section>
          {/* Partners Section */}
          <section>
            <h2 className="text-xl font-bold mb-4">Partners</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6">
              {hackathon.partners.map((partner, index) => (
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
            </div>
          </section>
          {/* Tracks Section */}
          <section>
            <h2 className="text-4xl font-bold mb-8">Pizes & Tracks</h2>
            <Divider />
            <div className="h-px grid grid-cols-1 xl:grid-cols-2 gap-4">
              {hackathon.tracks.map((track, index) => (
                <div
                  key={index}
                  className="border border-white rounded-lg p-4 flex flex-col gap-4"
                >
                  <h3 className="text-lg font-bold">{track.name}</h3>

                  <p className="text-sm text-gray-300">{track.description}</p>

                  <div className="flex justify-between items-center text-white mt-2">
                    <span className="text-sm">
                      {track.prizes.length} prizes
                    </span>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm">${track.total_reward}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {track.partner}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Link href={`/hackathons/${id}/admin-panel`}>
          <Button>Edit Hackathon</Button>
        </Link>
      </div>
    </main>
  );
}

interface Activity {
  date: string;
  name: string;
  stage: string;
  duration: string;
  description: string;
}

function getDateRange(activities: Activity[]): string {
  if (!activities.length) return "No dates available";

  const dates = activities.map((activity) => new Date(activity.date));

  const earliestDate = new Date(
    Math.min(...dates.map((date) => date.getTime()))
  );
  const latestDate = new Date(Math.max(...dates.map((date) => date.getTime())));

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (earliestDate.getTime() === latestDate.getTime()) {
    return formatter.format(earliestDate);
  }

  if (
    earliestDate.getMonth() === latestDate.getMonth() &&
    earliestDate.getFullYear() === latestDate.getFullYear()
  ) {
    return `${earliestDate.toLocaleString("en-US", {
      month: "long",
    })} ${earliestDate.getDate()} - ${latestDate.getDate()}, ${latestDate.getFullYear()}`;
  }

  return `${formatter.format(earliestDate)} - ${formatter.format(latestDate)}`;
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00016 5.5V8.16667L9.3335 9.5M3.3335 1.5L1.3335 3.5M14.6668 3.5L12.6668 1.5M4.2535 11.9666L2.66683 13.5M11.7601 11.9466L13.3334 13.4999M13.3335 8.16667C13.3335 11.1122 10.9457 13.5 8.00016 13.5C5.05464 13.5 2.66683 11.1122 2.66683 8.16667C2.66683 5.22115 5.05464 2.83333 8.00016 2.83333C10.9457 2.83333 13.3335 5.22115 13.3335 8.16667Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
