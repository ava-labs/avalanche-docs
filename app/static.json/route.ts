import { NextResponse } from 'next/server';
import { getDocsPages } from '@/utils/content-loader/docs-loader';
import { getIntegrationPages } from '@/utils/content-loader/integrations-loader';
import { getCoursePages } from '@/utils/content-loader/course-loader';
import { getGuidePages } from '@/utils/content-loader/guide-loader';
import { type TrieveDocument } from 'trieve-fumadocs-adapter-14.6.0/search/sync';
 
export const revalidate = false;
 
export async function GET() {
  const source = [
    ...getDocsPages(),
    ...getIntegrationPages(),
    ...getCoursePages(),
    ...getGuidePages(),
  ];

  const results: TrieveDocument[] = await Promise.all(
    source.map(async (page) => {
      const loadedData = await page.data.load();
      return {
        _id: page.url,
        structured: loadedData.structuredData,
        url: page.url,
        title: page.data.title,
        description: page.data.description,
      };
    })
  );
 
  return NextResponse.json(results);
}