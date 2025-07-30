import 'dotenv/config';
import axios from 'axios';
import { writeFile } from 'fs/promises';

const key = process.env.VITE_CLIENT_KEY;
const siteId = process.env.VITE_SITE_DETAILS_ID;

if (!key || !siteId) {
  throw new Error('Missing environment variables.');
}

const { data } = await axios.get('https://client.vivreal.io/tenant/siteDetails', {
  params: { siteId },
  headers: {
    Authorization: key,
    'Content-Type': 'application/json',
  },
});

const robotsTxt = `
User-agent: *
Disallow:

Sitemap: https://${data.domainName}/sitemap.xml
`.trim();

await writeFile('public/robots.txt', robotsTxt);