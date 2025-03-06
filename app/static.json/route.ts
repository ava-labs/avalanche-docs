import { NextResponse } from 'next/server';
import { type DocumentRecord } from 'fumadocs-core/search/algolia';
import { getDocsPages } from '@/utils/content-loader/docs-loader';
import { getCoursePages } from '@/utils/content-loader/course-loader';
import { getIntegrationPages } from '@/utils/content-loader/integrations-loader';

export const revalidate = false;

export async function GET() {
  const results: DocumentRecord[] = [];

  const docsPages = getDocsPages();
  for (const page of docsPages) {
    const loadedData = await page.data.load();
    results.push({
      _id: page.url,
      structured: loadedData.structuredData,
      url: page.url,
      title: page.data.title,
      description: page.data.description || '',
    });
  }

  const coursePages = getCoursePages();
  for (const page of coursePages) {
    const loadedData = await page.data.load();
    results.push({
      _id: page.url,
      structured: loadedData.structuredData,
      url: page.url,
      title: page.data.title,
      description: page.data.description || '',
    });
  }

  const integrationPages = getIntegrationPages();
  for (const page of integrationPages) {
    const loadedData = await page.data.load();
    results.push({
      _id: page.url,
      structured: loadedData.structuredData,
      url: page.url,
      title: page.data.title,
      description: page.data.description || '',
    });
  }

  return NextResponse.json(results);
}