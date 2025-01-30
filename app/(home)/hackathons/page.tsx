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

export default async function HackathonPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams?.page ?? 1);
  const pageSize = 10;

  const res = await fetch(
    `https://avalanche-docs-eight.vercel.app/api/hackathons?page=${page}&pageSize=${pageSize}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch hackathons");
  }

  const { hackathons, total } = await res.json();
  const totalPages = Math.ceil(total / pageSize);

  return (
    <main className="container mx-auto px-4 py-12 space-y-6">
      <h1 className="text-2xl font-bold">Hackathons</h1>

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

      <div className="flex justify-center gap-4">
        {page > 1 && (
          <Link href={`/hackathons?page=${page - 1}`}>
            <Button>Previous</Button>
          </Link>
        )}
        {page < totalPages && (
          <Link href={`/hackathons?page=${page + 1}`}>
            <Button>Next</Button>
          </Link>
        )}
      </div>
    </main>
  );
}
