"use client";

import { Timer, Hourglass } from "lucide-react";
import { useEffect, useState } from "react";

interface Event {
  date: string;
  name: string;
  stage: string;
  duration: string;
  description: string;
}

interface DeadlineTimerProps {
  events: Event[];
  className?: string;
}

export function DeadlineTimer({ events, className = "" }: DeadlineTimerProps) {
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [nearestEvent, setNearestEvent] = useState<Event | null>(null);

  useEffect(() => {
    const calculateNearestEvent = () => {
      const now = new Date();

      // Filter future events and sort by date
      const futureEvents = events
        .filter((event) => new Date(event.date) > now)
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

      if (futureEvents.length > 0) {
        const closest = futureEvents[0];
        setNearestEvent(closest);

        const diffTime = new Date(closest.date).getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysRemaining(diffDays);
      }
    };

    calculateNearestEvent();
    // Update every day
    const interval = setInterval(calculateNearestEvent, 86400000);

    return () => clearInterval(interval);
  }, [events]);

  if (!nearestEvent) {
    return null;
  }

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-md border-2 border-red-500 bg-black px-3 py-2 text-zinc-50 h-10 ${className}`}
    >
      <Hourglass className="h-5 w-5" color="#F5F5F9" />
      <div className="flex flex-col">
        <span>{daysRemaining} days to deadline</span>
      </div>
    </div>
  );
}
