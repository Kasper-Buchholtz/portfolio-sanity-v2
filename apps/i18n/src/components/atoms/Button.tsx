import { cn } from '@/utils/twMerge'
import React, { type ElementType, type ForwardedRef, forwardRef } from 'react'
import { getLinkText } from '@repo/link-field/src/helpers/getLinkText'
import { InternalLink, LinkValue } from '@repo/link-field/src/types'
import { AdvancedButton, advancedButtonVariants } from './AdvancedButton'
import { clean } from '@/utils/sanitize'
import { SanityLink } from '@repo/link-field/src/sanity-link'
import { resolveHrefLang } from '@repo/i18n/src/resolveHrefLang'
import { AdvancedButtonProps } from '@/types/AdvancedButton.types'
import { VariantProps } from 'class-variance-authority'
/**
 *
 * @returns: En knap-komponent med brugerdefineret styling
 * @example: 
    * <Button link={}>Knap</Link></Button> 
 * @alias: Button
 * @summary: En knap-komponent med brugerdefineret styling 
 * @version: 2.1.0
 * @property: [link, variant, size]
 * @author: Kasper Buchholtz
 *
**/

type LinkProps = AdvancedButtonProps & VariantProps<typeof advancedButtonVariants> & {
    link?: LinkValue
    as?: ElementType
    hrefResolver?: (link: InternalLink) => string
    children?: any
    className?: string
    onClick?: () => void
}

const Button = forwardRef(
    (
        { link, as, hrefResolver, children, variant, className = '', ...props }: LinkProps,
        ref: ForwardedRef<HTMLAnchorElement>,
    ) => {
        if (!link) {
            return null
        }

        // If no link text is provided, try and find a fallback
        if (!children) {
            // eslint-disable-next-line no-param-reassign
            children = getLinkText(link)
        }

        return (
            <AdvancedButton
                onClick={props.onClick}
                asChild
                variant={variant}
                className={cn(variant, className)}
            >
                <SanityLink
                    {...props}
                    ref={ref}
                    aria-label={clean(link.label)}
                    title={clean(link.label)}
                    link={link}
                    hrefResolver={({ internalLink }) => clean(resolveHrefLang(internalLink?.locale, internalLink?._type, internalLink?.slug?.current))}
                >
                    {children}
                </SanityLink>
            </AdvancedButton>
        )
    },
)

Button.displayName = 'Button'

export { Button, type LinkProps }
