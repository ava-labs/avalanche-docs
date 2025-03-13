import { loader } from 'fumadocs-core/source';
import { createElement } from 'react';
import { icons } from 'lucide-react';
import { createMDXSource } from 'fumadocs-mdx';
import { docsSource, docsMeta, academySource, academyMeta, guide as guides, integrations } from '@/.source';
import type { InferMetaType, InferPageType } from 'fumadocs-core/source';

export const docsContent = loader({
  baseUrl: '/docs',
  icon(icon) {
    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons]);
  },
  source: createMDXSource(docsSource, docsMeta),
});

export const academyContent = loader({
  baseUrl: '/academy',
  icon(icon) {
    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons]);
  },
  source: createMDXSource(academySource, academyMeta),
});

export type AcademyPage = InferPageType<typeof docsContent>;
export type AcademyMeta = InferMetaType<typeof docsContent>;

export const guidesContent = loader({
  baseUrl: '/guides',
  source: createMDXSource(guides, []),
});

export const integrationsContent = loader({
  baseUrl: '/integrations',
  source: createMDXSource(integrations, []),
});

