import React from 'react';
import { Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getHackathon, getHackathons } from '@/server/controllers/hackathons';
import { HackathonLite } from '@/types/hackathons';
import { redirect } from 'next/navigation';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const hackathons = await getFilteredHackathons({});
  return hackathons.hackathons.map((hackathon: HackathonLite) => ({
    id: hackathon.id,
  }));
}

export default async function HackathonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hackathon =  getHackathon(id);
  const menuItems = ['Overview', 'Schedule', 'Info', 'Partners', 'Tracks'];
  
  if (!hackathon) redirect('/hackathons');

  return (
    <main className='container relative max-w-[1100px] px-2 py-4 lg:py-16'>
      {/* Outer Wrapper with Rounded Top Corners */}
      <div className='border border-gray-700 rounded-t-lg overflow-hidden shadow-lg'>
        {/* Menu Section */}
        <div className='p-4 border-b border-gray-700'>
          <nav className='text-sm'>
            <ul className='flex space-x-4 px-4 py-2 text-sm'>
              {menuItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Jumbotron Section */}
        <div className='bg-zinc-800 p-8 min-h-[500px]'>
          <h1 className='text-3xl font-bold text-white'>{hackathon.title}</h1>
          <p className='text-gray-400 mt-2'>
            This is a placeholder for a short description about the hackathon.
          </p>
        </div>

        <div className='p-6 space-y-8'>
          {/* Schedule Section */}
          <section>
            <h2 className='text-xl font-bold'>Schedule</h2>
            {/* Schedule content will go here */}
          </section>
          {/* Info Section */}
          <section>
            <h2 className='text-xl font-bold'>Info</h2>
            {/* Info content will go here */}
          </section>
          {/* Partners Section */}
          <section>
            <h2 className='text-xl font-bold mb-4'>Partners</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6'>
              {hackathon.partners.map((partner, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center justify-center border border-gray-400 rounded-lg p-4'
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className='w-50 min-h-[120px] object-contain'
                  />
                </div>
              ))}
            </div>
          </section>
          {/* Tracks Section */}
          <section>
            <h2 className='text-xl font-bold mb-4'>Tracks</h2>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
              {hackathon.tracks.map((track, index) => (
                <div
                  key={index}
                  className='border border-white rounded-lg p-4 flex flex-col gap-4'
                >
                  <h3 className='text-lg font-bold'>{track.name}</h3>

                  <p className='text-sm text-gray-300'>{track.description}</p>

                  <div className='flex justify-between items-center text-white mt-2'>
                    <span className='text-sm'>
                      {track.prizes.length} prizes
                    </span>
                    <div className='flex items-center gap-1'>
                      <Trophy className='w-4 h-4' />
                      <span className='text-sm'>${track.total_reward}</span>
                    </div>
                  </div>

                  <div className='mt-4'>
                    <span className='bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full'>
                      {track.partner}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className='flex justify-end mt-4'>
        <Link href={`/hackathons/${id}/admin-panel`}>
          <Button>Edit Hackathon</Button>
        </Link>
      </div>
    </main>
  );
}
