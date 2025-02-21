import { AlertCircle } from 'lucide-react';
import newGithubIssueUrl from 'new-github-issue-url';
import { cn } from '@/utils/cn';
import { buttonVariants } from '@/components/ui/button';

interface ReportIssueButtonProps {
  title: string;
  pagePath: string;
}

export default function ReportIssueButton({ title, pagePath }: ReportIssueButtonProps) {
  return (
    <a
      href={newGithubIssueUrl({
        user: 'ava-labs',
        repo: 'avalanche-docs',
        title: `Update ${title} information`,
        body: `It appears that the information on this page might be outdated. Please review and update as needed.

Page: [${pagePath}](https://build.avax.network${pagePath})

[Provide more details here...]`,
        labels: ['outdated', 'documentation'],
      })}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(buttonVariants({ variant: 'secondary' }), "gap-2 no-underline")}
    >
      <AlertCircle className="size-4" /> Report Issue
    </a>
  );
} 