import { createMDXSource, defaultSchemas } from 'fumadocs-mdx';
import { z } from 'zod';
import type { InferMetaType, InferPageType } from 'fumadocs-core/source';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { map } from '.map';
import { create } from '@/components/ui/icon';

const loaderOutput = loader({
    baseUrl: '/integrations',
    rootDir: 'integrations',
    icon(icon) {
      if (icon && icon in icons)
        return create({ icon: icons[icon as keyof typeof icons] });
    },
    source: createMDXSource(map, {
      schema: {
        frontmatter: defaultSchemas.frontmatter.extend({
          category: z.string(),
          available: z.array(z.string()).optional(),
          logo: z.string().optional(),
          developer: z.string().optional(),
          website: z.string().optional(),
          documentation: z.string().optional(),
          featured: z.boolean().default(false).optional()
        }),
      },
    }),
  });

export type Page = InferPageType<typeof loaderOutput>;
export type Meta = InferMetaType<typeof loaderOutput>;
export const { getPage: getIntegrationPage, getPages: getIntegrationPages, pageTree: integrationPageTree } = loaderOutput;