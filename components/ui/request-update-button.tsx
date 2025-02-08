import React from 'react';
import newGithubIssueUrl from 'new-github-issue-url';
import { Button } from '@/components/ui/button';

export interface RequestUpdateButtonProps {
  title: string;
  pagePath: string;
  buttonText?: string;
  buttonVariant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const RequestUpdateButton: React.FC<RequestUpdateButtonProps> = ({
  title,
  pagePath,
  buttonText,
  buttonVariant,
  size = "sm",
  className,
}) => {
  const issueUrl = newGithubIssueUrl({
    user: 'ava-labs',
    repo: 'avalanche-docs',
    title: title || `Outdated Information on ${pagePath || 'this page'}`,
    body: `It appears that the information on this page might be outdated. Please review and update as needed.\n\nPage: ${pagePath || 'Unknown'}\n\n[Provide more details here...]`,
    labels: ['outdated', 'documentation'],
  });

  const openIssue = () => {
    window.open(issueUrl, '_blank');
  };

  return (
    <Button className={className} variant={buttonVariant || "outline"} size={size} onClick={openIssue}>
      {buttonText || "Request Update"}
    </Button>
  );
};

export default RequestUpdateButton; 