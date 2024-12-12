import { type LinkItemType } from 'fumadocs-ui/layouts/docs';
import { type BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { NavbarTitle } from '@/app/layout.client';
import { AlbumIcon, Sprout, Layers, MonitorCheck, Mail, Webhook } from 'lucide-react';

export const linkItems: LinkItemType[] = [
  {
    icon: <AlbumIcon />,
    text: 'Academy',
    url: '/academy',
    active: 'nested-url',
  },
];

export const baseOptions: BaseLayoutProps = {
  githubUrl: 'https://github.com/ava-labs/avalanche-docs',
  nav: {
    title: <NavbarTitle/>,
    transparentMode: 'top',
  },
  links: [
    {
      type: 'menu',
      text: 'Documentation',
      url: '/docs',
      items: [
        {
          icon: <Sprout />,
          text: 'Avalanche Protocol',
          description: 'Learn about the Avalanche Protocol',
          url: '/docs/protocol',
        },
        {
          icon: <Layers />,
          text: 'Avalanche L1s',
          description: 'Start building your own Layer 1 blockchain',
          url: '/docs/avalanche-l1s',
          menu: {
            className: 'lg:col-start-2',
          },
        },
        {
          icon: <MonitorCheck />,
          text: 'Nodes & Validators',
          description: 'Participate in the Network and earn rewards',
          url: '/docs/nodes',
          menu: {
            className: 'lg:col-start-2',
          },
        },
        {
          icon: <Mail />,
          text: 'Interoperability',
          description: 'Learn the art of cross-chain communications in Avalanche ecosystem',
          url: '/docs/cross-chain',
          menu: {
            className: 'lg:col-start-3 lg:row-start-1',
          },
        },
        {
          icon: <Webhook />,
          text: 'API Docs',
          description: 'Avalanche API References',
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
    title: <NavbarTitle/>,
    transparentMode: 'top',
  }
};
