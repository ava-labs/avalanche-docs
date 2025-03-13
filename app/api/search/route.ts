import { source, academy, integration, guide } from '@/lib/source'
import { createSearchAPI } from 'fumadocs-core/search/server'

export const { GET } = createSearchAPI('advanced', {
  indexes: await Promise.all([
    ...source.getPages().map(async (page) => {
      const loadedData = await page.data.load()
      return {
        title: page.data.title,
        url: page.url,
        id: page.url,
        structuredData: loadedData.structuredData
      }
    }),
    ...academy.getPages().map((page) => {
      return {
        title: page.data.title,
        url: page.url,
        id: page.url,
        structuredData: page.data.structuredData
      }
    }),
    ...integration.getPages().map(async (page) => {
      const loadedData = await page.data.load()
      return {
        title: page.data.title,
        url: page.url,
        id: page.url,
        structuredData: loadedData.structuredData
      }
    }),
    ...guide.getPages().map((page) => {
      return {
        title: page.data.title,
        url: page.url,
        id: page.url,
        structuredData: page.data.structuredData
      }
    })
  ])
})