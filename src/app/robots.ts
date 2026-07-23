import type { MetadataRoute } from 'next'

// Disallowing /portal/ keeps the client login and every authenticated route
// out of search results — it's private client data, not marketing content,
// and there's no reason a client's project page should ever be crawlable.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/portal/'] }],
    sitemap: 'https://lotusmirk.com/sitemap.xml',
  }
}
