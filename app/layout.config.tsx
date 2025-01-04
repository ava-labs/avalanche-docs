import { type LinkItemType } from 'fumadocs-ui/layouts/docs';
import { type BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { AvalancheLogo } from '@/components/navigation/avalanche-logo';
import { AlbumIcon, Workflow, BadgeDollarSign, Sprout, Layers, MonitorCheck, Mail, Webhook } from 'lucide-react';
import Image from 'next/image';
import Preview9000 from '@/public/9000-logo.png';
import CoursePreview from '@/public/course-preview.png';

export const linkItems: LinkItemType[] = [
  {
    icon: <BadgeDollarSign />,
    text: 'Grants',
    url: '/grants',
    active: 'nested-url',
  },
  {
    icon: <AlbumIcon />,
    text: 'Guides',
    url: '/guides',
    active: 'nested-url',
  },
  {
    icon: <Workflow />,
    text: 'Integrations',
    url: '/integrations',
    active: 'nested-url',
  },
];

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
    {
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
          url: '/docs/protocol',
        },
        {
          icon: <Layers />,
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
          description: 'Learn about hardware requirements, staking mechanisms, rewards, and best practices for securing and maintaining validator infra for Avalanche ecosystem.',
          url: '/docs/nodes',
          menu: {
            className: 'lg:col-start-2',
          },
        },
        {
          icon: <Mail />,
          text: 'Interoperability',
          description: "Explore Avalanche's native cross-chain protocols that enable seamless asset and data transfer across different Avalanche L1s.",
          url: '/docs/cross-chain',
          menu: {
            className: 'lg:col-start-3 lg:row-start-1',
          },
        },
        {
          icon: <Webhook />,
          text: 'API Docs',
          description: "Comprehensive API documentation for interacting with the Primary Network and various Avalanche L1s.",
          url: '/docs/api-reference',
          menu: {
            className: 'lg:col-start-3',
          },
        },
      ],
    },
    {
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
          icon: <Layers />,
          text: 'Multi-Chain Architecture',
          description: "Dive deeper into Avalanche's multi-chain architecture and deploy your own Blockchain.",
          url: '/academy/multi-chain-architecture',
          menu: {
            className: 'lg:col-start-2',
          },
        },
        {
          icon: <MonitorCheck />,
          text: 'Interchain Token Transfer',
          description: 'Deploy Avalanche Interchain Token Transfer to transfer assets between different Avalanche L1s.',
          url: '/academy/interchain-token-transfer',
          menu: {
            className: 'lg:col-start-2',
          },
        },
        {
          icon: <Mail />,
          text: 'Avalanche Interchain Messaging',
          description: "Utilize Avalanche Interchain Messaging to build cross-chain dApps in the Avalanche ecosystem.",
          url: '/academy/interchain-messaging',
          menu: {
            className: 'lg:col-start-3 lg:row-start-1',
          },
        },
        {
          icon: <Webhook />,
          text: 'Customizing the EVM',
          description: "Learn how to customize the Ethereum Virtual Machine and add your own custom precompiles.",
          url: '/academy/customizing-evm',
          menu: {
            className: 'lg:col-start-3',
          },
        },
      ],
    },
    ...linkItems,
  ],
};

export const integrationPageOptions: BaseLayoutProps = {
  ...baseOptions,
  nav: {
    title: (
      <>
        { <AvalancheLogo className="size-7" fill="currentColor"/> }
        <span style={{ fontSize: "large" }}>Builders Hub</span>
      </>
    ),
    transparentMode: 'top',
  }
};
