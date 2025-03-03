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
  transpilePackages: ['avalanche-docs-toolbox'],
  async redirects() {
    return [
      {
        source: '/docs/avalanche-l1s/build-first-avalanche-l1',
        destination: '/docs/tooling/create-avalanche-l1',
        permanent: true,
      },
    ]
  },
};

export default withMDX(config);
