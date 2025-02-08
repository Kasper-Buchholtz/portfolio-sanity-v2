import 'swiper/css'
import React from 'react'
import { loadPage } from '@/sanity/queries/loadPage'
import { PageBuilder } from '@/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/utils/metadataUtils'
import 'swiper/css'

export default async function IndexRoute({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = (await params).locale
  const page = await loadPage('/', locale)
  if (!page) {
    notFound();
  }

  return (
    <PageContainer locale={page.localeInfo}>
      {page.pageBuilder &&
        <PageBuilder
          documentId={page._id}
          documentType={page._type}
          sections={page.pageBuilder}
        />
      }
    </PageContainer>
  );
}


export async function generateMetadata({params}: {params: Promise<{ locale: string }>}) {
  const locale = (await params).locale

  const page = await loadPage('/', locale);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  return generatePageMetadata({ locale }, page, baseUrl);
}
