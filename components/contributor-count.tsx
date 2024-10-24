import type { HTMLAttributes } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { fetchContributors } from '../utils/get-contributors';

export interface ContributorCounterProps
  extends HTMLAttributes<HTMLDivElement> {
  repoOwner: string;
  repoName: string;
  displayCount?: number;
}

export default async function ContributorCounter({
  repoOwner,
  repoName,
  displayCount = 20,
  ...props
}: ContributorCounterProps): Promise<React.ReactElement> {
  const contributors = await fetchContributors(repoOwner, repoName);
  const topContributors = contributors
    .filter((contributor) => contributor.login !== repoOwner)
    .slice(0, displayCount);

  return (
    <div
      {...props}
      className={cn('flex flex-col items-center gap-2', props.className)}
    >
      <div className="flex flex-row flex-wrap items-center justify-center md:pe-2">
        {topContributors.map((contributor, i) => (
          <a
            key={contributor.login}
            href={`https://github.com/${contributor.login}`}
            rel="noreferrer noopener"
            target="_blank"
            className="size-8 overflow-hidden rounded-full border-2 border-fd-background bg-fd-background md:-mr-2 md:size-10"
            style={{
              zIndex: topContributors.length - i,
            }}
          >
            <Image
              src={contributor.avatar_url}
              alt={`${contributor.login}'s avatar`}
              unoptimized
              width={40}
              height={40}
              className="object-cover"
            />
          </a>
        ))}
        {displayCount < contributors.length ? (
          <div className="size-10 content-center rounded-full bg-fd-secondary text-center md:ml-2">
            +{contributors.length - displayCount}
          </div>
        ) : null}
      </div>
    <div className="text-left text-xs text-fd-muted-foreground">
      Special thanks to our contributors!
    </div>
    </div>
  );
}