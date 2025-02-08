"use client"
import 'swiper/css'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SwiperOptions } from 'swiper/types'
import CarouselNavigation from '../molecules/CarouselNavigation'

/**
 *
 * @returns: En sektion med galleri.
 * @example: <Carousel
        slidesPerView={1.2}
        loop={true}
        spaceBetween={32}
        breakpoints={{
          428: {
            slidesPerView: 1.08,
            spaceBetween: 20,
          },
        }}
      > </Carousel>
 * @alias: GallerySection
 * @summary: Denne komponent bruges til at oprette en ny sektion med galleri.
 * @version: 2.0.0
 * @property: [sectiom]
 * @author: Kasper Buchholtz
 *
 **/

interface CarouselProps extends SwiperOptions {
  spaceBetween?: number
  slidesPerView?: number
  children: any
  className?: string
  loop?: boolean
  breakpoints?: {
    0?: {
      slidesPerView: number
      spaceBetween: number
    }
    428?: {
      slidesPerView: number
      spaceBetween: number
    }
    768?: {
      slidesPerView: number
      spaceBetween: number
    }
    1024?: {
      slidesPerView: number
      spaceBetween: number
    }
    1280?: {
      slidesPerView: number
      spaceBetween: number
    }
    1440?: {
      slidesPerView: number
      spaceBetween: number
    }
    1920?: {
      slidesPerView: number
      spaceBetween: number
    }
    2500?: {
      slidesPerView: number
      spaceBetween: number
    }
    [key: number]: {
      slidesPerView: number
      spaceBetween: number
    }

  }
}

const Carousel = ({ spaceBetween, slidesPerView, loop, breakpoints, children, className="", ...props }: CarouselProps,) => {
  const swiperRef = useRef(null)
  return (
    <>
      <div className={`relative col-span-full ${className}`}>
        <Swiper
          {...props}
          ref={swiperRef}
          spaceBetween={spaceBetween || 20}
          slidesPerView={1}
          loop={loop || false}
          breakpoints={breakpoints}
        >
          {children.map((child, index) => (
            <SwiperSlide key={index}>{child}</SwiperSlide>
          ))}
        </Swiper>
        {children.length > 1 && <CarouselNavigation swiperRef={swiperRef} />}
        </div>
    </>
  )
}

export default Carousel