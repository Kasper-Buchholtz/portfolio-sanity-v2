'use client'
import 'lenis/dist/lenis.css'
import { ReactLenis } from '@/utils/lenis';

interface LenisProps {
  root: any;
  options: Record<string, any>;
}

/**
 *
 * @returns: En smooth scrolling funktion, der gør det muligt at scrolle jævnt på siden.
 * @example: <Lenis />
 * @alias: Lenis
 * @summary: Denne komponent bruges til at gøre det muligt at smooth scrolle.
 * @version: 1.0.0
 * @property: [root, options]
 * @author: Kasper Buchholtz
 *
**/

export function Lenis({ root, options }: LenisProps) {
  return (
    <ReactLenis
      root={root}
      options={{
        ...options,
      }}
    />
  )
}