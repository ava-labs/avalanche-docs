import * as fs from 'node:fs';
import { sync } from 'trieve-fumadocs-adapter-14.6.0/search/sync';
import { TrieveSDK } from 'trieve-ts-sdk';
 
const content = fs.readFileSync('.next/server/app/static.json.body');
 
// now you can pass it to `sync`
/** @type {import('trieve-fumadocs-adapter-14.6.0/search/sync').TrieveDocument[]} **/
const records = JSON.parse(content.toString());
 
const client = new TrieveSDK({
  apiKey: env["TRIEVE_ADMIN_API_KEY"],
  datasetId: env["TRIEVE_DATASET_ID"],
});
 
sync(client, records);  