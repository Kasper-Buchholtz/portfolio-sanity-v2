import { File } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'
import { definePathname } from '@repo/sanity-studio/src/utils/definePathname'
export default defineType({
  name: 'page',
  title: 'Side',
  type: 'document',
  description: 'Siderne på hjemmesiden',
  liveEdit: false,
  icon: File,
  groups: [
    { name: 'content', title: 'Indhold' },
    { name: 'pageBuilder', title: 'Sideopbygning' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'Titlen på siden',
      group: 'content',
    }),
    definePathname({
      name: 'slug',
      title: 'Slug',
      description:
        'Dette er en unik adresse, der refererer til den sidste del af sidens URL.',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
      },
    }),

    /* defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Dette er en unik adresse, der refererer til den sidste del af sidens URL.',
      group: 'content',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }), */
    defineField({
      name: 'mainImage',
      title: 'Udvalgt billede',
      type: 'image',
    }),
    defineField({
      group: 'pageBuilder',
      title: 'Indhold',
      description: 'Indholdet på siden (Sektioner / Blokke)',
      name: 'pageBuilder',
      type: 'pageBuilder',
    }),

    defineField({
      group: 'seo',
      title: 'SEO',
      description: 'SEO indstillinger',
      name: 'seoGroup',
      type: 'seoGroup',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      media: 'mainImage',
    },
    prepare({ title, slug, media }) {
      return {
        title: title,
        subtitle: slug
          ? `/${slug.startsWith('/') ? slug.slice(1) : slug}`
          : 'Mangler slug',
        media: media,
      }
    },
  },
})
