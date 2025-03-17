import { Track } from '@/types/hackathons';
import { DynamicIcon } from 'lucide-react/dynamic';
import { MDXRemote } from 'next-mdx-remote/rsc';

type Props = {
  track: Track | null;
};
export default async function TrackDialogContent({ track }: Props) {
  if (!track) return null;
  return (
    <div className='max-w-lg max-h-[80vh] mx-auto text-zinc-50 rounded-2xl'>
      <div className='flex items-center space-x-3'>
        <div className='p-2 bg-red-500 rounded-full'>
          <DynamicIcon name={track.logo as any} size={36} color='#F5F5F9' />
        </div>
        <h1 className='text-3xl font-semibold'>{track.name}</h1>
      </div>
      <span className='block w-full h-[1px] my-8 bg-red-500'></span>
      <div className='prose text-zinc-50'>
        <MDXRemote source={track.description}/>
      </div>
    </div>
  );
}
