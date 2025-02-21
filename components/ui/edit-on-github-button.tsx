import { PencilIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import { buttonVariants } from '@/components/ui/button';

interface EditOnGithubButtonProps {
  path: string;
}

export default function EditOnGithubButton({ path }: EditOnGithubButtonProps) {
  return (
    <a
      href={`https://github.com/ava-labs/avalanche-docs/edit/master/${path}`}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(buttonVariants({ variant: 'secondary' }), "gap-2 no-underline")}
    >
      <PencilIcon className="size-4" /> Edit on GitHub
    </a>
  );
}