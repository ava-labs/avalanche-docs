import React from "react";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HackathonHeader } from "@/types/hackathons";
import { redirect } from "next/navigation";
import {
  getFilteredHackathons,
  getHackathon,
} from "@/server/services/hackathons";
import { Divider } from "@/components/ui/divider";
import { TimeZoneSelect } from "@/components/ui/timezone-select";
import { DeadlineTimer } from "@/components/ui/deadline-timer";
import { SearchEventInput } from "@/components/ui/search-event-input";
import Image from "next/image";
import { NavigationMenu } from "@/components/hackathons/NavigationMenu";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const hackathons = await getFilteredHackathons({});
  return hackathons.hackathons.map((hackathon: HackathonHeader) => ({
    id: hackathon.id,
  }));
}

const mockActivities = [
  // Day 1
  {
    date: "2024-11-01T10:00:00.000Z",
    name: "Opening Ceremony",
    stage: "Main Stage",
    duration: "2 hours",
    description:
      "Welcome and kickoff event with special guests and announcements",
    host: "Ava Labs Team",
    level: "All",
  },
  {
    date: "2024-11-01T13:00:00.000Z",
    name: "Team Formation",
    stage: "Collaboration Zone",
    duration: "3 hours",
    description: "Meet potential teammates and form your hackathon team",
    host: "Ava Labs Team",
    level: "Advanced",
  },
  {
    date: "2024-11-01T16:00:00.000Z",
    name: "Ideation Workshop",
    stage: "Workshop Area",
    duration: "2 hours",
    description: "Brainstorming session with mentors",
    host: "Ava Labs Team",
    level: "Intermediate",
  },

  // Day 2
  {
    date: "2024-11-02T09:00:00.000Z",
    name: "Technical Workshop",
    stage: "Workshop Area",
    duration: "3 hours",
    description: "Learn about smart contract development",
    host: "Ava Labs Team",
    level: "Beginner",
  },
  {
    date: "2024-11-02T14:00:00.000Z",
    name: "Mentor Office Hours",
    stage: "Meeting Rooms",
    duration: "4 hours",
    description: "One-on-one sessions with industry experts",
    host: "Ava Labs Team",
    level: "All",
  },
  {
    date: "2024-11-02T19:00:00.000Z",
    name: "Evening Social",
    stage: "Social Area",
    duration: "2 hours",
    description: "Network with other participants",
    host: "Ava Labs Team",
    level: "All",
  },

  // Day 3
  {
    date: "2024-11-03T10:00:00.000Z",
    name: "Progress Check-in",
    stage: "Main Stage",
    duration: "1 hour",
    description: "Teams share their progress and get feedback",
    host: "Ava Labs Team",
    level: "Wellness",
  },
  {
    date: "2024-11-03T14:00:00.000Z",
    name: "Security Workshop",
    stage: "Workshop Area",
    duration: "2 hours",
    description: "Best practices for smart contract security",
    host: "Ava Labs Team",
    level: "Advanced",
  },
  {
    date: "2024-11-03T17:00:00.000Z",
    name: "Practice Pitches",
    stage: "Presentation Area",
    duration: "3 hours",
    description: "Teams practice their final presentations",
    host: "Ava Labs Team",
    level: "Intermediate",
  },
];

