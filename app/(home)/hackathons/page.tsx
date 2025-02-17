import type { HackathonsFilters } from '@/types/hackathons';
import Hackathons from '@/components/hackathons/Hackathons';
import { getFilteredHackathons } from '@/server/controllers/hackathons';

export const revalidate = 3600;
export const dynamicParams = true;

export default async function HackathonsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: number; location?: string; status?: string }>;
}) {
  const { page, location, status } = await searchParams;
  const { hackathons, total } = getFilteredHackathons({
    page: page ?? 1,
    pageSize: 4,
    location: location,
    status: status,
  });

  const initialFilters: HackathonsFilters = {
    page: page ?? 1,
    location: location,
    status: status,
  };

  return (
    <main className='container relative max-w-[1100px] px-2 py-4 lg:py-16 '>
      <div className='border border-zinc-800 shadow-sm bg-zinc-950 rounded-md'>
        <Hackathons
          initialHackathons={hackathons}
          initialFilters={initialFilters}
          totalHackathons={total}
        />
      </div>
    </main>
  );
}
