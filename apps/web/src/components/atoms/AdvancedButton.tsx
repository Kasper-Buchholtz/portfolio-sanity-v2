import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { AdvancedButtonProps } from '@/types/AdvancedButton.types'
import { cn } from '@/utils/twMerge'

/**
 *
 * @returns: En knap-komponent med brugerdefineret styling
 * @example: 
    * <AdvancedButton variant="default">Knap</AdvancedButton> 
    * <AdvancedButton variant="default"><Link>Knap</Link></AdvancedButton>
    * <AdvancedButton variant="default"><Icon /><Link>Knap</Link></AdvancedButton>
 * @alias: AdvancedButton
 * @summary: Denne komponent bruges til at oprette en ny knap med brugerdefinerede stilarter.
 * @version: 1.0.0
 * @property: [variant, asChild]
 * @author: Kasper Buchholtz
 *
**/

type ExtendedAdvancedButtonProps = AdvancedButtonProps & VariantProps<typeof advancedButtonVariants>

const advancedButtonVariants = cva(
  'inline-flex items-center gap-4 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', // whitespace-nowrap
  {
    variants: {
      variant: {
        default: 'px-3.5 py-3 bg-background-default text-text-default', 
        muted: 'px-3.5 py-3 bg-[#E3E1DE] text-text-default',
        muted2:'bg-[#CBC8C5] px-3.5 py-3 text-text-default',
        primary: 'px-3.5 py-3 bg-background-primary text-text-inverse',
        primaryMuted: 'px-3.5 py-3 bg-background-inverse-muted text-text-inverse',
        none: ''
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)


const AdvancedButton = React.forwardRef<HTMLButtonElement, ExtendedAdvancedButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = (asChild ? Slot : 'button') as React.ElementType
    return (
      <Comp
        className={cn(advancedButtonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
AdvancedButton.displayName = 'Button'

export { AdvancedButton, advancedButtonVariants }
