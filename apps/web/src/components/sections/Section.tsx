import { cva, VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { SectionProps } from '@/types/Section.types'
import { cn } from '@/utils/twMerge'
import { clean } from '@/utils/sanitize'

/**
 * @returns: En sektion.
 * @example: <Section />
 * @alias: Section
 * @summary: Denne komponent bruges til at oprette en ny sektion.
 * @version: 1.1.0
 * @property: [children, variant, columns, gap, paddingX, paddingTop, paddingBottom, className, tag, ...props, data]
 * @todo: bedre navngivning af props
 * @author: Kasper Buchholtz
 **/

const sectionVariants = cva('grid', {
  variants: {
    variant: {
      lys: 'bg-background-default text-text-default',
      mørk: 'bg-superego-dark text-superego-light-base',
      lilla: 'bg-superego-purple text-superego-light-base',
      transparent: '',

      muted: 'bg-background-muted text-text-default rounded border border-border-default',
    },
    columns: {
      default:
        'grid-cols-4 xs:grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6',
      secondary: '',
    },
    gap: {
      default: 'gap-4 xs:gap-4 sm:gap-4 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-6',
      secondary: '',
    },
    paddingX: {
      default: 'px-6 md:px-12',
      none: '',
      right: 'pr-6 md:pr-12',
      left: 'pl-6 md:pl-12',
    },
    paddingTop: {
      default: 'pt-8 md:pt-12',
      none: '',
    },
    paddingBottom: {
      default: 'pb-8 md:pb-12',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'lys',
    columns: 'default',
    gap: 'default',
    paddingX: 'default',
    paddingTop: 'default',
    paddingBottom: 'default',
  },
})
type ExtendedSectionProps = SectionProps & VariantProps<typeof sectionVariants>

export default function Section({
  data,
  children,
  variant,
  columns,
  paddingBottom,
  paddingTop,
  paddingX,
  gap,
  className = '',
  tag,
  ...props
}: ExtendedSectionProps & { tag?: React.ElementType }) {
  const SectionComponent: React.ElementType = tag || 'section'
  return (
    <>
      <SectionComponent
        id={data?.SectionSettings?.anchor?.current || undefined}
        {...props}
        className={cn(
          sectionVariants({
            variant: variant ?? clean(data?.design?.color?.color)as any,
            columns,
            gap,
            paddingX,
            paddingBottom: paddingBottom ?? (data?.design?.padding ? clean(data?.design?.padding.spacingBottom) : 'default')as any,
            paddingTop: paddingTop ?? (data?.design?.padding ? clean(data?.design?.padding.spacingTop) : 'default')as any,
            className,
          }),
        )}
      >
        {children}
      </SectionComponent>
    </>
  )
}
