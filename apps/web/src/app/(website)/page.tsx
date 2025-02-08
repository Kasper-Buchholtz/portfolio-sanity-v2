import 'swiper/css'
import React from 'react'
import { loadPage } from '@/sanity/queries/loadPage'
import { PageBuilder } from '@/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/utils/metadataUtils'
import 'swiper/css'

export default async function DynamicRoute() {
  const page = await loadPage('/', 'da')

  if (!page) {
    notFound();
  }

  return (
    <PageContainer>
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


export async function generateMetadata() {
  const page = await loadPage('/', 'da')
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  return generatePageMetadata(page, baseUrl);
}
