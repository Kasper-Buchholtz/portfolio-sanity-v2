import { Album } from '@mynaui/icons-react'
import { defineType } from 'sanity'

export const LogoGallery = defineType({
  name: 'LogoGallery',
  type: 'object',
  title: 'Logo Galleri',
  icon: Album,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titel',
      description: 'Titel på logogalleriet',
    },

    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
  preview: {
    select: {
      images: 'images',
      image: 'images.0',
      title: 'title',
    },
    prepare(selection) {
      const { images, image, title } = selection

      return {
        subtitle: `Galleri `,
        title: title ? `${title}` : `Galleri med ${Object.keys(images).length} billeder`,
        media: image,
      }
    },
  },
})
