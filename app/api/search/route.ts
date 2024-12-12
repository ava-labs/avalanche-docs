import { getDocsPages } from '@/utils/docs-loader'
import { createSearchAPI } from 'fumadocs-core/search/server'

export const { GET } = createSearchAPI('advanced', {
  indexes: await Promise.all(
    getDocsPages().map(async (page) => {
      const loadedData = await page.data.load()
      return {
        title: page.data.title,
        description: page.data.description,
        url: page.url,
        id: page.url,
        structuredData: loadedData.structuredData
      }
    })
  )
})