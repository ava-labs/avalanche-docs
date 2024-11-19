import { type BaseLayoutProps, type DocsLayoutProps } from 'fumadocs-ui/layout';
import { NavbarTitle } from '@/app/layout.client';
import { docsPageTree } from '@/utils/docs-loader';
import { AcademyDropdown, DocsDropdown, DropDownBar, GrantsDropdown, IntegrationsDropdown } from '@/components/navigation/navigation';


// shared configuration
export const baseOptions: BaseLayoutProps = {
  githubUrl: 'https://github.com/ava-labs/avalanche-docs',
  links: [
    {
      text: 'Docs',
      url: '/',
    },
    {
      text: 'Courses',
      url: 'https://academy.avax.network',
    },
    {
      text: 'Integrations',
      url: '/integrations',
    },
    {
      text: 'Guides',
      url: 'https://academy.avax.network/guide',
    }
  ],
};


// home page configuration (HomeTitle includes hamburger menu)
export const homebaseOptions: BaseLayoutProps = {
  ...baseOptions,
  nav: {
    title: <NavbarTitle />,
    children: <DropDownBar/>,
    transparentMode: 'top',
    url: '/',
  }
};

export const integrationPageOptions: BaseLayoutProps = {
  ...baseOptions,
  nav: {
    title: <NavbarTitle/>,
    children: <DropDownBar/>,
    transparentMode: 'top',
    url: '/integrations',
  }
};

// docs layout configuration
export const docsOptions: DocsLayoutProps = {
  ...baseOptions,

  nav: {
    title: <NavbarTitle />,
    transparentMode: 'top',
  },

  tree: docsPageTree,
  sidebar: {
    defaultOpenLevel: 0,
    banner: (
      <DocsDropdown buttonStyle='currentElement'/>
    ),
  }
};
