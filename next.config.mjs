import { createMDX } from "fumadocs-mdx/next";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const withMDX = createMDX({
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v],
    lastModifiedTime: "git",
  },
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["avalanche-docs-toolbox"],
  images: {
    // domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Permite cualquier dominio con HTTPS
      },
      {
        protocol: "http",
        hostname: "**", // Permite cualquier dominio con HTTP (opcional)
      },
    ],
  },
};

export default withMDX(config);
