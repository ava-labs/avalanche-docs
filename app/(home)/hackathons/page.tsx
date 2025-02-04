"use client";

import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
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
      <Hackathons />
    </Suspense>
  );
}

function HackathonCard({ hackathon }: { hackathon: HackathonLite }) {
  return (
    <Card
      key={hackathon.id}
      className="hover:shadow-md transition-shadow flex flex-col h-full"
    >
      <CardHeader>
        <CardTitle>{hackathon.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span>
              {new Date(hackathon.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-5 w-5" />
            <span>{hackathon.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarClock className="h-5 w-5" />
            <span>{hackathon.status}</span>
          </div>
        </div>

        {hackathon.tags && hackathon.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {hackathon.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-block rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Link href={`/hackathons/${hackathon.id}`}>
          <Button variant="outline" className="ml-auto">
            Learn More
            <ArrowUpRight />
          </Button>
        </Link>
      </CardFooter>
    </Card>
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
    <main className="container mx-auto px-4 py-12 space-y-6">
      <h1 className="text-2xl font-bold">Hackathons</h1>

      {/* Filters */}
      <div className="flex gap-4">
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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {hackathons.map((hackathon: any) => (
          <HackathonCard key={hackathon.id} hackathon={hackathon} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4">
        {filters.page > 1 && (
          <Button
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
    </main>
  );
}
