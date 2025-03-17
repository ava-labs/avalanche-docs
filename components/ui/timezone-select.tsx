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
  "Pacific/Midway": ["(GMT -11:00) Baker Island, US Minor Outlying Islands"],
  "Pacific/Pago_Pago": ["(GMT -11:00) Pago Pago, American Samoa"],
  "Pacific/Honolulu": ["(GMT -10:00) Honolulu, Hawaii"],
  "America/Anchorage": ["(GMT -09:00) Anchorage, Alaska"],
  "America/Los_Angeles": ["(GMT -08:00) Los Angeles, Vancouver"],
  "America/Denver": ["(GMT -07:00) Phoenix, Denver"],
  "America/Chicago": ["(GMT -06:00) Chicago, Mexico City"],
  "America/New_York": ["(GMT -05:00) Bogotá, New York"],
  "America/Santiago": ["(GMT -04:00) Santiago, Santo Domingo"],
  "America/Sao_Paulo": ["(GMT -03:00) São Paulo, Buenos Aires"],
  "America/Noronha": ["(GMT -02:00) Fernando de Noronha, Brazil"],
  "Atlantic/Azores": ["(GMT -01:00) Azores, Cape Verde"],
  "Europe/London": ["(GMT +00:00) London, Dublin"],
  "Europe/Berlin": ["(GMT +01:00) Berlin, Paris"],
  "Africa/Cairo": ["(GMT +02:00) Cairo, Jerusalem"],
  "Europe/Istanbul": ["(GMT +03:00) Moscow, Istanbul"],
  "Asia/Dubai": ["(GMT +04:00) Dubai, Baku"],
  "Asia/Karachi": ["(GMT +05:00) Karachi, Tashkent"],
  "Asia/Dhaka": ["(GMT +06:00) Dhaka, Almaty"],
  "Asia/Bangkok": ["(GMT +07:00) Bangkok, Jakarta"],
  "Asia/Singapore": ["(GMT +08:00) Singapore, Beijing"],
  "Asia/Tokyo": ["(GMT +09:00) Tokyo, Seoul"],
  "Australia/Sydney": ["(GMT +10:00) Sydney, Melbourne"],
  "Pacific/Noumea": ["(GMT +11:00) Noumea, Solomon Islands"],
  "Pacific/Auckland": ["(GMT +12:00) Auckland, Fiji"],
  "Pacific/Apia": ["(GMT +13:00) Samoa, Tonga"],
  "Pacific/Kiritimati": ["(GMT +14:00) Kiritimati, Line Islands"],
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
          className="w-[270px] [&>svg]:text-zinc-400 rounded-md dark:border-zinc-800 border-zinc-300"
          id="timezone"
          color="#a1a1aa"
        >
          <AlarmClock
            className="h-5 w-5 !text-zinc-600 dark:!text-zinc-400" /** text-zinc-400 = #a1a1aa */
          />
          <SelectValue
            placeholder="Select timezone"
            className="text-zinc-600 dark:text-zinc-400"
          />
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
