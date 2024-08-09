import { type BaseLayoutProps, type DocsLayoutProps } from 'fumadocs-ui/layout';
import { Title } from '@/app/layout.client';
import { utils } from '@/utils/source';
import { RootToggle } from 'fumadocs-ui/components/layout/root-toggle';
import { MailIcon, SproutIcon, SquareGanttChart, IndentDecrease, Layers, MonitorCheck, Settings, Webhook } from 'lucide-react';

// shared configuration
export const baseOptions: BaseLayoutProps = {
  githubUrl: 'https://github.com/ava-labs/avalanche-docs',
  nav: {
    title: <Title />,
    transparentMode: 'top',
  },
  links: [
    {
      text: 'Academy',
      url: 'https://academy.avax.network',
    },
    {
      text: 'Guides',
      url: 'https://academy.avax.network/guide',
    },
  ],
};

// docs layout configuration
export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: utils.pageTree,
  sidebar: {
    defaultOpenLevel: 0,
    banner: (
      <RootToggle
        options={[
          {
            title: 'Avalanche Protocol',
            description: 'Learn about Avalanche',
            icon: <SproutIcon />,
            url: '/docs/learn',
          },
          {
            title: 'Smart Contracts',
            description: 'Build Apps on Avalanche',
            icon: <SquareGanttChart />,
            url: '/docs/dapps',
          },
          {
            title: 'Avalanche L1s',
            description: 'Build Your L1 Blockchain',
            icon: <Layers />,
            url: '/docs/subnets',
          },
          {
            title: 'Virtual Machines',
            description: 'Customize Your Execution Layer',
            icon: <IndentDecrease />,
            url: '/docs/virtual-machines',
          },
          {
            title: 'Nodes & Validators',
            description: 'Participate in the Network',
            icon: <MonitorCheck />,
            url: '/docs/nodes',
          },
          {
            title: 'Interoperability',
            description: 'AWM and Teleporter',
            icon: <MailIcon />,
            url: '/docs/cross-chain',
          },
          {
            title: 'Toolings',
            description: 'CLI, Scripts, and More',
            icon: <Settings />,
            url: '/docs/tooling/avalanche-cli',
          },
          {
            title: 'API Docs',
            description: 'Avalanche API References',
            icon: <Webhook />,
            url: '/docs/api-reference/p-chain/api',
          }
        ]}
      />
    ),
  }
};
