import { Divider } from '@/components/ui/divider';
import { SearchEventInput } from '@/components/ui/search-event-input';
import { TimeZoneSelect } from '@/components/ui/timezone-select';
import { HackathonHeader, ScheduleActivity } from '@/types/hackathons';
import { Hourglass } from 'lucide-react';
import React from 'react';

const mockActivities = [
  // Day 1
  {
    date: '2024-11-01T10:00:00.000Z',
    name: 'Opening Ceremony',
    stage: 'Main Stage',
    duration: '2 hours',
    description:
      'Welcome and kickoff event with special guests and announcements',
    host: 'Ava Labs Team',
    level: 'All',
  },
  {
    date: '2024-11-01T13:00:00.000Z',
    name: 'Team Formation',
    stage: 'Collaboration Zone',
    duration: '3 hours',
    description: 'Meet potential teammates and form your hackathon team',
    host: 'Ava Labs Team',
    level: 'Advanced',
  },
  {
    date: '2024-11-01T16:00:00.000Z',
    name: 'Ideation Workshop',
    stage: 'Workshop Area',
    duration: '2 hours',
    description: 'Brainstorming session with mentors',
    host: 'Ava Labs Team',
    level: 'Intermediate',
  },

  // Day 2
  {
    date: '2024-11-02T09:00:00.000Z',
    name: 'Technical Workshop',
    stage: 'Workshop Area',
    duration: '3 hours',
    description: 'Learn about smart contract development',
    host: 'Ava Labs Team',
    level: 'Beginner',
  },
  {
    date: '2024-11-02T14:00:00.000Z',
    name: 'Mentor Office Hours',
    stage: 'Meeting Rooms',
    duration: '4 hours',
    description: 'One-on-one sessions with industry experts',
    host: 'Ava Labs Team',
    level: 'All',
  },
  {
    date: '2024-11-02T19:00:00.000Z',
    name: 'Evening Social',
    stage: 'Social Area',
    duration: '2 hours',
    description: 'Network with other participants',
    host: 'Ava Labs Team',
    level: 'All',
  },

  // Day 3
  {
    date: '2024-11-03T10:00:00.000Z',
    name: 'Progress Check-in',
    stage: 'Main Stage',
    duration: '1 hour',
    description: 'Teams share their progress and get feedback',
    host: 'Ava Labs Team',
    level: 'Wellness',
  },
  {
    date: '2024-11-03T14:00:00.000Z',
    name: 'Security Workshop',
    stage: 'Workshop Area',
    duration: '2 hours',
    description: 'Best practices for smart contract security',
    host: 'Ava Labs Team',
    level: 'Advanced',
  },
  {
    date: '2024-11-03T17:00:00.000Z',
    name: 'Practice Pitches',
    stage: 'Presentation Area',
    duration: '3 hours',
    description: 'Teams practice their final presentations',
    host: 'Ava Labs Team',
    level: 'Intermediate',
  },
];

function Schedule({ hackathon }: { hackathon: HackathonHeader }) {
  return (
    <section>
      <h2 className='text-5xl font-bold mb-8' id='schedule'>
        Schedule
      </h2>
      <Divider />
      <p>{getDateRange(hackathon.content.schedule)}</p>
      <div className='flex justify-between gap-10 mt-4 min-w-full'>
        <div className='flex items-center justify-center gap-10'>
          <SearchEventInput />
          <TimeZoneSelect />
        </div>
        <div className='inline-flex items-center gap-3 rounded-md border-2 border-red-500 bg-black px-3 py-2 text-zinc-50 h-10 '>
          <Hourglass className='h-5 w-5' color='#F5F5F9' />
          <div className='flex flex-col'>
            <span>
              {(() => {
                const deadline = new Date(
                  hackathon.content.registration_deadline
                );
                const now = new Date();
                const diffMs = deadline.getTime() - now.getTime();
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                const diffHours = Math.floor(
                  (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const diffMinutes = Math.floor(
                  (diffMs % (1000 * 60 * 60)) / (1000 * 60)
                );

                if (diffDays > 0) {
                  return `${diffDays} days to deadline`;
                } else {
                  return `${diffHours}h ${diffMinutes}m to deadline`;
                }
              })()}
            </span>
          </div>
        </div>
      </div>
      <Divider />
      {/* Schedule content will go here */}

      {/* Group activities by day */}
      <div className='relative overflow-x-auto'>
        <div className='grid grid-flow-col auto-cols-[100%] md:auto-cols-[50%] gap-5'>
          {Object.entries(groupActivitiesByDay(mockActivities)).map(
            ([date, activities], index) => (
              <div key={index} className='min-w-[300px]'>
                <h3 className='text-lg font-bold mb-4'>
                  {new Date(date).toDateString()}
                </h3>
                <div className='max-h-[600px] overflow-y-auto pr-2'>
                  <div className='space-y-4'>
                    {activities.map((activity, index) => (
                      <div
                        key={index}
                        className='bg-zinc-900 rounded-lg p-6 flex flex-col'
                      >
                        <div className='flex justify-between items-center mb-5'>
                          <div>
                            <h4 className='text-2xl font-bold text-red-500'>
                              {activity.name}
                            </h4>
                            <p className='text-md text-zinc-400'>
                              {activity.host}
                            </p>
                          </div>
                          <p className='text-sm bg-zinc-50 rounded-full text-black px-2.5 py-0.5'>
                            {activity.level}
                          </p>
                        </div>
                        <div className='flex justify-between items-center text-white mt-2'>
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
  );
}

export default Schedule;

type GroupedActivities = {
  [key: string]: ScheduleActivity[];
};

function getDateRange(activities: ScheduleActivity[]): string {
  if (!activities.length) return 'No dates available';

  const dates = activities.map((activity) => new Date(activity.date));

  const earliestDate = new Date(
    Math.min(...dates.map((date) => date.getTime()))
  );
  const latestDate = new Date(Math.max(...dates.map((date) => date.getTime())));

  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (earliestDate.getTime() === latestDate.getTime()) {
    return formatter.format(earliestDate);
  }

  if (
    earliestDate.getMonth() === latestDate.getMonth() &&
    earliestDate.getFullYear() === latestDate.getFullYear()
  ) {
    return `${earliestDate.toLocaleString('en-US', {
      month: 'long',
    })} ${earliestDate.getDate()} - ${latestDate.getDate()}, ${latestDate.getFullYear()}`;
  }

  return `${formatter.format(earliestDate)} - ${formatter.format(latestDate)}`;
}

function groupActivitiesByDay(
  activities: ScheduleActivity[]
): GroupedActivities {
  return activities.reduce((groups: GroupedActivities, activity) => {
    // Format the date to YYYY-MM-DD to use as key
    const date = new Date(activity.date);
    const dateKey = date.toISOString().split('T')[0];

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
