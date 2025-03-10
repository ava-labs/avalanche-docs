'use client';
 
import { OramaClient } from '@oramacloud/client';
import type { SharedProps } from 'fumadocs-ui/components/dialog/search';
import SearchDialog from 'fumadocs-ui/components/dialog/search-orama';
 
const client = new OramaClient({
  endpoint: 'https://cloud.orama.run/v1/indexes/test-o7byl9',
  api_key: 'Y2MhmxMPixFIoEGO1SiUGoWfRchX03sl'
});
 
export default function CustomSearchDialog(props: SharedProps) {
  return <SearchDialog {...props} allowClear client={client} showOrama />;
}