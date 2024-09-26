import { cva } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import {
  CpuIcon,
  BadgeDollarSign,
  Globe, MailIcon, SproutIcon, SquareGanttChart, IndentDecrease, Layers, MonitorCheck, Settings, Terminal, Cable, Webhook, ArrowUpRight, Command
} from 'lucide-react';
import Link from 'next/link';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { CodeBlock } from '@/components/code-block';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { DeployBlockchainAnimation, HamburgerMenu } from './page.client';

const badgeVariants = cva(
  'mb-2 inline-flex size-7 items-center justify-center rounded-full bg-fd-primary font-medium text-fd-primary-foreground',
);

export default function HomePage(): React.ReactElement {
  return (
    <>
      <main className="container relative max-w-[1100px] px-2 py-4 lg:py-16">
        <div style={{ background: 'repeating-linear-gradient(to bottom, transparent, hsl(var(--secondary)/.2) 500px, transparent 1000px)' }}>
            <div className="relative">
            <span className="absolute -left-2 -top-2 z-10 xl:scale-[300%] text-red-500">🔻</span>
            <span className="absolute -bottom-2 -right-2 z-10 xl:scale-[300%] text-red-500">🔺</span>
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
      <Highlight icon={SproutIcon} heading="Avalanche Protocol" link="/learn">
        Learn about Avalanche Protocol and it's groundbreaking consensus algorithm.
      </Highlight>
      <Highlight icon={SquareGanttChart} heading="Smart Contracts" link="/dapps">
        Your one stop shop to deploy smart contracts on the Avalanche C-Chain.
      </Highlight>
      <Highlight icon={Layers} heading="Avalanche L1s" link="/avalanche-l1s">
        Utilize the Avalanche tech stack to build your own layer 1 blockchain.
      </Highlight>
      <Highlight icon={IndentDecrease} heading="Virtual Machines" link="/virtual-machines">
        Learn how to customize the EVM or build new virtual machines from scratch.
      </Highlight>
      <Highlight icon={MonitorCheck} heading="Nodes & Validators" link="/nodes">
        Become an active participant in the network by running a node or validator.
      </Highlight>
      <Highlight icon={MailIcon} heading="Interoperability" link="/cross-chain">
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
    <div className="border-l border-t px-6 py-12 hover:bg-accent">
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
    <div className="container relative z-[2] flex flex-col items-center overflow-hidden border-x border-t bg-fd-background px-6 pt-12 text-center md:py-16" style={{
      backgroundImage: "radial-gradient(ellipse at top, transparent 60%, hsl(var(--primary) / 0.2)), linear-gradient(to bottom, transparent 30%, hsl(var(--primary) / 0.2)), linear-gradient(to bottom, hsl(var(--background)) 40%, transparent)"
    }}>
      <div className="flex items-center justify-center mb-6">
        <img
          src="/logo-black.png"
          alt="Avalanche Docs Logo"
          className="h-16 md:h-20 dark:hidden"
        />
        <img
          src="/logo-white.png"
          alt="Avalanche Docs Logo"
          className="h-16 md:h-20 hidden dark:block"
        />
        {/* <span className="ml-2 text-5xl font-extrabold text-foreground" style={{ fontFamily: 'Roboto, sans-serif', marginTop: '2.5rem' }}>docs</span> */}
      </div>
      <p className="mb-6 h-fit text-center p-2 text-fd-muted-foreground md:max-w-[80%] md:text-xl">
        Avalanche provides the tech stack for building <b className="text-foreground font-medium">decentralized Layer 1s with blazing-fast Avalanche Consensus</b> while also supporting the deployment of <u>EVM-compatible smart contracts</u> on the C-Chain.
      </p>
    </div>
  );
}

function Introduction(): React.ReactElement {
  return (
    <div className="grid grid-cols-1 border-r md:grid-cols-2">
      <div className="flex flex-col border-l border-t px-6 py-12 md:py-16">
        <div className={cn(badgeVariants())}>1</div>
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
          <Files className="z-[2] mt-20 shadow-xl hide-icons">
            <Folder name="Using the above command, you can configure your:" defaultOpen>
              <Link href="/virtual-machines">
              <File icon={<CpuIcon />} name="Virtual Machine" />
              </Link>
              <Link href="/avalanche-l1s/build-first-avalanche-l1#enter-your-avalanche-l1s-chainid">
              <File icon={<Globe />} name="Chain ID" />
              </Link>
              <Link href="http://localhost:3000/avalanche-l1s/build-first-avalanche-l1#token-symbol">
              <File icon={<BadgeDollarSign />} name="Token Name & Symbol" />
              </Link>
            </Folder>
          </Files>
        </div>
      </div>
      <div className="flex flex-col border-l border-t px-6 py-12 md:py-16">
        <div className={cn(badgeVariants())}>2</div>
        <h3 className="text-xl font-bold">Launch Your Avalanche L1.</h3>
        <p className="mb-8 text-fd-muted-foreground">
          Launch an interoperable blockchain with a single command.
        </p>
        <DeployBlockchainAnimation />
      </div>
    </div>
  );
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
        <Link href="/tooling/avalanche-cli" className="rounded-xl border bg-fd-background p-4 shadow-lg transition-colors hover:bg-accent">
            <Terminal />
            <h3 className="font-semibold">Avalanche CLI</h3>
            <p className="text-sm text-fd-muted-foreground">
              Command line interface for everything Avalanche.
            </p>
        </Link>
        <Link href="https://github.com/ava-labs/avalanche-starter-kit" className="rounded-xl border bg-fd-background p-4 shadow-lg transition-colors hover:bg-accent">
          <Cable />
          <h3 className="font-semibold">Avalanche Starter Kit</h3>
          <p className="text-sm text-fd-muted-foreground">
            Quickstart your journey into Avalanche with our Starter Kit.
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
          <Link href="/api-reference/c-chain/api" className="rounded-xl border bg-fd-background p-4 shadow-lg transition-colors hover:bg-accent">
            <h3 className="font-semibold">C-Chain API</h3>
            <p className="text-sm text-fd-muted-foreground">
              API reference for the Contract Chain.
            </p>
          </Link>
          <Link href="/api-reference/p-chain/api" className="rounded-xl border bg-fd-background p-4 shadow-lg transition-colors hover:bg-accent">
            <h3 className="font-semibold">P-Chain API</h3>
            <p className="text-sm text-fd-muted-foreground">
              API reference for the Platform Chain.
            </p>
          </Link>
          <Link href="/api-reference/x-chain/api" className="rounded-xl border bg-fd-background p-4 shadow-lg transition-colors hover:bg-accent">
            <h3 className="font-semibold">X-Chain API</h3>
            <p className="text-sm text-fd-muted-foreground">
              API reference for the Exchange Chain.
            </p>
          </Link>
          <Link href="/api-reference/admin-api" className="rounded-xl border bg-fd-background p-4 shadow-lg transition-colors hover:bg-accent">
            <h3 className="font-semibold">AvalancheGo API</h3>
            <p className="text-sm text-fd-muted-foreground">
              API reference for AvalancheGo.
            </p>
          </Link>
          <Link href="/api-reference/subnet-evm-api" className="rounded-xl border bg-fd-background p-4 shadow-lg transition-colors hover:bg-accent">
            <h3 className="font-semibold">Subnet-EVM API</h3>
            <p className="text-sm text-fd-muted-foreground">
              API reference for Subnet-EVM.
            </p>
          </Link>
          <Link href="https://developers.avacloud.io/introduction" target="_blank" className="rounded-xl border bg-fd-background p-4 shadow-lg transition-colors hover:bg-accent">
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