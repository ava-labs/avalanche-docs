import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  getFilteredHackathons,
  getHackathon,
} from '@/server/services/hackathons';
import { Divider } from '@/components/ui/divider';
import Image from 'next/image';
import { NavigationMenu } from '@/components/hackathons/NavigationMenu';
import Schedule from '@/components/hackathons/hackathon/sections/Schedule';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const { hackathons } = await getFilteredHackathons({});
  return hackathons.map((hackathon) => ({
    id: hackathon.id,
  }));
}

export default async function HackathonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hackathon = await getHackathon(id);
  console.log({ hackathon });

  const menuItems = [
    { name: 'Overview', ref: 'overview' },
    { name: 'Schedule', ref: 'schedule' },
    { name: 'Prizes & Tracks', ref: 'tracks' },
    { name: 'Sponsors', ref: 'sponsors' },
    { name: 'Submission', ref: 'submission' },
    { name: 'Resources', ref: 'resources' },
    { name: 'Speakers', ref: 'speakers' },
  ];

  if (!hackathon) redirect('/hackathons');

  return (
    <main className='container px-2 py-4 lg:py-16'>
      <div className='flex gap-4 items-center'>
        <Image
          src='/temp/hackathon-icon.png'
          alt='Hackathon background'
          width={40}
          height={40}
        />
        <span className='text-xl font-bold'>{hackathon.title}</span>{' '}
        <Button asChild>
          <Link href={`/hackathons/${id}`}>Join now</Link>
        </Button>
      </div>

      <div className='flex flex-col mt-8 '>
        {/* Menu Section */}
        <NavigationMenu items={menuItems} />

        <div className='px-8 pt-6 '>
          <Link href={`/hackathons/${id}`}>
            <Image
              src='/builders-hub/hackathons/main_banner_img.png'
              alt='Hackathon background'
              width={1270}
              height={760}
              priority
            />
          </Link>
          <div className='p-8 flex flex-col gap-24'>
            {/* Schedule Section */}
            <Schedule hackathon={hackathon} />
            {/* Info Section */}
            <section>
              <h2 className='text-4xl font-bold mb-8' id='tracks'>
                Prizes & Tracks
              </h2>
              <Divider />
              {/* Info content will go here */}
            </section>
            {/* Partners Section */}
            <section>
              <h2 className='text-xl font-bold mb-4' id='partners'>
                Partners
              </h2>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6'>
                {hackathon.content.partners.map((partner, index) => (
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
          </div>
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
