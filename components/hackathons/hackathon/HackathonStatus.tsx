import { type HackathonStatus } from "@/types/hackathons";

type Props = {
  status: HackathonStatus;
};

export default function HackathonStatus({ status }: Props) {
  const statusColors: Record<string, string> = {
    ONGOING: "border-green-500",
    UPCOMING: "border-yellow-500",
    ENDED: "border-red-500",
  };
  return (
    <div className="flex items-center gap-2 font-semibold">
      <span
        className={`w-3 h-3 rounded-full border-2 ${statusColors[status]}`}
      ></span>
      <span className="text-sm text-zinc-50">{status}</span>
    </div>
  );
}
