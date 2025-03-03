import { Trophy, UserRound, Circle } from 'lucide-react';
import { CalendarIcon } from 'lucide-react';
import { MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { HackathonHeader } from '@/types/hackathons';
import { Button } from '../ui/button';

export default function HackathonCard({
  hackathon,
}: {
  hackathon: HackathonHeader;
}) {
  const statusColors: Record<string, string> = {
    Ongoing: 'stroke-green-500',
    Upcoming: 'stroke-yellow-500',
    Ended: 'stroke-red-500',
  };


  return (
    <div
      key={hackathon.id}
      className='flex rounded-lg shadow-lg h-[280px]'
    >
      {/* Left Section: Background Image or Red Color */}
      <Image
        src='/temp/hackathon-mock.png'
        alt='Avalanche Logo'
        className='rounded-l-md w-[200px] hidden md:block'
        width={200}
        height={280}
      />

      {/* Right Section */}
      <div className='flex-1 justify-evenly bg-zinc-900 text-white p-6 flex flex-col gap-1 rounded-md md:rounded-l-none'>
        <h2 className='uppercase font-bold text-3xl'>{hackathon.title}</h2>

        <div className='flex items-center gap-2 text-gray-300 text-sm mt-2'>
          <CalendarIcon className='h-4 w-4 stroke-white' />
          <span className='font-medium'>
            {new Date(hackathon.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
        <div className='flex items-center gap-2 text-gray-300'>
          <MapPinIcon className='h-3 w-3 stroke-white' />
          <p className='text-xs text-zinc-300'>{hackathon.location}</p>
        </div>
        {/* Tags Section */}
        {hackathon.tags && hackathon.tags.length > 0 && (
          <div className='mt-4 flex flex-wrap gap-2'>
            {hackathon.tags.map((tag: string) => (
              <span
                key={tag}
                className='inline-block rounded-full border uppercase border-zinc-50 px-2 py-1 text-xs font-medium text-white'
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className='flex justify-around items-center text-gray-300 text-sm py-[10px]'>
          <div className='flex items-center gap-2'>
            <Trophy className='h-4 w-4 stroke-white' />
            <span className='font-medium'>10K</span>
          </div>
          <div className='flex items-center gap-2'>
            <UserRound className='h-4 w-4 stroke-white' />
            <span className='font-medium'>9000</span>
          </div>
          <div className='flex items-center gap-2'>
            <Circle className={`h-4 w-4 ${statusColors[hackathon.status]}`} />
            <span className='font-medium uppercase'>{hackathon.status}</span>
          </div>
        </div>
        <Button asChild variant='secondary' className='w-full bg-red-500 hover:bg-red-600 py-2 px-4' >
          <Link className='text-sm' href={`/hackathons/${hackathon.id}`}>
            JOIN NOW
          </Link>
        </Button>
      </div>
    </div>
  );
}
