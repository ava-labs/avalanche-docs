import createMDX from 'fumadocs-mdx/config';
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
    ]
  },
};

export default withMDX(config);
