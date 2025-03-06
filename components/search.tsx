'use client';
 
import { OramaClient } from '@oramacloud/client';
import type { SharedProps } from 'fumadocs-ui/components/dialog/search';
import SearchDialog from 'fumadocs-ui/components/dialog/search-orama';
 
const client = new OramaClient({
  endpoint: 'https://cloud.orama.run/v1/indexes/builders-hub-rhhfrp',
  api_key: 'NQwWbwTKAywQWsE7gGCg3OMFKgPm5aUz'
})
 
export default function CustomSearchDialog(props: SharedProps) {
  return <SearchDialog {...props} client={client} showOrama />;
}