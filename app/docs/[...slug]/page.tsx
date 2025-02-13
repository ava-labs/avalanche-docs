import type { Metadata } from 'next';
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
  DocsCategory
} from 'fumadocs-ui/page';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { Popup, PopupContent, PopupTrigger } from 'fumadocs-twoslash/ui';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/utils/metadata';
import { getDocsPage, getDocsPages, type Page, loaderOutput } from '@/utils/content-loader/docs-loader';
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Callout } from "fumadocs-ui/components/callout";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { AutoTypeTable } from '@/components/content-design/type-table';
import { Heading } from 'fumadocs-ui/components/heading';
import YouTube from "@/components/content-design/youtube";
import Gallery from "@/components/content-design/gallery";
import { BackToTop } from '@/components/ui/back-to-top';
import { cn } from "@/utils/cn";
import {
  CodeBlock,
  type CodeBlockProps,
  Pre,
} from "fumadocs-ui/components/codeblock";
import { BadgeCheck } from "lucide-react";
import Mermaid from "@/components/content-design/mermaid";
import RequestUpdateButtonWrapper from "@/components/client/request-update-button-wrapper";
import { buttonVariants } from "@/components/ui/button";

export const dynamicParams = false;

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = getDocsPage(params.slug);
  if (!page) notFound();

  const path = `content/docs/${page.file.path}`;
  const { body: MDX, toc, lastModified } = await page.data.load();

  return (
    <DocsPage 
      toc={toc}
      lastUpdate={lastModified}
      full={page.data.full}
      tableOfContent={{
        style: 'clerk',
        single: false,
        enabled: true,
        footer: (
          <div className="flex flex-col gap-4">
            <RequestUpdateButtonWrapper
              pagePath={`/docs/${page.slugs.join('/')}`}
              title={`Update ${page.data.title}`}
              buttonText="Request Update"
              buttonVariant="secondary"
              size="lg"
              className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), "mt-4")}
            />
          </div>
        ),
      }}
      editOnGithub={{
        repo: 'avalanche-docs',
        owner: 'ava-labs',
        sha: 'master',
        path,
      }}
      reportIssue={{
        owner: 'ava-labs',
        repo: 'avalanche-docs',
        path,
        title: `Update Academy ${page.data.title} information`,
        body: `It appears that the information on this page might be outdated. Please review and update as needed.\n\nPage: /academy/${page.slugs.join('/')}\n\n[Provide more details here...]`,
        labels: ['outdated', 'documentation'],
        target: '_blank',
        rel: 'noreferrer noopener',
      }}
      article={{
        className: 'max-sm:pb-16',
      }}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody className="text-fd-foreground/80">
        <MDX components={{
          h1: (props) => <Heading as="h1" {...props} />,
          h2: (props) => <Heading as="h2" {...props} />,
          h3: (props) => <Heading as="h3" {...props} />,
          h4: (props) => <Heading as="h4" {...props} />,
          h5: (props) => <Heading as="h5" {...props} />,
          h6: (props) => <Heading as="h6" {...props} />,
          BadgeCheck, Cards, Card, Callout, Accordion, Accordions, AutoTypeTable, Gallery, Mermaid, Popup, PopupContent, PopupTrigger, Step, Steps, Tab, Tabs, TypeTable, YouTube, 
          pre: ({ title, className, icon, allowCopy, ...props }: CodeBlockProps) => (
            <CodeBlock title={title} icon={icon} allowCopy={allowCopy}>
              <Pre className={cn("max-h-[1200px]", className)} {...props} />
            </CodeBlock>
          ),
        }}/>
        {page.data.index ? <DocsCategory page={page} from={loaderOutput} /> : null}
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return getDocsPages().map((page) => ({
    slug: page.slugs,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = getDocsPage(params.slug);

  if (!page) notFound();

  const description =
    page.data.description ?? 'Developer documentation for everything related to the Avalanche ecosystem.';

  const imageParams = new URLSearchParams();
  imageParams.set('title', page.data.title);
  imageParams.set('description', description);

  const image = {
    alt: 'Banner',
    url: `/api/og/docs/${params.slug[0]}?${imageParams.toString()}`,
    width: 1200,
    height: 630,
  };

  return createMetadata({
    title: page.data.title,
    description,
    openGraph: {
      url: `/docs/${page.slugs.join('/')}`,
      images: image,
    },
    twitter: {
      images: image,
    },
  });
}
