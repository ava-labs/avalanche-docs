import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "tooling/glacier-api/glacier-api",
    },
    {
      type: "category",
      label: "EVM Chains",
      link: {
        type: "doc",
        id: "tooling/glacier-api/evm-chains",
      },
      items: [
        {
          type: "doc",
          id: "tooling/glacier-api/supported-chains",
          label: "List chains",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/get-chain-info",
          label: "Get chain information",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "EVM Blocks",
      link: {
        type: "doc",
        id: "tooling/glacier-api/evm-blocks",
      },
      items: [
        {
          type: "doc",
          id: "tooling/glacier-api/get-latest-blocks",
          label: "List latest blocks",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/get-block",
          label: "Get block",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "EVM Transactions",
      link: {
        type: "doc",
        id: "tooling/glacier-api/evm-transactions",
      },
      items: [
        {
          type: "doc",
          id: "tooling/glacier-api/get-deployment-transaction",
          label: "Get deployment transaction",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-contract-deployments",
          label: "List deployed contracts",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-transfers",
          label: "List ERC transfers",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-transactions",
          label: "List transactions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-native-transactions",
          label: "List native transactions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-erc-20-transactions",
          label: "List ERC-20 transfers",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-erc-721-transactions",
          label: "List ERC-721 transfers",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-erc-1155-transactions",
          label: "List ERC-1155 transfers",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-internal-transactions",
          label: "List internal transactions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/get-transaction",
          label: "Get transaction",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/get-transactions-for-block",
          label: "List transactions for a block",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-latest-transactions",
          label: "List latest transactions",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "EVM Balances",
      link: {
        type: "doc",
        id: "tooling/glacier-api/evm-balances",
      },
      items: [
        {
          type: "doc",
          id: "tooling/glacier-api/get-native-balance",
          label: "Get native token balance",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-erc-20-balances",
          label: "List ERC-20 balances",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-erc-721-balances",
          label: "List ERC-721 balances",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-erc-1155-balances",
          label: "List ERC-1155 balances",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-collectible-balances",
          label: "List collectible (ERC-721/ERC-1155) balances",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "EVM Contracts",
      link: {
        type: "doc",
        id: "tooling/glacier-api/evm-contracts",
      },
      items: [
        {
          type: "doc",
          id: "tooling/glacier-api/get-contract-metadata",
          label: "Get contract metadata",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Primary Network",
      link: {
        type: "doc",
        id: "tooling/glacier-api/primary-network",
      },
      items: [
        {
          type: "doc",
          id: "tooling/glacier-api/get-asset-details",
          label: "Get asset details",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/get-chain-ids-for-addresses",
          label: "Get chain interactions for addresses",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/get-network-details",
          label: "Get network details",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-blockchains",
          label: "List blockchains",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-subnets",
          label: "List subnets",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-validators",
          label: "List validators",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/get-single-validator-details",
          label: "Get single validator details",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-delegators",
          label: "List delegators",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Primary Network Blocks",
      link: {
        type: "doc",
        id: "tooling/glacier-api/primary-network-blocks",
      },
      items: [
        {
          type: "doc",
          id: "tooling/glacier-api/get-block-by-id",
          label: "Get block",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-primary-network-blocks-by-node-id",
          label: "List blocks proposed by node",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-latest-primary-network-blocks",
          label: "List latest blocks",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Primary Network Vertices",
      link: {
        type: "doc",
        id: "tooling/glacier-api/primary-network-vertices",
      },
      items: [
        {
          type: "doc",
          id: "tooling/glacier-api/list-latest-x-chain-vertices",
          label: "List vertices",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/get-vertex-by-hash",
          label: "Get vertex",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/get-vertex-by-height",
          label: "List vertices by height",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Primary Network Transactions",
      link: {
        type: "doc",
        id: "tooling/glacier-api/primary-network-transactions",
      },
      items: [
        {
          type: "doc",
          id: "tooling/glacier-api/get-tx-by-hash",
          label: "Get transaction",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-latest-primary-network-transactions",
          label: "List latest transactions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-active-primary-network-staking-transactions",
          label: "List staking transactions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-asset-transactions",
          label: "List asset transactions",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Primary Network Balances",
      link: {
        type: "doc",
        id: "tooling/glacier-api/primary-network-balances",
      },
      items: [
        {
          type: "doc",
          id: "tooling/glacier-api/get-balances-by-addresses",
          label: "Get balances",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Primary Network UTXOs",
      link: {
        type: "doc",
        id: "tooling/glacier-api/primary-network-utx-os",
      },
      items: [
        {
          type: "doc",
          id: "tooling/glacier-api/get-utxos-by-addresses",
          label: "List UTXOs",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Primary Network Rewards",
      link: {
        type: "doc",
        id: "tooling/glacier-api/primary-network-rewards",
      },
      items: [
        {
          type: "doc",
          id: "tooling/glacier-api/list-pending-primary-network-rewards",
          label: "List pending rewards",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-historical-primary-network-rewards",
          label: "List historical rewards",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "NFTs",
      link: {
        type: "doc",
        id: "tooling/glacier-api/nf-ts",
      },
      items: [
        {
          type: "doc",
          id: "tooling/glacier-api/reindex-nft",
          label: "Reindex NFT metadata",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-tokens",
          label: "List tokens",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/get-token-details",
          label: "Get token details",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Operations",
      link: {
        type: "doc",
        id: "tooling/glacier-api/operations",
      },
      items: [
        {
          type: "doc",
          id: "tooling/glacier-api/get-operation-result",
          label: "Get operation",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/post-transaction-export-job",
          label: "Create transaction export operation",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Health Check",
      link: {
        type: "doc",
        id: "tooling/glacier-api/health-check",
      },
      items: [
        {
          type: "doc",
          id: "tooling/glacier-api/health-check",
          label: "Get the health of the service",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Teleporter",
      link: {
        type: "doc",
        id: "tooling/glacier-api/teleporter",
      },
      items: [
        {
          type: "doc",
          id: "tooling/glacier-api/get-teleporter-message",
          label: "Get a teleporter message",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-teleporter-messages",
          label: "List teleporter messages",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Webhooks",
      link: {
        type: "doc",
        id: "tooling/glacier-api/webhooks",
      },
      items: [
        {
          type: "doc",
          id: "tooling/glacier-api/register-webhook",
          label: "Register a webhook",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/list-webhooks",
          label: "List webhooks",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/get-webhook",
          label: "Get a webhook by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/deactivate-webhook",
          label: "Deactivate a webhook",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/update-webhook",
          label: "Update a webhook",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/generate-shared-secret",
          label: "Generate a shared secret",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "tooling/glacier-api/get-shared-secret",
          label: "Get a shared secret",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
