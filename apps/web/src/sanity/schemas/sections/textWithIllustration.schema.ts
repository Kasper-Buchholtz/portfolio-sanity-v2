import { defineField, defineType } from "sanity";

export const textWithIllustration = defineType({
  name: "textWithIllustration",
  type: "object",
  title: "Tekst og medie",
  description:
    "Blokken er en kombination af tekst og medie, der præsenterer information på en visuelt tiltalende måde ved at inkludere både ord og billede. Det giver besøgende en mere informativ og engagerende oplevelse af hjemmesiden. På længere sider anbefales det at anvende tekst- og medie-blokken i kombination med andre tekstopsætninger",
  groups: [
    { title: "Indhold", name: "content" },
    { title: "Design", name: "design" },
    { title: "Medie", name: "media" },
    { title: "indstillinger", name: "settings" },
  ],
  fields: [
    defineField({
      name: "innerBlocks",
      type: "innerBlocks",
      group: "content",
    }),
    {
      group: "media",
      name: "MediaObject",
      title: "Medie",
      type: "MediaObject",
    },
    {
      group: 'media',
      name: 'flip',
      title: 'Flip ',
      type: 'boolean',
      description: 'Vend om på tekst og billede',
    },
    {
      name: "design",
      type: "design",
      group: "content",
    },
    {
      group: "settings",
      name: "SectionSettings",
      title: "Indstillinger",
      type: "SectionSettings",
    },
  ],
  preview: {
    select: {
      title: 'innerBlocks.0.heading.heading',
      media: "MediaObject.media.imageObject.image",
    },
    prepare({ title, media }) {
      return {
        title: title,
        subtitle: "Tekst og medie",
        media,
      };
    },
  },
});
