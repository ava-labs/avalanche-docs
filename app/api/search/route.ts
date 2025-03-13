import { docsContent, academyContent, integrationsContent, guidesContent } from '@/lib/source'
import { createSearchAPI } from 'fumadocs-core/search/server'

export const { GET } = createSearchAPI('advanced', {
  indexes: await Promise.all([
    ...docsContent.getPages().map(async (page) => {
      const loadedData = await page.data.load()
      return {
        title: page.data.title,
        url: page.url,
        id: page.url,
        structuredData: loadedData.structuredData
      }
    }),
    ...academyContent.getPages().map((page) => {
      return {
        title: page.data.title,
        url: page.url,
        id: page.url,
        structuredData: page.data.structuredData
      }
    }),
    ...integrationsContent.getPages().map(async (page) => {
      const loadedData = await page.data.load()
      return {
        title: page.data.title,
        url: page.url,
        id: page.url,
        structuredData: loadedData.structuredData
      }
    }),
    ...guidesContent.getPages().map((page) => {
      return {
        title: page.data.title,
        url: page.url,
        id: page.url,
        structuredData: page.data.structuredData
      }
    })
  ])
})