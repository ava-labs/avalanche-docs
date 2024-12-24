import { type LinkItemType } from 'fumadocs-ui/layouts/docs';
import { type BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { AvalancheLogo } from '@/components/navigation/avalanche-logo';
import { AlbumIcon, Sprout, Layers, MonitorCheck, Mail, Webhook } from 'lucide-react';
import Image from 'next/image';
import Preview9000 from '@/public/9000-logo.png';

export const linkItems: LinkItemType[] = [
  {
    icon: <AlbumIcon />,
    text: 'Guides',
    url: '/guide',
    active: 'nested-url',
  },
  {
    icon: <AlbumIcon />,
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
        <span style={{ fontSize: "large" }}>Developer Hub</span>
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
    ...linkItems,
  ],
};

export const integrationPageOptions: BaseLayoutProps = {
  ...baseOptions,
  nav: {
    title: (
      <>
        { <AvalancheLogo className="size-7" fill="currentColor"/> }
        <span style={{ fontSize: "large" }}>Developer Hub</span>
      </>
    ),
    transparentMode: 'top',
  }
};
