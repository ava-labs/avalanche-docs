import { HackathonHeader } from "@/types/hackathons";
import { Button } from "@/components/ui/button"; 
import { Calendar, CheckCircle, Trophy, Rocket } from "lucide-react"; 
import React from "react";

function Submission({ hackathon }: { hackathon: HackathonHeader }) {
  return (
    <section className="py-16 px-6 md:px-20 bg-white dark:bg-zinc-900 text-black dark:text-white">
      <h2 className="text-4xl font-bold mb-4">Submit Your Project</h2>
      <p className="text-center text-lg mb-8">
        Follow the guidelines to submit your hackathon project successfully
      </p>

     
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
       
        <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-xl shadow-md flex flex-col items-start">
          <Calendar className="w-8 h-8 text-gray-600 dark:text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Deadline</h3>
          <p className="text-sm">
            Submissions close on <b>March 18, 2025</b>, at <b>11:59 PM UTC</b>.
          </p>
        </div>

       
        <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-xl shadow-md flex flex-col items-start">
          <CheckCircle className="w-8 h-8 text-gray-600 dark:text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Requirements</h3>
          <p className="text-sm">
            Your project must include a GitHub repo, a short demo video, and a brief pitch.
          </p>
        </div>

       
        <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-xl shadow-md flex flex-col items-start">
          <Trophy className="w-8 h-8 text-gray-600 dark:text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Evaluation Criteria</h3>
          <p className="text-sm">
            Projects will be judged on innovation, technical complexity, usability, and impact.
          </p>
        </div>

       
        <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-xl shadow-md flex flex-col items-start">
          <Rocket className="w-8 h-8 text-gray-600 dark:text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Submission Process</h3>
          <p className="text-sm">
            Submit your project through the Avalanche Builders Hub, add your team members, and upload your GitHub repo along with a demo video.
          </p>
        </div>
      </div>

      
      <div className="flex justify-center mt-8">
        <Button className="bg-red-500 text-white hover:bg-red-600 px-6 py-3 rounded-lg text-lg">
          VIEW SUBMISSION GUIDELINES
        </Button>
      </div>
    </section>
  );
}

export default Submission;
