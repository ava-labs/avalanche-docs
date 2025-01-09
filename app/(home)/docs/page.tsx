import { cva } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import {
  CpuIcon,
  BadgeDollarSign,
  Globe, SproutIcon, SquareGanttChart, MonitorCog, Atom, Layers, MonitorCheck, Settings, Terminal, Cable, Webhook, Command
} from 'lucide-react';
import Link from 'next/link';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { CodeBlock } from '@/components/content-design/code-block';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { DeployBlockchainAnimation } from '@/app/(home)/page.client';

const badgeVariants = cva(
  'mb-2 inline-flex size-7 items-center justify-center rounded-full bg-fd-primary font-medium text-fd-primary-foreground',
);

export default function HomePage(): React.ReactElement {
  return (
    <>
      <main className="container relative max-w-[1100px] px-2 py-4 lg:py-16">
        <div>
            <div className="relative">
            <Hero />
            </div>
          <Introduction />
          <Highlights />
          <Features />
        </div>
      </main>
    </>
  );
}

function Highlights(): React.ReactElement {
  return (
    <div className="grid grid-cols-1 border-r md:grid-cols-2 lg:grid-cols-3">
      <Highlight icon={SproutIcon} heading="Quick Start" link="/docs/quick-start">
        Learn about the Avalanche Protocol and it's groundbreaking consensus algorithm.
      </Highlight>
      <Highlight icon={SquareGanttChart} heading="Build Applications" link="/docs/dapps">
        Your one stop shop to deploy smart contracts on the Avalanche C-Chain.
      </Highlight>
      <Highlight icon={Layers} heading="Avalanche L1s" link="/docs/avalanche-l1s">
        Utilize the Avalanche tech stack to build your own layer 1 blockchain.
      </Highlight>
      <Highlight icon={MonitorCog} heading="Virtual Machines" link="/docs/virtual-machines">
        Learn how to customize the EVM or build new virtual machines from scratch.
      </Highlight>
      <Highlight icon={MonitorCheck} heading="Nodes & Validators" link="/docs/nodes">
        Become an active participant in the network by running a node or validator.
      </Highlight>
      <Highlight icon={Cable} heading="Interoperability" link="/docs/cross-chain">
        Advanced interoperability protocols to communicate with other blockchains.
      </Highlight>
    </div>
  );
}

function Highlight({
  icon: Icon,
  heading,
  link,
  children,
}: {
  icon: LucideIcon;
  heading: ReactNode;
  link: string;
  children: ReactNode;
}): React.ReactElement {
  return (
  <a href={link}>
    <div className="border-l border-t px-6 py-12 hover:bg-fd-accent">
      <div className="mb-4 flex flex-row items-center gap-2 text-fd-muted-foreground">
        <Icon className="size-4" />
        <h2 className="text-sm font-medium">{heading}</h2>
      </div>
      <span className="font-medium">{children}</span>
    </div>
  </a>
  );
}

function Hero(): React.ReactElement {
  return (
    <div className="flex flex-col justify-center items-center px-4 mb-16">
      <h2 className="font-display text-3xl tracking-tight sm:text-5xl text-center">
        Avalanche Docs
      </h2>
      <p className="mt-4 text-lg tracking-tight text-zinc-400 text-center">
        Full-Stack Avalanche Development, All in One Place
      </p>
    </div>
  );
}

function Introduction(): React.ReactElement {
  return (
    <div className="grid grid-cols-1 border-r md:grid-cols-2">
      <div className="flex flex-col border-l border-t px-6 py-12 md:py-16">
        <div className={cn(badgeVariants(), 'bg-red-500', 'text-white')}>1</div>
        <h3 className="text-xl font-bold">Configure.</h3>
        <p className="mb-8 text-fd-muted-foreground">
          Configure your blockchain using Avalanche CLI.
        </p>
        <div className="relative flex flex-col">
          <CodeBlock
            lang="bash"
            wrapper={{ className: 'absolute inset-x-2 top-0' }}
            code="avalanche blockchain create myblockchain"
          />
            <div className="relative mt-20">
            <Link href="https://developers.avax.network/academy">
              <img 
              src="/wolfie.png" 
              alt="Avalanche Logo" 
              className="absolute top-5 left-1/2 -translate-x-1/2 z-[1] w-32 h-32 object-contain transition-all duration-300 ease-in-out group-[.closed]:translate-y-[20px] group-[.closed]:opacity-50 group-[.open]:translate-y-10 group-[.open]:opacity-0"
              />
            </Link>
            <Files className="z-[2] shadow-xl hide-icons relative dark:text-white group transition-all duration-300 ease-in-out [&[open]]:open [&:not([open])]:closed">
              <Folder name="Using the above command, you can configure your:" defaultOpen>
              <Link href="/docs/virtual-machines">
              <File icon={<CpuIcon />} name="Virtual Machine" />
              </Link>
              <Link href="/docs/avalanche-l1s/build-first-avalanche-l1#enter-your-avalanche-l1s-chainid">
              <File icon={<Globe />} name="Chain ID" />
              </Link>
              <Link href="/docs/avalanche-l1s/build-first-avalanche-l1#token-symbol">
              <File icon={<BadgeDollarSign />} name="Token Name & Symbol" />
              </Link>
              </Folder>
            </Files>
            </div>
        </div>
      </div>
      <div className="flex flex-col border-l border-t px-6 py-12 md:py-16">
        <div className={cn(badgeVariants(), 'bg-red-500', 'text-white')}>2</div>
        <h3 className="text-xl font-bold">Deploy.</h3>
        <p className="mb-8 text-fd-muted-foreground">
          Deploy an interoperable layer 1 with a single command.
        </p>
        <DeployBlockchainAnimation />
      </div>
    </div>
  )
}

