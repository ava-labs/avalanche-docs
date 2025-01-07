import { permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';

type RedirectMap = {
  [key: string]: string;
};

const staticRedirects: RedirectMap = {
  '/reference/avalanchego/p-chain/txn-format': '/api-reference/p-chain/txn-format',
  '/reference/avalanchego/c-chain/api': '/api-reference/c-chain/api',
  '/reference/avalanchego/c-chain/txn-format': '/api-reference/c-chain/txn-format',
  '/reference/avalanchego/x-chain/txn-format': '/api-reference/x-chain/txn-format',
  '/reference/subnet-evm/api': '/api-reference/subnet-evm-api',
  '/reference/standards/cryptographic-primitives': '/api-reference/standards/cryptographic-primitives',
  '/reference/standards/serialization-primitives': '/api-reference/standards/serialization-primitives',
  '/reference/standards/guides/banff-changes': '/api-reference/standards/guides/banff-changes',
  '/reference/standards/guides/issuing-api-calls': '/api-reference/standards/guides/issuing-api-calls',
  '/reference/standards/guides/txn-fees': '/api-reference/standards/guides/txn-fees',
  '/reference/standards/guides/x-chain-migration': '/api-reference/standards/guides/x-chain-migration',
  '/reference/standards/guides/blockchain-flow': '/api-reference/standards/guides/blockchain-flow',
  '/reference/standards/avalanche-network-protocol': '/api-reference/standards/avalanche-network-protocol',
  '/api-reference/standards/guides/transaction-fees': '/api-reference/standards/guides/txn-fees',
  '/subnets/create-a-fuji-subnet': '/subnets/deploy-a-subnet/fuji-testnet',
  '/build/subnet/upgrade/upgrade-subnet-vm': '/subnets/upgrade/subnet-virtual-machine',
  '/build/subnet/upgrade/customize-a-subnet': '/subnets/upgrade/customize-subnet',
  '/build/subnet/upgrade/upgrade-durango': '/subnets/upgrade/durango-upgrade',
  '/build/subnet/upgrade/upgrade-precompile': '/subnets/upgrade/subnet-precompile-config',
  '/build/subnet/upgrade/considerations-subnet-upgrade': '/subnets/upgrade/considerations',
  '/build/subnet/elastic/transform-to-elastic-subnet': '/subnets/elastic-subnets/make-subnet-permissionless',
  '/build/subnet/elastic/elastic-parameters': '/subnets/elastic-subnets/parameters',
  '/build/subnet/deploy/mainnet-subnet': '/subnets/deploy-a-subnet/avalanche-mainnet',
  '/build/subnet/deploy/local-subnet': '/subnets/deploy-a-subnet/local-network',
  '/build/subnet/deploy/fuji-testnet-subnet': '/subnets/deploy-a-subnet/fuji-testnet',
  '/build/subnet/deploy/multisig-auth': '/subnets/deploy-a-subnet/multisig-auth',
  '/build/subnet/deploy/custom-vm-subnet': '/subnets/deploy-a-subnet/custom-virtual-machine',
  '/build/subnet/deploy/on-prod-infra': '/subnets/deploy-a-subnet/production-infrastructure',
  '/build/subnet/getting-started': '/subnets/index',
  '/build/subnet/info/troubleshoot-subnet': '/subnets/troubleshooting',
  '/build/subnet/info/wagmi': '/subnets/wagmi-subnet',
  '/build/subnet/maintain/view-subnets': '/subnets/maintain/view-subnets',
  '/build/subnet/maintain/how-to-transfer-funds': '/subnets/maintain/transfer-pchain-funds',
  '/build/subnet/maintain/pause-resume-subnet': '/subnets/maintain/pause-resume',
  '/build/subnet/maintain/delete-subnet': '/subnets/maintain/delete-subnet',
  '/build/subnet/c-chain-vs-subnet': '/subnets/c-chain-or-subnet',
  '/build/subnet/utility/cross-chain-evm-bridge': '/subnets/add-utility/cross-chain-bridge',
  '/build/subnet/utility/avalanche-subnet-faucet': '/subnets/add-utility/testnet-faucet',
  '/build/subnet/utility/deploy-smart-contract-to-subnet': '/subnets/add-utility/deploy-smart-contract',
  '/build/subnet/hello-subnet': '/subnets/build-first-subnet',
  '/subnets/create-custom-subnet': '/subnets/deploy-a-subnet/custom-virtual-machine',
  '/build/vm/rust-vms/introduction-to-avalanche-rs': '/virtual-machines/rust-vms/intro-avalanche-rs',
  '/build/vm/rust-vms/installing-vm': '/virtual-machines/rust-vms/installing-vm',
  '/build/vm/rust-vms/setting-up-rust': '/virtual-machines/rust-vms/setting-up-environment',
  '/build/vm/timestampvm/api': '/virtual-machines/timestamp-vm/apis',
  '/build/vm/timestampvm/state': '/virtual-machines/timestamp-vm/state',
  '/build/vm/timestampvm/block': '/virtual-machines/timestamp-vm/blocks',
  '/build/vm/timestampvm/introduction': '/virtual-machines/timestamp-vm/introduction',
  '/build/vm/timestampvm/vm': '/virtual-machines/timestamp-vm/defining-vm-itself',
  '/build/vm/intro': '/virtual-machines/index',
  '/build/vm/any-lang-vm': '/virtual-machines/simple-vm-any-language',
  '/build/vm/evm/generate-precompile': '/virtual-machines/evm-customization/generating-your-precompile',
  '/build/vm/evm/intro': '/virtual-machines/evm-customization/introduction',
  '/build/vm/evm/executing-tests': '/virtual-machines/evm-customization/executing-test-cases',
  '/build/vm/evm/background-and-reqs': '/virtual-machines/evm-customization/background-requirements',
  '/build/vm/evm/defining-precompile': '/virtual-machines/evm-customization/defining-precompile',
  '/build/vm/evm/defining-tests': '/virtual-machines/evm-customization/writing-test-cases',
  '/build/vm/evm/deploying-precompile': '/virtual-machines/evm-customization/deploying-precompile',
  '/build/vm/golang-vms/golang-vm-simple': '/virtual-machines/golang-vms/simple-golang-vm',
  '/build/vm/golang-vms/golang-vm-complex': '/virtual-machines/golang-vms/complex-golang-vm',
  '/build/dapp/advanced/adjusting-gas-price-during-high-network-activity': '/dapps/advanced-tutorials/manually-adjust-gas-price',
  '/build/dapp/advanced/integrate-exchange': '/dapps/advanced-tutorials/exchange-integration',
  '/build/dapp/advanced/sending-transactions-with-dynamic-fees-using-javascript': '/dapps/advanced-tutorials/dynamic-gas-fees',
  '/build/dapp/advanced/add-avalanche-programmatically': '/dapps/advanced-tutorials/add-network-programmatically',
  '/build/dapp/fuji-workflow': '/dapps/end-to-end/fuji-workflow',
  '/build/dapp/launch-dapp': '/dapps/end-to-end/launch-ethereum-dapp',
  '/build/dapp/c-chain-evm': '/dapps/index',
  '/build/dapp/chain-settings': '/dapps/chain-settings',
  '/build/dapp/smart-contracts/erc-20': '/dapps/smart-contract-dev/erc-20-token',
  '/build/dapp/smart-contracts/remix-deploy': '/dapps/smart-contract-dev/deploy-with-remix-ide',
  '/build/dapp/smart-contracts/abigen': '/dapps/smart-contract-dev/interact-golang-app',
  '/build/dapp/smart-contracts/verification/verify-smart-contracts': '/dapps/verify-contract/snowtrace',
  '/build/dapp/smart-contracts/verification/verify-hardhat': '/dapps/verify-contract/hardhat',
  '/build/dapp/smart-contracts/get-funds-faucet': '/dapps/smart-contract-dev/get-test-funds',
  '/build/dapp/smart-contracts/nfts/preparing-nft-files': '/dapps/deploy-nft-collection/prep-nft-files',
  '/build/dapp/smart-contracts/nfts/deploy-collection': '/dapps/deploy-nft-collection/deploy-erc-721',
  '/build/dapp/smart-contracts/toolchains/foundry': '/dapps/toolchains/foundry',
  '/build/dapp/smart-contracts/toolchains/thirdweb': '/dapps/toolchains/thirdweb',
  '/build/dapp/smart-contracts/toolchains/hardhat': '/dapps/toolchains/hardhat',
  '/build/dapp/explorers': '/dapps/block-explorers',
  '/learn/acp': '/learn/avalanche-community-proposals',
  '/learn/avalanche/fuji': '/learn/networks/fuji-testnet',
  '/learn/avalanche/mainnet': '/learn/networks/mainnet',
  '/learn/avalanche/intro': '/learn/index',
  '/learn/avalanche/subnets-overview': '/learn/subnets',
  '/learn/avalanche/avax': '/learn/avax-token',
  '/learn/avalanche/avalanche-platform': '/learn/primary-network',
  '/nodes/validate/add-a-validator': '/nodes/validate/node-validator',
  '/nodes/validate/validate-or-delegate': '/nodes/validate/validate-vs-delegate',
  '/nodes/system-requirements': '/nodes/index',
  '/nodes/configure/chain-configs/C': '/nodes/chain-configs/c-chain',
  '/nodes/configure/chain-configs/chain-config-flags': '/nodes/configure/configs-flags',
  '/nodes/configure/avalanchego-config-flags': '/nodes/configure/configs-flags',
  '/nodes/maintain/avalanchego-config-flags': '/nodes/configure/configs-flags',
  '/nodes/maintain/chain-config-flags': '/api-reference/avalanche-go-configs-flags',
  '/nodes/maintain/node-backup-and-restore': '/nodes/maintain/backup-restore',
  '/nodes/maintain/run-offline-pruning': '/nodes/maintain/reduce-disk-usage',
  '/nodes/maintain/upgrade-your-avalanchego-node': '/nodes/maintain/upgrade',
  '/nodes/maintain/avalanche-notify': '/nodes/maintain/enroll-in-avalanche-notify',
  '/nodes/maintain/setting-up-node-monitoring': '/nodes/maintain/monitoring',
  '/nodes/maintain/node-bootstrap': '/nodes/maintain/bootstrapping',
  '/nodes/maintain/background-service-config': '/nodes/maintain/run-as-background-service',
  '/nodes/run/node-manually': '/nodes/run-a-node/manually',
  '/nodes/run/with-installer/installing-avalanchego': '/nodes/using-install-script/installing-avalanche-go',
  '/nodes/run/with-installer/managing-avalanchego': '/nodes/using-install-script/managing-avalanche-go',
  '/nodes/run/with-installer/advance-config-maintenance': '/nodes/using-install-script/node-config-maintenance',
  '/nodes/run/with-installer/preparing-your-environment': '/nodes/using-install-script/preparing-environment',
  '/nodes/run/FAQ': '/nodes/run-a-node/common-errors',
  '/nodes/run/subnet-node': '/nodes/run-a-node/subnet-nodes',
  '/nodes/run/third-party/tencent-cloud-node': '/nodes/on-third-party-services/tencent',
  '/nodes/run/third-party/aws-marketplace-one-click': '/nodes/on-third-party-services/aws-marketplace',
  '/nodes/run/third-party/alibaba-cloud-node': '/nodes/on-third-party-services/alibaba',
  '/nodes/run/third-party/google-cloud-node': '/nodes/on-third-party-services/google-cloud',
  '/nodes/run/third-party/aws-node': '/nodes/on-third-party-services/amazon-web-services',
  '/nodes/run/third-party/latitude-node': '/nodes/on-third-party-services/latitude',
  '/nodes/run/third-party/microsoft-azure-node': '/nodes/on-third-party-services/microsoft-azure',
  '/tooling/transfer-p-chain-funds': '/tooling/transactions/ledger-p-chain-transfer',
  '/tooling/avalanchego-postman-collection/data-visualization': '/tooling/avalanche-postman/data-visualization',
  '/tooling/avalanchego-postman-collection/making-api-calls': '/tooling/avalanche-postman/making-api-calls',
  '/tooling/avalanchego-postman-collection/setup': '/tooling/avalanche-postman/add-postman-collection',
  '/tooling/avalanchego-postman-collection/variables': '/tooling/avalanche-postman/variables',
  '/tooling/cli-cross-chain/teleporter-on-local-networks': '/tooling/cross-chain/teleporter-local-network',
  '/tooling/cli-cross-chain/teleporter-token-bridge-on-local-networks': '/tooling/cross-chain/teleporter-token-bridge',
  '/tooling/cli-cross-chain/teleporter-on-devnets': '/tooling/cross-chain/teleporter-devnet',
  '/tooling/network-runner': '/tooling/avalanche-network-runner/introduction',
  '/tooling/cli-create-nodes/create-a-validator-aws': '/tooling/create-avalanche-nodes/run-validators-aws',
  '/tooling/cli-create-nodes/validate-primary-network': '/tooling/create-avalanche-nodes/validate-primary-network',
  '/tooling/cli-create-nodes/run-loadtest': '/tooling/create-avalanche-nodes/run-loadtest',
  '/tooling/cli-create-nodes/node-ssh': '/tooling/create-avalanche-nodes/execute-ssh-commands',
  '/tooling/cli-create-nodes/validate-subnets': '/tooling/create-avalanche-nodes/validate-subnet',
  '/tooling/cli-create-nodes/upload-a-custom-vm-to-cloud': '/tooling/create-avalanche-nodes/deploy-custom-vm',
  '/tooling/cli-create-nodes/setup-a-devnet': '/tooling/create-avalanche-nodes/setup-devnet',
  '/tooling/cli-create-nodes/stop-node': '/tooling/create-avalanche-nodes/stop-node',
  '/tooling/cli-create-nodes/create-a-validator-gcp': '/tooling/create-avalanche-nodes/run-validators-gcp',
  '/tooling/cli-guides/run-with-docker': '/tooling/guides/run-with-docker',
  '/tooling/cli-guides/install-avalanche-cli': '/tooling/guides/get-avalanche-cli',
  '/tooling/cli-guides/import-subnet': '/tooling/guides/import-subnet',
  '/tooling/cli-transfer-funds/how-to-transfer-funds': '/tooling/transfer-p-chain-funds',
  '/tooling/anr-reference': '/tooling/avalanche-network-runner/anr-commands',
  '/tooling/avalanchejs-overview': '/tooling/avalanche-js',
  '/tooling/metrics': '/tooling/metrics-api',
  '/tooling/cli-create-deploy-subnets/deploy-fuji-testnet-subnet': '/tooling/create-deploy-subnets/deploy-on-fuji-testnet',
  '/tooling/cli-create-deploy-subnets/create-subnet': '/tooling/create-deploy-subnets/create-subnet',
  '/tooling/cli-create-deploy-subnets/view-subnets': '/tooling/create-deploy-subnets/view-subnets',
  '/tooling/cli-create-deploy-subnets/deploy-mainnet-subnet': '/tooling/create-deploy-subnets/deploy-on-mainnet',
  '/tooling/cli-create-deploy-subnets/deploy-local-subnet': '/tooling/create-deploy-subnets/deploy-locally',
  '/tooling/glacier': '/tooling/glacier-api',
  '/build/cross-chain/awm/overview': '/cross-chain/avalanche-warp-messaging/overview',
  '/learn/subnets': '/learn/avalanche-l1s',
  '/subnets/deploy-a-subnet/fuji-testnet': '/avalanche-l1s/deploy-a-avalanche-l1/fuji-testnet',
  '/subnets/upgrade/subnet-virtual-machine': '/avalanche-l1s/upgrade/avalanche-l1-virtual-machine',
  '/subnets/upgrade/customize-subnet': '/avalanche-l1s/upgrade/customize-avalanche-l1',
  '/subnets/deploy-a-subnet/avalanche-mainnet': '/avalanche-l1s/deploy-a-avalanche-l1/avalanche-mainnet',
  '/subnets/deploy-a-subnet/local-network': '/avalanche-l1s/deploy-a-avalanche-l1/local-network',
  '/subnets/deploy-a-subnet/custom-virtual-machine': '/avalanche-l1s/deploy-a-avalanche-l1/custom-virtual-machine',
  '/subnets': '/avalanche-l1s',
  '/subnets/troubleshooting': '/avalanche-l1s/troubleshooting',
  '/subnets/maintain/view-subnets': '/avalanche-l1s/maintain/view-avalanche-l1s',
  '/subnets/maintain/pause-resume': '/avalanche-l1s/maintain/pause-resume',
  '/subnets/maintain/delete-subnet': '/avalanche-l1s/maintain/delete-avalanche-l1',
  '/subnets/c-chain-or-subnet': '/avalanche-l1s/c-chain-or-avalanche-l1',
  '/subnets/add-utility/testnet-faucet': '/avalanche-l1s/add-utility/testnet-faucet',
  '/subnets/build-first-subnet': '/avalanche-l1s/build-first-avalanche-l1',
  '/nodes/run-a-node/subnet-nodes': '/nodes/run-a-node/avalanche-l1-nodes',
  '/subnets/subnet-nodes': '/avalanche-l1s/avalanche-l1-nodes',
  '/tooling/create-deploy-subnets/deploy-on-fuji-testnet': '/tooling/create-deploy-avalanche-l1s/deploy-on-fuji-testnet',
  '/tooling/create-deploy-subnets/create-subnet': '/tooling/create-deploy-avalanche-l1s/create-avalanche-l1',
  '/tooling/create-deploy-subnets/view-subnets': '/tooling/create-deploy-avalanche-l1s/view-avalanche-l1s',
  '/tooling/create-deploy-subnets/deploy-on-mainnet': '/tooling/create-deploy-avalanche-l1s/deploy-on-mainnet',
  '/tooling/create-deploy-subnets/deploy-locally': '/tooling/create-deploy-avalanche-l1s/deploy-locally',
  '/tooling/guides/import-subnet': '/tooling/guides/import-avalanche-l1',
  '/tooling/create-avalanche-nodes/validate-subnet': '/tooling/create-avalanche-nodes/validate-avalanche-l1',
  '/tooling/create-avalanche-nodes/execute-ssh-commander': '/tooling/create-avalanche-nodes/execute-ssh-commands',
  '/tooling/create-deploy-subnets': '/tooling/create-deploy-avalanche-l1s',
  '/nodes/configure/subnet-configs': '/nodes/configure/avalanche-l1-configs',
  '/api-reference/p-chain/transaction-format': '/api-reference/p-chain/txn-format/',
  '/api-reference/c-chain/transaction-format': '/api-reference/c-chain/txn-format',
  '/api-reference/x-chain/transaction-format': '/api-reference/x-chain/txn-format',
  '/api-reference/standards/serialization': '/api-reference/standards/serialization-primitives',
  '/api-reference/standards/cryptography': '/api-reference/standards/cryptographic-primitives',
  '/api-reference/standards/guides/flow-single-blockchain': '/api-reference/standards/guides/blockchain-flow',
  '/api-reference/standards/guides/api-calls': '/api-reference/standards/guides/issuing-api-calls',
  '/api-reference/standards/network-protocol': '/api-reference/standards/avalanche-network-protocol',
  '/dapps/smart-contract-dev/interact-golang-map': '/dapps/smart-contract-dev/interact-golang-app',
  '/subnets/upgrade/considerations': '/avalanche-l1s/upgrade/considerations',
  '/subnets/upgrade/durango-upgrade': '/avalanche-l1s/upgrade/durango-upgrade',
  '/subnets/upgrade/subnet-precompfile-config': '/avalanche-l1s/upgrade/avalanche-l1-precompile-config',
  '/subnets/avalanche-cli-subnets': '/avalanche-l1s/deploy-a-avalanche-l1/local-network',
  '/subnets/deploy-a-subnet/production-infrastructure': '/avalanche-l1s/deploy-a-avalanche-l1/production-infrastructure',
  '/subnets/deploy-a-subnet/multisig-auth': '/avalanche-l1s/deploy-a-avalanche-l1/multisig-auth',
  '/subnets/maintain/transfer-pchain-funds': '/avalanche-l1s/maintain/transfer-pchain-funds',
  '/subnets/add-utility/cross-chain-bridge': '/avalanche-l1s/add-utility/cross-chain-bridge',
  '/subnets/add-utility/deploy-smart-contract': '/avalanche-l1s/add-utility/deploy-smart-contract',
  '/subnets/wagmi-subnet': '/avalanche-l1s/wagmi-avalanche-l1',
  '/avalanche-l1s/upgrade/customize-avalanche-l1': '/evm-l1s/custom-precompiles/introduction',
  '/avalanche-l1s/c-chain-or-avalanche-l1': '/dapps/c-chain-or-avalanche-l1',
};

const wildcardRedirects = [
  {
    source: '/learn/',
    destination: '/quick-start/',
    pattern: /^\/learn\/(.*)/
  },
  {
    source: '/protocol/',
    destination: '/quick-start/',
    pattern: /^\/protocol\/(.*)/
  },
  {
    source: '/virtual-machines/evm-customization/',
    destination: '/evm-l1s/custom-precompiles/',
    pattern: /^\/virtual-machines\/evm-customization\/(.*)/
  }
];

function getDestinationUrl(currentPath: string): string {
  if (currentPath in staticRedirects) {
    return `https://developers.avax.network/docs${staticRedirects[currentPath]}`;
  }
  
  for (const { pattern, destination } of wildcardRedirects) {
    const match = currentPath.match(pattern);
    if (match) {
      const wildCardPart = match[1];
      return `https://developers.avax.network/docs${destination}${wildCardPart}`;
    }
  }
  
  const cleanPath = currentPath.startsWith('/') ? currentPath.slice(1) : currentPath;
  return `https://developers.avax.network/docs/${cleanPath}`;
}

export async function generateMetadata({ 
  params 
}: { 
  params: { path: string[] } 
}): Promise<Metadata> {
  const currentPath = `/${params.path.join('/')}`;
  const destinationUrl = getDestinationUrl(currentPath);

  return {
    robots: {
      index: false,
      follow: true
    },
    alternates: {
      canonical: destinationUrl
    },
    title: 'Redirecting to Avalanche Docs',
    description: `This page has permanently moved to ${destinationUrl}`
  };
}

export default function CatchAllRoute({
  params,
}: {
  params: { path: string[] };
}) {
  const currentPath = `/${params.path.join('/')}`;
  const destinationUrl = getDestinationUrl(currentPath);
  permanentRedirect(destinationUrl);
}