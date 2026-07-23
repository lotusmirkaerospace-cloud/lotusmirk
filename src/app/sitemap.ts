import type { MetadataRoute } from 'next'

const BASE_URL = 'https://lotusmirk.com'

// Marketing pages only — /portal/** is deliberately excluded (see robots.ts):
// it's a gated client area, not content Google should index.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: '/about', priority: 0.7 },
    { path: '/services', priority: 0.8 },
    { path: '/contact', priority: 0.7 },
  ]

  return routes.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority,
  }))
}
