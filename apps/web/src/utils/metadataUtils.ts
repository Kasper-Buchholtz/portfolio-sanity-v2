import { Metadata } from 'next'
import { clean } from './sanitize'
import { client } from '@/sanity/lib/sanity.client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/sanity.queries'

interface SeoGroup {
  seoTitle?: string
  seoDescription?: string
  image?: string
}

interface Page {
  title?: string
  seoGroup?: SeoGroup
  mainImage?: string
}

const settings = await client.fetch(SITE_SETTINGS_QUERY)

export async function generatePageMetadata(
  page: Page | null,
  baseUrl: string,
): Promise<Metadata> {
  const DEFAULT_TITLE = 'Siden kunne ikke findes'
  const DEFAULT_DESCRIPTION = 'Siden du leder efter kunne ikke findes'

  if (!page) {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    }
  }

  const { seoGroup, title, mainImage } = page
  const seoTitle = clean(
    seoGroup?.seoTitle || title || settings?.siteTitle || DEFAULT_TITLE,
  )
  const seoDescription = clean(
    seoGroup?.seoDescription || settings?.siteDescription || DEFAULT_DESCRIPTION,
  )
  const image = seoGroup?.image || mainImage
  const seoImage = image ? [{ url: image }] : []
  const googleID = clean(settings?.googleTagManager?.verification)

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      // url: fullUrl,
      ...(seoImage.length && { images: seoImage }),
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      ...(seoImage.length && { images: seoImage }),
    },
    verification: {
      google: googleID,
    },
    creator: 'Superego',
    other: {
      'theme-color': '#000000',
    },
  }
}
