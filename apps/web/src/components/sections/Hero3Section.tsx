'use client'
import React, { useState } from 'react'
import Heading from '@/components/atoms/Heading'
import Media from '@/components/organisms/Media'
import Section from '@/components/sections/Section'
import Paragraph from '@/components/atoms/Paragraph'
import { clean } from '@/utils/sanitize'

/**
 *
 * @returns: En sektion med en hero.
 * @example: <Hero3 />
 * @alias: Hero3
 * @summary: Denne komponent bruges til at vise en hero.
 * @version: 1.0.0
 * @property: [data]
 * @author: Emilie Hjøllund
 *
 **/

interface HeroProps {
  data?: any
}

const Hero3: React.FC<HeroProps> & { Content: React.FC<{ data: any }> } = ({
  data,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const OpenModal = () => {
    setIsOpen(!isOpen)
  }

  const AllNull =
    data.MediaObject?.media.imageObject == null &&
    data.MediaObject?.media.videoObject == null &&
    data.MediaObject?.media.vimeoObject == null

  const Colors =
    clean(data?.design?.color?.color) === 'mørk'
      ? 'bg-superego-dark'
      : clean(data?.design?.color?.color) === 'lilla'
        ? 'bg-superego-purple'
        : 'bg-superego-green '

  return (
    <>
      <Section
        {...props}
        className="max-h-screen pt-40 md:pt-30"
        paddingTop="none"
        paddingBottom="none"
      >
        {/* Content Wrapper for Heading and Paragraph */}
        <Hero3.Content data={data} />

        {/* Background Color Setup */}
        <div
          className={` ${Colors} ${AllNull ? 'h-[calc(100vh/2.8)] sm:h-screen/3 md:h-[calc(100vh/2.8)] ' : 'h-screen/1.6 md:h-screen/1.5'} col-span-full absolute top-0 right-0 w-full`}
        />

        {AllNull ? (
          <></>
        ) : (
          <>
            <div className="relative col-span-full rounded-xl overflow-hidden h-screen/1.6 md:h-screen/1.3">
              <Media data={data?.MediaObject?.media} showInPopup={true} />
            </div>

          </>
        )}
      </Section>
    </>
  )
}

export default Hero3
Hero3.Content = Content

function Content({ data }) {
  return (
    <div className="z-30 w-full text-superego-light-base col-span-full max-w-prose md:max-w-[80ch] prose-headings:text-superego-green">
      <Paragraph spacing="small">{data?.subtitle}</Paragraph>
      <Heading spacing="small" tag="h1" type="h1" text="balance">
        {data.title}
      </Heading>
    </div>
  )
}