export default async function HackathonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hackathon = await getHackathon(id);
  console.log({ hackathon });

  const menuItems = [
    { name: "Overview", ref: "overview" },
    { name: "Schedule", ref: "schedule" },
    { name: "Info", ref: "info" },
    { name: "Partners", ref: "partners" },
    { name: "Tracks", ref: "tracks" },
  ];

  if (!hackathon) redirect("/hackathons");

  return (
    <main className="container max-w-[1100px] px-2 py-4 lg:py-16">
      {/* Outer Wrapper with Rounded Top Corners */}
      <div className="flex flex-col border border-gray-700 rounded-t-lg overflow-hidden shadow-lg">
        {/* Menu Section */}
        <NavigationMenu items={menuItems} />

        {/* Jumbotron Section */}
        <div
          className="relative bg-zinc-800 min-h-[500px] w-full"
          id="overview"
        >
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/builders-hub/hackathons/main_banner_img.png"
              alt="Hackathon background"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Schedule Section */}
          <section>
            <h2 className="text-4xl font-bold mb-8" id="schedule">
              Schedule
            </h2>
            <Divider />
            <p>{getDateRange(hackathon.content.schedule)}</p>
            <div className="flex justify-between gap-10 mt-4 min-w-full">
              <div className="flex items-center justify-center gap-10">
                <SearchEventInput />
                <TimeZoneSelect />
              </div>
              <DeadlineTimer events={hackathon.content.schedule} />
            </div>
            <Divider />
            {/* Schedule content will go here */}

            {/* Group activities by day */}
            <div className="relative overflow-x-auto">
              <div className="grid grid-flow-col auto-cols-[100%] md:auto-cols-[50%] gap-5">
                {Object.entries(groupActivitiesByDay(mockActivities)).map(
                  ([date, activities], index) => (
                    <div key={index} className="min-w-[300px]">
                      <h3 className="text-lg font-bold mb-4">
                        {new Date(date).toDateString()}
                      </h3>
                      <div className="max-h-[600px] overflow-y-auto pr-2">
                        <div className="space-y-4">
                          {activities.map((activity, index) => (
                            <div
                              key={index}
                              className="bg-zinc-900 rounded-lg p-6 flex flex-col"
                            >
                              {/* <div className="text-sm text-zinc-400">
                                {new Date(activity.date).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </div> */}
                              <div className="flex justify-between items-center mb-5">
                                <div>
                                  <h4 className="text-2xl font-bold text-red-500">
                                    {activity.name}
                                  </h4>
                                  <p className="text-md text-zinc-400">
                                    {activity.host}
                                  </p>
                                </div>
                                <p className="text-sm bg-zinc-50 rounded-full text-black px-2.5 py-0.5">{activity.level}</p>
                              </div>
                              <div className="flex justify-between items-center text-white mt-2">
                                {/* <span className="text-sm">
                                  {activity.stage}
                                </span>
                                <span className="text-sm">
                                  {activity.duration}
                                </span> */}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
          {/* Info Section */}
          <section>
            <h2 className="text-4xl font-bold mb-8" id="info">
              Info
            </h2>
            <Divider />
            {/* Info content will go here */}
          </section>
          {/* Partners Section */}
          <section>
            <h2 className="text-xl font-bold mb-4" id="partners">
              Partners
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6">
              {hackathon.content.partners.map((partner, index) => (
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
            <h2 className="text-4xl font-bold mb-8" id="tracks">
              Pizes & Tracks
            </h2>
            <Divider />
            <div className="h-px grid grid-cols-1 xl:grid-cols-2 gap-4">
              {hackathon.content.tracks.map((track, index) => (
                <div
                  key={index}
                  className="border border-white rounded-lg p-4 flex flex-col gap-4"
                >
                >
                  <h3 className="text-lg font-bold">{track.name}</h3>

                  <p className="text-sm text-gray-300">{track.description}</p>

                  <div className="flex justify-between items-center text-white mt-2">
                    <span className="text-sm">
                       prizes
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
  host: string;
  level: string;
}

interface GroupedActivities {
  [key: string]: Activity[];
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

function groupActivitiesByDay(activities: Activity[]): GroupedActivities {
  return activities.reduce((groups: GroupedActivities, activity) => {
    // Format the date to YYYY-MM-DD to use as key
    const date = new Date(activity.date);
    const dateKey = date.toISOString().split("T")[0];

    // If this date doesn't exist in groups, create an empty array
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    // Add the activity to the corresponding date group
    groups[dateKey].push(activity);

    // Sort activities within the day by time
    groups[dateKey].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return groups;
  }, {});
}
