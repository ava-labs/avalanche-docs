"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AlarmClock } from "lucide-react";

// Mapping of UTC offsets to major cities/regions
export const timezoneMap: Record<string, string[]> = {
  "Pacific/Midway": ["Baker Island, US Minor Outlying Islands"],
  "Pacific/Pago_Pago": ["Pago Pago, American Samoa"],
  "Pacific/Honolulu": ["Honolulu, Hawaii"],
  "America/Anchorage": ["Anchorage, Alaska"],
  "America/Los_Angeles": ["Los Angeles, Vancouver"],
  "America/Denver": ["Phoenix, Denver"],
  "America/Chicago": ["Chicago, Mexico City"],
  "America/New_York": ["Bogotá, New York"],
  "America/Santiago": ["Santiago, Santo Domingo"],
  "America/Sao_Paulo": ["São Paulo, Buenos Aires"],
  "America/Noronha": ["Fernando de Noronha, Brazil"],
  "Atlantic/Azores": ["Azores, Cape Verde"],
  "Europe/London": ["London, Dublin"],
  "Europe/Berlin": ["Berlin, Paris"],
  "Africa/Cairo": ["Cairo, Jerusalem"],
  "Europe/Istanbul": ["Moscow, Istanbul"],
  "Asia/Dubai": ["Dubai, Baku"],
  "Asia/Karachi": ["Karachi, Tashkent"],
  "Asia/Dhaka": ["Dhaka, Almaty"],
  "Asia/Bangkok": ["Bangkok, Jakarta"],
  "Asia/Singapore": ["Singapore, Beijing"],
  "Asia/Tokyo": ["Tokyo, Seoul"],
  "Australia/Sydney": ["Sydney, Melbourne"],
  "Pacific/Noumea": ["Noumea, Solomon Islands"],
  "Pacific/Auckland": ["Auckland, Fiji"],
  "Pacific/Apia": ["Samoa, Tonga"],
  "Pacific/Kiritimati": ["Kiritimati, Line Islands"],
};

type Props = {
  timeZone: string;
  setTimeZone: React.Dispatch<React.SetStateAction<string>>;
};

export function TimeZoneSelect({ timeZone, setTimeZone }: Props) {
  const utcOffsets = Array.from({ length: 27 }, (_, i) => i - 12);

  const formatTimezoneLabel = (offset: number) => {
    const sign = offset >= 0 ? "+" : "";
    const cities = timezoneMap[offset]
      ? timezoneMap[offset].join(", ")
      : "Unknown Region";
    return `(UTC${sign}${offset}:00) ${cities}`;
  };

  return (
    <div
      className="flex w-full max-w-md items-center gap-1.5 text-zinc-400"
      color="#a1a1aa"
    >
      <Label
        htmlFor="timezone"
        className="pr-3 dark:text-zinc-50 text-zinc-900 hidden md:inline"
      >
        Time Zone:{" "}
      </Label>
      <Select value={timeZone} onValueChange={setTimeZone}>
        <SelectTrigger
          className="w-[270px] [&>svg]:text-zinc-400 rounded-md"
          id="timezone"
          color="#a1a1aa"
        >
          <AlarmClock
            className="h-5 w-5 !text-zinc-600 dark:!text-zinc-400" /** text-zinc-400 = #a1a1aa */
          />
          <SelectValue placeholder="Select timezone" className="text-zinc-600 dark:text-zinc-400" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800">
          {Object.entries(timezoneMap).map((entries) => {
            console.log("Keys: ", entries);
            return (
              <SelectItem
                key={entries[0]}
                value={entries[0]}
                className="whitespace-nowrap"
              >
                {entries[1]}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
