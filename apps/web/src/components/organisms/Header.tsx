import { AnimatePresence } from 'motion/react'
import Link from 'next/link'
import * as React from 'react'
import { useEffect } from 'react'
import Navigation from '@/components/organisms/Navigation'
import Logo from '../atoms/Logo'
import Section from '../sections/Section'
import NavigationGroup from './NavigationGroup'

/**
 *
 * @returns: En header, der indeholder logo og søgefunktion.
 * @example: <Header />
 * @alias: Header
 * @summary: Denne komponent bruges til at vise en header med logo og søgefunktion.
 * @version: 1.0.0
 * @property: []
 * @todo: Nogen gange er der er der en bug, hvor bruger menuen viser den forkerte state,
 * @author: Kasper Buchholtz
 *
 **/

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)


  const handleCloseNav = () => {
    setIsOpen(false)
  }

  const handleScroll = () => {
    if (typeof window !== 'undefined' && window.scrollY > 100) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  // if isOpen is true, make the screen unscrollable by setting the body to fixed
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])
  return (
    <>
      <Section
        paddingBottom={'none'} paddingTop={'none'} tag={'header'}
        className={` fixed top-0 right-0 w-full py-4 se-grid  z-[9999999999] h-20 transition-all ${isScrolled ? '!bg-superego-light-light' : 'bg-transparent'
          }`}
      >
        <Link className='col-span-2 col-start-1 md:col-span-5 xl:col-span-6' href='/' title=''>
          <Logo className="w-full h-auto max-w-xs" variant='mørk' />
        </Link>
        <NavigationGroup
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </Section>
      <AnimatePresence mode="wait">
        {isOpen && <Navigation onClose={handleCloseNav} />}
      </AnimatePresence>
    </>
  )
}
