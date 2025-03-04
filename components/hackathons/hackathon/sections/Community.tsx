import { HackathonHeader, ScheduleActivity } from '@/types/hackathons';
import React from 'react';



function Community({ hackathon }: { hackathon: HackathonHeader }) {
  return (
    <h2 className="text-4xl font-bold mb-8" id="community">
      Community
    </h2>
  );
}
export default Community;
