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
    })
  ])
})