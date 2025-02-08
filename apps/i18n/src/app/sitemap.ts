import { MetadataRoute } from 'next'
import { allSlugsQuery } from '@/sanity/lib/sanity.queries'
import { getClient } from '@/sanity/lib/sanity.client'
import { resolveHrefLang } from '@repo/i18n/src/resolveHrefLang'

const client = getClient()

// Fetch all slugs from Sanity
export async function getSlugs() {
  return client.fetch(allSlugsQuery)
}

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getSlugs()

  // Map the slugs to create URLs for each page
  const dynamicPages = slugs.map(
    (slug: {
      _type: string
      slug: string
      _updatedAt: string
      locale?: string
    }) => ({
      url: `https://${process.env.NEXT_PUBLIC_BASE_URL}${resolveHrefLang(slug?.locale, slug?._type, slug?.slug)}`,
      lastModified: slug._updatedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
    }),
  )

  // Combine static and dynamic URLs into the sitemap
  return [...dynamicPages]
}
