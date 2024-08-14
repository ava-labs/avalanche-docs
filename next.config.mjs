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
        source: '/reference/:path*',
        destination: '/api-reference/:path*',
        permanent: true,
      },
      {
        source: '/reference/avalanchego/:path*',
        destination: '/api-reference/:path*',
        permanent: true,
      },
      {
        source: '/reference/subnet-evm/api',
        destination: '/api-reference/subnet-evm-api',
        permanent: true,
      },
    ]
  },
};

export default withMDX(config);
