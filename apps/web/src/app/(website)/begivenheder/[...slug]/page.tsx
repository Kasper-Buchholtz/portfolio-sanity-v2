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
import { urlFor } from '@/sanity/lib/sanity.image'
import Image from 'next/image'
import { Params } from '../../artikler/[...slug]/page'

export default async function DynamicRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join('/');
  const page = await loadPage(slug, 'da', EVENT_QUERY);

  if (!page) {
    notFound();
  }

  return (
    <PageContainer>
      <Section variant="lys" paddingTop="none" paddingX="none" paddingBottom="none" className="h-screen/1.6">
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
          <Image
            className="object-cover h-full"
            src={urlFor(page.image).dpr(2).url()}
            alt=""
            width={1920}
            height={1080}
            placeholder="blur"
            blurDataURL={urlFor(page.image).width(24).height(24).blur(10).url()}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          />
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
