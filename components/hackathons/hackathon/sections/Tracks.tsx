import { HackathonHeader, ScheduleActivity } from "@/types/hackathons";
import React from "react";

function Tracks({ hackathon }: { hackathon: HackathonHeader }) {
  return (
    <h2 className="text-4xl font-bold mb-8" id="tracks">
      Prizes & Tracks
    </h2>
  );
}


export default Tracks;