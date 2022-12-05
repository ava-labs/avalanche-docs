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

  overview: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsible: true,
      collapsed: false,
      items: [
        'overview/getting-started/intro',
        'overview/getting-started/avalanche-platform',
        'overview/getting-started/avalanche-consensus',
        {
          type: 'link',
          label: 'Whitepapers',
          href: 'https://www.avalabs.org/whitepapers',
        },
      ],
    },
    'overview/projects',
    {
      type: 'link',
      label: 'Audits',
      href: 'https://github.com/ava-labs/audits',
    },
    'disclaimer'
  ],

  quickStart: [
    'quickstart/README',
    'quickstart/create-a-local-test-network',
    'quickstart/fund-a-local-test-network',
    'quickstart/fuji-workflow',
    'quickstart/cross-chain-transfers',
    'quickstart/multisig-utxos-with-avalanchejs',
    'quickstart/transaction-fees',
    'quickstart/adjusting-gas-price-during-high-network-activity',
    'quickstart/sending-transactions-with-dynamic-fees-using-javascript',
    'quickstart/tools-list',
    'quickstart/integrate-exchange-with-avalanche',
    'quickstart/blockchain-flow',
  ],
  dapps: [
    'dapps/launch-your-ethereum-dapp',
    {
      type: 'category',
      label: 'Developer Toolchains',
      collapsed: false,
      items: [
        'dapps/developer-toolchains/README',
        'dapps/developer-toolchains/using-foundry-with-the-avalanche-c-chain',
        'dapps/developer-toolchains/using-hardhat-with-the-avalanche-c-chain',
        'dapps/developer-toolchains/using-truffle-with-the-avalanche-c-chain',
        'dapps/developer-toolchains/verify-smart-contract-using-hardhat-and-snowtrace',
        'dapps/developer-toolchains/verify-smart-contracts-with-truffle-verify',
      ],
    },
    {
      type: 'category',
      label: 'Non Fungible Tokens (NFTs)',
      collapsed: false,
      items: [
        'dapps/nfts/README',
        'dapps/nfts/intro-to-erc721s',
        'dapps/nfts/preparing-nft-files',
      ],
    },
    {
      type: 'category',
      label: 'Smart Contract',
      collapsed: false,
      items: [
        'dapps/smart-contracts/README',
        'dapps/smart-contracts/create-erc-20-token-on-avalanche-c-chain',
        'dapps/smart-contracts/deploy-a-smart-contract-on-avalanche-using-remix-and-metamask',
        'dapps/smart-contracts/verify-smart-contracts',
        'dapps/smart-contracts/add-avalanche-programmatically',
      ],
    },
  ],
  subnets: [
    'subnets/README',
    {
      type: 'category',
      label: 'Are Subnets Right For You?',
      collapsed: false,
      items: [
        'subnets/when-to-use-subnet-vs-c-chain',
        'subnets/subnet-development-lifecycle'
      ]
    },
    {
      type: 'category',
      label: 'Build Your First Subnet',
      collapsed: false,
      items: [
        'subnets/install-avalanche-cli',
        'subnets/build-first-subnet',
        'subnets/create-a-fuji-subnet',
        'subnets/deploy-a-smart-contract-on-your-evm',
        'subnets/create-a-evm-blockchain-on-subnet-with-avalanchejs',
        'subnets/create-a-fuji-subnet-subnet-cli'
      ],
    },
    {
      type: 'category',
      label: 'How to Use Avalanche-CLI',
      collapsed: false,
      items: [
        'subnets/create-evm-subnet-config',
        'subnets/create-a-local-subnet',
        'subnets/how-to-pause-and-resume-subnets',
        'subnets/how-to-list-and-describe',
        'subnets/how-to-delete-subnet',
        'subnets/how-to-run-cli-with-docker',
      ],
    },
    {
      type: 'category',
      label: 'Customize',
      collapsed: false,
      items: [
        'subnets/customize-a-subnet',
        'subnets/hello-world-precompile-tutorial',
        'subnets/introduction-to-vm',
        'subnets/create-a-vm-timestampvm',
        'subnets/create-a-vm-blobvm',
        'subnets/create-a-simple-rust-vm'
      ],
    },
    {
      type: 'category',
      label: 'Deploy',
      collapsed: false,
      items: [
        'subnets/deploying-subnets-on-prod',
        'subnets/setup-dfk-node'
      ],
    },
    {
      type: 'category',
      label: 'Upgrade',
      collapsed: false,
      items: [
        'subnets/subnet-upgrade',
        'subnets/case-study-wagmi-upgrade',
      ],
    },
    {
      type: 'category',
      label: 'Tools',
      collapsed: false,
      items: [
        'subnets/avalanche-subnet-faucet',
        'subnets/subnet-cli',
        'subnets/deploying-cross-chain-evm-bridge',
        'subnets/network-runner',
        'subnets/deploy-a-gnosis-safe-on-your-evm',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      collapsed: false,
      items: [
        'subnets/spaces',
        'subnets/wagmi',
      ],
    },
    {
      type: 'category',
      label: 'Technical Reference',
      collapsed: false,
      items: [
          'subnets/reference-cli-commands'
      ],
    },
    {
      type: 'link',
      label: 'Subnet FAQ',
      href: 'https://support.avax.network/en/articles/6158840-subnet-faq',
    },
  ],
  apis: [
    {
      type: 'category',
      label: 'AvalancheGo',
      items: [
        'apis/avalanchego/README',
        {
          type: 'category',
          label: 'APIs',
          collapsed: false,
          items: [
            {
              type: 'autogenerated',
              dirName: 'apis/avalanchego/apis',
            },
          ],
        },
        'apis/avalanchego/public-api-server',
        'apis/avalanchego/postman-avalanche-collection',
        'apis/avalanchego/avalanchego-release-notes',
        'apis/avalanchego/cb58-deprecation'
      ],
    },
    {
      type: 'category',
      label: 'AvalancheJS',
      collapsed: false,
      items: [
        'apis/avalanchejs/README',
        'apis/avalanchejs/api',
        'apis/avalanchejs/create-an-asset-on-the-x-chain',
        'apis/avalanchejs/manage-x-chain-keys',
        'apis/avalanchejs/send-an-asset-on-the-x-chain',
        'apis/avalanchejs/generate-a-txid-using-avalanchejs',
      ],
    },
    'apis/metrics'
  ],
  nodes: [
    'nodes/README',
    {
      type: 'category',
      label: 'Build',
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'nodes/build',
        },
      ],
    },
    {
      type: 'category',
      label: 'Maintain',
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'nodes/maintain',
        }
      ],
    },
    {
      type: 'category',
      label: 'Validate',
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'nodes/validate',
        },
      ],
    },
  ],

  specs: [
    'specs/avm-transaction-serialization',
    'specs/coreth-atomic-transaction-serialization',
    'specs/cryptographic-primitives',
    'specs/network-protocol',
    'specs/serialization-primitives',
    'specs/platform-transaction-serialization',
    'specs/abigen',
    'specs/banff-changes'
  ],


  community: [
    'community/README',
    'community/bug-bounty',
    {
      type: 'link',
      label: 'Product Support',
      href: 'https://support.avax.network/en/',
    },
    {
      type: 'category',
      label: 'Tutorials Contest',
      collapsed: false,
      items: [
        'community/tutorials-contest/README',
        'community/tutorials-contest/2022',
        'community/tutorials-contest/2021'
      ]
    },
  ],
};

module.exports = sidebars;
