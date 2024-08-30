import { getDocsPages } from '@/utils/docs-loader';
import { getIntegrationPages } from '@/utils/integrations-loader';
import { createSearchAPI } from 'fumadocs-core/search/server';

export const { GET } = createSearchAPI('advanced', {
  indexes: [
    ...getDocsPages().map((page) => ({
      title: page.data.title,
      structuredData: page.data.exports.structuredData,
      id: page.url,
      url: page.url,
    })),
    ...getIntegrationPages().map((page) => ({
      title: page.data.title,
      structuredData: page.data.exports.structuredData,
      id: page.url,
      url: page.url,
    })),
  ],
});
