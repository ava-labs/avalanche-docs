import { createMDXSource } from 'fumadocs-mdx';
import type { InferMetaType, InferPageType } from 'fumadocs-core/source';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { academy, academyMeta } from '@/.source';
import { create } from '@/components/ui/icon';

export const loaderOutput = loader({
  baseUrl: '/academy',
  icon(icon) {
    if (icon && icon in icons)
      return create({ icon: icons[icon as keyof typeof icons] });
  },
  source: createMDXSource(academy, academyMeta),
});

export type Page = InferPageType<typeof loaderOutput>;
export type Meta = InferMetaType<typeof loaderOutput>;
export const { getPage: getCoursePage, getPages: getCoursePages, pageTree: coursePageTree } = loaderOutput;