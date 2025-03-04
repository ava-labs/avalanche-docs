import { HackathonHeader, ScheduleActivity } from '@/types/hackathons';
import React from 'react';



function Speakers({ hackathon }: { hackathon: HackathonHeader }) {
  return (
    <h2 className="text-4xl font-bold mb-8" id="speakers">
      Speakers
    </h2>
  );
}
export default Speakers;
