import { PortableText } from '@portabletext/react'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'
import { cn } from '@/utils/twMerge'
import { ParagraphProps } from '@/types/Paragraph.types'
import Heading from '@/components/atoms/Heading'

/**
 *
 * @returns: En tekstboks-komponent, der kan bruges til at indtaste tekst.
 * @example: <Paragraph />
 * @alias: Paragraph
 * @summary: Denne komponent bruges til at vise en tekstboks-komponent, der kan bruges til at indtaste tekst.
 * @version: 1.0.0
 * @property: [size, spacing, portableText]
 * @author: Kasper Buchholtz
 *
 **/
/* .has-text-wrap>:not(:first-child) */
const ParagraphVariants = cva('font-sans', {
  variants: {
    size: {
      regular: 'text-regular',
      increased: 'text-increased',
      medium: 'text-medium',
    },
    spacing: { //@deprecated
      large: '', //@deprecated
      default: '', //@deprecated
      small: '', //@deprecated
      none: '', //@deprecated
    },
  },
  defaultVariants: {
    size: 'regular',
    spacing: 'default',
  },
})

type ExtendedParagraphProps = ParagraphProps & VariantProps<typeof ParagraphVariants>


const Paragraph: React.FC<ExtendedParagraphProps> = ({
  size,
  spacing,
  children,
  portableText,
  className,
  ...props
}) => {
  return (
    <>
      {portableText ? (
        <div {...props} className={`not-first-child:space-y-4 ${cn(ParagraphVariants({ size, spacing, className }))}`}>
          <TextComponent value={children} />
        </div>
      ) : (
        <>
          <p {...props} className={cn(ParagraphVariants({ size, className, spacing }))}>
            {children}
          </p>
        </>
      )}
    </>
  )
}

const myPortableTextComponents = {
  types: {
    myBlock: ({ children }) => <div className="my-block">{children}</div>,
  },
  marks: {
    em: ({ children }) => (<em className="italic font-semibold">{children}</em>),
    link: ({ children, value }) => {
      const rel = value && value.href && !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a
          className="font-bold underline transition-all custom-a text-superego-green hover:text-superego-purple"
          href={value.href}
          target={value.blank ? '_blank' : '_self'}
          title={children}
          rel={rel}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    normal: ({ children }) => (<Paragraph>{children}</Paragraph>),
    h1: ({ children }) => (<Heading tag='h1' type='h1'>{children}</Heading>),
    h2: ({ children }) => (<Heading tag='h2' type='h2'>{children}</Heading>),
    h3: ({ children }) => (<Heading tag='h3' type='h3'>{children}</Heading>),
    h4: ({ children }) => (<Heading tag='h4' type='h4'>{children}</Heading>),
    h5: ({ children }) => (<Heading tag='h5' type='h5'>{children}</Heading>),
    h6: ({ children }) => (<Heading tag='h6' type='h6'>{children}</Heading>),
    ul: ({ children }) => (<ul className="ml-5 list-disc list-outside"> {children} </ul>),
    ol: ({ children }) => (<ol className="">{children}</ol>),
    strong: ({ children }) => (<strong className="font-bold">{children}</strong>),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (<code className="px-1 py-0 bg-gray-200 rounded">{children}</code>),
    pre: ({ children }) => <pre>{children}</pre>,
    sub: ({ children }) => <sub>{children}</sub>,
    sup: ({ children }) => <sup>{children}</sup>,
    blockquote: ({ children }) => (<blockquote className="pl-4 italic border-l-2 border-superego-grey/50 ">{children}</blockquote>),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="prose-li:ml-6 prose-li:list-decimal prose-li:list-item">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="ml-4 list-disc list-item">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="py-2 list-decimal list-outside">
        {children}
      </li>
    ),
  }
};


const TextComponent = (props) => {
  return (
    <PortableText
      value={props.value}
      components={myPortableTextComponents as any}
    />
  )
}

export default Paragraph
