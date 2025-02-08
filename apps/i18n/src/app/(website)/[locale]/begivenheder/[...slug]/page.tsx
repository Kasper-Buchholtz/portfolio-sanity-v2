import 'swiper/css'
import React from 'react'
import { loadPage } from '@/sanity/queries/loadPage'
import { PageBuilder } from '@/components/PageBuilder'
import PageContainer from '@/components/PageContainer'
import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/utils/metadataUtils'
import { EVENT_QUERY } from '@/sanity/lib/sanity.queries'
import 'swiper/css'
import Section from '@/components/sections/Section'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import { formatDate } from '@/utils/date'
import Photo from '@/components/atoms/Photo'

export default async function DynamicRoute({
  params,
}: {
  params: Promise<{ slug: string[]; locale: string }>
}) {
  const { slug: slugArray, locale: locale } = await params
  const slug = slugArray.join('/');
  const page = await loadPage(slug, locale, EVENT_QUERY);

  if (!page) {
    notFound();
  }


  return (
    <PageContainer locale={page.localeInfo}>
      <Section variant="lys" paddingTop="none" paddingX="none" paddingBottom="none" className="h-screen overflow-hidden">
        <Section paddingBottom="none" className="order-2 col-span-full sm:col-span-8 md:col-span-6 lg:col-span-6 xl:col-span-12 md:order-1 md:my-auto" tag="div">
          <div className="col-span-full">
            <Heading spacing="small">{page.title}</Heading>
            <Heading type="p" tag="p" spacing="default">
              {formatDate(page.date ?? '')}
            </Heading>
            <Paragraph>{page.description}</Paragraph>
          </div>
        </Section>
        <div className="order-1 col-span-full sm:col-span-8 md:col-span-6 lg:col-span-6 xl:col-span-12 md:order-2">
          <Photo image={page.image} height={1080} width={1920} />
        </div>
      </Section>

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
export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string[] }> }) {
  const { slug: slugArray, locale: locale } = await params
  const slug = slugArray.join('/');
  const page = await loadPage(slug, locale, EVENT_QUERY);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  return generatePageMetadata({ locale }, page, baseUrl);
}
