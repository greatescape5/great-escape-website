import { getCities } from '../lib/data';

const BASE = 'https://www.greatescapewebservices.com';

export default async function sitemap() {
  const cities = await getCities();
  const staticPages = ['', '/our-clients', '/trackd'].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
  }));
  const cityPages = cities.map((c) => ({
    url: `${BASE}/website-development/${c.slug}`,
    lastModified: new Date(),
  }));
  return [...staticPages, ...cityPages];
}
