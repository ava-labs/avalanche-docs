'use client';
import { Circle, MapPinIcon, Search, Trophy, UserRound } from 'lucide-react';
import { Input } from '../ui/input';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import HackathonCard from './HackathonCard';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import Link from 'next/link';
import { Button } from '../ui/button';
import { HackathonLite, HackathonsFilters } from '@/types/hackathons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

function buildQueryString(
  filters: HackathonsFilters,
  searchQuery: string,
  pageSize: number
) {
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

  params.set('pageSize', pageSize.toString());

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

  console.debug({ initialHackathons, initialFilters, totalHackathons });
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
        const queryString = buildQueryString(filters, searchQuery, pageSize);
        const { data } = await axios.get(`/api/hackathons?${queryString}`, {
          signal,
        });

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

      const queryString = buildQueryString(newFilters, query, pageSize);
      router.replace(`/hackathons?${queryString}`);
    }, 300);
  }, []);

  return (
    <section className='px-8 py-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-stretch gap-4 max-w-sm w-full h-9'>
          {/* Input */}
          <div className='relative flex-grow h-full'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400 stroke-zinc-700' />
            <Input
              type='text'
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder='Search by name, track or location'
              className='w-full h-full px-3 pl-10 bg-transparent border border-zinc-700 rounded-md text-white placeholder-zinc-500'
            />
          </div>
          {/* Button */}
          <button className='bg-red-500 p-1 rounded-md hover:bg-red-600 transition'>
            <Search className='h-6 w-6 text-white stroke-white' />
          </button>
        </div>
        <Button
          asChild
          variant='secondary'
          className='bg-red-500 hover:bg-red-600 py-2 px-4'
        >
          <Link href='/hackathons/new'>Create New Hackathon</Link>
        </Button>
      </div>

      <hr className='my-4 border-t border-zinc-800' />

      {/* Filters */}
      <div className='flex items-center justify-between'>
        <h3 className='font-medium text-2xl py-5'>
          {totalHackathons} Hackathons found
        </h3>
        <div className='flex gap-4 justify-end'>
          <Select
            onValueChange={(value) => handleFilterChange('location', value)}
            value={filters.location} 
          >
            <SelectTrigger className='w-[180px]' >
              <SelectValue placeholder='Filter by Location' />
            </SelectTrigger>
            <SelectContent >
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
      </div>

      <hr className='my-4 border-t border-zinc-800' />
      {/* Hackathons List */}
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        {hackathons.map((hackathon: any) => (
          <HackathonCard key={hackathon.id} hackathon={hackathon} />
        ))}
      </div>
      <Pagination className='my-4'>
        <PaginationContent className='flex justify-center gap-4'>
          {(filters.page ?? 1) > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  handleFilterChange(
                    'page',
                    (Number(filters.page) - 1).toString()
                  )
                }
              />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              onClick={() => handleFilterChange('page', '1')}
              className={`cursor-pointer ${
                filters.page == 1 ? 'font-bold underline' : ''
              }`}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {Number(filters.page) > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {Array.from(
            { length: Math.min(3, totalPages) },
            (_, i) => Number(filters.page) - 1 + i
          )
            .filter((page) => page > 1 && page < totalPages)
            .map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handleFilterChange('page', page.toString())}
                  className={`cursor-pointer ${
                    filters.page == page ? 'font-bold underline' : ''
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

          {Number(filters.page) < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {totalPages > 1 && (
            <PaginationItem>
              <PaginationLink
                onClick={() =>
                  handleFilterChange('page', totalPages.toString())
                }
                className={`cursor-pointer ${
                  filters.page == totalPages ? 'font-bold underline' : ''
                }`}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          {(filters.page ?? 1) < totalPages && (
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handleFilterChange(
                    'page',
                    (Number(filters.page) + 1).toString()
                  )
                }
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>

      <h3 className='font-medium text-2xl my-4'>Recommended for You</h3>

      <hr className='my-4 border-t border-zinc-800' />
      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full'
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              key={index}
              className='md:basis-1/2 lg:basis-1/6 flex flex-col gap-2'
            >
              <div className='p-1 h-[150px] w-[150px]'>
                <Image
                  src='/temp/hackathon-mock.png'
                  alt='Hackathon'
                  width={150}
                  height={150}
                  className='rounded-md h-full w-full object-cover'
                />
              </div>
              <div className='flex flex-col'>
                <div className='flex items-center gap-2'>
                  <Circle className={`h-3 w-3 stroke-red-500`} />
                  <span className='font-medium text-sm'>AvaStorm 2025</span>
                </div>
                <div className='flex items-center gap-2'>
                  <MapPinIcon className='h-3 w-3 stroke-white' />
                  <p className='text-xs text-zinc-300'>On-site</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
