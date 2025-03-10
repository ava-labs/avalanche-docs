"use client";

import { Search } from "lucide-react";
import { Input } from "./input";

export function SearchEventInput() {
  return (
    <div className="relative bg-transparent">
      <div className="absolute left-2.5 top-2.5 pr-3">
        <Search className="h-5 w-5" color="#a1a1aa" />
      </div>
      <Input
        id="search"
        type="search"
        placeholder="Search by name, level, location..."
        className="rounded-md bg-transparent pl-8 dark:border-zinc-800 border-zinc-300 w-[270px] h-10"
      />
    </div>
  );
}
