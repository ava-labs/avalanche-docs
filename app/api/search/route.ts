import { getDocsPages } from '@/utils/content-loader/docs-loader'
import { createSearchAPI } from 'fumadocs-core/search/server'
import { getCoursePages } from '@/utils/content-loader/course-loader';
import { getIntegrationPages } from '@/utils/content-loader/integrations-loader';

export const { GET } = createSearchAPI('advanced', {
  indexes: await Promise.all([
    ...getDocsPages().map(async (page) => {
      const loadedData = await page.data.load()
      return {
        title: page.data.title,
        url: page.url,
        id: page.url,
        structuredData: loadedData.structuredData
      }
    }),
    ...getCoursePages().map(async (page) => {
      const loadedData = await page.data.load()
      return {
        title: page.data.title,
        url: page.url,
        id: page.url,
        structuredData: loadedData.structuredData
      }
    }),
    ...getIntegrationPages().map(async (page) => {
      const loadedData = await page.data.load()
      return {
        title: page.data.title,
        url: page.url,
        id: page.url,
        structuredData: loadedData.structuredData
      }
    })
  ])
})