import { createMDXSource } from 'fumadocs-mdx';
import type { InferMetaType, InferPageType } from 'fumadocs-core/source';
import { loader } from 'fumadocs-core/source';
import { guide } from '@/.source';

export const loaderOutput = loader({
  baseUrl: '/guides',
  source: createMDXSource(guide, []),
});

export type Page = InferPageType<typeof loaderOutput>;
export type Meta = InferMetaType<typeof loaderOutput>;
export const { getPage: getGuidePage, getPages: getGuidePages, pageTree: guidePageTree } = loaderOutput;