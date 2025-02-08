import 'swiper/css'
import React from 'react'
import { loadPage } from '@/sanity/queries/loadPage'
import { PageBuilder } from '@/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/utils/metadataUtils'
import { Params } from '../artikler/[...slug]/page'

export interface PageParams {
  params: Promise<Params>
}

export default async function DynamicRoute({
  params,
}: PageParams) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join('/');
  const page = await loadPage(slug, 'da');

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

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug: slugArray } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const slug = slugArray.join('/');
  const page = await loadPage(slug, 'da');

  return generatePageMetadata(page, baseUrl);
}
