import { HackathonHeader, ScheduleActivity } from "@/types/hackathons";
import React from "react";

function Resources({ hackathon }: { hackathon: HackathonHeader }) {
  return (
    <h2 className="text-4xl font-bold mb-8" id="resources">
      Resources
    </h2>
  );
}
export default Resources;
