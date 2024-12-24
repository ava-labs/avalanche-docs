import {
  defineConfig,
  defineDocs,
  defineCollections,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import { rehypeCodeDefaultOptions, remarkImage } from 'fumadocs-core/mdx-plugins';
import { transformerTwoslash } from 'fumadocs-twoslash';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkHeading } from 'fumadocs-core/mdx-plugins';
import { z } from 'zod';

export const { docs, meta } = defineDocs({
  docs: {
    async: true,
    schema: frontmatterSchema.extend({
      preview: z.string().optional(),
      toc: z.boolean().default(true),
      index: z.boolean().default(false),
    }),
  },
  meta: {
    schema: metaSchema.extend({
      description: z.string().optional(),
    }),
  },
});

export const academy = defineCollections({
  type: 'doc',
  async: true,
  dir: 'content/academy',
  schema: frontmatterSchema.extend({
    preview: z.string().optional(),
    toc: z.boolean().default(true),
    index: z.boolean().default(false),
    updated: z.string().or(z.date()).transform((value, context) => {
        try {
          return new Date(value);
        } catch {
          context.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid date" });
          return z.NEVER;
        }
      }),
    authors: z.array(z.string()),
    comments: z.boolean().default(false),
  }),
});

export const academyMeta = defineCollections({
  type: 'meta',
  dir: 'content/academy',
  schema: metaSchema.extend({
    description: z.string().optional(),
  }),
});

export const integrations = defineCollections({
  type: 'doc',
  async: true,
  dir: 'content/integrations',
  schema: frontmatterSchema.extend({
    category: z.string(),
    available: z.array(z.string()).optional(),
    logo: z.string().optional(),
    developer: z.string().optional(),
    website: z.string().optional(),
    documentation: z.string().optional(),
    featured: z.boolean().default(false).optional()
  }),
});

export const guide = defineCollections({
  type: 'doc',
  async: true,
  dir: 'content/guide',
  schema: frontmatterSchema.extend({
    authors: z.array(z.string()),
    topics: z.array(z.string()),
    date: z.string().date().or(z.date()).optional(),
    comments: z.boolean().default(false),
  }),
});

export default defineConfig({
  lastModifiedTime: 'git',
  mdxOptions: {
    rehypeCodeOptions: {
      inline: 'tailing-curly-colon',
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash(),
        {
          name: 'transformers:remove-notation-escape',
          code(hast) {
            for (const line of hast.children) {
              if (line.type !== 'element') continue;

              const lastSpan = line.children.findLast(
                (v) => v.type === 'element',
              );

              const head = lastSpan?.children[0];
              if (head?.type !== 'text') return;

              head.value = head.value.replace(/\[\\!code/g, '[!code');
            }
          },
        },
      ],
    },
    remarkPlugins: [ remarkMath, remarkHeading, [remarkImage, { useImport: false }] ],
    rehypePlugins: (v) => [rehypeKatex, ...v],
    jsx: false,
  },
});