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
        source: '/build/:path*',
        destination: '/:path*',
        permanent: true,
      },
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
    ]
  },
};

export default withMDX(config);
