import { type LinkItemType } from 'fumadocs-ui/layouts/docs';
import { type BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { AvalancheLogo } from '@/components/navigation/avalanche-logo';
import { Workflow, Sprout, Logs, MonitorCheck, ArrowUpRight, SendHorizontal, Cable, Bot, Cpu, Snowflake, BriefcaseBusiness,MessageSquareQuote, Server, Github, Waypoints, HandCoins, Ticket, Handshake } from 'lucide-react';
import Image from 'next/image';
import Preview9000 from '@/public/nav-banner/9000-logo.png';
import CoursePreview from '@/public/nav-banner/course-preview.png';
import CodebaseBanner from '@/public/nav-banner/codebase-banner.png';
import HackathonBanner from '@/public/nav-banner/hackathon-banner.png';
import L1LauncherPreview from '@/public/nav-banner/l1-launcher-preview.png';

export const linkItems: LinkItemType[] = [
  {
    icon: <Workflow />,
    text: 'Integrations',
    url: '/integrations',
    active: 'nested-url',
  },
];

const docsMenu: LinkItemType = {
  type: 'menu',
  text: 'Documentation',
  url: '/docs',
  items: [
   {
      menu: {
        banner: (
          <div className="-mx-3 -mt-3">
            <Image
              src={Preview9000}
              alt="Preview"
              className="rounded-t-lg object-cover"
              style={{
                maskImage:
                  'linear-gradient(to bottom,white 60%,transparent)',
              }}
            />
          </div>
        ),
        className: 'md:row-span-2',
      },
      icon: <Sprout />,
      text: 'Avalanche Protocol',
      description: 'Learn about the Avalanche Protocol',
      url: '/docs/quick-start',
    },
    {
      icon: <Logs />,
      text: 'Avalanche L1s',
      description: "Build your own sovereign Layer 1 blockchain using Avalanche's battle-tested infrastructure and tooling.",
      url: '/docs/avalanche-l1s',
      menu: {
        className: 'lg:col-start-2',
      },
    },
    {
      icon: <MonitorCheck />,
      text: 'Nodes & Validators',
      description: 'Learn about hardware requirements, staking mechanisms, rewards, and best practices for running validator infra on Avalanche.',
      url: '/docs/nodes',
      menu: {
        className: 'lg:col-start-2',
      },
    },
    {
      icon: <Cable />,
      text: 'Interoperability',
      description: "Explore Avalanche's native cross-chain protocols that enable seamless asset and data transfer across different Avalanche L1s.",
      url: '/docs/cross-chain',
      menu: {
        className: 'lg:col-start-3 lg:row-start-1',
      },
    },
    {
      icon: <ArrowUpRight />,
      text: 'Browse All Docs',
      description: "Explore our in-depth documentation, guides, and resources to bring your ideas to life.",
      url: '/docs',
      menu: {
        className: 'lg:col-start-3',
      },
    },
  ],
};

const academyMenu: LinkItemType = {
  type: 'menu',
  text: 'Academy',
  url: '/academy',
  items: [
   {
      menu: {
        banner: (
          <div className="-mx-3 -mt-3">
            <Image
              src={CoursePreview}
              alt="Preview"
              className="rounded-t-lg object-cover"
              style={{
                maskImage:
                  'linear-gradient(to bottom,white 60%,transparent)',
              }}
            />
          </div>
        ),
        className: 'md:row-span-2',
      },
      icon: <Sprout />,
      text: 'Avalanche Fundamentals',
      description: 'Get a high level overview of Avalanche Consensus, L1s and VMs',
      url: '/academy/avalanche-fundamentals',
    },
    {
      icon: <Logs />,
      text: 'Multi-Chain Architecture',
      description: "Dive deeper into Avalanche's multi-chain architecture and deploy your own Blockchain.",
      url: '/academy/multi-chain-architecture',
      menu: {
        className: 'lg:col-start-2',
      },
    },
    {
      icon: <Cpu />,
      text: 'Customizing the EVM',
      description: "Learn how to customize the Ethereum Virtual Machine and add your own custom precompiles.",
      url: '/academy/customizing-evm',
      menu: {
        className: 'lg:col-start-2',
      },
    },
    {
      icon: <SendHorizontal />,
      text: 'Avalanche Interchain Messaging',
      description: "Utilize Avalanche Interchain Messaging to build cross-chain dApps in the Avalanche ecosystem.",
      url: '/academy/interchain-messaging',
      menu: {
        className: 'lg:col-start-3 lg:row-start-1',
      },
    },
    {
      icon: <ArrowUpRight />,
      text: 'Check All Courses',
      description: "Supercharge your learning journey with expert-curated courses offered by Avalanche Academy and earn certificates.",
      url: '/academy',
      menu: {
        className: 'lg:col-start-3',
      },
    },
  ],
};

const toolsMenu: LinkItemType = {
  type: 'menu',
  text: 'Tools',
  url: '/tools',
  items: [
   {
      menu: {
        banner: (
          <div className="-mx-3 -mt-3">
            <Image
              src={L1LauncherPreview}
              alt="L1 Launcher Preview"
              className="rounded-t-lg object-cover"
              style={{
                maskImage:
                  'linear-gradient(to bottom,white 60%,transparent)',
              }}
            />
          </div>
        ),
        className: 'md:row-span-2',
      },
      icon: <Server />,
      text: 'L1 Launcher (Beta)',
      description: 'Launch your self-hosted Testnet or Mainnet L1 on your own infrastructure.',
      url: '/tools/l1-launcher',
    },
    {
      icon: <Github />,
      text: 'Avalanche Starter Kit',
      description: "Spin up short-lived test environments for building dApps using interoperability features like ICM and ICTT.",
      url: 'https://github.com/ava-labs/avalanche-starter-kit',
      menu: {
        className: 'lg:col-start-2',
      },
    },
    {
      icon: <HandCoins />,
      text: 'Testnet Faucet',
      description: 'Claim Fuji AVAX tokens from the testnet faucet to test your dApps.',
      url: 'https://core.app/tools/testnet-faucet/?subnet=c&token=c',
      menu: {
        className: 'lg:col-start-2',
      },
    },
    {
      icon: <Waypoints />,
      text: 'ICM Deployment (Coming soon)',
      description: 'Deploy the Interchain Messaging contracts and the ICM Registry to connect your L1 to the Avalanche network.',
      url: '',
      menu: {
        className: 'lg:col-start-3 lg:row-start-1',
      },
    },
    {
      icon: <Waypoints />,
      text: 'ICTT Deployment (Coming soon)',
      description: 'Deploy a bridge between two L1s to transfer fungible tokens.',
      url: '',
      menu: {
        className: 'lg:col-start-3',
      },
    },

  ],
};

const grantsMenu: LinkItemType = {
  type: 'menu',
  text: 'Grants',
  url: '/grants',
  items: [
    {
       menu: {
         banner: (
           <div className="-mx-3 -mt-3">
             <Image
               src={CodebaseBanner}
               alt="Preview"
               className="rounded-t-lg object-cover"
               style={{
                 maskImage:
                   'linear-gradient(to bottom,white 60%,transparent)',
               }}
             />
           </div>
         ),
         className: 'md:row-span-2',
       },
       icon: <BriefcaseBusiness />,
       text: 'Codebase',
       description: 'We help transform good ideas into great web3 companies & ambitious builders into extraordinary founders.',
       url: 'https://codebase.avax.network/',
     },
     {
       icon: <Cpu />,
       text: 'InfraBUIDL',
       description: "Strengthening Avalanche's infrastructure. Build the foundation for next-gen blockchain applications.",
       url: 'https://www.avax.network/infrabuidl-program',
       menu: {
         className: 'lg:col-start-2',
       },
     },
     {
       icon: <Bot />,
       text: 'InfraBUIDL (AI)',
       description: 'Supports projects that fuse artificial intelligence (AI) with decentralized infrastructure.',
       url: 'https://www.avax.network/infrabuidl-ai-program',
       menu: {
         className: 'lg:col-start-2',
       },
     },
     {
       icon: <MessageSquareQuote />,
       text: 'Retro9000',
       description: "Build innovative projects on Avalanche. Get rewarded for your creativity.",
       url: 'https://retro9000.avax.network/',
       menu: {
         className: 'lg:col-start-3 lg:row-start-1',
       },
     },
     {
       icon: <Snowflake />,
       text: 'Blizzard Fund',
       description: "A $200M+ fund investing in promising Avalanche projects. Fuel your growth with institutional support.",
       url: 'https://www.blizzard.fund/',
       menu: {
         className: 'lg:col-start-3',
       },
     },
   ],
};

const hackathonMenu: LinkItemType = {
  type: 'menu',
  text: 'Hackathon',
  url: '/hackathon',
  items: [
    {
      menu: {
        banner: (
          <div className="-mx-3 -mt-3">
            <Image
              src={HackathonBanner}
              alt="Preview"
              className="rounded-t-lg object-cover"
              style={{
                maskImage:
                  'linear-gradient(to bottom,white 60%,transparent)',
              }}
            />
          </div>
        ),
        className: 'md:row-span-2',
      },
      icon: <Ticket />,
      text: 'Registration',
      description: 'Join us at London for the Avalanche Summit Hackathon',
      url: 'https://lu.ma/avalanchesummitlondonhackathon',
    },
    {
      icon: <Cable />,
      text: 'Tracks',
      description: "Get familiar with the tracks, and everything you need to know about the hackathon",
      url: '/hackathon',
      menu: {
        className: 'lg:col-start-2 lg:row-start-1',
      },
    },
    {
      icon: <Handshake />,
      text: 'Partners',
      description: "Want to be a partner of the Hackathon? Contact Us!",
      url: 'mailto:brittany.gilliam@avalabs.org',
      menu: {
        className: 'lg:col-start-3 lg:row-start-1',
      },
    },
   ],
};

export const baseOptions: BaseLayoutProps = {
  githubUrl: 'https://github.com/ava-labs/avalanche-docs',
  nav: {
    title: (
      <>
        { <AvalancheLogo className="size-7" fill="currentColor"/> }
        <span style={{ fontSize: "large" }}>Builders Hub</span>
      </>
    ),
  },
  links: [
    docsMenu,
    academyMenu,
    toolsMenu,
    grantsMenu,
    ...linkItems,
    hackathonMenu,
  ],
};
