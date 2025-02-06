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
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: '/not-found',
          has: [
            {
              type: 'header',
              key: 'x-status-code',
              value: '500'
            }
          ]
        }
      ]
    }
  }
};

export default withMDX(config);