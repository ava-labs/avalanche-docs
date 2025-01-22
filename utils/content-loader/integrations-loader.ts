import { createMDXSource } from 'fumadocs-mdx';
import type { InferMetaType, InferPageType } from 'fumadocs-core/source';
import { loader } from 'fumadocs-core/source';
import { integrations } from '@/.source';

const loaderOutput = loader({
  baseUrl: '/integrations',
  source: createMDXSource(integrations, []),
});

export type Page = InferPageType<typeof loaderOutput>;
export type Meta = InferMetaType<typeof loaderOutput>;
export const { getPage: getIntegrationPage, getPages: getIntegrationPages, pageTree: integrationPageTree } = loaderOutput;