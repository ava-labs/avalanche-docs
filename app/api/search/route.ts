import { getDocsPages } from '@/utils/docs-loader';
import { getIntegrationPages } from '@/utils/integrations-loader';
import { createSearchAPI } from 'fumadocs-core/search/server';
import { structure } from 'fumadocs-core/mdx-plugins';

export const { GET } = createSearchAPI('advanced', {
  indexes: getDocsPages().map((page) => ({
    title: page.data.title,
    description: page.data.description,
    url: page.url,
    id: page.url,
    structuredData: structure(page.data.preview ?? ''),
  })),
});
