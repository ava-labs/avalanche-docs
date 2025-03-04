import { HackathonHeader, ScheduleActivity } from '@/types/hackathons';
import React from 'react';



function Submission({ hackathon }: { hackathon: HackathonHeader }) {
  return (
    <h2 className="text-4xl font-bold mb-8" id="submission">
        Submit Your Project
      </h2>)
}
export default Submission;