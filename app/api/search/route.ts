import { getDocsPages } from '@/utils/docs-loader'
import { createSearchAPI } from 'fumadocs-core/search/server'
import { getCoursePages } from '@/utils/course-loader';

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
    })   
  ])
})