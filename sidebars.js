/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually

  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Learn',
      collapsible: true,
      collapsed: false,
      items: [
        'learn/getting-started',
        {
          type: 'category',
          label: 'Platform',
          items: [
            'learn/platform-overview/README',
            'learn/platform-overview/avalanche-consensus',
            'learn/platform-overview/staking',
            'learn/platform-overview/transaction-fees'
          ],
        },
        'learn/avalanche-bridge-faq',
        'learn/setup-your-ledger-nano-s-with-avalanche',
        {
          type: 'link',
          label: 'Blockchain Basic', // The link label
          href: 'https://support.avalabs.org/en/collections/2353492-blockchain-basics', // The external URL
        },
        {
          type: 'link',
          label: 'FAQ', // The link label
          href: 'https://support.avax.network/en/', // The external URL
        },

        {
          type: 'link',
          label: 'Forum', // The link label
          href: 'https://forum.avax.network/', // The external URL
        },
        {
          type: 'link',
          label: 'Ecosystem', // The link label
          href: 'https://ecosystem.avax.network/', // The external URL
        },
      ],
    },
    {
      type: 'category',
      label: 'Build',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Release Notes',
          items: [
            'build/release-notes/avalanchego',
            {
              type: 'link',
              label: 'Avalanche Notify', // The link label
              href: 'https://notify.avax.network/', // The external URL
            },
          ],
        },
        {
          type: 'category',
          label: 'Tutorials',
          items: [
            'build/tutorials/README',
            {
              type: 'category',
              label: 'Platform',
              items: [
                'build/tutorials/platform/README',
                {
                  type: 'category',
                  label: 'Subnets',
                  items: [
                    {
                      type: 'autogenerated',
                      dirName: 'build/tutorials/platform/subnets',
                    }
                  ],
                },
                'build/tutorials/platform/create-a-local-test-network',
                'build/tutorials/platform/fuji-workflow',
                'build/tutorials/platform/avalanche-summit-fuji-quickstart',
                'build/tutorials/platform/fund-a-local-test-network',
                'build/tutorials/platform/integrate-exchange-with-avalanche',
                'build/tutorials/platform/launch-your-ethereum-dapp',
                'build/tutorials/platform/transfer-avax-between-x-chain-and-c-chain',
                'build/tutorials/platform/transfer-avax-between-x-chain-and-p-chain',
                'build/tutorials/platform/transfer-avax-between-p-chain-and-c-chain',
                'build/tutorials/platform/adjusting-gas-price-during-high-network-activity',
                'build/tutorials/platform/sending-transactions-with-dynamic-fees-using-javascript',
              ],
            },
            {
              type: 'category',
              label: 'Nodes and Staking',
              items: [
                {
                  type: 'autogenerated',
                  dirName: 'build/tutorials/nodes-and-staking',
                },
                {
                  type: 'link',
                  label: 'Maintain an Avalanche Node', // The link label
                  href: 'https://youtu.be/o4Fww-sHoaQ', // The external URL
                },
                {
                  type: 'link',
                  label: 'Run an Avalanche Node and Become a Validator', // The link label
                  href: 'https://youtu.be/ZyQPeSSCbYU', // The external URL
                },
                {
                  type: 'link',
                  label: 'Run an Avalanche Node and Stake with the Avalanche Wallet', // The link label
                  href: 'https://youtu.be/ZyQPeSSCbYU', // The external URL
                },
              ],
            },
            {
              type: 'category',
              label: 'Smart Contract',
              items: [
                {
                  type: 'autogenerated',
                  dirName: 'build/tutorials/smart-contracts',
                },
              ],
            },
            {
              type: 'category',
              label: 'Smart Digital Assets',
              items: [
                {
                  type: 'autogenerated',
                  dirName: 'build/tutorials/smart-digital-assets',
                },
              ],
            },
            {
              type: 'category',
              label: 'Tutorials Contest',
              items: [
                'build/tutorials/tutorials-contest/README',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'AvalancheGo APIs',
          items: [
            {
              type: 'autogenerated',
              dirName: 'build/avalanchego-apis',
            },
          ],
        },
        {
          type: 'category',
          label: 'Tools',
          items: [
            'build/tools/README',
            'build/tools/public-api',
            'build/tools/postman-avalanche-collection',
            {
              type: 'category',
              label: 'AvalancheJS',
              items: [
                'build/tools/avalanchejs/README',
                'build/tools/avalanchejs/api',
                'build/tools/avalanchejs/create-an-asset-on-the-x-chain',
                'build/tools/avalanchejs/manage-x-chain-keys',
                'build/tools/avalanchejs/send-an-asset-on-the-x-chain',
              ],
            },
            {
              type: 'category',
              label: 'Wallet SDK',
              items: [
                {
                  type: 'autogenerated',
                  dirName: 'build/tools/avalanche-wallet-sdk',
                },
              ],
            },
            'build/tools/dashboards/README',
            'build/tools/network-runner',
            'build/tools/ava-sim',
            'build/tools/abigen',
            'build/tools/avash',
            'build/tools/deprecating-ortelius',
            'build/tools/ortelius',
          ],
        },
        {
          type: 'category',
          label: 'References',
          items: [
            {
              type: 'autogenerated',
              dirName: 'build/references',
            },
          ],
        },
        {
          type: 'link',
          label: 'Whitepapers', // The link label
          href: 'https://www.avalabs.org/whitepapers', // The external URL
        },
        {
          type: 'link',
          label: 'Audits', // The link label
          href: 'https://github.com/ava-labs/audits', // The external URL
        }
      ],
    },
  ],

};

module.exports = sidebars;
