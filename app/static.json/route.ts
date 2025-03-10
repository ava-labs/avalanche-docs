import { NextResponse } from 'next/server';
import { getDocsPages } from '@/utils/content-loader/docs-loader';
import { getCoursePages } from '@/utils/content-loader/course-loader';
import { getIntegrationPages } from '@/utils/content-loader/integrations-loader';
import type { OramaDocument } from 'fumadocs-core/search/orama-cloud';

export const revalidate = false;

export async function GET(): Promise<Response> {
  const allPages = [
    ...getDocsPages()
  ];

  const results = await Promise.all(
    allPages.map(async (page) => {
      const { structuredData } = await page.data.load();
      return {
        id: page.url,
        structured: structuredData,
        url: page.url,
        title: page.data.title,
        description: page.data.description || '',
      } satisfies OramaDocument;
    }),
  );

  return NextResponse.json(results);
}