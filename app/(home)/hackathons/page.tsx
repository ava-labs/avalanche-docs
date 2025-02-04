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

import { HackathonLite } from "@/types/hackathons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Filter = "location" | "status" | "page";

export default function HackathonsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Hackathons />
    </Suspense>
  );
}

function Hackathons() {
  const router = useRouter();
  const params = useSearchParams();

  const [page, setPage] = useState(() => Number(params.get("page")) || 1);
  const [location, setLocation] = useState(() => params.get("location") || "");
  const [status, setStatus] = useState(() => params.get("status") || "");

  const pageSize = 10;

  const [hackathons, setHackathons] = useState<HackathonLite[]>([]);
  const [total, setTotal] = useState(0);

  const fetchHackathons = () => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("pageSize", pageSize.toString());
    if (location) params.set("location", location);
    if (status) params.set("status", status);

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
  }, [page, location, status]);

  useEffect(() => {
    if (
      !params.get("page") &&
      !params.get("location") &&
      !params.get("status")
    ) {
      router.replace(`/hackathons?page=1&pageSize=10`);
    }
  }, []);

  const totalPages = Math.ceil(total / pageSize);

  const handleFilterChange = (type: Filter, value: string) => {
    const newParams = new URLSearchParams(params.toString());

    if (type === "location") {
      setLocation(value === "all" ? "" : value);
      if (value === "all") newParams.delete("location");
      else newParams.set("location", value);
    }

    if (type === "status") {
      setStatus(value === "all" ? "" : value);
      if (value === "all") newParams.delete("status");
      else newParams.set("status", value);
    }

    if (type === "page") {
      setPage(Number(value));
      newParams.set("page", value);
    }

    router.push(`/hackathons?${newParams.toString()}`);
  };

  return (
    <main className="container mx-auto px-4 py-12 space-y-6">
      <h1 className="text-2xl font-bold">Hackathons</h1>

      {/* Filters */}
      <div className="flex gap-4">
        <Select
          onValueChange={(value) => handleFilterChange("location", value)}
          value={location}
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
          value={status}
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
              <Button variant="outline" className="ml-auto">
                Learn More
                <ArrowUpRight />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4">
        {page > 1 && (
          <Button
            onClick={() => handleFilterChange("page", (page - 1).toString())}
          >
            Previous
          </Button>
        )}
        {page < totalPages && (
          <Button
            onClick={() => handleFilterChange("page", (page + 1).toString())}
          >
            Next
          </Button>
        )}
      </div>
    </main>
  );
}
