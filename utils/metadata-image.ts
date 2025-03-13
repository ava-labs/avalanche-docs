import { createMetadataImage } from 'fumadocs-core/server';
import { docsContent } from '@/lib/source';

export const metadataImage = createMetadataImage({
  source: docsContent,
  imageRoute: 'og',
});