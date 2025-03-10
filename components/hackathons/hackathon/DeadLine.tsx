'use client'
import { Hourglass } from "lucide-react";
import { useTheme } from "next-themes";

export type Props = {
  deadline: Date;
};
export default function DeadLine({ deadline }: Props) {
  const { resolvedTheme } = useTheme();
  const iconColor = resolvedTheme === "dark" ? "#F5F5F9" : "#161617";
  return (
    <div className="inline-flex items-center gap-3 rounded-md border-2 border-red-500 dark:bg-black px-3 py-2 text-zinc-50 h-10 justify-center w-fit md:justify-start whitespace-nowrap">
      <Hourglass className="h-5 w-5" color={iconColor} />
      <div className="flex flex-col">
        <span className="whitespace-nowrap text-zinc-900 dark:text-zinc-50">
          {(() => {
            const deadLineDate = new Date(deadline);
            const now = new Date();
            const diffMs = deadLineDate.getTime() - now.getTime();
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const diffHours = Math.floor(
              (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const diffMinutes = Math.floor(
              (diffMs % (1000 * 60 * 60)) / (1000 * 60)
            );

            if (diffDays > 0) {
              return `${diffDays} days to deadline`;
            } else {
              return `${diffHours}h ${diffMinutes}m to deadline`;
            }
          })()}
        </span>
      </div>
    </div>
  );
}