function Features(): React.ReactElement {
  return (
    <div className="grid grid-cols-1 border-b border-r md:grid-cols-2">
      <Feature
        icon={Settings}
        subheading="Toolings"
        heading="Tools For Developers."
        description="We provide a suite of tools to make your development experience as smooth as possible."
      >
      <div className="mt-8 flex flex-col gap-4">
        <Link href="/docs/tooling/avalanche-cli" className="rounded-xl border bg-fd-background p-4 shadow-lg transition-colors hover:bg-fd-accent">
            <Terminal />
            <h3 className="font-semibold">Avalanche CLI</h3>
            <p className="text-sm text-fd-muted-foreground">
              Command line interface for everything Avalanche.
            </p>
        </Link>
        <Link href="https://github.com/ava-labs/avalanche-starter-kit" className="rounded-xl border bg-fd-background p-4 shadow-lg transition-colors hover:bg-fd-accent">
          <Command />
          <h3 className="font-semibold">Avalanche Starter Kit</h3>
          <p className="text-sm text-fd-muted-foreground">
            Quickstart your journey into Avalanche with our Starter Kit.
          </p>
        </Link>
        <Link href="https://github.com/ava-labs/hypersdk" className="rounded-xl border bg-fd-background p-4 shadow-lg transition-colors hover:bg-fd-accent">
            <Atom />
            <h3 className="font-semibold">HyperSDK</h3>
            <p className="text-sm text-fd-muted-foreground">
              High performance, customizable framework for building blockchains.
            </p>
        </Link>
        </div>
      </Feature>
      <Feature
        icon={Webhook}
        subheading="APIs"
        heading="API References for anything Avalanche."
        description="Well documented APIs for the Avalanche Network."
      >
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link href="/docs/api-reference/c-chain/api" className="rounded-xl border bg-fd-background p-4 shadow-lg transition-colors hover:bg-fd-accent">
            <h3 className="font-semibold">C-Chain API</h3>
            <p className="text-sm text-fd-muted-foreground">
              API reference for the Contract Chain.
            </p>
          </Link>
          <Link href="/docs/api-reference/p-chain/api" className="rounded-xl border bg-fd-background p-4 shadow-lg transition-colors hover:bg-fd-accent">
            <h3 className="font-semibold">P-Chain API</h3>
            <p className="text-sm text-fd-muted-foreground">
              API reference for the Platform Chain.
            </p>
          </Link>
          <Link href="/docs/api-reference/x-chain/api" className="rounded-xl border bg-fd-background p-4 shadow-lg transition-colors hover:bg-fd-accent">
            <h3 className="font-semibold">X-Chain API</h3>
            <p className="text-sm text-fd-muted-foreground">
              API reference for the Exchange Chain.
            </p>
          </Link>
          <Link href="/docs/api-reference/admin-api" className="rounded-xl border bg-fd-background p-4 shadow-lg transition-colors hover:bg-fd-accent">
            <h3 className="font-semibold">AvalancheGo API</h3>
            <p className="text-sm text-fd-muted-foreground">
              API reference for AvalancheGo.
            </p>
          </Link>
          <Link href="/docs/api-reference/subnet-evm-api" className="rounded-xl border bg-fd-background p-4 shadow-lg transition-colors hover:bg-fd-accent">
            <h3 className="font-semibold">Subnet-EVM API</h3>
            <p className="text-sm text-fd-muted-foreground">
              API reference for Subnet-EVM.
            </p>
          </Link>
          <Link href="https://developers.avacloud.io/introduction" target="_blank" className="rounded-xl border bg-fd-background p-4 shadow-lg transition-colors hover:bg-fd-accent">
            <h3 className="font-semibold">AvaCloud APIs</h3>
            <p className="text-sm text-fd-muted-foreground">
              API reference for AvaCloud.
            </p>
          </Link>
        </div>
      </Feature>
    </div>
  );
}

function Feature({
  className,
  icon: Icon,
  heading,
  subheading,
  description,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  icon: LucideIcon;
  subheading: ReactNode;
  heading: ReactNode;
  description: ReactNode;
}): React.ReactElement {
  return (
    <div
      className={cn('border-l border-t px-6 py-12', className)}
      {...props}
    >
      <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-fd-muted-foreground">
        <Icon className="size-4" />
        <p>{subheading}</p>
      </div>
      <h2 className="mb-2 text-lg font-semibold">{heading}</h2>
      <p className="text-fd-muted-foreground">{description}</p>

      {props.children}
    </div>
  );
}
