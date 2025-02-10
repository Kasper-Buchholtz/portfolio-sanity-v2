'use client'
import React from 'react'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import Media from '@/components/organisms/Media'
import Section from '@/components/sections/Section'
import Modal from '../molecules/Modal'
import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { Button } from '../atoms/Button'
import { AdvancedButton } from '../atoms/AdvancedButton'

/**
 *
 * @returns: En sektion med en hero.
 * @example: <Hero />
 * @alias: Hero
 * @summary: Denne komponent bruges til at vise en hero.
 * @version: 1.0.0
 * @property: [title, image, video, altText, text, data]
 * @author: Kasper Buchholtz
 *
 **/

interface HeroProps {
  data?: any
}


const Hero: React.FC<HeroProps> = ({ data, ...props }) => {
  const isQuicklinks = data?.quickLinks?.length > 0
  return (
    <>
      <Section
        data-isquicklinks={isQuicklinks}
        className='group/isQuicklinks'
        data={data}
        variant='transparent'

        paddingTop='none'
        paddingBottom='none'
        paddingX='none'
      >
        <div className=' rounded py-8 md:py-12  px-6 md:px-12 space-y-20 md:space-y-32 col-span-full bg-background-muted group-data-[isquicklinks=true]/isQuicklinks:col-span-4'>
          <Heading tag='h1' type='h1'>{data?.title}</Heading>
          <Paragraph>{data?.subtitle}</Paragraph>
        </div>
        {isQuicklinks &&(
          <QuickLinks data={data?.quickLinks} />
        )}
      </Section>
    </>
  )
}

export default Hero



function QuickLinks({ data }) {
  return (
    <div className='col-span-2 '>
      <ul className='grid h-full gap-3'>
        {data?.map((item, index) => {
          return (
            <li key={index}>
              <Button variant='muted' className='justify-between w-full h-full' link={item.link}  />
            </li>
          )
        }
        )}
      </ul>
    </div>
  )
}

/* 


group-data-[open=true]/root:text-rød
8:56
<button
      onClick={toggle}
      aria-expanded={isOpen}
      data-open={isOpen}
    >









*/