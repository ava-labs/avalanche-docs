'use client';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import HackathonCard from './HackathonCard';
import { CardContent } from '../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../ui/carousel';
import Link from 'next/link';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { HackathonLite, HackathonsFilters } from '@/types/hackathons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

function buildQueryString(filters: HackathonsFilters, searchQuery: string) {
  const params = new URLSearchParams();

  if (filters.location) {
    params.set('location', filters.location);
  }
  if (filters.status) {
    params.set('status', filters.status);
  }
  if (filters.page) {
    params.set('page', filters.page.toString());
  }
  if (searchQuery.trim()) {
    params.set('search', searchQuery.trim());
  }

  return params.toString();
}

export default function Hackathons({
  initialHackathons,
  initialFilters,
  totalHackathons,
}: {
  initialHackathons: HackathonLite[];
  initialFilters: HackathonsFilters;
  totalHackathons: number;
}) {
  const router = useRouter();
  const pageSize = 10;

  const [hackathons, setHackathons] =
    useState<HackathonLite[]>(initialHackathons);
  const [filters, setFilters] = useState<HackathonsFilters>(initialFilters);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(totalHackathons / pageSize)
  );

  // Search debounce
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchHackathons() {
      try {
        const queryString = buildQueryString(filters, searchQuery);
        const res = await fetch(`/api/hackathons?${queryString}`, {
          cache: 'no-store',
          signal,
        });

        if (!res.ok) {
          throw new Error('Error fetching hackathons');
        }

        const data = await res.json();
        if (!signal.aborted) {
          setHackathons(data.hackathons);
          setTotalPages(Math.ceil(data.total / pageSize));
        }
      } catch (err: any) {
        if (!signal.aborted) {
          console.error('Error fetching hackathons:', err);
        }
      }
    }

    fetchHackathons();

    return () => {
      abortController.abort();
    };
  }, [filters, searchQuery]);

  const handleFilterChange = (type: keyof HackathonsFilters, value: string) => {
    const newFilters = {
      ...filters,
      [type]: value === 'all' ? '' : value,
      ...(type !== 'page' ? { page: undefined } : {}),
    };

    setFilters(newFilters);

    const params = new URLSearchParams();
    if (newFilters.page) params.set('page', newFilters.page.toString());
    if (newFilters.location) params.set('location', newFilters.location);
    if (newFilters.status) params.set('status', newFilters.status);

    router.replace(`/hackathons?${params.toString()}`);
  };

  const handleSearchChange = useCallback((query: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setSearchQuery(query);
      const newFilters = { ...filters, page: undefined };

      setFilters(newFilters);

      // Actualizamos la URL sin la clave `page`
      const queryString = buildQueryString(newFilters, query);
      router.replace(`/hackathons?${queryString}`);
    }, 300);
  }, []);

  return (
    <section className='px-4 py-12 space-y-6'>
      <div className='flex items-center gap-2 max-w-xs'>
        {/* Input */}
        <div className='relative w-full'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400 stroke-zinc-700' />
          <Input
            type='text'
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder='Search by name, track or location'
            className='w-full pl-10 bg-transparent border border-zinc-700 rounded-md text-white placeholder-zinc-500'
          />
        </div>
        {/* Button */}
        {/* <button className='bg-red-500 p-2 rounded-md hover:bg-red-600 transition'>
          <Search className='h-5 w-5 text-white stroke-white' />
        </button> */}
      </div>

      <hr className='my-4 border-t border-zinc-800' />

      {/* Filters */}
      <div className='flex gap-4 justify-end'>
        <Select
          onValueChange={(value) => handleFilterChange('location', value)}
          value={filters.location}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Filter by Location' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Locations</SelectItem>
            <SelectItem value='Online'>Online</SelectItem>
            <SelectItem value='InPerson'>In Person</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleFilterChange('status', value)}
          value={filters.status}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Filter by Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Statuses</SelectItem>
            <SelectItem value='Upcoming'>Upcoming</SelectItem>
            <SelectItem value='Ongoing'>Ongoing</SelectItem>
            <SelectItem value='Ended'>Ended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Hackathons List */}
      <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
        {hackathons.map((hackathon: any) => (
          <HackathonCard key={hackathon.id} hackathon={hackathon} />
        ))}
      </div>
      {/* Pagination */}
      <div className='flex justify-center gap-4'>
        {(filters.page ?? 1) > 1 && (
          <Button
            className='bg-red-500 text-white hover:bg-red-600 transition'
            onClick={() =>
              handleFilterChange('page', (Number(filters.page) - 1).toString())
            }
          >
            Previous
          </Button>
        )}
        {(filters.page ?? 1) < totalPages && (
          <Button
            onClick={() =>
              handleFilterChange('page', (Number(filters.page) + 1).toString())
            }
          >
            Next
          </Button>
        )}
      </div>
      <div>
        <h3 className='text-2xl font-medium'>Recommended for You</h3>
        <hr className='my-4 border-t border-zinc-800' />
        <Carousel
          opts={{
            align: 'start',
          }}
          className='w-full'
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/6'>
                <div className='p-1'>
                  <Card>
                    <CardContent className='flex aspect-square items-center justify-center p-6'>
                      <span className='text-md font-semibold'>
                        Hackathon {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className='flex justify-end'>
        <Link href='/hackathons/new'>
          <Button>Create New Hackathon</Button>
        </Link>
      </div>
    </section>
  );
}
