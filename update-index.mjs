import * as fs from 'node:fs';
import { sync } from 'trieve-fumadocs-adapter-14.6.0/search/sync';
import { TrieveSDK } from 'trieve-ts-sdk';
 
const content = fs.readFileSync('.next/server/app/static.json.body');
 
// now you can pass it to `sync`
/** @type {import('trieve-fumadocs-adapter-14.6.0/search/sync').TrieveDocument[]} **/
const records = JSON.parse(content.toString());
 
const client = new TrieveSDK({
  apiKey: 'tr-ghtudbTDqQktNR1JJPsQ9Pwl7Xi5r4HW',
  datasetId: '4948db5c-a7e7-423f-bf6a-0ac1ba7a2b76',
});
 
sync(client, records);  