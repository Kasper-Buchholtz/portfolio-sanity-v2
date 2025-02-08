"use client"
import React from 'react'
import { motion } from 'motion/react'
import LocaleSwitcher from '../atoms/LocaleSwitcher'
import useNavigationData from '@/hooks/useNavigationData'
import NavigationItem from '../atoms/NavigationItem'
/**
 *
 * @returns: Navigationen for hjemmesiden.
 * @example: <Navigation />
 * @alias: Navigation
 * @summary: Denne komponent bruges til at vise navigationen for hjemmesiden.
 * @version: 1.0.0
 * @property: [onClose]
 * @author: Kasper Buchholtz
 *
 **/


export default function Navigation({ onClose, locale }) {
  const data = useNavigationData(locale);

  return (
    <>
      <motion.nav
        role="navigation"
        data-lenis-prevent="true"
        initial={{ x: '100%' }}
        transition={{ stiffness: 100 }}
        animate={{ x: 0 }}
        exit={{ x: '100%', opacity: 0 }}
        className="fixed z-[999] top-0 right-0 w-screen h-screen sm:w-[50vw] md:w-[50vw] lg:w-[33vw] overflow-auto bg-superego-light-light"
      >
        <ul className="h-full px-6 pb-6 space-y-6 overflow-auto md:px-24 lg:px-19 xl:px-16 sm:px-13 pt-44 sm:pt-32 md:pt-28 lg:pt-28 text-medium">
          {data?.links?.map((item, index) => (
            <NavigationItem key={index} item={item} />
          ))}
          <LocaleSwitcher className="bottom-4 right-4" position="absolute" view="mobile" locale={locale} />
        </ul>
      </motion.nav>
      <motion.button
        title="Luk menu"
        className="fixed z-[998] top-0 right-0 w-screen h-screen bg-superego-dark/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, stiffness: 100 }}
        onClick={onClose}
      />
    </>
  );
}


