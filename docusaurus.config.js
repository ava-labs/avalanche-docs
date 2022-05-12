// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  title: 'Avalanche Docs',
  tagline: 'Documentation and Tutorials for Avalanche',
  url: 'https://docs.avax.network',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'ava-labs', // Usually your GitHub org/user name.
  projectName: 'avalanche-docs', // Usually your repo name.

  scripts: [
    'scripts/intercom-app.js',
    'scripts/intercom-scripts.js'
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          // Please change this to your repo.
          editUrl: 'https://github.com/ava-labs/avalanche-docs/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'UA-126268251-10',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/Avalanche-OG-Image.png?force-reload-1',
      metadata: [
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:description', content: 'Avalanche is the fastest smart contracts platform in the blockchain industry, as measured by time-to-finality, and has the most validators securing its activity of any proof-of-stake protocol.'},
        {name: 'twitter:title', content:'Developer Documentation and Tutorials for Avalanche'},
        {name: 'keywords', content: 'Developer Documentation and Tutorials for Avalanche'}
      ],
      navbar: {
        title: '',
        logo: {
          alt: 'Avalanche Logo',
          src: 'img/Avalanche_Horizontal_Red.svg',
        },
        items: [
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'overview',
            label: 'Overview',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'quickStart',
            label: 'Quick Start',
          },     
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'dapps',
            label: 'DApps',
          },  

          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'subnets',
            label: 'Subnets',
          }, 
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'apis',
            label: 'APIs',
          }, 
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'nodes',
            label: 'Nodes',
          }, 
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'specs',
            label: 'Specs',
          }, 
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'community',
            label: 'Community',
          }, 
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://chat.avax.network',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/avalancheavax',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/avalancheavax',
              },
              {
                label: 'Medium',
                href: 'https://medium.com/avalancheavax',
              }
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'YouTube',
                href: 'https://youtube.com/avalancheavax',
              },
              {
                label: 'Ecosystem',
                href: 'https://ecosystem.avax.network',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/ava-labs/avalanche-docs',
              }
            ],
          },
          {
            
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ava Labs, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        appId: 'UAFD8IBIF7',
        apiKey: '20006f8de4bf55970ebca9129c345a1d',
        indexName: 'avax',
        contextualSearch: true,
      },
    }),
};

module.exports = config;
