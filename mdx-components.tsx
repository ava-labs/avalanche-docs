import type { MDXComponents } from "mdx/types";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Callout } from "fumadocs-ui/components/callout";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Cards, Card } from "fumadocs-ui/components/card";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultComponents from "fumadocs-ui/mdx";
import {
  CodeBlock,
  type CodeBlockProps,
  Pre,
} from "fumadocs-ui/components/codeblock";
import type { ReactNode } from "react";
import { Popup, PopupContent, PopupTrigger } from "fumadocs-ui/twoslash/popup";
import YouTube from "@/components/youtube";
import Gallery from "@/components/gallery";
import { cn } from "./utils/cn";
import { BadgeCheck } from "lucide-react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    BadgeCheck,
    Popup,
    PopupContent,
    PopupTrigger,
    pre: ({ title, className, icon, allowCopy, ...props }: CodeBlockProps) => (
      <CodeBlock title={title} icon={icon} allowCopy={allowCopy}>
        <Pre className={cn("max-h-[1200px]", className)} {...props} />
      </CodeBlock>
    ),
    Tabs,
    Tab,
    Cards,
    Card,
    Callout,
    TypeTable,
    Step,
    Steps,
    Accordion,
    Accordions,
    YouTube,
    Gallery,
    InstallTabs: ({
      items,
      children,
    }: {
      items: string[];
      children: ReactNode;
    }) => (
      <Tabs items={items} id="package-manager">
        {children}
      </Tabs>
    ),
    blockquote: (props) => <Callout>{props.children}</Callout>,
    ...components,
  };
}
