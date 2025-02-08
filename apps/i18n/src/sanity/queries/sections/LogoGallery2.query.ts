import groq from 'groq'
import { ImageQuery } from '@/sanity/queries/atoms/Image.query'
export const LogoGallery2Query = groq`
    _type == 'LogoGallery2' => {
    ...,
    images[]{
      ${ImageQuery}
    },
  }`
