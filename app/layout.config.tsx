import { type BaseLayoutProps, type DocsLayoutProps } from 'fumadocs-ui/layout';
import { Title, HomeTitle } from '@/app/layout.client';
import { docsPageTree } from '@/utils/docs-loader';
import { RootToggle } from 'fumadocs-ui/components/layout/root-toggle';
import { MailIcon, SproutIcon, SquareGanttChart, IndentDecrease, Layers, MonitorCheck, Settings, Webhook } from 'lucide-react';

// home page configuration (HomeTitle includes hamburger menu)
export const homebaseOptions: BaseLayoutProps = {
  githubUrl: 'https://github.com/ava-labs/avalanche-docs',
  nav: {
    title: <HomeTitle />,
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
    {
      text: 'Integrations',
      url: '/integrations',
    },
  ],
};

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
    {
      text: 'Integrations',
      url: '/integrations',
    },
  ],
};

// docs layout configuration
export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: docsPageTree,
  sidebar: {
    defaultOpenLevel: 0,
    banner: (
      <RootToggle
        options={[
          {
            title: 'Avalanche Protocol',
            description: 'Learn about Avalanche',
            icon: <SproutIcon />,
            url: '/learn',
          },
          {
            title: 'Smart Contracts',
            description: 'Build Apps on Avalanche',
            icon: <SquareGanttChart />,
            url: '/dapps',
          },
          {
            title: 'Avalanche CLI',
            description: 'Build Your L1 Blockchain',
            icon: <Layers />,
            url: '/avalanche-l1s',
          },
          {
            title: 'EVM L1s',
            description: 'Customize the Ethereum VM',
            icon: <IndentDecrease />,
            url: '/evm-l1s',
          },
          {
            title: 'Custom Virtual Machines',
            description: 'Customize Your Execution Layer',
            icon: <IndentDecrease />,
            url: '/virtual-machines',
          },
          {
            title: 'Nodes & Validators',
            description: 'Participate in the Network',
            icon: <MonitorCheck />,
            url: '/nodes',
          },
          {
            title: 'Interoperability',
            description: 'AWM and Teleporter',
            icon: <MailIcon />,
            url: '/cross-chain',
          },
          {
            title: 'Tooling',
            description: 'CLI, Scripts, and More',
            icon: <Settings />,
            url: '/tooling',
          },
          {
            title: 'API Docs',
            description: 'Avalanche API References',
            icon: <Webhook />,
            url: '/api-reference',
          }
        ]}
      />
    ),
  }
};
