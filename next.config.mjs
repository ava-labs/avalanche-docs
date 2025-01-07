import { createMDX } from 'fumadocs-mdx/next';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
 
const withMDX = createMDX({
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v],
    lastModifiedTime: 'git',
  },
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/reference/avalanchego/p-chain/txn-format',
        destination: '/api-reference/p-chain/txn-format',
        permanent: true,
      },
      {
        source: '/reference/avalanchego/c-chain/api',
        destination: '/api-reference/c-chain/api',
        permanent: true,
      },
      {
        source: '/reference/avalanchego/c-chain/txn-format',
        destination: '/api-reference/c-chain/txn-format',
        permanent: true,
      },
      {
        source: '/reference/avalanchego/x-chain/txn-format',
        destination: '/api-reference/x-chain/txn-format',
        permanent: true,
      },
      {
        source: '/reference/subnet-evm/api',
        destination: '/api-reference/subnet-evm-api',
        permanent: true,
      },
      {
        source: '/reference/standards/cryptographic-primitives',
        destination: '/api-reference/standards/cryptographic-primitives',
        permanent: true,
      },
      {
        source: '/reference/standards/serialization-primitives',
        destination: '/api-reference/standards/serialization-primitives',
        permanent: true,
      },
      {
        source: '/reference/standards/guides/banff-changes',
        destination: '/api-reference/standards/guides/banff-changes',
        permanent: true,
      },
      {
        source: '/reference/standards/guides/issuing-api-calls',
        destination: '/api-reference/standards/guides/issuing-api-calls',
        permanent: true,
      },
      {
        source: '/reference/standards/guides/txn-fees',
        destination: '/api-reference/standards/guides/txn-fees',
        permanent: true,
      },
      {
        source: '/reference/standards/guides/x-chain-migration',
        destination: '/api-reference/standards/guides/x-chain-migration',
        permanent: true,
      },
      {
        source: '/reference/standards/guides/blockchain-flow',
        destination: '/api-reference/standards/guides/blockchain-flow',
        permanent: true,
      },
      {
        source: '/reference/standards/avalanche-network-protocol',
        destination: '/api-reference/standards/avalanche-network-protocol',
        permanent: true,
      },
      {
        source: '/api-reference/standards/guides/transaction-fees',
        destination: '/api-reference/standards/guides/txn-fees',
        permanent: true,
      },
      {
        source: '/subnets/create-a-fuji-subnet',
        destination: '/subnets/deploy-a-subnet/fuji-testnet',
        permanent: true,
      },
      {
        source: '/build/subnet/upgrade/upgrade-subnet-vm',
        destination: '/subnets/upgrade/subnet-virtual-machine',
        permanent: true,
      },
      {
        source: '/build/subnet/upgrade/customize-a-subnet',
        destination: '/subnets/upgrade/customize-subnet',
        permanent: true,
      },
      {
        source: '/build/subnet/upgrade/upgrade-durango',
        destination: '/subnets/upgrade/durango-upgrade',
        permanent: true,
      },
      {
        source: '/build/subnet/upgrade/upgrade-precompile',
        destination: '/subnets/upgrade/subnet-precompile-config',
        permanent: true,
      },
      {
        source: '/build/subnet/upgrade/considerations-subnet-upgrade',
        destination: '/subnets/upgrade/considerations',
        permanent: true,
      },
      {
        source: '/build/subnet/elastic/transform-to-elastic-subnet',
        destination: '/subnets/elastic-subnets/make-subnet-permissionless',
        permanent: true,
      },
      {
        source: '/build/subnet/elastic/elastic-parameters',
        destination: '/subnets/elastic-subnets/parameters',
        permanent: true,
      },
      {
        source: '/build/subnet/deploy/mainnet-subnet',
        destination: '/subnets/deploy-a-subnet/avalanche-mainnet',
        permanent: true,
      },
      {
        source: '/build/subnet/deploy/local-subnet',
        destination: '/subnets/deploy-a-subnet/local-network',
        permanent: true,
      },
      {
        source: '/build/subnet/deploy/fuji-testnet-subnet',
        destination: '/subnets/deploy-a-subnet/fuji-testnet',
        permanent: true,
      },
      {
        source: '/build/subnet/deploy/multisig-auth',
        destination: '/subnets/deploy-a-subnet/multisig-auth',
        permanent: true,
      },
      {
        source: '/build/subnet/deploy/custom-vm-subnet',
        destination: '/subnets/deploy-a-subnet/custom-virtual-machine',
        permanent: true,
      },
      {
        source: '/build/subnet/deploy/on-prod-infra',
        destination: '/subnets/deploy-a-subnet/production-infrastructure',
        permanent: true,
      },
      {
        source: '/build/subnet/getting-started',
        destination: '/subnets/index',
        permanent: true,
      },
      {
        source: '/build/subnet/info/troubleshoot-subnet',
        destination: '/subnets/troubleshooting',
        permanent: true,
      },
      {
        source: '/build/subnet/info/wagmi',
        destination: '/subnets/wagmi-subnet',
        permanent: true,
      },
      {
        source: '/build/subnet/maintain/view-subnets',
        destination: '/subnets/maintain/view-subnets',
        permanent: true,
      },
      {
        source: '/build/subnet/maintain/how-to-transfer-funds',
        destination: '/subnets/maintain/transfer-pchain-funds',
        permanent: true,
      },
      {
        source: '/build/subnet/maintain/pause-resume-subnet',
        destination: '/subnets/maintain/pause-resume',
        permanent: true,
      },
      {
        source: '/build/subnet/maintain/delete-subnet',
        destination: '/subnets/maintain/delete-subnet',
        permanent: true,
      },
      {
        source: '/build/subnet/c-chain-vs-subnet',
        destination: '/subnets/c-chain-or-subnet',
        permanent: true,
      },
      {
        source: '/build/subnet/utility/cross-chain-evm-bridge',
        destination: '/subnets/add-utility/cross-chain-bridge',
        permanent: true,
      },
      {
        source: '/build/subnet/utility/avalanche-subnet-faucet',
        destination: '/subnets/add-utility/testnet-faucet',
        permanent: true,
      },
      {
        source: '/build/subnet/utility/deploy-smart-contract-to-subnet',
        destination: '/subnets/add-utility/deploy-smart-contract',
        permanent: true,
      },
      {
        source: '/build/subnet/hello-subnet',
        destination: '/subnets/build-first-subnet',
        permanent: true,
      },
      {
        source: '/subnets/create-custom-subnet',
        destination: '/subnets/deploy-a-subnet/custom-virtual-machine',
        permanent: true,
      },
      {
        source: '/build/vm/rust-vms/introduction-to-avalanche-rs',
        destination: '/virtual-machines/rust-vms/intro-avalanche-rs',
        permanent: true,
      },
      {
        source: '/build/vm/rust-vms/installing-vm',
        destination: '/virtual-machines/rust-vms/installing-vm',
        permanent: true,
      },
      {
        source: '/build/vm/rust-vms/setting-up-rust',
        destination: '/virtual-machines/rust-vms/setting-up-environment',
        permanent: true,
      },
      {
        source: '/build/vm/timestampvm/api',
        destination: '/virtual-machines/timestamp-vm/apis',
        permanent: true,
      },
      {
        source: '/build/vm/timestampvm/state',
        destination: '/virtual-machines/timestamp-vm/state',
        permanent: true,
      },
      {
        source: '/build/vm/timestampvm/block',
        destination: '/virtual-machines/timestamp-vm/blocks',
        permanent: true,
      },
      {
        source: '/build/vm/timestampvm/introduction',
        destination: '/virtual-machines/timestamp-vm/introduction',
        permanent: true,
      },
      {
        source: '/build/vm/timestampvm/vm',
        destination: '/virtual-machines/timestamp-vm/defining-vm-itself',
        permanent: true,
      },
      {
        source: '/build/vm/intro',
        destination: '/virtual-machines/index',
        permanent: true,
      },
      {
        source: '/build/vm/any-lang-vm',
        destination: '/virtual-machines/simple-vm-any-language',
        permanent: true,
      },
      {
        source: '/build/vm/evm/generate-precompile',
        destination: '/virtual-machines/evm-customization/generating-your-precompile',
        permanent: true,
      },
      {
        source: '/build/vm/evm/intro',
        destination: '/virtual-machines/evm-customization/introduction',
        permanent: true,
      },
      {
        source: '/build/vm/evm/executing-tests',
        destination: '/virtual-machines/evm-customization/executing-test-cases',
        permanent: true,
      },
      {
        source: '/build/vm/evm/background-and-reqs',
        destination: '/virtual-machines/evm-customization/background-requirements',
        permanent: true,
      },
      {
        source: '/build/vm/evm/defining-precompile',
        destination: '/virtual-machines/evm-customization/defining-precompile',
        permanent: true,
      },
      {
        source: '/build/vm/evm/defining-tests',
        destination: '/virtual-machines/evm-customization/writing-test-cases',
        permanent: true,
      },
      {
        source: '/build/vm/evm/deploying-precompile',
        destination: '/virtual-machines/evm-customization/deploying-precompile',
        permanent: true,
      },
      {
        source: '/build/vm/golang-vms/golang-vm-simple',
        destination: '/virtual-machines/golang-vms/simple-golang-vm',
        permanent: true,
      },
      {
        source: '/build/vm/golang-vms/golang-vm-complex',
        destination: '/virtual-machines/golang-vms/complex-golang-vm',
        permanent: true,
      },
      {
        source: '/build/dapp/advanced/adjusting-gas-price-during-high-network-activity',
        destination: '/dapps/advanced-tutorials/manually-adjust-gas-price',
        permanent: true,
      },
      {
        source: '/build/dapp/advanced/integrate-exchange',
        destination: '/dapps/advanced-tutorials/exchange-integration',
        permanent: true,
      },
      {
        source: '/build/dapp/advanced/sending-transactions-with-dynamic-fees-using-javascript',
        destination: '/dapps/advanced-tutorials/dynamic-gas-fees',
        permanent: true,
      },
      {
        source: '/build/dapp/advanced/add-avalanche-programmatically',
        destination: '/dapps/advanced-tutorials/add-network-programmatically',
        permanent: true,
      },
      {
        source: '/build/dapp/fuji-workflow',
        destination: '/dapps/end-to-end/fuji-workflow',
        permanent: true,
      },
      {
        source: '/build/dapp/launch-dapp',
        destination: '/dapps/end-to-end/launch-ethereum-dapp',
        permanent: true,
      },
      {
        source: '/build/dapp/c-chain-evm',
        destination: '/dapps/index',
        permanent: true,
      },
      {
        source: '/build/dapp/chain-settings',
        destination: '/dapps/chain-settings',
        permanent: true,
      },
      {
        source: '/build/dapp/smart-contracts/erc-20',
        destination: '/dapps/smart-contract-dev/erc-20-token',
        permanent: true,
      },
      {
        source: '/build/dapp/smart-contracts/remix-deploy',
        destination: '/dapps/smart-contract-dev/deploy-with-remix-ide',
        permanent: true,
      },
      {
        source: '/build/dapp/smart-contracts/abigen',
        destination: '/dapps/smart-contract-dev/interact-golang-app',
        permanent: true,
      },
      {
        source: '/build/dapp/smart-contracts/verification/verify-smart-contracts',
        destination: '/dapps/verify-contract/snowtrace',
        permanent: true,
      },
      {
        source: '/build/dapp/smart-contracts/verification/verify-hardhat',
        destination: '/dapps/verify-contract/hardhat',
        permanent: true,
      },
      {
        source: '/build/dapp/smart-contracts/get-funds-faucet',
        destination: '/dapps/smart-contract-dev/get-test-funds',
        permanent: true,
      },
      {
        source: '/build/dapp/smart-contracts/nfts/preparing-nft-files',
        destination: '/dapps/deploy-nft-collection/prep-nft-files',
        permanent: true,
      },
      {
        source: '/build/dapp/smart-contracts/nfts/deploy-collection',
        destination: '/dapps/deploy-nft-collection/deploy-erc-721',
        permanent: true,
      },
      {
        source: '/build/dapp/smart-contracts/toolchains/foundry',
        destination: '/dapps/toolchains/foundry',
        permanent: true,
      },
      {
        source: '/build/dapp/smart-contracts/toolchains/thirdweb',
        destination: '/dapps/toolchains/thirdweb',
        permanent: true,
      },
      {
        source: '/build/dapp/smart-contracts/toolchains/hardhat',
        destination: '/dapps/toolchains/hardhat',
        permanent: true,
      },
      {
        source: '/build/dapp/explorers',
        destination: '/dapps/block-explorers',
        permanent: true,
      },
      {
        source: '/learn/acp',
        destination: '/learn/avalanche-community-proposals',
        permanent: true,
      },
      {
        source: '/learn/avalanche/fuji',
        destination: '/learn/networks/fuji-testnet',
        permanent: true,
      },
      {
        source: '/learn/avalanche/mainnet',
        destination: '/learn/networks/mainnet',
        permanent: true,
      },
      {
        source: '/learn/avalanche/intro',
        destination: '/learn/index',
        permanent: true,
      },
      {
        source: '/learn/avalanche/subnets-overview',
        destination: '/learn/subnets',
        permanent: true,
      },
      {
        source: '/learn/avalanche/avax',
        destination: '/learn/avax-token',
        permanent: true,
      },
      {
        source: '/learn/avalanche/avalanche-platform',
        destination: '/learn/primary-network',
        permanent: true,
      },
      {
        source: '/nodes/validate/add-a-validator',
        destination: '/nodes/validate/node-validator',
        permanent: true,
      },
      {
        source: '/nodes/validate/validate-or-delegate',
        destination: '/nodes/validate/validate-vs-delegate',
        permanent: true,
      },
      {
        source: '/nodes/system-requirements',
        destination: '/nodes/index',
        permanent: true,
      },
      {
        source: '/nodes/configure/chain-configs/C',
        destination: '/nodes/chain-configs/c-chain',
        permanent: true,
      },
      {
        source: '/nodes/configure/chain-configs/chain-config-flags',
        destination: '/nodes/configure/configs-flags',
        permanent: true,
      },
      {
        source: '/nodes/configure/avalanchego-config-flags',
        destination: '/nodes/configure/configs-flags',
        permanent: true,
      },
      {
        source: '/nodes/maintain/avalanchego-config-flags',
        destination: '/nodes/configure/configs-flags',
        permanent: true,
      },
      {
        source: '/nodes/maintain/chain-config-flags',
        destination: '/api-reference/avalanche-go-configs-flags',
        permanent: true,
      },
      {
        source: '/nodes/maintain/node-backup-and-restore',
        destination: '/nodes/maintain/backup-restore',
        permanent: true,
      },
      {
        source: '/nodes/maintain/run-offline-pruning',
        destination: '/nodes/maintain/reduce-disk-usage',
        permanent: true,
      },
      {
        source: '/nodes/maintain/upgrade-your-avalanchego-node',
        destination: '/nodes/maintain/upgrade',
        permanent: true,
      },
      {
        source: '/nodes/maintain/avalanche-notify',
        destination: '/nodes/maintain/enroll-in-avalanche-notify',
        permanent: true,
      },
      {
        source: '/nodes/maintain/setting-up-node-monitoring',
        destination: '/nodes/maintain/monitoring',
        permanent: true,
      },
      {
        source: '/nodes/maintain/node-bootstrap',
        destination: '/nodes/maintain/bootstrapping',
        permanent: true,
      },
      {
        source: '/nodes/maintain/background-service-config',
        destination: '/nodes/maintain/run-as-background-service',
        permanent: true,
      },
      {
        source: '/nodes/run/node-manually',
        destination: '/nodes/run-a-node/manually',
        permanent: true,
      },
      {
        source: '/nodes/run/with-installer/installing-avalanchego',
        destination: '/nodes/using-install-script/installing-avalanche-go',
        permanent: true,
      },
      {
        source: '/nodes/run/with-installer/managing-avalanchego',
        destination: '/nodes/using-install-script/managing-avalanche-go',
        permanent: true,
      },
      {
        source: '/nodes/run/with-installer/advance-config-maintenance',
        destination: '/nodes/using-install-script/node-config-maintenance',
        permanent: true,
      },
      {
        source: '/nodes/run/with-installer/preparing-your-environment',
        destination: '/nodes/using-install-script/preparing-environment',
        permanent: true,
      },
      {
        source: '/nodes/run/FAQ',
        destination: '/nodes/run-a-node/common-errors',
        permanent: true,
      },
      {
        source: '/nodes/run/subnet-node',
        destination: '/nodes/run-a-node/subnet-nodes',
        permanent: true,
      },
      {
        source: '/nodes/run/third-party/tencent-cloud-node',
        destination: '/nodes/on-third-party-services/tencent',
        permanent: true,
      },
      {
        source: '/nodes/run/third-party/aws-marketplace-one-click',
        destination: '/nodes/on-third-party-services/aws-marketplace',
        permanent: true,
      },
      {
        source: '/nodes/run/third-party/alibaba-cloud-node',
        destination: '/nodes/on-third-party-services/alibaba',
        permanent: true,
      },
      {
        source: '/nodes/run/third-party/google-cloud-node',
        destination: '/nodes/on-third-party-services/google-cloud',
        permanent: true,
      },
      {
        source: '/nodes/run/third-party/aws-node',
        destination: '/nodes/on-third-party-services/amazon-web-services',
        permanent: true,
      },
      {
        source: '/nodes/run/third-party/latitude-node',
        destination: '/nodes/on-third-party-services/latitude',
        permanent: true,
      },
      {
        source: '/nodes/run/third-party/microsoft-azure-node',
        destination: '/nodes/on-third-party-services/microsoft-azure',
        permanent: true,
      },
      {
        source: '/tooling/transfer-p-chain-funds',
        destination: '/tooling/transactions/ledger-p-chain-transfer',
        permanent: true,
      },
      {
        source: '/tooling/avalanchego-postman-collection/data-visualization',
        destination: '/tooling/avalanche-postman/data-visualization',
        permanent: true,
      },
      {
        source: '/tooling/avalanchego-postman-collection/making-api-calls',
        destination: '/tooling/avalanche-postman/making-api-calls',
        permanent: true,
      },
      {
        source: '/tooling/avalanchego-postman-collection/setup',
        destination: '/tooling/avalanche-postman/add-postman-collection',
        permanent: true,
      },
      {
        source: '/tooling/avalanchego-postman-collection/variables',
        destination: '/tooling/avalanche-postman/variables',
        permanent: true,
      },
      {
        source: '/tooling/cli-cross-chain/teleporter-on-local-networks',
        destination: '/tooling/cross-chain/teleporter-local-network',
        permanent: true,
      },
      {
        source: '/tooling/cli-cross-chain/teleporter-token-bridge-on-local-networks',
        destination: '/tooling/cross-chain/teleporter-token-bridge',
        permanent: true,
      },
      {
        source: '/tooling/cli-cross-chain/teleporter-on-devnets',
        destination: '/tooling/cross-chain/teleporter-devnet',
        permanent: true,
      },
      {
        source: '/tooling/network-runner',
        destination: '/tooling/avalanche-network-runner/introduction',
        permanent: true,
      },
      {
        source: '/tooling/cli-create-nodes/create-a-validator-aws',
        destination: '/tooling/create-avalanche-nodes/run-validators-aws',
        permanent: true,
      },
      {
        source: '/tooling/cli-create-nodes/validate-primary-network',
        destination: '/tooling/create-avalanche-nodes/validate-primary-network',
        permanent: true,
      },
      {
        source: '/tooling/cli-create-nodes/run-loadtest',
        destination: '/tooling/create-avalanche-nodes/run-loadtest',
        permanent: true,
      },
      {
        source: '/tooling/cli-create-nodes/node-ssh',
        destination: '/tooling/create-avalanche-nodes/execute-ssh-commands',
        permanent: true,
      },
      {
        source: '/tooling/cli-create-nodes/validate-subnets',
        destination: '/tooling/create-avalanche-nodes/validate-subnet',
        permanent: true,
      },
      {
        source: '/tooling/cli-create-nodes/upload-a-custom-vm-to-cloud',
        destination: '/tooling/create-avalanche-nodes/deploy-custom-vm',
        permanent: true,
      },
      {
        source: '/tooling/cli-create-nodes/setup-a-devnet',
        destination: '/tooling/create-avalanche-nodes/setup-devnet',
        permanent: true,
      },
      {
        source: '/tooling/cli-create-nodes/stop-node',
        destination: '/tooling/create-avalanche-nodes/stop-node',
        permanent: true,
      },
      {
        source: '/tooling/cli-create-nodes/create-a-validator-gcp',
        destination: '/tooling/create-avalanche-nodes/run-validators-gcp',
        permanent: true,
      },
      {
        source: '/tooling/cli-guides/run-with-docker',
        destination: '/tooling/guides/run-with-docker',
        permanent: true,
      },
      {
        source: '/tooling/cli-guides/install-avalanche-cli',
        destination: '/tooling/guides/get-avalanche-cli',
        permanent: true,
      },
      {
        source: '/tooling/cli-guides/import-subnet',
        destination: '/tooling/guides/import-subnet',
        permanent: true,
      },
      {
        source: '/tooling/cli-transfer-funds/how-to-transfer-funds',
        destination: '/tooling/transfer-p-chain-funds',
        permanent: true,
      },
      {
        source: '/tooling/anr-reference',
        destination: '/tooling/avalanche-network-runner/anr-commands',
        permanent: true,
      },
      {
        source: '/tooling/avalanchejs-overview',
        destination: '/tooling/avalanche-js',
        permanent: true,
      },
      {
        source: '/tooling/metrics',
        destination: '/tooling/metrics-api',
        permanent: true,
      },
      {
        source: '/tooling/cli-create-deploy-subnets/deploy-fuji-testnet-subnet',
        destination: '/tooling/create-deploy-subnets/deploy-on-fuji-testnet',
        permanent: true,
      },
      {
        source: '/tooling/cli-create-deploy-subnets/create-subnet',
        destination: '/tooling/create-deploy-subnets/create-subnet',
        permanent: true,
      },
      {
        source: '/tooling/cli-create-deploy-subnets/view-subnets',
        destination: '/tooling/create-deploy-subnets/view-subnets',
        permanent: true,
      },
      {
        source: '/tooling/cli-create-deploy-subnets/deploy-mainnet-subnet',
        destination: '/tooling/create-deploy-subnets/deploy-on-mainnet',
        permanent: true,
      },
      {
        source: '/tooling/cli-create-deploy-subnets/deploy-local-subnet',
        destination: '/tooling/create-deploy-subnets/deploy-locally',
        permanent: true,
      },
      {
        source: '/tooling/glacier',
        destination: '/tooling/glacier-api',
        permanent: true,
      },
      {
        source: '/build/cross-chain/awm/overview',
        destination: '/cross-chain/avalanche-warp-messaging/overview',
        permanent: true,
      },
      {
        source: '/learn/subnets',
        destination: '/learn/avalanche-l1s',
        permanent: true,
      },
      {
        source: '/subnets/deploy-a-subnet/fuji-testnet',
        destination: '/avalanche-l1s/deploy-a-avalanche-l1/fuji-testnet',
        permanent: true,
      },
      {
        source: '/subnets/upgrade/subnet-virtual-machine',
        destination: '/avalanche-l1s/upgrade/avalanche-l1-virtual-machine',
        permanent: true,
      },
      {
        source: '/subnets/upgrade/customize-subnet',
        destination: '/avalanche-l1s/upgrade/customize-avalanche-l1',
        permanent: true,
      },
      {
        source: '/subnets/deploy-a-subnet/avalanche-mainnet',
        destination: '/avalanche-l1s/deploy-a-avalanche-l1/avalanche-mainnet',
        permanent: true,
      },
      {
        source: '/subnets/deploy-a-subnet/local-network',
        destination: '/avalanche-l1s/deploy-a-avalanche-l1/local-network',
        permanent: true,
      },
      {
        source: '/subnets/deploy-a-subnet/custom-virtual-machine',
        destination: '/avalanche-l1s/deploy-a-avalanche-l1/custom-virtual-machine',
        permanent: true,
      },
      {
        source: '/subnets',
        destination: '/avalanche-l1s',
        permanent: true,
      },
      {
        source: '/subnets/troubleshooting',
        destination: '/avalanche-l1s/troubleshooting',
        permanent: true,
      },
      {
        source: '/subnets/maintain/view-subnets',
        destination: '/avalanche-l1s/maintain/view-avalanche-l1s',
        permanent: true,
      },
      {
        source: '/subnets/maintain/pause-resume',
        destination: '/avalanche-l1s/maintain/pause-resume',
        permanent: true,
      },
      {
        source: '/subnets/maintain/delete-subnet',
        destination: '/avalanche-l1s/maintain/delete-avalanche-l1',
        permanent: true,
      },
      {
        source: '/subnets/c-chain-or-subnet',
        destination: '/avalanche-l1s/c-chain-or-avalanche-l1',
        permanent: true,
      },
      {
        source: '/subnets/add-utility/testnet-faucet',
        destination: '/avalanche-l1s/add-utility/testnet-faucet',
        permanent: true,
      },
      {
        source: '/subnets/build-first-subnet',
        destination: '/avalanche-l1s/build-first-avalanche-l1',
        permanent: true,
      },
      {
        source: '/nodes/run-a-node/subnet-nodes',
        destination: '/nodes/run-a-node/avalanche-l1-nodes',
        permanent: true,
      },
      {
        source: '/subnets/subnet-nodes',
        destination: '/avalanche-l1s/avalanche-l1-nodes',
        permanent: true,
      },
      {
        source: '/tooling/create-deploy-subnets/deploy-on-fuji-testnet',
        destination: '/tooling/create-deploy-avalanche-l1s/deploy-on-fuji-testnet',
        permanent: true,
      },
      {
        source: '/tooling/create-deploy-subnets/create-subnet',
        destination: '/tooling/create-deploy-avalanche-l1s/create-avalanche-l1',
        permanent: true,
      },
      {
        source: '/tooling/create-deploy-subnets/view-subnets',
        destination: '/tooling/create-deploy-avalanche-l1s/view-avalanche-l1s',
        permanent: true,
      },
      {
        source: '/tooling/create-deploy-subnets/deploy-on-mainnet',
        destination: '/tooling/create-deploy-avalanche-l1s/deploy-on-mainnet',
        permanent: true,
      },
      {
        source: '/tooling/create-deploy-subnets/deploy-locally',
        destination: '/tooling/create-deploy-avalanche-l1s/deploy-locally',
        permanent: true,
      },
      {
        source: '/tooling/guides/import-subnet',
        destination: '/tooling/guides/import-avalanche-l1',
        permanent: true,
      },
      {
        source: '/tooling/create-avalanche-nodes/validate-subnet',
        destination: '/tooling/create-avalanche-nodes/validate-avalanche-l1',
        permanent: true,
      },
      {
        source: '/tooling/create-avalanche-nodes/execute-ssh-commander',
        destination: '/tooling/create-avalanche-nodes/execute-ssh-commands',
        permanent: true,
      },
      {
        source: '/tooling/create-deploy-subnets',
        destination: '/tooling/create-deploy-avalanche-l1s',
        permanent: true,
      },
      {
        source: '/nodes/configure/subnet-configs',
        destination: '/nodes/configure/avalanche-l1-configs',
        permanent: true,
      },
      {
        source: '/api-reference/p-chain/transaction-format',
        destination: '/api-reference/p-chain/txn-format/',
        permanent: true,
      }, 
      {
        source: '/api-reference/c-chain/transaction-format',
        destination: '/api-reference/c-chain/txn-format',
        permanent: true,
      },
      {
        source: '/api-reference/x-chain/transaction-format',
        destination: '/api-reference/x-chain/txn-format',
        permanent: true,
      },
      {
        source: '/api-reference/standards/serialization',
        destination: '/api-reference/standards/serialization-primitives',
        permanent: true,
      },
      {
        source: '/api-reference/standards/cryptography',
        destination: '/api-reference/standards/cryptographic-primitives',
        permanent: true,
      },
      {
        source: '/api-reference/standards/guides/flow-single-blockchain',
        destination: '/api-reference/standards/guides/blockchain-flow',
        permanent: true,
      },
      {
        source: '/api-reference/standards/guides/api-calls',
        destination: '/api-reference/standards/guides/issuing-api-calls',
        permanent: true,
      },
      {
        source: '/api-reference/standards/network-protocol',
        destination: '/api-reference/standards/avalanche-network-protocol',
        permanent: true,
      },
      {
        source: '/dapps/smart-contract-dev/interact-golang-map',
        destination: '/dapps/smart-contract-dev/interact-golang-app',
        permanent: true,
      },
      {
        source: '/subnets/upgrade/considerations',
        destination: '/avalanche-l1s/upgrade/considerations',
        permanent: true,
      },
      {
        source: '/subnets/upgrade/durango-upgrade',
        destination: '/avalanche-l1s/upgrade/durango-upgrade',
        permanent: true,
      },
      {
        source: '/subnets/upgrade/subnet-precompfile-config',
        destination: '/avalanche-l1s/upgrade/avalanche-l1-precompile-config',
        permanent: true,
      },
      {
        source: '/subnets/avalanche-cli-subnets',
        destination: '/avalanche-l1s/deploy-a-avalanche-l1/local-network',
        permanent: true,
      },
      {
        source: '/subnets/deploy-a-subnet/production-infrastructure',
        destination: '/avalanche-l1s/deploy-a-avalanche-l1/production-infrastructure',
        permanent: true,
      },
      {
        source: '/subnets/deploy-a-subnet/multisig-auth',
        destination: '/avalanche-l1s/deploy-a-avalanche-l1/multisig-auth',
        permanent: true,
      },
      {
        source: '/subnets/maintain/transfer-pchain-funds',
        destination: '/avalanche-l1s/maintain/transfer-pchain-funds',
        permanent: true,
      },
      {
        source: '/subnets/add-utility/cross-chain-bridge',
        destination: '/avalanche-l1s/add-utility/cross-chain-bridge',
        permanent: true,
      },
      {
        source: '/subnets/add-utility/deploy-smart-contract',
        destination: '/avalanche-l1s/add-utility/deploy-smart-contract',
        permanent: true,
      },
      {
        source: '/subnets/wagmi-subnet',
        destination: '/avalanche-l1s/wagmi-avalanche-l1',
        permanent: true,
      },
      {
        source: '/learn/:path*',
        destination: '/quick-start/:path*',
        permanent: true,
      },
      // {
      //   source: '/avalanche-l1s/upgrade/customize-avalanche-l1',
      //   destination: '/evm-l1s/custom-precompiles/introduction',
      //   permanent: true,
      // },
      {
        source: '/virtual-machines/evm-customization/:path*',
        destination: '/evm-l1s/custom-precompiles/:path*',
        permanent: true,
      },
      {
        source: '/avalanche-l1s/c-chain-or-avalanche-l1',
        destination: '/dapps/c-chain-or-avalanche-l1',
        permanent: true,
      }
    ]
  },
};

export default withMDX(config);
