'use client';

import { useTheme } from 'next-themes';
import { DynamicIcon } from 'lucide-react/dynamic';
import { HackathonHeader } from '@/types/hackathons';
import { Crown } from 'lucide-react';
import React from 'react';
import { CardTitle, Card, CardContent, CardHeader } from '@/components/ui/card';
import TrackDialogContent from '../TrackModal';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

function Tracks({ hackathon }: { hackathon: HackathonHeader }) {
  const { resolvedTheme } = useTheme();
  const iconColor = resolvedTheme === 'dark' ? '#A7A7B0' : '#6F6F77';
  return (
    <section>
      <h2 className='text-4xl font-bold mb-8' id='tracks'>
        Prizes & Tracks
      </h2>
      <Separator className='my-8 bg-zinc-300 dark:bg-zinc-800' />
      <div className='pt-5 pb-5'>
        <p>
          Unlock incredible rewards for your innovation and skills in AvaHack
          2025!
        </p>
      </div>
      <div className='relative py-32 grid grid-cols-4 gap-8 mt-24 grid-flow-row'>
        <div className='absolute -z-10 w-screen h-full left-1/2 transform -translate-x-1/2 bg-zinc-200' />
        <Card className='w-[356px] absolute top-[-80px] left-1/2 transform -translate-x-1/2  bg-red-300 rounded-xl border-2 border-red-500'>
          <CardHeader className='justify-center items-center'>
            <div className='p-2 rounded-full bg-white'>
              <Crown color='#FF394A' />
            </div>
          </CardHeader>
          <CardContent className='flex flex-col items-center justify-center'>
            <span className='text-xl font-bold text-zinc-900'>
              ${hackathon.total_prizes.toLocaleString('en-US')}
            </span>
            <span className='text-sm text-zinc-900'>Total price pool</span>
          </CardContent>
        </Card>
        {hackathon.content.tracks.map((track, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Card key={index} className='min-w-72 min-h-40 bg-zinc-900 cursor-pointer'>
                <CardHeader>
                  <CardTitle>
                    <div className='flex justify-between items-center gap-2'>
                      <h2 className='text-xl text-zinc-900 dark:text-zinc-50 font-bold'>
                        {track.name}
                      </h2>
                      <DynamicIcon
                        name={track.icon as any}
                        color={iconColor}
                        size={16}
                      />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-zinc-600 dark:text-zinc-400'>
                    {track.short_description}
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className='bg-zinc-900'>
              <TrackDialogContent track={track} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}

export default Tracks;
