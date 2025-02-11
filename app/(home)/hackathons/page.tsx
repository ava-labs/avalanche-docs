"use client";

import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  CalendarClock,
  CalendarIcon,
  MapPinIcon,
} from "lucide-react";
import Link from "next/link";

import { HackathonLite } from "@/types/hackathons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Filter = "location" | "status" | "page";

type Filters = {
  location: string;
  status: string;
  page: number;
};

export default function HackathonsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="container relative max-w-[1100px] px-2 py-4 lg:py-16">
        <Hackathons />
      </main>
    </Suspense>
  );
}

function HackathonCard({ hackathon }: { hackathon: HackathonLite }) {
  return (
    <div key={hackathon.id} className="w-[512px] flex rounded-lg overflow-hidden shadow-lg">
      {/* Left Section: Background Image or Red Color */}
      <div
        className="flex-[2] h-[280px] bg-red-500"
        style={{
          backgroundImage: true ? `url("https://images.seeklogo.com/logo-png/49/2/avalanche-avax-logo-png_seeklogo-491111.png")` : "",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Right Section */}
      <div className="flex-[3] bg-zinc-900 text-white p-4 flex flex-col justify-between">
        <h2 className="uppercase font-bold text-[30px]">{hackathon.title}</h2>

        <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
          <CalendarIcon className="h-5 w-5 stroke-white" />
          <span className="font-medium">
            {new Date(hackathon.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-300 mt-2">
          <MapPinIcon className="h-5 w-5 stroke-white" />
          <p className="text-sm font-normal">{hackathon.location}</p>
        </div>
        {/* Tags Section */}
        {hackathon.tags && hackathon.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {hackathon.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-block rounded-full border uppercase border-white px-2 py-1 text-xs font-medium text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mx-auto">
          <button className="w-[257px] h-[40px] min-h-[40px] max-h-[40px] bg-red-500 text-white font-medium uppercase rounded-md py-2 px-4 mt-4 flex items-center justify-center gap-2 hover:bg-red-600 transition">
            JOIN NOW
          </button>
        </div>
      </div>
    </div>
  );
}

function Hackathons() {
  const router = useRouter();
  const params = useSearchParams();

  const initialFilters: Filters = {
    page: Number(params.get("page")) || 1,
    location: params.get("location") || "",
    status: params.get("status") || "",
  };

  const [filters, setFilters] = useState<Filters>(initialFilters);

  const pageSize = 10;

  const [hackathons, setHackathons] = useState<HackathonLite[]>([]);
  const [total, setTotal] = useState(0);

  const fetchHackathons = () => {
    const params = new URLSearchParams();
    params.set("page", filters.page.toString());
    params.set("pageSize", pageSize.toString());
    if (filters.location) params.set("location", filters.location);
    if (filters.status) params.set("status", filters.status);

    const apiUrl = `/api/hackathons?${params.toString()}`;

    fetch(apiUrl.toString(), { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setHackathons(data.hackathons);
        setTotal(data.total);
      })
      .catch((error) => console.error("Error fetching hackathons:", error));
  };

  useEffect(() => {
    fetchHackathons();
  }, [filters]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.location) params.set("location", filters.location);
    if (filters.status) params.set("status", filters.status);
    params.set("page", filters.page.toString());

    router.replace(`/hackathons?${params.toString()}`);
  }, [filters]);

  const totalPages = Math.ceil(total / pageSize);

  const handleFilterChange = (type: Filter, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: type === "page" ? Number(value) : value === "all" ? "" : value,
    }));
  };

  return (
    <section className="px-4 py-12 space-y-6">


      {/* Filters */}
      <div className="flex gap-4 justify-end">
        <Select
          onValueChange={(value) => handleFilterChange("location", value)}
          value={filters.location}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Online">Online</SelectItem>
            <SelectItem value="InPerson">In Person</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleFilterChange("status", value)}
          value={filters.status}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Upcoming">Upcoming</SelectItem>
            <SelectItem value="Ongoing">Ongoing</SelectItem>
            <SelectItem value="Ended">Ended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Hackathons List */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {hackathons.map((hackathon: any) => (
          <HackathonCard key={hackathon.id} hackathon={hackathon} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4">
        {filters.page > 1 && (
          <Button className="bg-red-500 text-white hover:bg-red-600 transition"
            onClick={() =>
              handleFilterChange("page", (filters.page - 1).toString())
            }
          >
            Previous
          </Button>
        )}
        {filters.page < totalPages && (
          <Button
            onClick={() =>
              handleFilterChange("page", (filters.page + 1).toString())
            }
          >
            Next
          </Button>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-medium">Recommended for You</h3>
        <hr className="my-4 border-t border-zinc-800" />

      </div>
      <div className="flex justify-end">
        <Link href="/hackathons/new">
          <Button>Create New Hackathon</Button>
        </Link>
      </div>
    </section>
  );
}
