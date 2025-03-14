"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { HackathonHeader } from "@/types/hackathons";
import { Calendar, Trophy, Rocket, Check } from "lucide-react";
import React from "react";
import ReactMarkdown from "react-markdown";

function Submission({ hackathon }: { hackathon: HackathonHeader }) {
  return (
    <section className="py-16 text-black dark:text-white">
      <h2 className="text-4xl font-bold" id="submission">
        Submit Your Project
      </h2>
      <Separator className="my-8 bg-zinc-300 dark:bg-zinc-800" />
      <p className="text-lg mb-8">
        Follow the guidelines to submit your hackathon project successfully
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4">
        <div className="bg-zinc-200 dark:bg-zinc-900 p-6 shadow-md flex flex-col items-start justify-center rounded-tl-md rounded-tr-md lg:rounded-tr-none rounded-bl-md">
          <Calendar
            className={`mb-4 !text-zinc-600 dark:!text-zinc-400`}
            size={24}
          />
          <h3 className="text-xl font-semibold mb-2">Deadline</h3>
          <p className="text-sm">
            Submissions close on <b>March 18, 2025</b>, at <b>11:59 PM UTC</b>.
          </p>
        </div>

        <div className="bg-zinc-700 dark:bg-zinc-800 p-6 shadow-md flex flex-col items-start justify-center">
          <Check
            size={24}
            className={`mb-4 !text-zinc-200 dark:!text-zinc-400`}
          />
          <h3 className="text-xl font-semibold mb-2 text-zinc-50">
            Requirements
          </h3>
          <p className="text-sm text-zinc-50">
            Your project must include a GitHub repo, a short demo video, and a
            brief pitch.
          </p>
        </div>

        <div className="bg-zinc-200 dark:bg-zinc-900 p-6 shadow-md flex flex-col items-start justify-center">
          <Trophy
            size={24}
            className={`mb-4 !text-zinc-600 dark:!text-zinc-400`}
          />
          <h3 className="text-xl font-semibold mb-2">Evaluation Criteria</h3>
          <p className="text-sm">
            Projects will be judged on innovation, technical complexity,
            usability, and impact.
          </p>
        </div>

        <div className="bg-zinc-700 dark:bg-zinc-800 p-6 shadow-md flex flex-col items-start justify-center lg:rounded-tr-md rounded-bl-md lg:rounded-bl-none rounded-br-md">
          <Rocket
            size={24}
            className={`mb-4 !text-zinc-200 dark:!text-zinc-400`}
          />
          <h3 className="text-xl font-semibold mb-2 text-zinc-50">
            Submission Process
          </h3>
          <p className="text-sm text-zinc-50">
            Submit your project through the Avalanche Builders Hub, add your
            team members, and upload your GitHub repo along with a demo video.
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={"secondary"}
              className="w-3/4 sm:w-1/2 lg:w-1/3 bg-red-500 rounded-md text-zinc-100"
            >
              View full guidelines
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900">
            <div className="max-w-lg text-white rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-500 rounded-full">
                  <Trophy
                    size={24}
                    color="#F5F5F9"
                  />
                </div>
                <h1 className="text-3xl font-semibold">Guidelines</h1>
              </div>
              <span className="block w-full h-[1px] my-8 bg-red-500"></span>
              <ReactMarkdown>{hackathon.content.judging_guidelines}</ReactMarkdown>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

export default Submission;
