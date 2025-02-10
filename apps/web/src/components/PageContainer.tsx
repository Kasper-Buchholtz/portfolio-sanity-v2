'use client'
import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import { Lenis } from '@/components/Lenis'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/twMerge'

/**
 *
 * @returns: En container, der indeholder header, footer og børnekomponenter.
 * @example: <PageContainer />
 * @alias: PageContainer
 * @summary: Denne komponent bruges til at vise en container, der indeholder header, footer og børnekomponenter.
 * @version: 1.0.0
 * @property: [children]
 * @author: Kasper Buchholtz
 *
 **/

const PageContainerVariant = cva('', {
  variants: {
    grid: {
      2: 'grid-cols-2 grid gap-3',
      increased: 'grid-cols-3 grid gap-3',
      none: 'none',
    },
  },
  defaultVariants: {
    grid: 2,
  },
})


type PagecontainerProps = {
  lenis?: {
    lerp: number,
    duration: number,
    smoothTouch: boolean,
    smooth: boolean,
    easing: (t: number) => number,
    orientation: string,
    gestureOrientation: string,
    smoothWheel: boolean,
    touchMultiplier: number,
  },
  children: React.ReactNode,
  className?: string
}


type ExtendedPagecontainerProps = PagecontainerProps & VariantProps<typeof PageContainerVariant>



export default function PageContainer({
  lenis = {
    lerp: 0.1,
    duration: 1.2,
    smoothTouch: false, //smooth scroll for touch devices
    smooth: true,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    touchMultiplier: 2,
  },
  children,
  grid,
  className
}: ExtendedPagecontainerProps) {
  return (
    <>
      <Header />
      <Lenis options={lenis} root={typeof document !== 'undefined' ? document.documentElement : null} />
      <main className={`min-h-screen bg-background-default ${cn(PageContainerVariant({ grid, className }))}`}>
        {children}
      </main>
    </>
  )
}
