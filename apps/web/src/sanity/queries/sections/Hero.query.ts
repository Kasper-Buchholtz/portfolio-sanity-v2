import groq from 'groq'
import { MediaObjectQuery } from '@/sanity/queries/molecules/MediaObject.query'
import { ButtonQuery } from '../atoms/Button.query'

export const heroQuery = groq`
_type == "hero" => {
  title, 
  subtitle,
  _type,
  ${MediaObjectQuery},
  quickLinks[] {
    ${ButtonQuery}
  },
}
`