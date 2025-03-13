import type { Metadata } from 'next';
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from 'fumadocs-ui/page';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { notFound } from 'next/navigation';
import { academyContent } from '@/lib/source';
import { createMetadata } from '@/utils/metadata';
import IndexedDBComponent from '@/components/tracker'
import { Callout } from 'fumadocs-ui/components/callout';
import Instructors from '@/components/content-design/instructor';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import COURSES from '@/content/courses';
import { Popup, PopupContent, PopupTrigger } from 'fumadocs-twoslash/ui';
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { AutoTypeTable } from '@/components/content-design/type-table';
import { Heading } from 'fumadocs-ui/components/heading';
import Quiz from '@/components/quizzes/quiz';
import YouTube from "@/components/content-design/youtube";
import Gallery from "@/components/content-design/gallery";
import {
  CodeBlock,
  type CodeBlockProps,
  Pre,
} from "fumadocs-ui/components/codeblock";
import Mermaid from "@/components/content-design/mermaid";
import EditOnGithubButton from '@/components/ui/edit-on-github-button';
import ReportIssueButton from "@/components/ui/report-issue-button";

export const dynamicParams = false;

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = academyContent.getPage(params.slug);

  if (!page) notFound();

  const { body: MDX, toc, lastModified } = await page.data.load();

  const path = `content/academy/${page.file.path}`;

  const course = COURSES.official.find(c => c.slug === page.slugs[0]);

  return (
    <DocsPage
      toc={toc}
      lastUpdate={lastModified}
      tableOfContent={{
        style: 'clerk',
        single: false,
        enabled: true,
        footer: (
          <div className="flex flex-col gap-6">
            <div className='flex flex-col gap-y-4 text-sm text-muted-foreground'>
              <div>Instructors:</div>
              <Instructors names={course?.instructors || []} />
            </div>
            <Link href="https://t.me/avalancheacademy" target='_blank' className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }))}>
              Join Telegram Course Chat
            </Link>
          </div>
        ),
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody className="text-fd-foreground/80">
        <IndexedDBComponent/>
        <MDX components={{
          h1: (props) => <Heading as="h1" {...props} />,
          h2: (props) => <Heading as="h2" {...props} />,
          h3: (props) => <Heading as="h3" {...props} />,
          h4: (props) => <Heading as="h4" {...props} />,
          h5: (props) => <Heading as="h5" {...props} />,
          h6: (props) => <Heading as="h6" {...props} />,
          Cards, Card, Callout, Accordion, Accordions, AutoTypeTable, Gallery, Mermaid, Quiz, Popup, PopupContent, PopupTrigger, Step, Steps, Tab, Tabs, TypeTable, YouTube, 
          pre: ({ title, className, icon, allowCopy, ...props }: CodeBlockProps) => (
            <CodeBlock title={title} icon={icon} allowCopy={allowCopy}>
              <Pre className={cn("max-h-[1200px]", className)} {...props} />
            </CodeBlock>
          ),
        }}/>
        <div className="flex gap-6 mt-8">
          <EditOnGithubButton path={path} />
          <ReportIssueButton 
            title={page.data.title}
            pagePath={`/academy/${page.slugs.join('/')}`}
          />
        </div>
      </DocsBody>
    </DocsPage>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = academyContent.getPage(params.slug);

  if (!page) notFound();

  const description =
    page.data.description ?? 'Learn how to build on Avalanche blockchain with Academy';

  const imageParams = new URLSearchParams();
  imageParams.set('title', page.data.title);
  imageParams.set('description', description);

  const image = {
    alt: 'Banner',
    url: `/api/og/academy/${params.slug[0]}?${imageParams.toString()}`,
    width: 1200,
    height: 630,
  };

  return createMetadata({
    title: page.data.title,
    description,
    openGraph: {
      url: `/academy/${page.slugs.join('/')}`,
      images: image,
    },
    twitter: {
      images: image,
    },
  });
}

export async function generateStaticParams() {
  return academyContent.getPages().map((page) => ({
    slug: page.slugs,
  }));
}
